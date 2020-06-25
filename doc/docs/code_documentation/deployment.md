---
id: deployment
title: Deployment
sidebar_label: Deployment
---

This section of the documentation is focused on deploying the code on a VM.

## NGINX

A quick word about NGINX. NGINX is running on port 80 and 443 and redirects to the node.js server. In the case of port 80 it redirects to 443 which has SSL. The config file for NGINX is under `/etc/nginx/sites-available` with a symbolic link to `/etc/nginx/sites-enabled`. The symbolic link was made with

```bash title="Symbolic link"
sudo ln -s /etc/nginx/sites-available/coast /etc/nginx/sites-enabled/coast
```

```cpp title="coast NGINX"
// Port 80 redirect
server {
	listen 80;
	listen [::]:80;

	//error page
	error_page 502 /custom_502.html;
	location = /custom_502.html {
			root /usr/share/nginx/html;
			internal;
	}

	server_name _;
	return 301 https://$host$request_uri;
}
//Port 443 with SSL
server {
	
	listen 443 ssl;
	ssl_certificate /home/shahnafis/ssl/coastalimagelabeler_science.crt;
	ssl_certificate_key /home/shahnafis/ssl/private.key;
	server_name _;

	//error page
	error_page 502 /custom_502.html;
	location = /custom_502.html {
			root /usr/share/nginx/html;
			internal;
	}

	location / {
		# First attempt to serve request as file, then
		# as directory, then fall back to displaying a 404.
		proxy_set_header   X-Forwarded-For $remote_addr;
		proxy_set_header   Host $http_host;
		proxy_pass "http://127.0.0.1:6969";
	}

}
```

You can test to make sure the NGINX file is correct with

```bash title="Testing file"
sudo nginx -t
```

And then any changes requires a reload.
```bash title="Reloading changes"
sudo systemctl reload nginx
```

:::info 
For the foreseeable future the only times the `coast` file would be
edited is to change the ports or paths to keys. In that case all you need to do is run
```bash title="Reloading changes"
sudo systemctl reload nginx
```
:::

## Getting code on VM

### Starting server on VM

to start the server, navigate to the directory with the code:

```bash
cd <location of the code>/GitHub/Coastal-Image-Labeler/src/dashboard
```

Build the server with
```bash title="Build server"
sudo npm run build
```


And then run.  
```bash title="Run in background"
bash forever_start.sh
```
Which runs the node.js server with forever that puts the log files in `/home/shahnafis/.forever`
with the files being in the format of

`forever_error_month_day_year-HR.MIN.SEC`  
`forever_log_month_day_year-HR.MIN.SEC`  
`forever_out_month_day_year-HR.MIN.SEC`

Where the times are in UTC. The server should be available now.

### Ending server on VM

We are using a npm packaged called `forever`, found
[here](https://www.npmjs.com/package/forever), which runs the server in the
backgroud. So we need to tell it to stop running the server by finding the PID.

``` js
sudo forever list
```

Get the PID of the server and then

``` js
sudo forever stop <PID>
```

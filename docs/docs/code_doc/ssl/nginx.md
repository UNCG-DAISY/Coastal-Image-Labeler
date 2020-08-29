---
id: nginx
title: NGINX
sidebar_label: NGINX
---

A quick word about NGINX. NGINX is running on port 80 and 443 and redirects to the node.js server. In the case of port 80 it redirects to 443 which has SSL. The config file for NGINX is under `/etc/nginx/sites-available` with a symbolic link to `/etc/nginx/sites-enabled`. The symbolic link was made with

```bash title="Symbolic link"
sudo ln -s /etc/nginx/sites-available/coast /etc/nginx/sites-enabled/coast
```

```cpp title="/etc/nginx/sites-available/coast NGINX"
server {
	
	error_page 500 502 503 504 404 /production.custom_error.html;
	location = /production.custom_error.html {
			root /home/shahnafis/GitHub/Coastal-Image-Labeler/src/html;
			internal;
	}

	location / {
       proxy_pass http://localhost:4201; #whatever port your app runs on
       proxy_http_version 1.1;
       proxy_set_header Upgrade $http_upgrade;
       proxy_set_header Connection 'upgrade';
       proxy_set_header Host $host;
       proxy_cache_bypass $http_upgrade;
    }

	server_name dev.coastalimagelabeler.science;
}
```
:::caution Server Name and Error Page
Remember to change the `server_name` at the bottom if on a different domain/subdomain and
the Error html files up top depending if on the production or development VM.
:::

This is all you have to type in for now. [Certbot](./certbot) will edit this file later based on the `server_name`

Make sure to put the `custom_502.html` under `/usr/share/nginx/html`.

## NGINX Commands

### Test config

```bash title="Testing file"
sudo nginx -t
```

### Reload (needed after any change)

And then any changes requires a reload.
```bash title="Reloading changes"
sudo systemctl reload nginx
```
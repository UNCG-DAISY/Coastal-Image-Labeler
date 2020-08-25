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
	# Error page
	error_page 502 /custom_502.html;
	location = /custom_502.html {
			root /usr/share/nginx/html;
			internal;
	}
		
    # For all routes
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
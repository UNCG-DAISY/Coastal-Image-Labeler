---
id: overview
title: Overview
sidebar_label: Overview
---

In the worse case scenario where the VM goes up in flames and everything has to be redone, here is a full list of things to do.

## Pre-VM

1. Make sure MongoDB Cloud is all good to go, in particular the URI and making sure the VMs IP address is whitelisted
2. Make sure all the Auth0 stuff is set up, you can read more [here](../auth0).

## VM install

### Node js

```bash title="Install node.js"
sudo apt update
sudo apt install nodejs
sudo apt install npm
nodejs -v

curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### Code-Server
**Optional**

Found [here](https://github.com/cdr/code-server). Basically run the commands

```bash title="Installing Code-Server"
curl -fsSL https://code-server.dev/install.sh | sh
```
And then set up the config in `/home/YOUR_USER_NAME/.config/code-server`. Mine looks like

```yaml title="code-server config.yaml"
auth: password
password: PUT UR PASSWORD HERE
host: 0.0.0.0
port: 1337
```

### Jpegoptim 
[repo](https://github.com/tjko/jpegoptim) and
[useage](https://vitux.com/optimize-jpeg-jpg-images-in-ubuntu-with-jpegoptim/).
The rest of the jpegoptim stuff is handled by the bash scripts in `Coastal-Image-Labeler\src\cli\bash`


### Forever
This is the npm package that runs the server and site as a background process

```npm title="Install forever"
npm install forever -g
```

:::warning
The bash script in `Coastal-Image-Labeler\src\dashboard\forever_start.sh` requires that
it has read/write access to where ever `log_folder` points to in the script, so make sure
it can. For me it was making sure that folder was owned by `shahnafis` and under the group `shahnafis`.

If it doesnt have permission to write there, the command will still work but for
some reason wont show up in `forever list` and cant be stopped with `forever
stoppall` meaning a VM restart will be required to stop the server.

If the permissions for `log_folder` are set, then everything should be fine.
:::
### NGINX
This is a reverse proxy that runs on ports 80 and 443 and redirects traffic to
the node server so that it doesnt have to run in sudo mode.

```bash title="Install NGINX"
sudo apt update
sudo apt install nginx
```

Check to see its running with 

```bash
sudo systemctl status nginx
```

Press `q` to exit


Navigate to `/etc/nginx/sites-available/` and create a file, I called mine
`coast` and paste the contents of [here](../deployment#nginx)


Then copy the file at `Coastal-Image-Labeler\src\custom_404.html` to
`/usr/share/nginx/html` so that the custom 502 page is there.

Then make sure the NGINX config is correct by running

```bash title="Check NGINX config works"
sudo nginx -t
```

and then run this to reload.

```bash
sudo systemctl reload nginx
```

**Make sure to create the SSL certs with LetsEncrypt.**

### Images

Make sure to compress the images, and set up the path in the config.env. Else
the server will just use uncompressed images

## Deploying server

Go to `Coastal-Image-Labeler\src\dashboard` and run

```bash
npm install
```

and follow the same instructions [here](../deployment#starting-server-on-vm).

## Problem Areas

The areas that could cause problems are

1. MongoDB
   1. Generally can be fixed by making sure VM can connect or has corret URI
2. Auth0
   1. Generally can be fixed by following the instructions the errors/warnings give
3. Server
   1. A little bit harder to debug, hopefully the logs can show the issue
4. Frontend
   1. A little bit harder to debug, hopefully the logs can show the issue
5. VM
   1. Check file permissions. Also check issues with linux just being linux
6. Other
   1. This is the fun one,because who knows what might happen.


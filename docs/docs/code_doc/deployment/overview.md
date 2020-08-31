---
id: overview
title: Full Deployment Cycle
sidebar_label: Full Deployment Cycle
---

## Pre VM Tasks

1. Create Auth0 Applications. Create the 2 Tenants(development and production).
2. Create database with proper IP whitelisting as mentioned [here](../database/connection)

## VM Install

There are a few packages/things to install.

### Node js
```bash title="Install node js"
sudo apt update
sudo apt install nodejs
sudo apt install npm
nodejs -v

curl -sL https://deb.nodesource.com/setup_14.x | sudo -E bash -
sudo apt-get install -y nodejs
```

### PM2

This will require node js to be installed. [PM2](https://pm2.keymetrics.io/) is a node js package that runs the node server in the background

```bash title="Install PM2 globally"
npm i pm2 -g
pm2 install pm2-logrotate
```

:::caution Log Folder
Looking at `src/dashboard/ecosystem.config.js` Log files will be created at `../../../../pm2Logs/${timestamp}/` where `timestamp` is  `month-day-year_hour.minutes.seconds`. Please make sure to create the folder `../../../../pm2Logs/`. PM2 will do the rest.
:::

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

Make sure the port is setup in the firewall

### Jpegoptim 
[repo](https://github.com/tjko/jpegoptim) and
[useage](https://vitux.com/optimize-jpeg-jpg-images-in-ubuntu-with-jpegoptim/).
The rest of the jpegoptim stuff is handled by the bash scripts in `Coastal-Image-Labeler\src\cli\bash`


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

### Certbot

```bash title="Install Certbot"
sudo add-apt-repository ppa:certbot/certbot
sudo apt-get update
sudo apt-get install python-certbot-nginx
```

## VM Setup

1. Setup NGINX [here](../ssl/nginx) and Certbot [here](../ssl/certbot)
2. Go to `Coastal-Image-Labeler/src/dashboard` and install dependencies with `npm install`
3. Create the `.env.*.local` files like [here](../auth0/auth0), get their values like [here](../auth0/auth0Values).
4. Run the server with `npm run pm2` which will build and start the site in production mode. If need to run the site in development mode, run `npm run dev`.

As a note, `sudo pm2 list` will show all pm2 processes. To stop the server type 
```bash
sudo pm2 stop all
sudo pm2 delete all
``` 
so that next time theres a clean restart.
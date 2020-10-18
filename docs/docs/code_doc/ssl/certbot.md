---
id: certbot
title: Certbot
sidebar_label: Certbot
---

Make sure to complete [NGINX](./nginx) before.

## Create Certificates

Certbot creates SSL certificates that last around 90 days

```bash title="Create certs"
sudo certbot --nginx -d coastalimagelabeler.science -d www.coastalimagelabeler.science
```

**OR** if on the dev vm
```bash title="Create certs"
sudo certbot --nginx -d dev.coastalimagelabeler.science
```
Make sure to select http to https upgrade

In either case Certbot will edit the NGINX config with the matching `server_name`.

## Renew Certificate

To renew the certificate simply run
```bash title="Renew cert"
sudo certbot renew --nginx
```

Or to just dry run it
```bash title="Dry run"
sudo certbot renew --dryrun
```
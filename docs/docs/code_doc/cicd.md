---
id: cicd
title: CI/CD
sidebar_label: CI/CD
---

V3 Dashboard uses Github Actions for CI/CD. Currently there are 2 workflows.

1. Workflow to deploy docs site
2. Workflow to run unit tests

Both are under `.github/workflows`

## Docs workflow

This one requires a secret key to be set up to allow github actions to deploy the doc site.

1. Use Git Bash and run

```bash title="Creating RSA keys"
ssh-keygen -t rsa -b 4096 -C "put email here"
```
- This will, on windows, create it at `C:\Users\USER\.ssh`
- **DO NOT** enter a passphrase.
-  Remember to keep track of the file names created, by default they are `id_rsa.pub` for the public key and `id_rsa` for the private key, the file names are important later on.
2.  Go to the deploy keys section in the settings of the repo [here](https://github.com/UNCG-DAISY/Coastal-Image-Labeler/settings/keys) and add the public key file of `id_rsa.pub`. For the key name put the file name without the extension and check the box for write access. Like so

![pubkey](../../img/code_documentation/secrects/deploykey.PNG "public key")

3. Then go to the secrets tab and a new secret called `GH_PAGES_DEPLOY` with its value as the private key file `id_rsa`. Like so.

![repoSecrects](../../img/code_documentation/secrects/repo_secrets.PNG "repo secrects")

If the github action workflow is set up correctly, everything should run fine.

## Unit Test

This requires that the mongoURI be set up. Going [here](https://github.com/UNCG-DAISY/Coastal-Image-Labeler/settings/secrets) and entering the mongoURI  as `MONGO_URI`. The value is `mongodb://localhost:27017` which means connect to the local mongoDB instance which the workflow sets up, however perhaps later a cloud mongodb could be used

![repoSecrects](../../img/code_documentation/secrects/repo_secrets.PNG "repo secrects")

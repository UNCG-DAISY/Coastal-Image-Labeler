---
id: cicd
title: CD/CD
sidebar_label: CI/CD
---

V3 Dashboard uses Github Actions for CI/CD. Currently there are 2 workflows.

1. Workflow to deploy docs site
2. Workflow to run unit tests

Both are under `.github/workflows`

## Docs workflow

This one requires a secret key to be set up

## Unit Test

This requires that the mongoURI be set up. Going [here](https://github.com/UNCG-DAISY/Coastal-Image-Labeler/settings/secrets) and entering the mongoURI  as `MONGO_URI`. The value is `mongodb://localhost:27017` which means connect to the local mongoDB instance which the workflow sets up, however perhaps later a cloud mongodb could be used

![app6](../../img/code_documentation/repo_secrets.PNG "Applications6")
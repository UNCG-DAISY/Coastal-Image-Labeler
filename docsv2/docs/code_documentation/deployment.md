---
id: deployment
title: Deployment
sidebar_label: Deployment
---

This section of the documentation is focused on deploying the code on a VM.

## Getting code on VM

### Starting server on VM

to start the server, navigate to the directory with the code:

```bash
cd <location of the code>/GitHub/Coastal-Image-Labeler/src/dashboard
```

And then run.  
```js
NODE_ENV=production forever start ./_dist/server.js
```


### Ending server on VM

We are using a npm packaged called `forever`, found
[here](https://www.npmjs.com/package/forever), which runs the server in the
backgroud. So we need to tell it to stop running the server by finding the PID.

``` js
forever list
```

Get the PID of the server and then

``` js
forever stop <PID>
```

---
id: path
title: Add new path to Catalog, Archive, Image
sidebar_label: Add new path
---

The API routes for `/api/image/:imageId/:type` allow for any string to be passed for `type`. For example 
```
/api/image/:imageId
``` 
or 
```
/api/image/:imageId/original
``` 
will return the image using the `original` path. Or using 
```
/api/image/:imageId/compressed
``` 
will return the `compressed` path of the image.

These can be added at insertion time via the CLI, as seen [here](../cli/overview#add) under the `path` key. Any `key:string` pair can be added. **However** there has to be some work done to ensure that the CLI and server work properly. This method has been choosen as it is the most type strict.

## Edit the CLI

We have to tell the CLI that the new added path is a valid path. Go to `Coastal-Image-Labeler\src\cli\src\utils\pathSchema.ts` add the new path you would like to the
array. For example I will add the `testingCoolNewPath` as a key.


```js title="pathSchema.ts"
const keys = ['compressed', 'gradcam','testingCoolNewPath']

//rest of the file is here
```
And thats it.

## Edit the Dashboard

This is the exact same thing. Go to `Coastal-Image-Labeler\src\dashboard\server\utils\pathSchema.ts`

```js title="pathSchema.ts"
const keys = ['compressed', 'gradcam','testingCoolNewPath']

//rest of the file is here
```

And thats it, the server and CLI will recognize the new path on restart/rebuild.
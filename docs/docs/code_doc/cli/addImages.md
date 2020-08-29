---
id: addImages
title: Adding Images to DB
sidebar_label: Adding Images to DB
---

First make sure to have built the CLI following [here](./setup)

## Add MongoURI

First add the MongoURI so that you dont have to always enter it.

```bash title="Set URI"
cil-import mongoURI set
```

It will then ask you to enter the URI.


### See Current URI
```bash title="Show URI"
cil-import mongoURI show
```


### Test Connection
```bash title="Test URI"
cil-import mongoURI test
```

## Add Images.

### Create JSON File

For ease of use, a JSON file is needed to help create the catalogs. The format is as follows

```json
{
    "path":{
        //This path is used to find archives and images
        "original":"xxx",
        "compressed":"xxx"
    },
    "name":"xxx",
    "taggable":true,
    "catalogInfo":{
        "year": 2020,
        "link":"xxx",
        "description":"xxx"
    }, 
    //Images to add
    "imageFormat":[".jpg",".jpeg"],
    //Make sure this question set exists
    "questionSet":"xxx",
    //Either left this field out to have random order, or define it like so
    "imageServeOrder":{
        "type":"sequential",
        "data": {
            "nameOfArchive":["nameOfImage.ext"]
        }
    }
}
```

:::caution
If you are going to copy this remember to remove comments, JSON doesnt like comments
:::

### Run Command

Then simply run the command

```bash title="Running Command"
cil-import catalog add --path PATH_TO_JSON
```

And watch the CLI work.

:::info Time to Enter
For reference it takes about 82 seconds to enter in 836 images which is around 10 images per second.
:::



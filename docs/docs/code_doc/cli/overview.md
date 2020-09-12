---
id: overview
title: Overview
sidebar_label: Overview
---

These are the following availible commands for the `cil-import` CLI. Before using please follow the instructions [here](setup) to setup the CLI.

## Main Commands

### MongoURI

#### Set
:::info Add MongoDB URI

Set the MongoURI for db connection
```bash
cil-import mongoURI set
```
:::

#### Show
:::info Show MongoDB URI

Show the MongoURI for db connection
```bash
cil-import mongoURI show
```
:::

#### Test
:::info Test MongoDB URI

Test the MongoURI for db connection
```bash
cil-import mongoURI test
```
:::

#### Remove
:::info Remove MongoDB URI

Remove the MongoURI
```bash
cil-import mongoURI remove
```
:::

### Catalog

#### Add
:::info Add a catalog,and archives of that catalog, and images of that archive to db

Adding images
```bash
cil-import catalog add --path PATH_TO_JSON
```

`--path` - is required
:::

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
    //Either leave this field out to have random order, or define it like so
    "imageServeOrder":{
        "type":"sequential",
        "data": {
            //If an archive doesnt appear in this json, it will use random order
            "nameOfArchive":["nameOfImage.ext"]
        }
    }
}
```

:::caution
If you are going to copy this remember to remove comments, JSON doesnt like comments
:::

Here are some stats of how long it takes to enter into the DB.

Florence 141 seconds 30492 images = 216 img/sec  
Dorian 85 seconds 18425 images = 216 img/sec  
Michael 45 seconds 9600 images = 213 img/sec  
Tairua 22 seconds 3851 images = 175 img/sec


#### Delete

:::info Deletes a catalog with given ID

Deleting catalog
```bash
cil-import catalog delete --id
```

`--id` - is required, ID of catalog
:::

### Archive

#### Add

:::info Add archives and their images to existing catalogs

Adding images
```bash
cil-import archive add --path PATH_TO_JSON
```

`--path` - is required
:::

The JSON file is as follows

```json
{
    "archives":[
        {
            //The below 2 will be used to check if the archive already exists
            "catalogId":"5f5c02df833a4f05a80d774e",
            "archiveName":"american",
            "imageFormat":[".jpg",".jpeg"]
        }
    ]
}
```

#### Delete

:::info Deletes a archive with given ID

```bash
cil-import archive delete --id
```

`--id` - is required, ID of catalog
:::


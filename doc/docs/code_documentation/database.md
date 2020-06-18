---
id: database
title: Add Images to Database
sidebar_label: Add Images to Database
---

The overall process to add catalogs, archives and images to the database is as follows.

1. Use the `cil-dashboard` CLI to the catalogs, archives and images to database.

This is done in the form of a `json` file that is passed to the CLI, for example we have


```json title="/insert.json"
{
    "compressedFolder":"/home/shahnafis/compressed",
    "catalogs":[
        {
            "path":"/datadrive/archives/buxtoncoastalcam",
            "name":"Buxton Coastal Camera",
            "taggable":true,
            "year":2019,
            "link":"https://en.wikipedia.org/wiki/Buxton,_North_Carolina",
            "description":"These are images from a NOAA NOS and SECOORA WebCAT coastal camera in Buxton, NC",
            "createAllArchives":true,
            "createAllImages":true,
            "questionSet":"5ee3a8d801091b0dd1d62d3a"
        }      
    ]
}
```

This json will add the catalog `Buxton Coastal Camera` to the database. All the fields here are required. You can add more catalogs by adding to the array

2. Then run the command
   
```bash
cil-dashboard catalog add
``` 
Which will prompt you for the path to the json file. The CLI will then start inserting into the database, logging its output.

:::caution Note
The URI to the database must be set first, this can be done with `cil-dashboard mongoURI set`
:::
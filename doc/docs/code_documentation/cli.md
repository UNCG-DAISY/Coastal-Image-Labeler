---
id: cli
title: Setting up CLI
sidebar_label: Setting up CLI
---

The CLI is used to enter the data about the catalogs and their archives and
their images into the Database. Before running any of the commands its best to
compile the CLI due to it still being under development.

## Building

1. Navigate to `Coastal-Image-Labeler\src\cli`
2. `npm install` to install the dependencies
3. `npm run link` which builds the CLI.
4. Test that the CLI has been built with 

```bash
cil-dashboard -V
```
The current verision as of now is `1.0.9`


:::caution
**I reccomend building the CLI everytime you use it, just incase some update happened**
:::

## Running Commands

Running the command below will show all the commands. There are also various subcommands as well. 

![commands](../../img/code_documentation/commands.png)

:::caution
Almost all commands will require the mongoURI to be set. So make sure you run

```bash
cil-dashboard mongoURI set
```
and follow the prompt to set the URI

![commands](../../img/code_documentation/set.png)

![commands](../../img/code_documentation/show.png)
:::


---
id: indexId
title: Overview
sidebar_label: Overview
---


## Install

### Get Nodejs

You will need Node.js to run a local verision of the docs to test if everything works.
You can go [here](https://nodejs.org/en/download/) for a download for Windows or Mac. If your on Linux you can do

```bash title="bash"
curl -sL https://deb.nodesource.com/setup_12.18 -o nodesource_setup.sh
sudo bash nodesource_setup.sh
sudo apt install nodejs
nodejs -v
```

### Install Docusaurus

After getting Docusaurus installed you will want to go to
`Coastal-Image-Labeler/doc` and install the packages for Docusaurus.

```bash title="bash"
cd <To Coastal-Image-Labeler/doc>
npm install
```

THen you can run a localhost of the server with 

```bash title="bash"
npm run start
```

### Writing a Doc

lets say you want to add a new catagory called `My Catagory` and under that you have a file called `my_file.md`. To do that you would;

1. Create the folder called `my_catagory` under `Coastal-Image-Labeler/doc/docs/my_catagory`
2. Create the file `Coastal-Image-Labeler/doc/docs/my_catagory/my_file.md`

For now you can populate the contents of that file with 
```md title="markdown"
---
id: fileId
title: Title of My Page
sidebar_label: Side Title
---

Hello There 👋.
```

the ID is important as this is how we will refer to it.

3. Inorder to have it show up in the sidebar go to
   `Coastal-Image-Labeler/doc/sidebars.js` and you will see a rather long array
   of JSON objects that describe the current catagories. You can just add this.


```js
module.exports = {
  docs: [
    {
        //Lots of stuff
    },
    {
        //Lots of stuff
    },
    {
        //Lots of stuff
    },
    {
        //Lots of stuff
    },
    {   
        //Lots of stuff
    },
    {
        //Lots of stuff
    },
    {
      type: 'category',
      label: 'My Catagory',
      items: [
        //Path to the file relative from Coastal-Image-Labeler/doc/docs/ 
        //With the filename being replace with the ID 
        "my_catagory/fileId",
      ],
    }
  ],

};

```

4. After adding this you will have to restart the website with `npm run start` again.

You can vist the page [here](../my_catagory/fileId).


5. Deploying. So to deploy run 
```bash title="bash"
npm run deployE
```
`deployE` = `Deploy as Evan`  
`deployS` = `Deploy as Shah`

Which deploys the site by commiting to the `gh-page` branch as `ebgoldstein`. It will ask you to log in as that user. The reason it asks is because usualy this stuff is done by a bot.

This should cover the basic use of Docusaurus to edit and test docs. I didnt cover the stuff liek blogs as that we can do later.
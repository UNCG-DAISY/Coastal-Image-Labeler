---
id: project_structure
title: Project Structure
sidebar_label: Project Structure
---
export const Highlight = ({children, color,text}) => ( <span style={{
      backgroundColor: color,
      borderRadius: '2px',
      color: text,
      padding: '0.2rem',
    }}>{children}</span> );

There are 2 major groups of the project.  


- The Dashboard, under `src/dashboard/`, which is the front and backend for the Dashboard site. 


- The Command Line Interface, under `src/cli/`, which is used to insert the
  initial data into the database.

## Dashboard

The Dashboard has 4 important folders.  

### _server

- Code for the node.js server.
- Inside the server folder are the following.
    - `controllers` - Which are the actualy logic for an API endpoint
    - `middleware` - General purpose functions that are ran when a API endpoint
    is hit, for example making sure that a user is logged in, or making sure a user is a tagger.
    - `models` - Which are the Objects to set up some structure in the Database and make sure entries have some uniformity. <Highlight color="#7db343" text="#000">**Note:**</Highlight> These files have to be the same as the ones in `src/cli/_src/models` due the project structure not accounting for a cli when it was originally made.
    - `routes` - Assign endpoints to a `controller` function. For example `api/v1/test` would be mapped to the `test` function in the `controllers` folder.
    - `utils` - Utility functions.

### _dist
- Ccontains the compiled code of `_server` since the server is written in TypeScript. 
- Maintains the exact same structure as `src/dashboard/_server` but with all files as `.js` instead of `.ts`.

### _site
- Code for the frontend site.
- Inside the site folder are the following.
    - `pages` - Which are the pages of the website. ==Note:== Any page inside `pages/auth/` will require the user to be logged in, this is ensured by the server.
    - `components`  - Reuseable components for the website such as the tagging form, or various buttons.

### _config
- Contains the enviroment variables. <Highlight color="#7db343" text="#000">**Note:**</Highlight> The contents of
    this folder are added to the `.gitignore` since they contain secret information.
    There is a `config.env.template` files to explain what variables need to be
    defined.

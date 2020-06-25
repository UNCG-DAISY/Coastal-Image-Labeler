---
id: Frontend 
title: Next.js/React.js 
sidebar_label: Next.js/React.js
---

For now the best way to plan for reuseability is to simply list out the pages
with their features and components.

```
\_app
    - getInitProps
        - Check for user
\index
    - layout component
        - appbar component
        - drawer component
    - text container component to show message
\auth
    \auth\index
        - layout component
            - appbar component
            - drawer component
                - Get appropriate pages based on roles
        - Show message container
        - Show resume table
        - getInitProps
            - Check user
            - Information for resume tagging
    \auth\start_tagging
        - A wizard/large form for selecting catalog and archive
            - A wizard is probably best
        - getInitProps
            - Check user
            - Check tagger
            - Check any catalogs
            - Get catalogs that can be tagged
    \auth\tag_image?catalog=X&archive=X
        - React-Hook-Form
            - Get questions based off catalog
            - Generic button component
            - Generic checkbox component
            - Generic textbox component
        - getInitProps
            - Check User
            - Check tagger
            - Check catalog    
            - Get image document
    \auth\profile
        - Section to show tagged images
            - Listed with a sortable table
            - Shows the data as a modal
                - Modal component
        - Section to show catalog and archives
            - Can request perms to tag archive
        - If admin show logs
            - last tags
            - last resolved tags
            - perm requests
            - export/backup database
        - getInitProps
            - Check user
            - Check user role
            - Get all catalogs user is part of and all that they are not.        
```
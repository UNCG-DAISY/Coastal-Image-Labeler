---
id: future
title: Future
sidebar_label: Future
---

As great of a jump V3 was from V2 there are always things that can be improved or experimented with for V4.

## CMS

- Alot of the current features and ideas below could be done using a Content Management System. This would come from [Strapi](https://strapi.io/) which is an open source headless CMS.
  - Some of the features are
    - Image resize on upload
    - public or authenticated required routes/rules
    - possible integration with Auth0 [here](https://github.com/Heziode/strapi-auth0-example).
    - Admin dashboard
    - Provides login system

## Monorepo

- One source of potential issues is the duplicated Type interfaces across the CLI, frontend, and backend. Using something like [Nx](https://nx.dev/) from NRWL and having a Monorepo could help prevent potential issues and allow for future scalability.

## CLI
- CLI subcommand called `doctor`(name sounds cool to me) that would help find errors in the DB (Such as an archive refers to a catalog that doesnt exist or an image refers to an archive that doesnt exist, image counts being wrong, or tags missing data).
- Unit Testing for CLI.
- Multithreading?

## Frontend
- Unit Testing for frontend on some of the parts that are deterministic.
- Pixel annotation with [React Image Annotate](https://github.com/UniversalDataTool/react-image-annotate).
- Add sliders as a possible question type.
- Add number field as a possible question type.
- Improve the way question sets are stored. Add ability to check/create new question sets in admin page.
- Admin page to show latest tags, update users, and other adminy stuff 🤷 `¯\_(ツ)_/¯` .
- Can be partially implemented using a CMS

## Server
- Simplify some of the middlewares. Some are a little bit messy in terms of logic.
- Auto inser user db data via express
- Enforce user tag role checks on server rather then on the nextjs server from `getServerSideProps`.
- Can be partially implemented using a CMS

## Improve data/resource sharing between CLI and dashboard
- One issue noted was there was duplicate code in the CLI and dashboard.
- There should be a way to make it so they share the code (other then using symlinks, which is not sustainable as what happens if someone forgets to add the symlink)
- Can be solved with using a Monorepo setup.

## GitHub Actions
- Create file for unit testing configs, such as user data and archives that will be used through out the test to unsure none of the tests step on each other.
- Auto deploy site whenever master get pushed to.
- Auto deploy dev site whenever beta gets pushed to.

## VM
- Stream log files to other locations.
- Notify if the site goes down or if an error happens.

## TypeScript
- Improve the way types are shared across the dashboard and CLI.
- Can be used by setting up a Monorepo
  
## Experimental

- Make the DB be local instance instead of MongoDB Atlas.
  - Would probably mean that users would have to make a local account and **CAN NOT** signin with Google/Facebook/Github/etc.
- Use a SQL database and maybe use Redis for caching/session management/message passing.
  - CMS might be able to help with this
-  Dockerize.
-  Kubernetes.
-  Dark theme 🌑 and Light theme ☀️ or maybe other themes/user themes.
-  Redux for state management. (Maybe)
-  Progressive image loading. (More or less done now)
-  Archives within archives with in archives....etc.
   -  Images can have groups assigned to them (like tags on discord). So a image could have the `Florence` group and `FlorenceArchive` group.
   -  A user would need to have (atleast one or all, which ever idea works out best) inorder to tag an image. The group can have a rank (1,2,3,4...) and so images would be grouped by the rank 1 groups first then rank 2 and so on.
   -  Only one group per rank for an image (cant have say 2 rank 3 group labels).
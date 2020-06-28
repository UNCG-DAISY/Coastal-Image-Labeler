---
id: nodejs 
title: Node.js 
sidebar_label: Node.js
---

## Endpoints

The endpoints would still be structured the same way where they are grouped by
what Mongoose model they interact with. In truth it probably would be best to
build the frontend first then figure out the endpoints

:::note
Generally wont use GET requests due to no body being passed and possible caching issues.
:::

### User

#### POST

- getTaggableArchives
- getTaggableCatalogs
- getAssignedImages

### Catalog

#### POST

- Get Catalogs

### Archive

#### POST

- Get Arhives

### Image

#### POST

- Tag Image

### Question Sets

#### POST

- Get set info

## Atomic Middlewares

List of middlewares for endpoints

1. `addMongoUser` - Adds the information from the DB to the req for the next middleware to use.
2. `advancedResults` - For general query with query params.
3. `asyncHandler` - Wraps the function in a try catch.
4. `ensureAuthenticated` - Ensures the user is logged in.
5. `authorize` - Checks someones tags,passes if they have it.
6. `notAuthorize` - Like above, but if they have it they cant go.
7. `ensureBody` - Checks if body, if not dont go.
8. `partOfArchive` - Checks if a user can interact with this archive.
9. `partOfCatalog` - Checks if a user can interact with this catalog.
10. `imagePartOfArchive` - Checks if an image is part of that archive.
11. `archivePartOfCatalog` - Checks if an archive is part of that catalog.
12. `cycleImageOnToUser` - Takes an image and puts it to the assigned list of a user.
13. `cycleImageOffUser` - Takes an image off a user and puts it in tagged or somewhere else.
14. Perhaps more?

## Mongoose Functions

Use the on creation, on update and on delete functions to update catalogs on the number of archives and images, archives on the number of images, and images on the number of tags.

## Deployment

PM2 has better logging and resource management, and Lets Encrypt is just easier to use. Guide [here](https://www.youtube.com/watch?v=oykl1Ih9pMg)

## Logging

Logging would mainly be done by printing to the console, which then PM2 would then pick up and save.
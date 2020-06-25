---
id: overview 
title: Overview 
sidebar_label: Overview
---

As with any large project there has been alot of learning. Alot of things went
well but also a lot of places could benefit with some improvement. One of these
areas is planning beforehand. The initial goal of `v2` of the labler was focused
around using the correct tools. Now that objective has been meet, its time to
create a new set of standards for the next iteration of the project so that a
plan can be made beforehand.

## Lessons Learned

### TypeScript

Using TypeScript was a important decision early on in the project. What it
essentially allows for is static type checking at compile time, something
JavaScript doesnt have since it doesnt care about types. However TypeScript was
half implemented it. The backend Node.js server and CLI are written in
TypeScript but the frontend site is not. So one of the major changes for `v3`
would be to:

:::note 
Use TypeScript across all sections of the project
:::

### Next.js/React.js

Next.js is something that would still be used for the project as it brings great
benefits. However, it does have some nuances that must be handled such as
getting the user data from passport.js. While this was handeled, the code could
be better. So one more change for `v3` would be to:

:::note 
Structure code for better reuseability for the frontend
:::

There was also a few react related issues, mainly revolving around components.
For example the need for a generic error component would have benefited the
project greatly rather then each paging having its own style of error
displaying. So another change for `v3` would be to:

:::note 
Create more atomic components
:::

### Node.js


#### API Organization

The place that could use the most improvement is the API section. Almost half of
the API endpoints created where in the end not used, and those that where could
have been broken up into multiple middlewares. This issue could be fixed with
clear organization beforehand.

:::note
Layout all possible endpoints beforehand
:::

That way proper planning can be done. Another key change would be to

:::note
Create atmoic middlewares that perform basic tasks
:::

For example having a middleware that checks to see if a body was sent in a POST
request. This also means making so that each middleware performs as few tasks as
possible inorder to make things modular. For example the image tagging process
when a user selects submit would be

:::info Tag an Image API flow
Error checks -> **Assign tags to image** -> Cycle image off user -> Select
new image -> Assign new image -> Return
:::

Where as skip image would be 

:::info Skip Image API flow
Error checks -> **Assign skip tag** ->Cycle image off user -> Select
new image -> Assign new image -> Return
:::

Where the difference is what tag is assigned to the image

#### Mongoose

Mongoose is a ORM for MongoDB. One area of improvement would be to use more of
the static methods, however the use as it is now is currently fine.

:::note
Use more Mongoose features (Having archives keep track of image numbers) (**optional**)
:::

### Auth0 and MongoDB

The current way to detect a new user is a bit hacky. Every page essentially
checks to see if the current use is in the DB, and if it is not then create a
new user. Auth0 might potentially have a solution to this where on signup it
creates the user.

:::note 
See if Auth0 has someway to enter user info into DB on signup
:::

One other change would be to have a interface for MongoDB, but this is a little
bit of a weird one since Mongoose handles error checking

:::note
DB interface (**optional**)
:::

### Other

This one is a little bit odd, but planing out the features and setting them in
stone will allow for better planning and organization of code

:::note
Plan all features and stick to them
:::

## Summary

A Summary of all the major changes.

:::info Major Changes for V3
1. Use TypeScript across all sections of the project
2. Structure code for better reuseability for the frontend
3. Create more atomic components
4. Layout all possible endpoints beforehand
5. Create atmoic middlewares that perform basic tasks
6. Use more Mongoose features (Having archives keep track of image numbers) (**optional**)
7. See if Auth0 has someway to enter user info into DB on signup
8. DB interface (**optional**)
9. Plan all features and stick to them
:::
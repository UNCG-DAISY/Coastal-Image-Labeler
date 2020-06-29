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
Create atomic middlewares that perform basic tasks
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

#### Background Process

Currently the project uses [`forever`](https://www.npmjs.com/package/forever) to
have the server run as a background process. Its simple but there is some
downsides with it. As such instead of forever the v3 should use [`pm2`](https://pm2.keymetrics.io/)
which a more popular and offers more features like cpu/memory history

:::note
Use PM2, [guide](https://www.youtube.com/watch?v=oykl1Ih9pMg)
:::

#### SSL

There was nothing fundamentally wrong with the way the current SSL certs where
generate, it just was a pain. [`Lets Encrypt`](https://letsencrypt.org/) is much
easier to use.

:::note
Use Lets Encrypt, [guide](https://www.youtube.com/watch?v=oykl1Ih9pMg)
:::


#### Logging

Logging currently as it is only helps in a few cases, and usualy is buggy due to
having colors in the console. V3 should have a better logging system with colors
for dev mode and no colors for production along with a centeralized location for logging

:::note
Better logging
:::

### Auth0 and MongoDB

The current way to detect a new user is a bit hacky. Every page essentially
checks to see if the current use is in the DB, and if it is not then create a
new user. Auth0 might potentially have a solution to this where on signup it
creates the user.

:::note 
See if Auth0 has someway to enter user info into DB on signup. [Possible soultion](https://auth0.com/blog/get-realtime-auth-events-with-auth0-and-pusher/)
:::

One other change would be to have a interface for MongoDB, but this is a little
bit of a weird one since Mongoose handles error checking

:::note
DB interface (**optional**)
:::


### Continuous Integration/Unit Testing

Simply put these are two things that help make sure the code is deployed on time
and works. Plus helps set up a work flow.

:::note
Add CI/CD and Unit testing
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
1. Use TypeScript across all sections of the project (Static type checking)
2. Structure code for better reuseability for the frontend (Modular code)
3. Create more atomic components (Modular code)
4. Layout all possible endpoints beforehand (Organization)
5. Create atomic middlewares that perform basic tasks (Modular code)
6. Use more Mongoose features (Having archives keep track of image numbers) (Automatic stats)
7. Use PM2, [guide](https://www.youtube.com/watch?v=oykl1Ih9pMg) (Logging,management)
8. Use Lets Encrypt, [guide](https://www.youtube.com/watch?v=oykl1Ih9pMg) (Ease of life)
9. Better logging (Logging)
10. See if Auth0 has someway to enter user info into DB on signup. [Possible soultion](https://auth0.com/blog/get-realtime-auth-events-with-auth0-and-pusher/) (Automatic code)
11. DB interface (**optional**) (Input checking)
12. Add CI/CD and Unit testing (Work Flow)
13. Plan all features and stick to them (Organization)
:::
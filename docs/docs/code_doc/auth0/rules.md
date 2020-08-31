---
id: rules
title: Rules
sidebar_label: Rules
---

One major change with v3 dashboard was the introduction of a 2nd Auth0 tenant. The 2nd Tenant acts as a dev tenant. The reason is whenever a new user signs up, they are entered into the database. The Production tenant enters them into the production database and the dev tenant enters them into the dev database.

The code for the rule is at `src/auth0/signupInsertWithMongoose.js`. The only thing you have to fill in is the DB URI. The rule has minimal code to create a user, and search archives to find the `demo` catalog by name and assign it to the user.

:::warning
Dont save the DB URI on to the repo
:::
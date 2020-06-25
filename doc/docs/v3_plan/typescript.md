---
id: TypeScript 
title: TypeScript 
sidebar_label: TypeScript
---

One of the biggest issues with having the frontend not being in TypeScript was
that there would be very little in the way of component error handling. One
other area of difficulty was how the CLI and server both used the same models
for Mongoose, but those files had to be copied over. So for the TypeScript
changes there are two overall changes

:::note
1. Use TypeScript
2. Somehow have the models be copied from server to CLI (perhaps a NPM script that copies files)
:::
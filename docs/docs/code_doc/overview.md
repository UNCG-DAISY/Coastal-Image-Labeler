---
id: overview
title: Code Documentation
sidebar_label: Overview
---

The following set of documentation is focused on the code base, providing steps to maintain the current system.

### V2 to V3 Changes

- TypeScript used across entire project.
- Expanded frontend components for easier extension.
- Created more atomic middlewares.
- Utilized Mongoose hooks (on save update image count per archive/catalog or for validation).
- Addition of new models (Tag, AssignedImages).
- Use of PM2 for running server and writing logs.
- Better use of LetsEncrypt and NGINX along with new HTML pages for when the site is under maintenance.
- Better Logging with log type, time and response time for routes
- Auth0 enters users into DB on first signup, gives tagger role and assigns default catalog.
- Unit Tests.
- Use of GitHub actions for Docs redeploy and running Unit Tests
- Path Alias (instead of having `../../../../components`, it can be just `@/components/`)

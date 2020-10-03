---
id: archive
title: Archive
sidebar_label: Archive
---

## `/`

This is the general querying route for the archive model. For example
```
/api/archive?sort=-name
```
Will return all the archives sorted in reverse by name
```
/api/archive?_id=abc_
```
Will return the archive with the `_ID=abc`

This is a `get` and `post` request. Post version exists to avoid browser caching
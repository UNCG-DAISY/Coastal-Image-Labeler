---
id: tags
title: Tags
sidebar_label: Tags
---

## `/`

This is the general querying route for the tags model. For example
```
/api/tags?sort=-name
```
Will return all the tags sorted in reverse by name
```
/api/tags?_id=abc_
```
Will return the tag with the `_ID=abc`

This is a `get` and `post` request. Post version exists to avoid browser caching
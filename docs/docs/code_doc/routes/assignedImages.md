---
id: assignedImages
title: Assigned Images
sidebar_label: Assigned Images
---

## `/`

This is the general querying route for the assignedImages model. For example
```
/api/assignedImages?sort=-name
```
Will return all the assignedImages sorted in reverse by name
```
/api/assignedImages?_id=abc_
```
Will return the assignedImage with the `_ID=abc`

This is a `get` and `post` request. Post version exists to avoid browser caching
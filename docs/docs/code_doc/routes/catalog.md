---
id: catalog
title: Catalog
sidebar_label: Catalog
---

## `/`

This is the general querying route for the catalog model. For example
```
/api/catalog?sort=-name
```
Will return all the catalogs sorted in reverse by name
```
/api/catalog?_id=abc_
```
Will return the catalog with the `_ID=abc`

This is a `get` and `post` request. Post version exists to avoid browser caching
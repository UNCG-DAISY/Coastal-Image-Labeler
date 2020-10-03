---
id: image
title: Image
sidebar_label: Image
---

## `/`

This is the general querying route for the images model. For example
```
/api/image?sort=-name
```
Will return all the images sorted in reverse by name
```
/api/image?_id=abc_
```
Will return the image with the `_ID=abc`

This is a `get` and `post` request. Post version exists to avoid browser caching

## `/:imageId/:type`

Will return the image by `imageId` using the `type` path. For example

```
/api/image/abc/compressed
```
WIll return the image file of the image document with `_id=abc` using the `compressed` path

This is a `get` request

## `/:imageId`

Same as above, but uses the `original` path

```
/api/image/abc
```
Will return the image file of the image document with `_id=abc` using the `original` path

This is a `get` request
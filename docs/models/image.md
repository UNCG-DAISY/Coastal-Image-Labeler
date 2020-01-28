# Image Model

The image model is the central model that everything revolves around. There is one Image document per image.

## Model definition

```js
{
    name,
    path,
    taggable,
    tags,
    firstTag,
    lastTag,
    compression,
    finishedTagging,
    tillComplete
}
```

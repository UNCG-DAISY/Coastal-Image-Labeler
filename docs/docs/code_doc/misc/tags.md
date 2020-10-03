---
id: tags
title: What Tags store
sidebar_label: What Tags store
---

When an image gets tag, the tag data will store the data the user tagged, and `NaN` for all the other tags of the question set. For example lets say the user tags an image as follows

``` 
{
    "isSnow":true,
    "isRock":true,
    "somethingElse":"maybeSo"
}
```

And lets say the total number of question is 5, wit the other two being `isWater` and `size`, then in the database and in export the data will be as such

```
{
    "isSnow":true,
    "isRock":true,
    "somethingElse":"maybeSo"
    "isWater":"NaN",
    "size":"NaN"
}
```
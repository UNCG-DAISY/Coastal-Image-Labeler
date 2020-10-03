---
id: qset
title: Question Set 
sidebar_label: Question Set
---

## `/keys/:id`

This is a route that given the question set id will return an array of the keys
```
/api/qset/keys/:id
```
```
https://dev.coastalimagelabeler.science/api/qset/keys/5f4940b703e72c8380a713d2
```
Results in
```json
{
    "success": true,
    "message": "Header keys for question set id = 5f4940b703e72c8380a713d2",
    "data": [
        "water",
        "devType",
        "washoverType",
        "dmgType",
        "impactType",
        "terrianType",
        "additionalComments"
    ]
}
```
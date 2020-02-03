# User Model

The user model will contain PSI related information such as which images they have tagged, number of images tagged, and roles. This user is created whenever they log in for the first time.

==NOTE== it will **not** contain information such as their password as all security is handeled by [Auth0](https://auth0.com/)

## Model definition

```ts
{
    dateAdded:{
        type:Date
    },
    userId:{
        required:[true,'UserId not passed'],
        type:String
    },
    userName: {
        required:[true,'Username not passed'],
        type:String
    },
    imagesTagged: {
        type: [String],
        default: []
    },
    numberOfImagesTagged: {
        type: Number,
        default: 0
    },
    roles:{
        type:[String],
        enum: ['defaultRole', 'taggerRole'],
        default:'defaultRole'
    }
}
```

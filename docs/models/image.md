# Image Model

The image model is the main model that everything revolves around. There is one Image entry(in Mongo its called a document) per image.

## Model definition

```ts
{
   archive:{
        type:String[],
        required: [true,'Please which archives this image is in'],
    },
    compressed: {
        type: Boolean,
        required: [true,'Please tell if compressed or not'],

    },
    dateAdded:{
        type:Date
    },
    finishedTagging: {
        type: Boolean,
        required: [true,'Please tell if compressed or not'],
    },
    location:{
        upperLeft:{
            type:[number]
        },
        upperRight:{
            type:[number]
        },
        lowerLeft:{
            type:[number]
        },
        lowerRight:{
            type:[number]
        }
    },
    id : {
        type: String,
        required: [true,'Please add a name of image with its extension'],
        unique: true,
        trim:true,
        maxlength: [128,'Name can not be longer than 128 characters']
    },
    path : {
        type: String,
        required: [true,'Please provide image path'],
        unique: true,
        maxlength: [128,'Name can not be longer than 128 characters']
    },
    taggable:{
        type: Boolean,
        required: [true,'Please tell if this image is taggable or not'],
    },
    taggedTimes:{
        type: [Date]
    },
    tags: {
        type:[Object]
    },
    tillComplete:{
        type:number,
        required:[true,'Please tell how many times two or more taggers must agree till complete'],
    }
}
```

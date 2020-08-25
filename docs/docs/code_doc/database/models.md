---
id: models
title: Models
sidebar_label: Models
---

A major change in the v3 Dashboard is the structure of the database. More models where added to help with performance and creating queries.

## Terminaology 

I will draw comparisions from MongoDB to SQL terms. Starting from the bottom,

- `Row` in SQL is called a `Document` in MongoDB.
  - For example we have a Document for image `P25959661.jpg`

- `Table` in SQL is called a `Collection` in MongoDB.
  - For example we have a Collection for all images

- `Schema` in SQL is a `Namespace` in MongoDB.
  - For example we have a Namespace called `dev` or one called `production`.

## Models

The following are the TypeScript interfaces for each model. If a key has a `?` next to it means its optional.

### Catalog

The Catalog object is the overarching model that contains the archives which in
turn contains the images. It also contains the questions that are applied to all
images of archives that are part of this catalog. This is the types of the
Catalog.

```js title="Catalog model"
export interface CatalogDocument extends Document {
  dateAdded?: Date
  name: string
  path: {
    original: string
    compressed?: string
  }
  catalogInfo?: CatalogInfo
  taggable: boolean
  questionSet: ObjectID | string
  imageServeOrder: ObjectID
  totalImages?: number

  updateImageCount(): Promise<void> //Function to update totalImages
}
```

#### Archives

These are subfolders of the Catalogs and is originally in place due to how the
NOAA images where downloaded. They serve no other purpose other then to group
images up and serve as a link between Catalogs and Images

```js title="Archive model"
export interface ArchiveDocument extends Document {
  dateAdded?: Date
  name: string
  path: {
    original: string
    compressed?: string
  }
  catalog: ObjectID
  taggable: boolean
  totalImages?: number

  updateImageCount(): Promise<void> //function to update totalImages
}
```

### Images

The Image models most important fields are the `tags`, the `tillComplete` and
`taggable` fields. A major change is the `tillComplete`,`finalTag`,`finishedTagging`,and `tags` fields have been removed

```js title="Image model"
export interface ImageDocument extends Document {
  archive: ObjectID
  dateAdded?: Date
  name: string
  path: {
    original: string
    compressed?: string
  }
  taggable: boolean
}
```

### Question Set

Of the current models, the question set is the only one that is **NOT** checked.
It serves simply as a guideline for admins to use. Due to this nature it is
**HIGHLY** reccomended to make sure the documents for Question Sets are correct
and is best to copy an existing one

```js title="Question Set model"
export interface QuestionSetDocument extends Document {
    name:string,
    description:string,
    questions:[any]
}
```


### Assigned Image

This is one of the newer models. It serves to store the currerntly assigned image of a (user,archive) pair. This model requires that `imageId`,`archiveId`,`userId` be given. The remaining fields are automatically created

```js title="Assigned Image model"
export interface AssingedImageDocument extends Document {
  imageId: ObjectID
  catalogId?: ObjectID
  archiveId?: ObjectID
  userId: ObjectID
  date: Date
  archive?: ArchiveDocument
  catalog?: CatalogDocument
}
```

### Tag

Another new model. This model takes the data from the `tags` field of an image and places each tag as a new entry. This is done for many reasons. Firsty it makes it easy to get a list of images that have been tagged, since every entry is a tag of an image that has been tagged. It also ensures that certain pieces of information are recorded such as `userId` and `imageId`

```js title="Tag model"
export interface TagDocument extends Document {
  imageId: ObjectID
  catalogId?: ObjectID
  archiveId?: ObjectID
  userId: ObjectID
  tags?: any
  date: Date
  ignoreFields?: string[]
  image?: ImageDocument
}
```

### Image Serve Order

The final new model. This model stores data about how to serve images for a catalog. If the order is random there isnt anything to special. However if the order is sequential, then a 2nd field must be filled, called `data`. This will contain the order of the images to serve. For example:

```js
data: {
    "arc1":['image1.jpg','image2.jpg','image3.jpg','image4.jpg']
}
```
If an archive isnt on the list, the system will default to using random order.

```js title="Image Serve Order model"
export interface ImageServeOrderDocument extends Document {
  type: 'random' | 'sequential'
  data?: any
}
```

### User

Finally there is the user model which is more or less the same

```js title="User model"
export interface UserDocument extends Document {
  username: string
  catalogs: [ObjectID]
  dateAdded: Date
  roles: string[]
  userId: string
}
```

## Namespaces

As mentioned before Namespaces are like Schemas in SQL. Generally there are 3, a
dev namespace,a production namespace and test namespace.
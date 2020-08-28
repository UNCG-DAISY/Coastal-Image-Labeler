import { Document, Model } from 'mongoose'
import { ObjectID } from 'mongodb'
import { CatalogInfo } from './index'

export interface UserDocument extends Document {
  username: string
  //assignedImages: Record<string, any>
  catalogs: [ObjectID]
  dateAdded: Date
  //imagesTagged: Record<string, any>
  roles: string[]
  userId: string
  // _id: string
}

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
  imageServeOrder?: {
    type?: 'random' | 'sequential'
    data?: any
  }
  totalImages?: number
  ignoreFields: string[]

  updateImageCount(): Promise<void>
}

export interface CatalogModelType extends Model<CatalogDocument> {
  // here we decalre statics

  updateImageCount?: (catalogId: ObjectID) => Promise<void>
}

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

  updateImageCount(): Promise<void>
}

export interface ArchiveModelType extends Model<ArchiveDocument> {
  // here we decalre statics

  updateImageCount?: (archiveId: ObjectID) => Promise<void>
}

export interface ImageDocument extends Document {
  archive: ObjectID
  dateAdded?: Date
  //finalTag?: ObjectID
  name: string
  path: {
    original: string
    compressed?: string
  }
  taggable: boolean
  // tags?: [Record<string, any>]
  //numberOfTags?: number
  //numberOfMatches: number
  compareTags(
    tags: any,
    ignoreFields: string[]
  ): { numMatch: number; numberOfMatches: number }
}

export interface ImageDocumentType extends Model<ImageDocument> {
  // here we decalre statics

  compareTags?: (
    tags: any,
    ignoreFields: string[]
  ) => { numMatch: number; numberOfMatches: number }
}

export interface AssingedImageDocument extends Document {
  imageId: ObjectID
  catalogId?: ObjectID
  archiveId?: ObjectID
  userId: ObjectID
  date: Date
  archive?: ArchiveDocument
  catalog?: CatalogDocument
}

export interface TagDocument extends Document {
  imageId: ObjectID
  catalogId?: ObjectID
  archiveId?: ObjectID
  userId: ObjectID
  tags?: any
  date: Date
  ignoreFields?: string[]
  //final?: boolean
  image?: ImageDocument
}

// export interface ImageServeOrderDocument extends Document {
//   type: 'random' | 'sequential'
//   data?: any
// }

interface QSetButtonSubmit {
  type: 'butttonSubmit'
  required: boolean
  label: string
  docLink: string
  key: string
  buttons: {
    label: string
    key: string
    tag: any
  }[]
}

interface QSetRadioQuestion {
  type: 'radioGroup'
  errorMessage: string
  required: boolean
  label: string
  docLink: string
  key: string
  buttons: {
    name: string
    value: string
  }[]
}

interface QSetCheckboxQuestion {
  type: 'checkboxGroup'
  errorMessage: string
  required: boolean
  label: string
  docLink: string
  key: string
  min?: number
  max?: number
  buttons: {
    name: string
    value: string
  }[]
}

interface QSetTextboxQuestion {
  type: 'textfield'
  required: boolean
  label: string
  docLink: string
  key: string
  multiline: boolean
  rows: number
}

export type QSetQuestions =
  | QSetButtonSubmit
  | QSetRadioQuestion
  | QSetCheckboxQuestion
  | QSetTextboxQuestion

export interface QuestionSetDocument extends Document {
  name: string
  description: string
  //This type is added for user reference, its not ment to be enforced by ts
  //thats why any[] is added to remove any warnings
  questions: QSetQuestions[] | any[]
}

export type AllDocuments =
  | UserDocument
  | CatalogDocument
  | ArchiveDocument
  | ImageDocument
  | AssingedImageDocument
  | TagDocument
  | QuestionSetDocument

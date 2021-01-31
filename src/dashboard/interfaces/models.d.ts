import { Document, Model } from 'mongoose'
import { ObjectID } from 'mongodb'
import { CatalogInfo } from './index'

export interface UserDocument extends Document {
  userName: string
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
    [id: string]: string
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
  archives?: ArchiveDocument[]

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
    [id: string]: string
  }
  catalog: ObjectID
  taggable: boolean
  totalImages?: number

  // updateImageCount(): Promise<void>
  updateArchiveImageCount(): Promise<void>
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
    [id: string]: string
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
  archive?: ArchiveDocument
}

export interface NotificationDocument extends Document {
  message: string
  dateAdded: Date
}

// export interface ImageServeOrderDocument extends Document {
//   type: 'random' | 'sequential'
//   data?: any
// }

//Not ment to be used, ment as reference
type RadioQuestion = {
  type: 'radioGroup'
  required: boolean
  label: string
  docLink: string
  key: string
  errorMessage: string

  buttons: {
    name: string
    value: string
  }[]
}

type CheckboxQuestion = {
  type: 'checkboxGroup'
  required: boolean
  label: string
  docLink: string
  key: string
  errorMessage: string

  min?: number
  max?: number

  spacing?:
    | {
        lg: number
      }
    | {
        md: number
      }
    | {
        sm: number
      }
    | {
        xs: number
      }

  buttons: {
    name: string
    value: string
  }[]
}

type ButtonSubmitQuestion = {
  type: 'buttomSubmit'
  required: boolean
  label: string
  docLink: string
  key: string
  buttons: {
    label: string
    tag: any
    key: string
  }[]
}

type TextFieldQuestion = {
  type: 'textField'
  required: boolean
  label: string
  docLink: string
  key: string
  multiline: boolean
  rows: number
}

type ScribbleQuestion = {
  type: 'scribble'
  required: boolean
  label: string
  colors: {
    label: string
    color: string
  }[]
  largestAxisMaxSize: number
  initBrushSize: number
  initLazyRadius: number
  docLink: string
  key: string
}

type QuestionSetQuestions =
  | TextFieldQuestion
  | ButtonSubmitQuestion
  | CheckboxQuestion
  | RadioQuestion
  | ScribbleQuestion

export interface QuestionSetDocument extends Document {
  name: string
  description: string
  questions: any[] | QuestionSetQuestions[]
}

export type AllDocuments =
  | UserDocument
  | CatalogDocument
  | ArchiveDocument
  | ImageDocument
  | AssingedImageDocument
  | TagDocument
  | QuestionSetDocument

import { Response } from 'express'
//For some reason even though UserDocument is used, eslint thinks its not.
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  AllDocuments,
  CatalogDocument,
  UserDocument,
  ArchiveDocument,
  QuestionSetDocument,
  ImageDocument,
  TagDocument,
} from './models'
import { ObjectID } from 'mongodb'

declare namespace cilDashboard {
  export interface ResponseType {
    success: boolean
    message: string
    data?: any
  }

  export interface ResumeTaggingDataArchive {
    _id: ObjectID
    tagged: number
    name: string
    totalImages: number
  }
  export interface ResumeTaggingDataCatalog {
    catalogInfo: CatalogInfo
    totalImages: number
    name: string
    catalogId: ObjectID
    tagged: number
    archives: ResumeTaggingDataArchive[]
  }

  export interface CatalogInfo {
    year: number
    link: string
    description: string
  }

  export interface CatalogSelectionData {
    name: string
    _id: string
    catalogInfo: CatalogInfo
    totalImages: number
    archives: {
      name: string
      totalImages: number
      _id: string
    }[]
  }

  export interface UserProp {
    displayName: string
    id: string
    user_id: string
    provider: string
    picture: string
    nickname: string
    _json: {
      sub: string
      given_name: string
      family_name: string
      nickname: string
      name: string
      picture: string
      locale: string
      updated_at: string
      email: string
      email_verified: boolean
    }
    data?: UserDocument
  }

  export interface ResPartOfCatalog extends AdvResultsRes {
    partOfCatalog: boolean
  }

  export interface ExtenedResponse extends Response {
    advancedResults?: {
      success: boolean
      count: number
      message: string
      pagination: {
        page: number
        limit: number
      }
      data: AllDocuments[]
    }
    partOfCatalog?: boolean
    archive?: ArchiveDocument
    catalog?: CatalogDocument
    questionSet?: QuestionSetDocument
    assignedImage?: ImageDocument
    membershipCatalog?: boolean
    newTag?: TagDocument
    taggedCount?: AssignedImageTagAggregate[]
  }

  export interface AssignedImageTagAggregateArchive {
    tagged?: number
    name?: string
    totalImages?: number
    _id?: string
  }
  export interface AssignedImageTagAggregate {
    catalogInfo?: cilDashboard.CatalogInfo
    totalImages?: number
    name?: string
    catalogId?: any
    archives?: AssignedImageTagAggregateArchive[]
    tagged?: any[]
  }
}

declare global {
  namespace Express {
    interface User {
      displayName: string
      id: string
      user_id: string
      provider: string
      picture: string
      nickname: string
      _json?: {
        sub: string
        given_name: string
        family_name: string
        nickname: string
        name: string
        picture: string
        locale: string
        updated_at: string
        email: string
        email_verified: boolean
      }
      /* eslint-disable @typescript-eslint/no-unused-vars */
      data?: UserDocument
    }
  }
}

declare module 'node-mocks-http' {
  export type MockResponse<T extends Response> = T & {
    _isEndCalled: () => boolean
    _getHeaders: () => Headers
    _getData: () => any
    _getJSONData: () => cilDashboard.ResponseType
    _getBuffer: () => Buffer
    _getLocals: () => any
    _getStatusCode: () => number
    _getStatusMessage: () => string
    _isJSON: () => boolean
    _isUTF8: () => boolean
    _isDataLengthValid: () => boolean
    _getRedirectUrl: () => string
    _getRenderData: () => any
    _getRenderView: () => string

    cookies: { [name: string]: ResponseCookie }

    archive?: cilDashboard.ArchiveDocument
    catalog?: cilDashboard.CatalogDocument
    newTag?: cilDashboard.TagDocument
    assignedImage?: cilDashboard.ImageDocument
    questionSet?: cilDashboard.QuestionSetDocument
    membershipCatalog?: boolean
    taggedCount?: cilDashboard.AssignedImageTagAggregate[]
    advancedResults?: {
      success: boolean
      count: number
      message: string
      pagination: {
        page: number
        limit: number
      }
      data: AllDocuments[]
    }
  }
}

export = cilDashboard

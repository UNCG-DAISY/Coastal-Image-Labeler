/*
  This file contains all the typing of all possible values used in this project.
*/

import { Document,Types} from 'mongoose'
import express from 'express';

declare namespace psiDashboard  {

  export interface TagDataDocument extends Document {
        taggerId:string,
        tag:{
            developmentType :'developed'|'undeveloped'
            washoverType:'washover'|'nowashover'
            impactType:'n/a'|'swash'|'collision'|'overwash'|'inundation'
            terrianType:['river','marsh','sandyCoastline']
        },
        timeOfTag:Date
    }

  export interface ImageDocument extends Document {
      archive:Types.ObjectId,
      compressed?:boolean,
      dateAdded?:Date,
      finishedTagging: boolean,
      location?:{
          upperLeft:[number],
          upperRight:[number],
          lowerLeft:[number],
          lowerRight:[number]
      },
      id :string,
      path : string,
      taggable:boolean,
      taggedTimes?:[Date],
      tags?:[Object],
      tillComplete:number
  }

  export interface UserDocument extends Document {
    storms:[Types.ObjectId]
    dateAdded: number;
    userId:string,
    userName: string,
    imagesTagged?: [string]
    //numberOfImagesTagged?: number
    role:[Types.ObjectId]
    roleData?:[any]
    roleNames?:string[]
    //storm:[Types.ObjectId]
  }

  export interface ArchiveDocument extends Document {
    dateAdded?:Date,
    name : String,
    path : String,
    role: [Types.ObjectId],
    storm:Types.ObjectId,
    taggable: Boolean
  }

  export interface RoleDocument extends Document {
    name:String
  }

  export interface StormDocument extends Document {
    archives: any,
    dateAdded?:Date,
    name : String,
    path : String,
    taggable:Boolean
  }

  type allDocuments = 
    TagDataDocument | 
    ImageDocument | 
    UserDocument |
    ArchiveDocument |
    RoleDocument |
    StormDocument 

  type rbacJson = {
    all:string[] | undefined[],
    one:any[] | undefined[]
  }

  //type id = { _id:string} | {userId:string}
}



//So that we can access user in req.user.xxx
declare module 'express' {
  export interface Request {
      user?: any;
  }
}

//Global variables
declare global {
  namespace Express {
      export interface Response {
          advancedResults: any;
      }
  }
  namespace NodeJS {
    interface Global {
       document: Document;
       window: Window;
       navigator: Navigator;
       MANGAGEMENT_TOKEN:string
    } 
  }
}

export = psiDashboard
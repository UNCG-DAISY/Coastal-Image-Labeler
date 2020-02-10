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
      archive:string,
      compressed:boolean,
      dateAdded:Date,
      finishedTagging: boolean,
      location:{
          upperLeft:[number],
          upperRight:[number],
          lowerLeft:[number],
          lowerRight:[number]
      },
      id :string,
      path : string,
      taggable:boolean,
      taggedTimes:[Date],
      tags:[Object],
      tillComplete:number
  }

  export interface UserDocument extends Document {
    dateAdded: number;
    userId:string,
    userName: string,
    imagesTagged?: [string]
    //numberOfImagesTagged?: number
    roles:[string]
    roleData?:[any]
    roleNames?:[string]
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
    archives: [Types.ObjectId],
    dateAdded?:Date,
    name : String,
    path : String,
    taggable:Boolean
  }
}

//So that we can access user in req.user.xxx
declare module 'express' {
  export interface Request {
      user?: any;
  }
}

//Global variables
declare global {
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
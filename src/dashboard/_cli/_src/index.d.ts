/*
  This file contains all the typing of all possible values used in this project.
*/

import { Document,Types} from 'mongoose'
import express from 'express';

declare namespace psiDashboard  {
  export interface ImageDocument extends Document {
      archive:Types.ObjectId,
      compressed?:boolean,
      dateAdded?:Date,
      finalTag?:Object,
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

  export interface ArchiveDocument extends Document {
    dateAdded?:Date,
    name : String,
    path : String,
    role: [Types.ObjectId],
    storm:Types.ObjectId,
    taggable: Boolean,
    allImages?:any
  }


  export interface StormDocument extends Document {
    archives: any,
    dateAdded?:Date,
    name : String,
    path : String,
    taggable:Boolean
  }
  //type id = { _id:string} | {userId:string}
}


export = psiDashboard
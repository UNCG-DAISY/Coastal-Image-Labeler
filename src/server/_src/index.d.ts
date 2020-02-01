import { Document,Types} from 'mongoose'
import express from 'express';

declare namespace psiDashboard  {
    export interface ImageTag extends Document {
        taggerId:String,
        tag:{
            developmentType :'developed'|'undeveloped'
            washoverType:'washover'|'nowashover'
            impactType:'n/a'|'swash'|'collision'|'overwash'|'inundation'
            terrianType:['river','marsh','sandyCoastline']
        },
        timeOfTag:Date
    }
}

//So that we can access user in req.user.xxx
declare module 'express' {
  export interface Request {
    user?: any;
  }
}

export = psiDashboard
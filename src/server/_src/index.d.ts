import { Document,Types} from 'mongoose'

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

export = psiDashboard
import { Request,Response,NextFunction } from "express"
import {allDocuments} from '../../index'
import { DocumentQuery,Model } from "mongoose"


const advancedResults = (model: Model<allDocuments>, populate:string | any) => 
async (req: Request, res: Response, next: NextFunction) => {
    let query:DocumentQuery<allDocuments[], allDocuments, {}>;

    //Copy req.query
    const reqQuery = {...req?.query}

    //Fields to exclude for filtering
    const removeFields = [
        'select',
        'sort',
        'page',
        'limit'
    ]

    //Loop over removeFields and delete them from request querry
    removeFields.forEach(param => delete reqQuery[param])

    // Create operators like %gt,$gte, etc
    let queryString:string = JSON.stringify(reqQuery)
    queryString = queryString.replace(/\b(gt|gte|lt|lte|in)\b/g,match => `$${match}`)

    //Finding resource 
    query = model.find(JSON.parse(queryString))

    // Select fields
    if(req?.query?.select) {
        const fields = req.query.select.split(',').join(' ')
        query = query.select(fields)
    }

    //Sort
    if(req?.query?.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        query = query.sort(sortBy)
    } else {
        //Default sort by date
        query = query.sort('-dateAdded')
    }
    
    //Pagination 
    const page:number = parseInt(req.query.page ?? 1,10) 
    const limit:number = parseInt(req.query.limit ?? 15,10) 
    const startIndex:number = (page - 1) * limit
    const endIndex:number = page*limit
    const totalDocs:number = await model.countDocuments()

    query = query.skip(startIndex).limit(limit)

    if(populate) {
        query = query.populate(populate)
    }

    //Executing query
    const query_result = await query

    //Pagination result
    const pagination:any = {}

    //Show next page
    if(endIndex < totalDocs) {
        pagination.next = {
            page:page+1,
            limit
        }
    }

    //Show prev page
    if(startIndex > 0) {
        pagination.prev ={
            page:page-1,
            limit
        }
    }

    res.advancedResults = {
        success:true,
        count:query_result.length,
        pagination,
        data:query_result
    }

    next()

}


export {
    advancedResults
}
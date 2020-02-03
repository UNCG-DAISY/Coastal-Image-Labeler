import { Request,Response,NextFunction } from "express"
import {asyncHandler} from '../middleware/async' //to avoid putting try catch everywhere
import {ImageTagModel} from '../models/Tag'
import axios from 'axios'

/**
 * @desc        Test tag image
 * @route       GET /api/v1/images/tag
 * @access      Public
 * @returns     yes
 */
const tagImage = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
    const image_entry = await ImageTagModel.create(req.body)
    //Send data back
    res.status(201).json({
        success:true,
        data:image_entry
    })
})

const test = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
    if(!req.user) {
        res.redirect("/")
    }

    //Send data back
    res.status(201).json({
        success:true,
        data:{
            num:Math.random(),
            date:Date(),
            user:req?.user?.id
        }
    })
})


const getRoleTest = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    
    const testid2 = req.body.id//'google-oauth2|100613204270669384478'//req.body//'google-oauth2|100613204270669384478'
  
    const options2:any = {
        method: 'GET',
        url: `https://${process.env.AUTH0_DOMAIN}/api/v2/users/${testid2}/roles`,
        headers:{
            authorization: `Bearer ${global.MANGAGEMENT_TOKEN}`
        }
    };

  
    const role_data = (await axios.get(options2.url,options2)).data
    
    let roles = []

    role_data.forEach(role => {
        roles.push({role:role.name,role_description:role.description})
    });

    res.status(200).json({
        success:true,
        data:{
           roles:roles
        }
    })
   
})


export {
    tagImage,
    test,
    getRoleTest
}
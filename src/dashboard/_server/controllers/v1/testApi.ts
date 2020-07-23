import {asyncHandler} from '../../middleware/v1/async'
import {ErrorResponse} from '../../utils/v1/errorResponse'
import { Request,Response,NextFunction } from "express"
import _ from 'lodash'
let cards = [
    { _id: 123, message: "I love pepperoni pizza!", author: "unknown1" },
    { _id: 123, message: "I love pizza!", author: "unknown2" },
    { _id: 123, message: "I pepperoni pizza!", author: "unknown3" },
    { _id: 123, message: "I love pepperoni ", author: "unknown4" },
    { _id: 123, message: "I pepperoni pizza!", author: "unknown5" },
    { _id: 123, message: "I", author: "unknown6" },
    { _id: 456, message: "I'm watching Netflix.", author: "unknownX2" }
];

/**
 * @desc        Gets all roles of a user
 * @route       GET /api/v1/user/isUser
 * @access      Public
 * @returns     yes
 */
const testGet = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    console.log('TEST GET')
    res.status(200).json({
        success:true,
        message: `Test get done at ${Date.now()} with user ${req.user.id}`,
        data:{
          
           cards
        }
    })
})

const testPost = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const keys = Object.keys(req.body)
    console.log('POST',req.isAuthenticated())
    console.log('USER',req.user.displayName)

    const { message } = req.body;
    const newCard = {
        _id: new Date().getTime(),
        message,
        author: "unknown"
      };
    cards.push(newCard);
    
    res.status(200).json({
        success:true,
        message: `Test POST, keys are ${keys} at time ${Date.now()}`
    })
})

const testLodash = asyncHandler(async (req: Request, res: Response, next: NextFunction) => {
    const simple1 = {
        a:'1',
        b:'2'
    }
    const simple2 = {
        b:"2",
        a:"1"
    }
    const simple3 = {
        c:'1'
    }
    console.log('SIMPLE')
    console.log('String compare',JSON.stringify(simple1) === JSON.stringify(simple2))
    console.log('Lodash compare',_.isEqual(simple1,simple2))
    console.log('Lodash compare',_.isEqual(simple1,simple3))
    const tag1 = {
        "tags": {
            "devType": "1",
            "washoverType": "1",
            "damageType": "1",
            "impactType": {
                "swash": true,
                "collision": false,
                "overwash": false,
                "inundation": false
            },
            "terrianType": {
                "sandyCoastline": false,
                "marsh": false,
                "inland": false,
                "river": true
            },
            "water": 0,
            "comments": ""
        },
    }

    const tag2 = {
        "tags": {
            "impactType": {
                "overwash": false,
                "inundation": false,
                "swash": true,
                "collision": false,
               
            },
            "terrianType": {
                "sandyCoastline": false,
                "river": true,
                "marsh": false,
                "inland": false,
            },
            "water": 0,
            "comments": "",
            "devType": "1",
            "washoverType": "1",
            "damageType": "1"
        },
    }

    delete tag1["tags"]["comments"]
    delete tag2["tags"]["comments"]
    console.log('COMPLEX')
    console.log('String compare',JSON.stringify(tag1) === JSON.stringify(tag2))
    console.log('Lodash compare',_.isEqual(tag1,tag2))
    
    res.status(200).json({
        success:true,
        data:{
            stringify:{
                comp1:JSON.stringify(simple1) === JSON.stringify(simple2),
                comp2:JSON.stringify(tag1) === JSON.stringify(tag2)
            },
            loadash:{
                comp1:_.isEqual(simple1,simple2),
                comp2:_.isEqual(tag1,tag2),
                comp3:_.isEqual(simple1,simple3)
            },
            true:{
                comp1:true,
                comp2:true,
                comp3:false
            }
        }
    })
})

export {
    testGet,
    testPost,
    testLodash
}
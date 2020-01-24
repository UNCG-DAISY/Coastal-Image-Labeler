//This is a test typescript file to test typescript

//Test enviroment
import dotenv from 'dotenv'

// Load env vars
dotenv.config({  
    path: './_config/config.env'
});

console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`) 

//Test nullish coalescing
const x = 0 ?? 1
console.log(x)

//Test Elvis operator
const random_num = Math.random()

let test_json: any = {
    a:{
        value:5
    }
}

if(random_num >0.9) {
    test_json.a.b = 1
}
console.log(test_json.a,test_json.a.b)


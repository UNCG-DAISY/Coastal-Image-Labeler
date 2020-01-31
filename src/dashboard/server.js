const express = require('express')
const next = require('next')
const  dotenv = require('dotenv')
const  morgan = require('morgan')
const  colors = require('colors')

dotenv.config({  
    path: './_config/config.env'
});

const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()
const PORT = process.env.PORT || 5001;

app.prepare()
.then(() => {
    const server = express()
    //server.use(morgan('dev'))
    server.get('*', (req, res) => {
        return handle(req, res)
    })

    server.listen(PORT, (err) => {
        if (err) throw err
        console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)  
    })

    //Handle unhandled promise rejections
    process.on('unhandledRejection', (err,promise) => {

        console.log(`Error: ${err.message || 'undefined error'}`.red)
        
        //Exit server on fail
        server.close(() => {
            process.exit(1)
        })
    })
})
.catch((ex) => {
    console.error(ex.stack)
    process.exit(1)
})


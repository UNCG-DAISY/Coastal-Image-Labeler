
import colors from 'colors'
colors
import {
    logger,
    expressLogger
} from './logger'

const colorize = {
    error(input) {
        console.log(input.red)
        logger.error(input)
    },
    success(input){
        console.log(input.green)
        logger.info(input)
    },
    warning(input){
        console.log(input.yellow)
        logger.warn(input)
    },
    info(input){
        console.log(input.cyan)
        logger.info(input)
    },
    log(input){
        console.log(input.grey)
        logger.info(input)
    },
    
}

export default colorize;
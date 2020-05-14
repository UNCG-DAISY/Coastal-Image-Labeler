
import colors from 'colors'
colors
import inquirer from 'inquirer'
import UriManager from '../lib/UriManager'
import {isRequired} from '../utils/validation'

const mongoURI = {
    async set() {
        const uriManager = new UriManager();
        const input = await inquirer.prompt([
            {
                type:'input',
                name:'mongoURI',
                message: 'Enter MongoDB Cloud URI'.green,
                validate: isRequired
            }
        ])

        const uri = uriManager.setKey(input.mongoURI)

        if(uri) {
            console.log('MongoURI set'.blue)
        }

    },
    show() {
        try {
            const uriManager = new UriManager();
            const uri = uriManager.getKey()
            console.log(`Current MongoURI ${uri.yellow}`)      
        } catch (error) {
            console.error(error.message.red)
        }
    },
    remove() {
        try {
            const uriManager = new UriManager();
            uriManager.deleteKey()

            console.log(`Deleted MongoURI key`.blue)      
        } catch (error) {
            console.error(error.message.red)
        }
    }

}

export default mongoURI;
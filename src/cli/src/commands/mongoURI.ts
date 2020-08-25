import colors from 'colors'
colors
import inquirer from 'inquirer'
import UriManager from '../lib/UriManager'
import { isRequired } from '../utils/validation'
import MongoConnection from '../lib/MongoConnection'

const mongoURI = {
  async set() {
    //Use the mangager to set the key
    const uriManager = new UriManager()
    //ask the user a series of questions
    const input = await inquirer.prompt([
      {
        type: 'input',
        name: 'mongoURI',
        message: 'Enter MongoDB Cloud URI'.green,
        validate: isRequired,
      },
    ])

    //Store the key
    const uri = uriManager.setKey(input.mongoURI)

    if (uri) {
      console.log('MongoURI set'.blue)
    }
  },
  show() {
    try {
      //Use manager to get current key
      const uriManager = new UriManager()
      const uri = uriManager.getKey()
      console.log(`Current MongoURI ${uri.yellow}`)
    } catch (error) {
      //if an error
      console.error(error.message.red)
    }
  },
  remove() {
    try {
      //Use manager to delete current key
      const uriManager = new UriManager()
      uriManager.deleteKey()
      console.log(`Deleted MongoURI key`.blue)
    } catch (error) {
      console.error(error.message.red)
    }
  },
  async test() {
    const uriManager = new UriManager()
    const mongoConnection = new MongoConnection(uriManager.getKey())
    await mongoConnection.connect()

    await mongoConnection.close()
  },
}

export default mongoURI

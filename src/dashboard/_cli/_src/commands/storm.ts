
import colors from 'colors'
colors
import inquirer from 'inquirer'
import {isRequired,yesNoOnly,translateYesNoToBool} from '../utils/validation'
import {getDirectories} from '../utils/file'

const storm = {
    async addStorms(path,options) {
        const dirs = getDirectories(path)
        console.log(`Directories are ${dirs}`.blue)

        const yesNoAns = [];
        for(let i =0; i<dirs.length;i++)
        {   
            const element =dirs[i];
            if(!options.all) {
                const input = await inquirer.prompt([
                    {
                        type:'input',
                        name:'shouldAdd',
                        message: `Do you want to add ${element}? (y/n)`.green,
                        validate: yesNoOnly
                    }
                ])
                yesNoAns.push({
                    storm:element,
                    input:translateYesNoToBool(input.shouldAdd)
                })
            } else {
                yesNoAns.push({
                    storm:element,
                    input:true
                })
            }        
        }
        console.log(yesNoAns) 
    }
}

export default storm;
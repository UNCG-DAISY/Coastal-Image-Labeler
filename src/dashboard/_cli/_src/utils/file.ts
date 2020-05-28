const { readdirSync } = require('fs')
const path = require('path')

const getDirectories = (source:string) =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    // .split(',')

const getFiles = (source:string,fileType?:string ) => 
    readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isFile())
    .filter(file => {

        if(fileType) {
            return path.extname(file.name).toLowerCase() === fileType.toLowerCase()
        } else {
            return true
        }
    })
    .map(dirent => dirent.name)
     
    
export {
    getDirectories,
    getFiles
}
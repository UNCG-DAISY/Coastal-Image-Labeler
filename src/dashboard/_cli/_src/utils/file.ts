const { readdirSync } = require('fs')

const getDirectories = (source:string) =>
  readdirSync(source, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    // .split(',')

const getFiles = (source:string) => 
        readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isFile())
        .map(dirent => dirent.name)
     
    
export {
    getDirectories,
    getFiles
}
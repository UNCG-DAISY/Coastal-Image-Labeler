const { readdirSync } = require('fs')
const path = require('path')

const getDirectories = (source: string) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name)
// .split(',')

const getFiles = (source: string, fileTypes?: [string]) =>
  readdirSync(source, { withFileTypes: true })
    .filter((dirent) => dirent.isFile())
    .filter((file) => {
      if (fileTypes) {
        return fileTypes.includes(path.extname(file.name).toLowerCase())
      } else {
        return true
      }
    })
    .map((dirent) => dirent.name)

export { getDirectories, getFiles }

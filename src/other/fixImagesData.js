const fs = require('fs')

const images = JSON.parse(
    fs.readFileSync(`${__dirname}/data/test/images.json`,'utf-8')
)

images.forEach(element => {
    element._id = element._id["$oid"] || element._id
    element.archive = element.archive["$oid"] || element.archive
    element.dateAdded = element.dateAdded["$date"] || element.dateAdded
});

fs.writeFileSync(`${__dirname}/data/test/images2.json`,JSON.stringify(images))
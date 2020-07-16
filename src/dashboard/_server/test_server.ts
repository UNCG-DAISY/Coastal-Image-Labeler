import {connectDB} from './db'
import dotenv from 'dotenv'
import {UserModel} from './models/User'
import {CatalogModel} from './models/Catalog'
import {ArchiveModel} from './models/Archive'
import {ImageModel} from './models/Image'
import fs from 'fs';

dotenv.config({  
  path: './_config/config.env'
});

async function main() {
  connectDB()

  const users =await UserModel.find()

  users.forEach(async user => {
      const {
        userName
      } = user

      if(Array.isArray(user.imagesTagged)) { // userName === 'Shah Nafis Rafique'
        //console.log(user.imagesTagged.length)
        const imagesTagged = user.imagesTagged
        let newImagesTagged = {}
        let counter = 0;

        //@ts-ignore
        await Promise.all(imagesTagged.map(async (imageId,index) =>{

          //Get the image
          const getImage = await ImageModel.findById(imageId)
          if(!getImage) {return;}
          
          //Get the archive of the image
          const getArchive = await ArchiveModel.findById(getImage.archive)
          if(!getArchive) {return;}
          
          //Get the catalog of the archive
          const getCatalog = await CatalogModel.findById(getArchive.catalog)
          if(!getCatalog) {return;}
  
          const catalogName:any = getCatalog.name
          const archiveName:any = getArchive.name
  
          //if no entry for this catalog has been made
          if(!newImagesTagged[catalogName]) {
            newImagesTagged[catalogName] = {}
          }
  
          //if no entry for this archive has been made
          if(!newImagesTagged[catalogName][archiveName]) {
            newImagesTagged[catalogName][archiveName] = []
          }
  
          newImagesTagged[catalogName][archiveName].push(imageId) 
          counter++;
        }))

        //console.log(Object.keys(newImagesTagged))

        //@ts-ignore
        console.log(counter,imagesTagged.length)
        //fs.writeFileSync('C:/Users/Skool/Desktop/test.json', JSON.stringify(newImagesTagged));

        const newUser = await UserModel.findOneAndUpdate(
          {_id:user._id},
          {imagesTagged:newImagesTagged},
          {
              runValidators:true,
              new:true
          }
        )

        //console.log(Object.keys(newUser.imagesTagged))
        //console.log()
      }

      console.log(`${userName} done`)
  });

  console.log('DONE')

}
main()
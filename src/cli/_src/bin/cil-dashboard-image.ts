import program from 'commander'
import colorize from '../utils/colorize'
import archive from '../commands/archive'
import {CatalogModel} from '../models/Catalog'
import {ArchiveModel} from '../models/Archive'
import {ImageModel} from '../models/Image'
import UriManager from '../lib/UriManager'
import MongoConnection from '../lib/MongoConnection'
import {compressImage} from '../lib/compressImage'
import {getDirectories,getFiles} from '../utils/file'
program
    .command('compress')
    .description('Compress all images of the following catalogs/archive')
    .option('-C, --catalogId <type>','ID of catalog to compress images for',undefined)
    .option('-A, --archiveId <type>','ID of archive to compress images for',undefined)
    .option('-a, --all','all catalogs',undefined)
    .option('-o, --out <type>','outpath ',undefined)
    .action(async (cmd) => {
        const {
            catalogId,
            archiveId,
            all,
            out
        } = cmd
        console.log(out)
        if(!out) {
            return colorize.error('Need out path')
        }

        //connect to db
        const startTime = Date.now()
        const uriManager = new UriManager();
        const mongoConnection = new MongoConnection(uriManager.getKey())
        await mongoConnection.connect()     

        let counter = 0;
        if(all) {
           
            const catalogs = await CatalogModel.find({})
            //for each catalog
            for(let i = 0; i<catalogs.length;i++) {
                const catalog = catalogs[i]
                const archives = await ArchiveModel.find({catalog:catalog._id})
                
                //for each archive
                for(let j = 0;j<archives.length;j++) {
                    const archive = archives[j]
                    const images = await ImageModel.find({archive:archive._id})
                    const archivePath = `${catalog.path}${archive.path}`

                    for(let k=0;k<images.length;k++) {
                        const image = images[k]
                        //console.log(image)
                        await compressImage({
                            inputPath:`${archivePath}${image.path}`,
                            outputPath:out,
                            imageName:image.fileName
                        })
                        counter++
                        
                    }
                }
            }

          
            
        } 

        // if(archiveId) {
        //     return
        // }
        // if(catalogId) {
        //     return

        // }

        const endTime = Date.now()
        const elapsed = endTime-startTime
        console.log(startTime,endTime,elapsed)
        console.log(`seconds elapsed = ${Math.floor(elapsed / 1000)}`);
        console.log(counter)
        await mongoConnection.close()

        //colorize.error('Either pass in CatalogId or ArchiveId, or both (arhciveID will be used)')
    })

program.parse(process.argv)
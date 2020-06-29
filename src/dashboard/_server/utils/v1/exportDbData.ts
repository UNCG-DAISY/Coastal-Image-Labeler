import schedule  from 'node-schedule';
import moment from 'moment';
import fs from 'fs';

import {UserModel} from '../../models/User'
import {ImageModel} from '../../models/Image'
import {ArchiveModel} from '../../models/Archive'
import {CatalogModel} from '../../models/Catalog'
import {QuestionSetModel} from '../../models/QuestionSet'

function startCronJob(time) {
    let dailyExportJob = schedule.scheduleJob(time, async function(){
        
        const exportTimeName = moment().format('MM-DD-YYYY-T-hh-mm-ss').toString();
        console.log(`Exporting data at time = ${exportTimeName}`)
        const exportFolderRoot = process.env.DAILY_BACKUP_FOLDER;
        const exportFolder = `${exportFolderRoot}/${exportTimeName}`;

        if (!fs.existsSync(exportFolder)){
            fs.mkdirSync(exportFolder);
        }

        const users = await UserModel.find()
        const images = await ImageModel.find()
        const archives = await ArchiveModel.find()
        const catalogs = await CatalogModel.find()
        const questionSets = await QuestionSetModel.find()

        console.log("Got data")
        const exportList =[
            {
                name:"users.json",
                data:users
            },
            {
                name:"images.json",
                data:images
            },
            {
                name:"archives.json",
                data:archives
            },
            {
                name:"catalogs.json",
                data:catalogs
            },
            {
                name:"questionSets.json",
                data:questionSets
            },

        ]

        exportList.forEach(info => {
            let outputPath = `${exportFolder}/${exportTimeName}_${info.name}`;
            fs.writeFileSync(outputPath, JSON.stringify(info.data));
            console.log(`Exported to ${outputPath}`)
        });
        

    });
    console.log(`CRON job for daily export set at ${time}`)
}

export {
    startCronJob
}
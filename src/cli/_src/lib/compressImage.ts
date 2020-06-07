import compress_images from 'compress-images'
import fs from 'fs'
import colorize from '../utils/colorize'

function compressImage(options) {
    const {
        inputPath,
        outputPath,
        imageName
    } = options


    return new Promise(resolve =>{
        colorize.log(`Compressing ${imageName}`)
        //console.log(inputPath,outputPath,imageName)
        compress_images(
            inputPath,//`${catalogDoc.path}/${archiveDoc.path}/${imageName}`, 
            outputPath,//`${file.compressedFolder}/${catalogDoc.name}/${archiveDoc.path}/${imageName}`, 
            {
                compress_force: false, 
                statistic: true, 
                autoupdate: true
            }, 
            false,
            {jpg: {engine: 'mozjpeg', command: ['-quality', '60']}},
            {png: {engine: 'webp', command: ['-q', '60']}},
            {svg: {engine: 'svgo', command: '--multipass'}},
            {gif: {engine: 'gifsicle', command: ['--colors', '64', '--use-col=web']}}, 
            function(error, completed, statistic){   
                if(completed){
                    // console.log('C',completed,error)
                   resolve(imageName)
                }                         
            }
        );
        // console.log('B')
    })

}

export {
    compressImage
}
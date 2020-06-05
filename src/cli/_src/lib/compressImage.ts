import compress_images from 'compress-images'
import fs from 'fs'
import colorize from '../utils/colorize'

async function compressImage(options) {
    const {
        inputPath,
        imageName,
        outputPath
    } = options

    if(!inputPath && !outputPath) { return colorize.error(`Both paths must be given`)}

    //check if exits
    try {
        if(fs.existsSync(`${outputPath}/${imageName}`)) {
            return colorize.error(`Image already compressed`)
        }
    } catch(error) {
        colorize.log(error)
    }
    //colorize.log(`Compressing image ${imageName}`)
    compress_images(
        inputPath, 
        outputPath, 
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
        }
    );

}

export {
    compressImage
}
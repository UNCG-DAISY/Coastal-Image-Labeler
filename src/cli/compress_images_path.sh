#!/bin/bash
#mesaure time
start=`date +%s`
catalog_to_compress=Michael

root_folder=/datadrive/archives/$catalog_to_compress;
compressed_folder=/datadrive2/compressed/archives/$catalog_to_compress;

# Make the path
[ ! -d $compressed_folder ] && mkdir $compressed_folder

for archive in $root_folder/*; do 
    
    if [ -d "$archive" ]; then
        echo $archive
        archiveName=$(basename "$archive") 
        archivePath=$archive/jpgs/*.jpg
        archivePathCompressed=$compressed_folder/$archiveName/jpgs

        for image in $archivePath; do
            imageName=$(basename "$image") 
            echo $image
            echo $archivePathCompressed/$imageName

            #jpegoptim -m40 -d $archivePathCompressed/$imageName -p $image
        done
    fi

    
   #[ ! -d $compressed_folder/$archivePath ] && mkdir $compressed_folder/$archivePath
    
    # for imagePath in $root_folder/$archivePath/jpgs/*.jpg; do 
    #     imageName=$(basename "$imagePath") 
    #     # echo $imagePath
    #     # echo $compressed_folder/$archivePath/jpgs/$imageName
    #     # echo
    #     echo $root_folder/$archivePath/jpgs/*.jpg
    #     ##[ ! -d $compressed_folder/$archivePath/jpgs ] && mkdir $compressed_folder/$archivePath/jpgs
    #     #jpegoptim -m40 -d $compressed_folder/$archivePath/jpgs/$imageName -p $imagePath
    # done
done


end=`date +%s`
runtime=$((end-start))
echo $runtime
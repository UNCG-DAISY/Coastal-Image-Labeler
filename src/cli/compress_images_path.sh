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

        archivePathCompressed=$compressed_folder/$archiveName
        [ ! -d $archivePathCompressed ] && mkdir $archivePathCompressed
        archivePathCompressed=$compressed_folder/$archiveName/jpgs
        [ ! -d $archivePathCompressed ] && mkdir $archivePathCompressed
        
        
        for image in $archivePath; do
            imageName=$(basename "$image") 
            # echo $image
            # echo $archivePathCompressed/$imageName

            source_path=$image;
            dest_path=$archivePathCompressed;

            echo $source_path
            echo $dest_path


            jpegoptim -m40 -d $dest_path -p $source_path
        done
    fi

done


end=`date +%s`
runtime=$((end-start))
echo $runtime
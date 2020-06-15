#!/bin/bash
#mesaure time
start=`date +%s`

root_folder=/datadrive/archives;
compressed_folder=/datadrive/compressed/archives;

# Make the path
[ ! -d $compressed_folder ] && mkdir $compressed_folder


for dir in $root_folder/*; do
    # Will not run if no directories are available 
    if [ -d "$dir" ]; then
        
        catalogName=$(basename "$dir")
        catalogCompressedPath=$compressed_folder/$catalogName;
        catalogOriginalPath=$root_folder/$catalogName;

        # Make the path for compressed
        [ ! -d $catalogCompressedPath ] && mkdir $catalogCompressedPath

        # For each archive in the catalogs original path
        for archive in $catalogOriginalPath/*; do

            # Will not run if no directories are available 
            if [ -d "$archive" ]; then
                
                
                archiveName=$(basename "$archive")
                archiveCompressedPath=$catalogCompressedPath/$archiveName
                archiveOriginalPath=$catalogOriginalPath/$archiveName/jpgs

                #echo $archiveName

                #Make the paths for compressed archives
                [ ! -d $archiveCompressedPath ] && mkdir $archiveCompressedPath

                #add /jpg
                archiveCompressedPath=$archiveCompressedPath/jpgs;
                [ ! -d $archiveCompressedPath ] && mkdir $archiveCompressedPath
                

                for image in $archiveOriginalPath/*.jpg; do

                    imageName=$(basename "$image") 
                    # echo $archiveOriginalPath/$imageName
                    # echo $archiveCompressedPath/$imageName
                    jpegoptim -m40 -d $archiveCompressedPath -p $archiveOriginalPath/$imageName
                done

            fi
        done
    fi
done

end=`date +%s`
runtime=$((end-start))
echo $runtime
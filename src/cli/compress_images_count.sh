#!/bin/bash
#mesaure time
start=`date +%s`

root_folder=/datadrive/archives;
compressed_folder=/datadrive2/compressed/archives;

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

        imageCount=0
        # For each archive in the catalogs original path
        for archive in $catalogOriginalPath/*; do
            imageArchiveCount=0
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
                
                #echo $archiveCompressedPath
                for image in $archiveCompressedPath/*.jpg; do

                    imageName=$(basename "$image") 
                    imageCount=$(( $imageCount + 1 ))
                    imageArchiveCount=$(( $imageArchiveCount + 1 ))
                done

                echo $archiveName = $imageArchiveCount

            fi
        done

        echo $catalogName = $imageCount
    fi
done

end=`date +%s`
runtime=$((end-start))
echo $runtime
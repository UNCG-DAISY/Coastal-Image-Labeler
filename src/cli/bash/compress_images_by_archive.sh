#!/bin/bash
#mesaure time
start=`date +%s`

uncompressed_folder=/datadrive
compressed_folder=/datadrive2/compressed
catalog=/archives/Michael

archive_array=()
archive_array[0]=/20181011a_jpgs
archive_array[1]=/20181012a_jpgs

for archive_path in "${archive_array[@]}"
do  
    if [ -d "$archive_path" ]; then
        uncomp_archive_path=$uncompressed_folder$catalog$archive_path/jpgs
        comp_archive_path=$compressed_folder$catalog$archive_path

        #make dir
        #[ ! -d $comp_archive_path ] && mkdir $comp_archive_path
        #[ ! -d $uncompressed_folder$catalog ] && mkdir $uncompressed_folder$catalog
        comp_archive_path=$comp_archive_path/jpgs
        #make dir with /jpg now
        #[ ! -d $comp_archive_path ] && mkdir $comp_archive_path

        # echo $uncomp_archive_path
        # echo $comp_archive_path

        for image in $uncomp_archive_path/*.jpg; 
        do
            imageName=$(basename "$image") 
            
            source_path=$uncomp_archive_path/$imageName
            dest_path=$comp_archive_path/$imageName

            echo $source_path
            echo $dest_path
            #jpegoptim -m40 -d $dest_path -p $source_path
        done
    fi
    
done

end=`date +%s`
runtime=$((end-start))
echo $runtime
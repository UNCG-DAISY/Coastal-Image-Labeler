# log_folder=/home/shahnafis/forever_logs
# log_name=forever_log
# log_error=forever_error
# log_out=forever_out

# var=$(date +"%FORMAT_STRING")
# now=_$(date +"%m_%d_%Y-%H.%M.%S")

# path_log=$log_folder/$log_name$now 
# path_error=$log_folder/$log_error$now 
# path_out=$log_folder/$log_out$now 

# sudo FOREVER_ROOT=$log_folder NODE_ENV=production forever start -e $path_error -l $path_log -o $path_out ./_dist/server.js 
echo hello
sudo forever list
# cd /home/shahnafis/GitHub/Coastal-Image-Labeler/src/dashboard
# NODE_ENV=production  pm2 start ./_dist/server.js

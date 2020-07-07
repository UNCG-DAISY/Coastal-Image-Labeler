---
id: data_exporting
title: Data Exporting
sidebar_label: Data Exporting
---

The MongoDB data is backedup daily at Noon EST (Or 16 UTC) with `'00 16 * * *'` for the CRON job to the folder `/home/shahnafis/mongo_backup/` where inside there are folders that are

```
MONTH-DAY-YEAR-T-HOUR-MINUTE-SECOND
``` 
and each has the collections exported as a json. For example.

```bash title="/home/shahnafis/mongo_backup/06-29-2020-T-09-25-00/"
06-29-2020-T-09-25-00_archives.json  
06-29-2020-T-09-25-00_questionSets.json
06-29-2020-T-09-25-00_catalogs.json  
06-29-2020-T-09-25-00_users.json
06-29-2020-T-09-25-00_images.json
```
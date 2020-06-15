# New Images

This section of the documentation is focused on describing how to upload new images
to the labeler.

## Upload images to VM
Users need to put their images onto the VM. These instructions vary depending on
 the service used, so we won't go into detail. Most images we are currently
 focused on are downloaded directly to the VM via tools with CLI interfaces
 (i.e., [`psi collect`](https://github.com/UNCG-DAISY/psi-collect) and
 [`PyWebCAT`](https://github.com/UNCG-DAISY/PyWebCAT))

## Move to appropriate directory and make sure directory is structure correctly

```
-Catalog1/
       |-Archive1/
           |- jpgs/
               |-picture1.jpg
               |-picture1.jpg
               |....
     |- Archive2/
     |- Archive3/
     |....
```
## write JSON to define links and appropriate questions.

if you are interested in creating a bespoke set of questions for a catalog, see
the docs for [creating new questions and uploading to the labeler](new_questions.md)

## Compress (if needed) via Bash script

## import via cli

<Coastal Image Labeler CLI interface>

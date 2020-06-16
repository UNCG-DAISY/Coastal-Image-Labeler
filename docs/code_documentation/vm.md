# VM

This section of the documentation is focused on deploying the code on a VM.

## getting code on VM

## starting server on VM

to start the server, navigate to the directory with the code:

`cd <location of the code>/GitHub/Coastal-Image-Labeler/src/dashboard`

`NODE_ENV=production forever start ./_dist/server.js`


## ending server on VM

`forever list`
`forever stop <PID>``

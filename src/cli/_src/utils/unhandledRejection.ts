export default process.on('unhandledRejection', (err:any,promise: Promise<any>) => {
    
    console.error(`Error => ${err?.message ?? 'undefined error'}`)
    
    //Exit server on fail
    process.exit(1)
})
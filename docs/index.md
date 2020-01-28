# Post Storm Image Classification Dashboard and Node Server

## Goals

1. Recreate current features
    - Login and be given a image
    - Tag
    - Proceed to next
2. Added ability to select a storm or archive
3. Profile to show how many images tagged,and the list of storms/archives a user can tag
4. Ability to edit/request to edit
5. API to give csv

Use MongoDB Atlas for data storage. This will allow scalability and some compatibility since our current dashboard saves the tagging data as a sort of JSON object.

## Plan

1. Get auth0 and MongoDb to playnice
2. Get initial nextjs and ui set up

## Database

- Use mongodb
- centeral models will be user,image,tag,archive. 
- Make sure that auth0 and mongoDb work together for users, found [here](https://auth0.com/blog/auth0-tutorials-using-mongodb-atlas-as-a-custom-database/)
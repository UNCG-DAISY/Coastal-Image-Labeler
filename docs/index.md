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

1. Have Node api and Nextjs be on the same server. ✔️
2. User auth. ✔️
3. Ensure that if a page that should be auth is loaded without a user, redirect to home. ✔️
4. Have auth0 register user to MongoDB. ✔️
5. Create user roles ✔️
6. Create models

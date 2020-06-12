# Adding a new Question Set

Question sets are a group of questions (Radio,Checkbox,Input,Textfield) that are
assigned at the Catalog level. What that means is every for every Image that
belongs to an Archive under a Catalog will have the same question asked when
tagging. Editing and assigning a Question Set to a Catalog is done through the
Database and any changes will be reflected when the page refreshes.

## General Format

The general structure of the Question Set is as follows,with 1 example for each question type with all possible fields.

```js
{
    //Array of questions, they will be shown in this order
    "questions": 
    [
        //Radio question
        {
            "type": "radioGroup",
            "docLink": "",
            "errorMessage": "Please select 1",
            "required": true,
            "label": "Development Type",
            "key": "devType", // must be unique
            "buttons": 
            [
                {
                    "name": "Undeveloped",
                    "value": "undeveloped" //value that gets sent to DB
                }, 
                {
                    "name": "Developed",
                    "value": "developed"
                }
            ]
        }, 
        {
            "type": "checkboxGroup",
            "errorMessage": "Select 0 or more",
            "docLink": "",
            "mix": 0, //can be left out,if so min is 0
            "max": 4 //can be left out, if so max is the length of the button array down below
            "required": false,
            "label": "Impact Type(s)",
            "key": "impactType",
            "buttons": [
                {
                    "name": "Swash",
                    "value": "swash"
                }, 
                {
                    "name": "Collision",
                    "value": "collision"
                }, 
                {
                    "name": "Overwash",
                    "value": "overwash"
                }, 
                {
                    "name": "Inundation",
                    "value": "inundation"
                }
            ]
        }, 
        {
            "type": "textField",
            "required": false,
            "label": "Additional Comments",
            "docLink": "",
            "key": "additionalComments",
            "multiline": true,
            "rows": 5
        }
    ],
    "name": "Coastal Storm Questions",
    "description": "🌀",
    "__v": 0
    //This value is used to assign to a catalog
    "_id":"5ed82a588896022158fa0852"
}
```

## Extending

To add more questions to a Question Set, or make your own, simply edit the
`questionsets` collection in the Database. 

!!! warning
    Due to the large range in possible values and the manual entry, there isnt
    much in the way of error checking **_for now_**, so please make sure all fields are
    entered correctly. The best way is to copy a existing working Question Set. 
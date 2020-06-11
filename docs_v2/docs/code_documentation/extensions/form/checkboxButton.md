# Adding more checkbox buttons

Checkbox buttons are used for questions that can have multiple selected options,
or in other words "Select 0 or more". You can think of the options as flags as
yes/no or true/false.

For this example we will add the question "Sand type" with the options "Rough", "Coarse", "Gets Everywhere"

## Update the initial tag state

Head over to `_site\components\taggingForm\initalTagState.js`

We first have to create the key for the question and the default values.


```js
const initalTagState = {
    //Radios
    devType: -1,
    washoverType: -1,
    damageType: -1,

    //Checkboxes
    impactType: {
      swash:false,
      collision:false,
      overwash:false,
      inundation:false
    },
    terrianType: {
      sandyCoastline:false, 
      marsh:false, 
      inland:false, 
      river:false
    },
    //new state
    sandType:{
        rough:false,//default values, unchecked
        coarse:false,
        getsEverywhere:false
    }

    //Other
    water: 0,
    comments:''
};
```

## Create the checkboxes

Now we create the checkboxes

Head over to `_site\components\taggingForm\CheckboxQuestions.js`

We can add a new checkbox group like so

```js
<CheckboxButton
    //howManyReq = {1}
    states = {state}
    label = "Sand type" //Display text
    labelColor = {colors.amber[500]}
    buttons = {[ //These are the buttons, we will have 3
        {
            control:
                <ColoredBox 
                    value = "0" 
                     //Has to match what we put in initialTagState.js
                    checked={state.sandType.rough}
                    onChange = {(event) => {
                        //Keys here have to match, make sure each part is correct. 
                        //We are just basicly linking sub objects of an object
                        updateFunction({key:'sandType',value:{rough:!state.sandType.rough}})
                    }}
                />,
            label:"Rough"
        },
        {
            control:
                <ColoredBox 
                    value = "0" 
                     //Has to match what we put in initialTagState.js
                    checked={state.sandType.coarse}
                    onChange = {(event) => {
                        //Keys here have to match
                        updateFunction({key:'sandType',value:{coarse:!state.sandType.coarse}})
                    }}
                />,
            label:"Coarse"
        },
        {
            control:
                <ColoredBox 
                    value = "0" 
                    //Has to match what we put in initialTagState.js
                    checked={state.sandType.getsEverywhere}
                    onChange = {(event) => {
                        //Keys here have to match
                        updateFunction({key:'sandType',value:{getsEverywhere:!state.sandType.getsEverywhere}})
                    }}
                />,
            label:"Gets everywhere"
        },
    ]}
/>
```

## (Optional) Make it required to submit

Up to this point the checkbox question is not required to submit.

Head over to `_site\components\taggingForm\TaggingForm.js`

You are going to want to find the function `isSubmittable(state)` around line 33. We will add a
guard clause that returns `true` if not enough boxes are selected. 

Edit `isSubmittable` to have

```js
isSubmittable(state) {          
    if(state.tags.devType < 0) return true;
    if(state.tags.washoverType < 0) return true;
    if(state.tags.damageType < 0) return true; 
    if(!(this.checkboxHasEnoughSelected(state.tags.sandType,3))) return true;
    //if(state.tags.hasSand < 0) return true; 

    return false;
}
```

Where for `this.checkboxHasEnoughSelected()` the 1st parameter is the state and
the 2nd parameter is the number of boxes that need to be selected, in this case
all boxes need to be selected inorder to submit.

## Summary

And thats it! You should now see the radio button appear and it will be sent along with the tag data on submission. In review

1. Add new state.
2. Create the checkboxes.
3. (Optional) add guard clause to make it required.
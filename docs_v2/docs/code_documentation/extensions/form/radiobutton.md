# Adding more radio buttons

Radio buttons are for when the question asked requires ==ONLY== one option to be
selected. You can have it also be "Select one or none" by having one of the
options being "n/a" or "none" or whatever fits the context of the question or
there can be a required flag for the question inorder to submit.

For this demonstration I will add the question "Does contain sand?" and our options will be "Yes" or "No"

## Update the initial tag state

Head over to `_site\components\taggingForm\initalTagState.js`

The first thing we have to do is add a default value for the radio button. We
will add the state called `hasSand` and set it to `-1`. We will have "No" be `0`
and "Yes" be `1`. We dont have to set `hasSand` to `-1`, we could set it to `0`
or `1` which means it defaults to that option, or even have it be `3` or
someother number. The point being is that `-1` is the default value.

```js
const initalTagState = {
    //Radios
    devType: -1,
    washoverType: -1,
    damageType: -1,
    hasSand:-1, //New state

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

    //Other
    water: 0,
    comments:''
};
```

## Create the button

Now that we have the state, we have to create the buttons.

Head over to `_site\components\taggingForm\RadioButtonQuestions.js`. You will
see this is where all the radio button questions are.

We will add our new option below the rest like so

```js
<RadioButtonGroup
    onChange={updateFunction}
    //Pick any color, https://material-ui.com/customization/color/#color
    style={{color:colors.purple[400]}} //Color of the title
    title={`Contains Sand`}
    //has to be the same as the key we set in initalTagState.js 
    keyValue={'hasSand'} 
    //has to be the same as the key we set in initalTagState.js 
    state={state.hasSand}
    buttons={[
        {
            value:"0",//What value does it change hasSand to
            control: <RedRadio/>,
            label: "No", //Display text
            labelPlacement:"end"
        },
        {
            value:'1',//What value does it change hasSand to
            control: <GreenRadio />,
            label: "Yes",//Display text
            labelPlacement:"end"
        }
    ]}
/>
```

## (Optional) Make it required to submit

At this point the radio question isnt required to submit. The way we make it
required is by adding a guard statement that disables the button if one or more
of the required options are not meet.

Head over to `_site\components\taggingForm\TaggingForm.js`. You are going to
want to find the function `isSubmittable(state)` around line 33. We will add a
guard clause that returns `true` if the `hasSand` value is less then `0`, thats
why we picked `-1` earlier so that we could check this.

```js
isSubmittable(state) {          
    if(state.tags.devType < 0) return true;
    if(state.tags.washoverType < 0) return true;
    if(state.tags.damageType < 0) return true; 
    if(state.tags.hasSand < 0) return true; 

    return false;
}
```

## Summary

And thats it! You should now see the radio button appear and it will be sent along with the tag data on submission. In review

1. Add new state.
2. Create the buttons.
3. (Optional) add guard clause to make it required.

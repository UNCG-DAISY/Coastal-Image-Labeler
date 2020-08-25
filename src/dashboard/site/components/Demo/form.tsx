// import React, { useState } from 'react'
// import { useForm, Controller } from 'react-hook-form'
// import FormControlLabel from '@material-ui/core/FormControlLabel'
// import Checkbox, { CheckboxProps } from '@material-ui/core/Checkbox'

// // import { YesNoCheckbox } from '../Button/Checkbox/premadeCheckboxButtons'
// import {generateCheckbox} from '../Forms/generate/Checkbox'
// import {questions} from '../data/testQuestions'

// export default function CheckboxesGroup() {

//   const { register, handleSubmit, errors, watch, getValues, control, setValue  } = useForm({
//     defaultValues:{
//     }
//   });
//   console.log( )

//   return (
//    <div>
//      {JSON.stringify(watch())}
//      {
//        generateCheckbox(questions[3],{
//         globalDisable:false,
//         register,
//         getValues,
//         errors
//       })
//      }

//      {/* <FormControlLabel
//         key={"key1"}
//         label={"label 1"}
//         control={
//           <ColoredCheck
//           styles={{box:'red',checked:'blue'}}
//             name={"group1"}
//             value={"value1"}
//             inputProps={{
//               ref: register()
//             }}
//             disabled={false}
//           />
//         }
//       />

//       <FormControlLabel
//         key={"key1"}
//         label={"label 1"}
//         control={
//           <ColoredCheck
//           styles={{box:'red',checked:'blue'}}
//             name={"group1"}
//             value={"value2"}
//             inputProps={{
//               ref: register()
//             }}
//             disabled={false}
//           />
//         }
//       /> */}

//    </div>
//   )

// }

export default function Test() {
  return <div>test</div>
}

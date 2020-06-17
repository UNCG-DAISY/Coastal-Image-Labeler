// import RadioButton from './RadioButton'
// import Radio from '@material-ui/core/Radio';
// import { withStyles,makeStyles } from '@material-ui/core/styles';
// import * as colors from '@material-ui/core/colors/';


// const useStyles = makeStyles({
//     root: {
//         color: colors.red[400],
//         '&$checked': {
//           color: colors.red[600],
//         },
//     },
//     checked: {},
// });

// export default function RadioButtonGroup(props) {
//     const {
//         keyValue,
//         onChange,
//         style,
//         title,
//         buttons,
//         state
//     } = props

//     const classes = useStyles();
//     return (
//         <>
//             <RadioButton
//                 value = {state} 
//                 onChange = {(event) => {  
//                     //console.log(props)
//                     onChange({
//                         key: keyValue,
//                         value:event.target.value
//                     })
//                 }}
//                 classes = {classes}
//                 style = {style}
//                 title = {title}
//                 ariaLabel = {keyValue}
//                 name = {keyValue}
//                 buttons = {buttons}
//             />
            
//         </>
//     )
// }
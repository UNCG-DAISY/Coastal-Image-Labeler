// //Custom radio button

// import RadioGroup from '@material-ui/core/RadioGroup';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import FormLabel from '@material-ui/core/FormLabel';
// import Typography from '@material-ui/core/Typography';

// export default function RadioButton(props) {
//     return (
//         <>
       
//             <Typography variant="h6" style = {props.style} >
//                 {props.title}
//             </Typography>
//             <RadioGroup 
//                 aria-label={props.ariaLabel}
//                 name={props.name}
//                 value={props.value}
//                 onChange={props.onChange} 
//                 row
                
//             >
//                 {props.buttons.map(button => ( 
                   
//                     <FormControlLabel 
//                         //className = {classes.root}
//                         key = {button.label}
//                         {...button}
                        
                        
//                     /> 
//                 ))}
//             </RadioGroup>
      
//         </>
//     )
// }
import CheckboxButton from './CheckboxButton'

export default function ImpactCheckbox(props) {

    const {states,howManyReq,handleChange} = props

   

    return (
        <CheckboxButton
            howManyReq = {howManyReq}
            states = {states}
            label = "Impact Type, pick any, none required"
            buttons = {[
                {
                control:
                    <Checkbox 
                    value = "0" 
                    checked={states.swash == 1} 
                    onChange={(event)=>handleChange(event,props.eventType)} 
                    name="swash" 
                    eventtype = "impact"
                    />,
                label:"swash"
                },
                {
                control:
                    <Checkbox 
                    value = "1" 
                    checked={states.collision == 1} 
                    onChange={(event)=>handleChange(event,props.eventType)} 
                    name="collision" 
                    eventtype = "impact"
                    />,
                label:"collision"
                },
                {
                control:
                    <Checkbox 
                    value = "1" 
                    checked={states.overwash == 1} 
                    onChange={(event)=>handleChange(event,props.eventType)} 
                    name="overwash" 
                    eventtype = "impact"
                    />,
                label:"overwash"
                },
                {
                control:
                    <Checkbox 
                    value = "1" 
                    checked={states.inundation == 1} 
                    onChange={(event)=>handleChange(event,props.eventType)} 
                    name="inundation" 
                    eventtype = "impact"
                    />,
                label:"inundation"
                }

            ]}
        />
    )
}
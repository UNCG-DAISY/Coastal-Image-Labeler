export default function isCheckboxAllowedToContinue(states,required = 0) {
    const selected = Object.keys(states).filter((element) =>{
        if(states[element] > 0) {
        return true
        }
    })

    return selected.length >=required? 1:-1
}
const handleCheckboxChange = (event,eventType) => {

    const target = event.target
    
    if(eventType == 'impact') {

        handleCheckboxChange.updateTagState({
        type:'updateImpact',
        key:event.target.name,
        value: event.target.checked? 1:0
      })
     
    }

    if(eventType == 'terrian') {

        handleCheckboxChange.updateTagState({
        type:'updateTerrian',
        key:event.target.name,
        value: event.target.checked? 1:0
      })
     
    }
   
};

export default handleCheckboxChange
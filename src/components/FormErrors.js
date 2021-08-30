import React from 'react';
const FormErrors = ({formErrors}) =>{
  return (<div className='formErrors'>
    {Object.keys(formErrors).map((fieldName, i) => {
      if(formErrors[fieldName].length > 0){
        if(fieldName == 'gError'){
          return (
            <p key={i} style={{'color':'red'}}>{formErrors[fieldName]}</p>
          )
        }else{
          return (
            <p key={i} style={{'color':'red'}}>{fieldName} {formErrors[fieldName]}</p>
          )
        }
                
      } else {
        return '';
      }
    })}
  </div>);
}

export default FormErrors;
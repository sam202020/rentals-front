import React from "react";
import Checkbox from "rc-checkbox";
import 'rc-checkbox/assets/index.css';

const CheckBox = ({ name, onChange }) => {
    return (
      <div className='ml-5 mr-3' >
        <Checkbox name={name} onChange={onChange}/>
      </div>
    );
  };
  
  export default CheckBox;
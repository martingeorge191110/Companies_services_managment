import React from 'react';
import { FaBuilding, FaEnvelope, FaPhone } from 'react-icons/fa';



export const InputObligatory = ({value, setValue, name, type, classes, placeholder, icon, content}) => {


   return (
      <div>
         <label className="block text-sm font-medium mb-2">{content}</label>
            <div className="flex items-center bg-[#333333] p-3 rounded-lg">
               {
                  icon === 'FaBuilding' ? <FaBuilding className="text-gray-400 mr-2" /> : icon === 'FaEnvelope' ?
                  <FaEnvelope className="text-gray-400 mr-2" /> : icon === 'FaPhone' ?
                  <FaPhone className="text-gray-400 mr-2" /> : ""
               }
               <input
                  type={type}
                  name={name}
                  value={value}
                  onChange={setValue}
                  className={classes}
                  placeholder={placeholder}
                  required/>
            </div>
      </div>
   )
}

export default InputObligatory;

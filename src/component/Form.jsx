import React, { useState } from 'react'
import { Inputs } from './Inputs'

export default function Form() {
  const [selectedValue, setSelectedValue] = useState('');
  const[selectOption,setSelectoption]=useState('');


  const handleCheckboxChange = (event) => {
    setSelectedValue(event.target.value);
  };
  const handleChange=(event)=>{
    setSelectoption(event.target.value);
  }

   
    const options = [
      { value: "Select", label: "Select" },
        { value: "Urban", label: "Urban" },
        { value: "Semi Urban", label: "Semi Urban" },
        { value: "Rural", label: "Rural" },
      ];
      const Education= [
        { value: "Select", label: "Select" },
        { value: "Graduate", label: "Graduate " },
        { value: "Not Graduate", label: "Not Graduate" },
       
      ];
      const Gender = [
        { value: "Male", label: "Male" },
        { value: "Female", label: "Female" },
        { value: "Select", label: "Select" },
      ];
  return (
    <div>
        <div>
            <form>
           <Inputs
            label="full name"
            basis={100}
            value=""
            type="name"
            onchange=""
            placeH="Full Name"
           />
            <Inputs
            label="Credit History"
            basis={100}
            value=""
            type="name"
            placeH="Credit History"
            onchange=""
           />
            <Inputs
            label="Education"
            basis={100}
            value=""
            type="select"
            placeH="Education"
            options={Education}
            onChange=""
           />
             <Inputs
            label="Applicant Income"
            basis={100}
            value=""
            placeH="Applicant Income"
            type="select"
            options={options}
            onChange={handleChange}
           />
            <Inputs
            label="Gender"
            basis={100}
            value=""
            placeH="Gender"
            type="select"
            options={Gender}
            onChange={handleChange}
           />
            <Inputs
            label="Property Area"
            basis={100}
            value=""
            placeH="Property Area"
            type="select"
            options={options}
            onChange={handleChange}
           />
      
            <Inputs
            label="Applicant Income"
            basis={100}
            value=""
            placeH="Applicant Income"
            type="name"
            onchange=""
           />
           <div>
              <Inputs
              label="Credit History"
        basis={100}
       
        type="checkbox"
        name="terms"
        placeH="Credit History"
        value="option1"
        checked={selectedValue === 'option1'}

        onChange={handleCheckboxChange}
           />
           <Inputs
            label="Another Checkbox"
        basis={100}
        value="option1"
        checked={selectedValue === 'option1'}

        type="checkbox"
        name="anotherTerm"
        placeH="Another Checkbox"
        onChange={handleCheckboxChange}
           />
           </div>
              <Inputs
            label="Loan Amount"
            basis={100}
            value=""
            placeH="Loan Amount"
            type="name"
            onchange=""
           />
           
            <Inputs
            label="Loan AmountTerm"
            basis={100}
            value="Loan AmountTerm"
            placeH=""
            type="name"
            onchange=""
           />
            <Inputs
            label="Total Family Income"
            basis={100}
            placeH="Total Family Income"
            value=""
            type="name"
            onchange=""
           />
           

            </form>
        </div>
    </div>
  )
}

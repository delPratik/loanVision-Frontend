import React from "react";

export 
const Inputs = ({ label, type, placeH, basis = 100,options, ...props }) => (

    <div className={`basis-full w-full  rounded  border-gray-200  border-2  bg-transparent py-2 pl-6 pr-10 text-black outline-none   dark:text-white  lg:basis-[${basis}%]`}>
      {type === 'checkbox' ? (
        <div className="flex  items-center">
          <input
            {...props}
            type="checkbox"
            className="mr-2  rounded   bg-transparent py-3  px-5 font-medium  active:border-primary"
          />
          <label className="font-bold text-[#141312]">{label}</label>
        </div>
      ) : (
        <>
          <label className="mb-1 font-bold  text-[#141312]">{label}</label>
          {type === 'select' ? (
            <select
              {...props}
              required
              // Use the provided onChange event here
              className="w-full rounded  bg-transparent py-3 px-5 font-medium form-control outline-none  active:border-primary"
            >
              <option value="">{placeH}</option>
              {options.map((option, index) => (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          ) : (
            <input
              {...props}
              type={type}
              required
              placeholder={placeH}
              value={props.value}
  onChange={props.onChange}
              className="border-none font-sans  w-96 text-[15px] p-3  outline-none   border-red-600"
            />
          )}
        </>
      )}
    </div>
  );
  

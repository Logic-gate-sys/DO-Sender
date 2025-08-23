"use client";

import { ChangeEvent, JSX } from "react";
import clsx from "clsx";
import { type } from "os";

type InputSize = "small" | "large";

type InputFieldProps= {
  size:string,
  label: string,
  id: string,
  value: string,
  onChange: (e: ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => void,
  placeholder?: string,
}

export const InputField = ({ size, label, id, value, onChange, placeholder }: InputFieldProps): JSX.Element => {
  //return input field for a smalll size 
  if (size === 'small') {
     return (
    <div className="flex flex-col space-y-1">
      <label htmlFor={id} className="text-sm font-bold text-gray-700 ">
        {label}
       </label>
      <input
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className='border-2 border-amber-200 md:h-12 max-w-4xl rounded-2xl '
      />
    </div>
  );
  } else {
    return (
     <div className="flex flex-col space-y-1">
       <label htmlFor={id} className="text-sm font-bold text-gray-700 ">
        {label}
       </label>
      <textarea
        id={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className='min-h-30 min-w-120 border-2 border-amber-200  max-w-4xl rounded-2xl p-4 '
      />
    </div>
    )
  }
 
};

import React, {  FC } from "react";
import { UseFormRegister } from "react-hook-form";

interface InputProps {
    type: 'text' | 'number' | 'email' | 'password'
    label: string
    labelName: string
    placeholder: string
    error: boolean
    errorMessage: string | undefined
    register: (registerType: 'username' |'email'  |'password' )=>{} 
    registerType: 'username' |'email'  |'password'  
    disabled?: boolean
  }

  const Input: FC<InputProps> = ({
    type,
    label,
    labelName,
    placeholder,
    error,
    errorMessage,
    register,
    registerType,
    disabled,
  }) => {
    return (
      <div>
        <label htmlFor={label} className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">{labelName}</label>
        <input
          type={type}
          id={label}
          placeholder={placeholder}
          {...register(registerType)}
          disabled={disabled}
          className={`bg-gray-50 border ${error ?"border-red-500":"border-gray-300"} text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 focus:outline-0`}
        />
        {error && <p className="text-xs text-red-500">{errorMessage}</p>}
      </div>
    )
  }

export default Input
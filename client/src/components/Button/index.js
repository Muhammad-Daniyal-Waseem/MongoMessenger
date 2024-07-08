import React from 'react'

const Button = ({
    label='button',
    type='button',
    disabled=false,
    className='',}
) => {
  return (
    <div className='w-1/2'>
      <button type={type} className={` text-white bg-primary focus:outline-none
      focus:ring-blue-300 font-medium rounded-lg text-sm  px-5 py-2.5 text-center
      ${className}`} disabled={disabled}>{label}</button>
    </div>
  )
}

export default Button

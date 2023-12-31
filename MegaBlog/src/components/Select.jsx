import React, { useId } from 'react'

const Select = React.forwardRef(function Select({
  options,
  label,
  className,
  ...props
}, ref) {
  const id = useId();
  return (
    <div className='w-full'>
      {
        label && 
        <label htmlFor={id} className='inline-block mb-1 pl-1 text-lg font-semibold'>{label}</label>
      }
      {
        <select
          {...props}
          id={id}
          ref={ref}
          className={`px-3 py-2 rounded-lg bg-[#93B1A6] text-black outline-none focus:bg-gray-50 duration-200  w-full ${className}`}
        >
          {
            options?.map((option)=> (
              <option key={option} value={option}>
                {option}
              </option>
            ))
          }
        </select>
      }
    </div>
  )
})

export default Select
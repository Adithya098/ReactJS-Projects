import { forwardRef } from "react";

const Input = forwardRef(function Input({ text1, type1, ...props },ref) {
    const Tag = type1;
    return (
      <p className="flex flex-col gpa-2 my-4">
        <label className="text-sm font-bold uppercase text-stone-500">{text1}</label>
        <Tag ref={ref} className='w-full p-1 border-b-2 rounded-sm bg-stone-200 text-stone-700 border-x-gray-950' {...props}></Tag>
      </p>
    );
  });

export default Input;
  
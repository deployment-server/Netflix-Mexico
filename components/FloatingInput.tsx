import React, { useState } from 'react';

interface FloatingInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
  className?: string; // Allow overriding container styles
  dark?: boolean; // Toggle for light/dark mode styles
}

const FloatingInput: React.FC<FloatingInputProps> = ({ label, error, className = '', dark = true, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  
  // Styles for Dark Mode (Login) vs Light Mode (Signup/Redeem)
  const bgClass = dark ? 'bg-[#333]' : 'bg-white border border-gray-400';
  const focusBorderClass = dark ? 'focus-within:bg-[#454545]' : 'focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600';
  const textClass = dark ? 'text-white' : 'text-black';
  const labelDefaultClass = dark ? 'text-[#8c8c8c]' : 'text-gray-500';
  const labelFocusClass = dark ? 'text-[#8c8c8c]' : 'text-gray-600';
  const errorBorderClass = 'border-b-2 border-[#e87c03]';

  return (
    <div className="relative w-full">
      <div 
        className={`relative w-full rounded px-3 pt-4 pb-2 transition-colors duration-200 ${bgClass} ${error ? errorBorderClass : ''} ${!error ? focusBorderClass : ''} ${className}`}
      >
        <input
          {...props}
          className={`peer block w-full appearance-none bg-transparent ${textClass} focus:outline-none text-base leading-none`}
          onFocus={(e) => {
            setIsFocused(true);
            props.onFocus?.(e);
          }}
          onBlur={(e) => {
            setIsFocused(false);
            props.onBlur?.(e);
          }}
          placeholder=" " 
        />
        <label
          className={`
            absolute left-3 top-4 origin-[0] -translate-y-3 scale-75 transform duration-150 
            peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 
            peer-focus:-translate-y-3 peer-focus:scale-75
            pointer-events-none select-none truncate max-w-[calc(100%-1rem)]
            ${isFocused || props.value ? labelFocusClass : labelDefaultClass}
          `}
        >
          {label}
        </label>
      </div>
      {error && <p className="text-[#e87c03] text-xs mt-1 px-1">{error}</p>}
    </div>
  );
};

export default FloatingInput;
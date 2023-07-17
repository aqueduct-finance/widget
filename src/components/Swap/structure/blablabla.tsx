'use client';

import { useRef, useState } from "react";

interface DynamicInputProps {
    maxDynamicFontSize: number,
    paddingPercentage: number
}

export default function DynamicInput({ maxDynamicFontSize, paddingPercentage } : DynamicInputProps) {

  const parentRef = useRef<HTMLDivElement>(null);
  const [divScrollLeft, setDivScrollLeft] = useState(0);
  const [dynamicFontSize, setDynamicFontSize] = useState(maxDynamicFontSize); // in px

  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    let computedStyle = window.getComputedStyle(e.target);

    let getWidth = (fontSize: string) => {
      let div = document.createElement('div');
      div.innerText = e.target.value;
      div.style.fontSize = fontSize;
      div.style.fontWeight = computedStyle.fontWeight;
      div.style.fontFamily = computedStyle.fontFamily;
      div.style.width = 'auto';
      div.style.display = 'inline-block';
      div.style.visibility = 'hidden';
      div.style.position = 'fixed';
      div.style.overflow = 'auto';
      document.body.append(div)
      let width = div.offsetWidth;
      div.remove();
      return width;
    };

    if (parentRef.current) {
      let newFontSize = dynamicFontSize * (parentRef.current.clientWidth * (1 - paddingPercentage) / getWidth(`${dynamicFontSize}px`));
      newFontSize = parseFloat(newFontSize.toFixed(2));
      newFontSize = newFontSize <= maxDynamicFontSize ? newFontSize : maxDynamicFontSize;
      setDynamicFontSize(newFontSize);
      setDivScrollLeft(
        getWidth(`${newFontSize}px`) / 2
      )
    }
  }

  return (
    <div 
        ref={parentRef}
        className="w-full h-full flex items-center justify-end overflow-hidden"
    >
        <input
            style={{
                width: `calc(50% + ${divScrollLeft}px)`,
                fontSize: `${dynamicFontSize}px`
            }}
            className='text-white bg-transparent outline-none transition-all duration-200' 
            onChange={handleChange2}
        />
    </div>
  )
}

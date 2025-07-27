'use client';

import React from 'react';

type TitleAnimationProps = {
  text: string;
};

const TitleAnimation: React.FC<TitleAnimationProps> = ({ text }) => {
  return (
    <div className='inline-block'>
      {text.split('').map((char, index) => (
        <span
          key={index}
          className='inline-block transition-transform duration-100 hover:scale-125 text-[10vw] leading-[8vw] 2xl:text-[7vw] 2xl:leading-[6vw] uppercase font-title hover:text-red-1'
        >
          {char === ' ' ? '\u00A0' : char}
        </span>
      ))}
    </div>
  );
};

export default TitleAnimation;

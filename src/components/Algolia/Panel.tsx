import React from 'react';
import { clsx } from 'clsx';
import Image from 'next/image';

export function Panel({
  attribute,
  type,
  title,
  onClick,
  active,
}: {
  attribute: string;
  type: string;
  title?: string;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <div className='filter-item'>
      <button
        className={clsx('btn-facet', active && 'active')}
        onClick={() => onClick(`${attribute}:true`)}
      >
        <div className='facet-content'>
          <div className='image'>
            <Image
              src={`/images/v2/${type}.png`}
              alt={type}
              width={150}
              height={150}
              quality={100}
            />
          </div>
          {title && <p className='text'>{title}</p>}
        </div>
      </button>
    </div>
  );
}

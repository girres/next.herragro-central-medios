import React from 'react';
import { clsx } from 'clsx';
import { IoMdImages } from 'react-icons/io';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { MdOutlineOndemandVideo } from 'react-icons/md';

export type AssetTypeProps = {
  type: 'video' | 'image' | 'document';
  active?: boolean;
};

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
  const size = 'size-8';
  return (
    <div className='filter-item'>
      <button
        className={clsx('btn-facet', active && 'active')}
        onClick={() => onClick(`${attribute}:true`)}
      >
        <div className='facet-content'>
          <div className='text-white bg-red-1 size-14 rounded-lg flex items-center justify-center gap-3'>
            {type === 'video' && <MdOutlineOndemandVideo className={size} />}
            {type === 'image' && <IoMdImages className={size} />}
            {type === 'document' && <IoDocumentTextOutline className={size} />}
          </div>
          {title && <p className='text'>{title}</p>}
        </div>
      </button>
    </div>
  );
}

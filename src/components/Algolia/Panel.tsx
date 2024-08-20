import React from 'react';
import { clsx } from 'clsx';

export function Panel({
  attribute,
  type,
  onClick,
  active,
}: {
  attribute: string;
  type: string;
  onClick: () => void;
  active: boolean;
}) {
  return (
    <div>
      <button
        className={clsx('btn btn-circle', active && 'btn-primary')}
        onClick={() => onClick(`${attribute}:true`)}
      >
        {type}
      </button>
    </div>
  );
}

import React from 'react';
// import Image from 'next/image';
// import Link from 'next/link';

// Components.
import Algolia from '@/components/Algolia';
// import TestToast from '@/components/TestToast';

export default function Home() {
  return (
    <main className='main-content'>
      <div className='container'>
        <Algolia />
      </div>
    </main>
  );
}

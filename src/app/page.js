import React from 'react';

// Components.
import Algolia from '@/components/Algolia';

export default function Home() {
  return (
    <main className='main-content'>
      <div className='container'>
        <Algolia />
      </div>
    </main>
  );
}

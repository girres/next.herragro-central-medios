import React from 'react';
// import Image from 'next/image';
import Link from 'next/link';

// Components.
import Algolia from '@/components/Algolia';

export default function Page() {
  return (
    <main className='main-content'>
      <div className='min-h-screen relative'>
        <div className='container'>
          <div className='py-10 lg:mb-10'>
            <div className='breadcrumbs text-xs text-gray-500'>
              <ul>
                <li>
                  <Link href='/'>Inicio</Link>
                </li>
                <li>Todos los recursos</li>
              </ul>
            </div>
            <div className='uppercase'>
              <h1 className='font-title'>Recursos</h1>
              <p className='text-gray-500 text-xs'>Buscador de Recursos</p>
            </div>
          </div>
          <Algolia />
        </div>
      </div>
    </main>
  );
}

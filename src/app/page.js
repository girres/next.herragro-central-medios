import React from 'react';
import Link from 'next/link';
import { CiCircleChevRight } from 'react-icons/ci';

// Services
import { getAssetHome, getPostsPromoted } from '@/services/strapi';

// Components.
import HomeSearchBar from '@/components/Algolia/HomeSearchBar';
import PostPromoted from '@/components/Blog/PostPromoted';
import TitleAnimation from '@/components/Titles/TitleAnimation';
import { CardItemBasic } from '@/components/Algolia';

// Revalidate time for the page // 10 minutes
export const revalidate = 600;

export default async function Home() {
  const posts = await getPostsPromoted();
  const assets = await getAssetHome();

  return (
    <main className='main-content'>
      <h1 className='hidden'>HUB Herragro</h1>
      <div className='px-5 relative w-full h-auto bg-yellow-1'>
        <div className='relative flex flex-col items-center justify-center w-full container py-20'>
          <TitleAnimation text='EXPLORA Y DESCUBRE' />
          <div className='mt-10 w-[100%] lg:w-[60%]'>
            <div className='py-5 text-2xl text-center'>
              Lo mejor de nuestro mundo Herragro
            </div>
            <HomeSearchBar />
            <p className='text-center mt-2'>
              <Link className='btn btn-link text-black' href='/assets'>
                Ver todos los archivos
                <CiCircleChevRight className='size-5' />
              </Link>
            </p>
          </div>
        </div>
      </div>
      {assets && assets.length > 0 && (
        <div className='container space-y-2'>
          <div className='block-promoted'>
            <div className='mb-10 flex items-center justify-between'>
              <div className='uppercase'>
                <h2>Recursos visuales</h2>
                <p className='text-gray-500 text-xs'>Últimos recursos</p>
              </div>
              <div>
                <Link href='/assets' className='btn-yellow'>
                  Ver todos los recursos
                </Link>
              </div>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              {assets.map((asset, index) => (
                <div key={index}>
                  <CardItemBasic data={asset} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className='container space-y-2'>
        <PostPromoted posts={posts} />
      </div>
    </main>
  );
}

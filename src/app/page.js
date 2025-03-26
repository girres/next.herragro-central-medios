import React from 'react';
import Link from 'next/link';
import { CiCircleChevRight } from 'react-icons/ci';

// Services
import { getPostsPromoted } from '@/services/strapi';

// Components.
import HomeSearchBar from '@/components/Algolia/HomeSearchBar';
import PostPromoted from '@/components/Blog/PostPromoted';
import TitleAnimation from '@/components/Titles/TitleAnimation';

// Revalidate time for the page // 10 minutes
export const revalidate = 600;

export default async function Home() {
  const posts = await getPostsPromoted();

  return (
    <main className='main-content'>
      <h1 className='hidden'>HUB Herragro</h1>
      <div className='px-5 relative w-full h-auto bg-yellow-1'>
        <div className='relative flex flex-col items-center justify-center w-full container py-20'>
          <TitleAnimation text='buscador herragro' />
          <div className='mt-10 w-[100%] lg:w-[60%]'>
            <div className='py-5 text-2xl text-center'>
              Imágenes, videos y documentos de nuestra marca.
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
      <div className='container space-y-2'>
        <PostPromoted posts={posts} />
      </div>
    </main>
  );
}

import React from 'react';
import Link from 'next/link';
import { CiCircleChevRight } from 'react-icons/ci';

// Services
import { getPostsPromoted } from '@/services/strapi';

// Components.
// import Algolia from '@/components/Algolia';
import PostPromoted from '@/components/Blog/PostPromoted';
import TitleAnimation from '@/components/Titles/TitleAnimation';
import { FaSearch } from 'react-icons/fa';

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
              Archivos, videos y documentos de nuestra marca.
            </div>
            <div className='join w-full'>
              <input
                type='text'
                placeholder='Ejm: Manual de marca'
                className='input input-bordered lg:text-xl lg:h-[70px] join-item w-full font-light'
              />
              <button className='btn btn-primary join-item lg:h-[70px] bg-black text-yellow-1 border-none hover:bg-red-1'>
                <FaSearch className='lg:text-4xl' />
              </button>
            </div>
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

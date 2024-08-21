import React from 'react';
import Image from 'next/image';

// Services
import { getPostsPromoted } from '@/services/strapi';

// Components.
import Algolia from '@/components/Algolia';
import PostPromoted from '@/components/Blog/PostPromoted';

export default async function Home() {
  const posts = await getPostsPromoted();

  return (
    <main className='main-content'>
      <div className='hero min-h-screen relative'>
        <div className='h-full w-full relative'>
          <Image
            src='/images/HeroBg.jpg'
            alt='Hero Image'
            fill
            style={{
              objectFit: 'cover',
              objectPosition: 'center',
            }}
            sizes='100vw'
            quality={100}
            className='z-10'
          />
        </div>
        <div className='absolute inset-0 bg-gradient-to-r from-black/60 to-black/70 z-20' />
        <div className='z-30 absolute top-0 bottom-0 left-0 right-0 w-full h-full px-5 lg:px-0'>
          {/* <Algolia /> */}
        </div>
      </div>
      <div className='container space-y-2'>
        <PostPromoted posts={posts} />
      </div>
    </main>
  );
}

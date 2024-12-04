import React from 'react';

// Services
import { getPostsPromoted } from '@/services/strapi';

// Components.
import Algolia from '@/components/Algolia';
import PostPromoted from '@/components/Blog/PostPromoted';
import Image from 'next/image';

// Revalidate time for the page // 10 minutes
export const revalidate = 600;

export default async function Home() {
  const posts = await getPostsPromoted();

  return (
    <main className='main-content'>
      <h1 className='hidden'>HUB Herragro</h1>
      <div>
        <div className='relative min-h-[800px] w-full'>
          <Image
            src='/images/v2/bg.gif'
            alt='HUB Herragro'
            fill
            className='object-cover object-center z-10'
          />
          <div className='absolute h-full w-full z-20 px-5'>
            <Algolia />
          </div>
        </div>
      </div>
      <div className='container space-y-2'>
        <PostPromoted posts={posts} />
      </div>
    </main>
  );
}

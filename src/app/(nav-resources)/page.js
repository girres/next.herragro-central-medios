import React from 'react';

// Services
import { getPostsPromoted } from '@/services/strapi';

// Components.
import Algolia from '@/components/Algolia';
import PostPromoted from '@/components/Blog/PostPromoted';

// Revalidate time for the page // 10 minutes
export const revalidate = 600;

export default async function Home() {
  const posts = await getPostsPromoted();

  return (
    <main className='main-content'>
      <h1 className='hidden'>HUB Herragro</h1>
      <div className='relative w-full h-auto bg-[url("/images/v2/bg.jpg")] bg-no-repeat bg-cover bg-center'>
        <Algolia />
      </div>
      <div className='container space-y-2'>
        <PostPromoted posts={posts} />
      </div>
    </main>
  );
}

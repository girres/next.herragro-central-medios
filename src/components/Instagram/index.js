'use client';

import { InstagramEmbed } from 'react-social-media-embed';

// const insLink =
//   process?.env?.NEXT_PUBLIC_INTAGRAM_EMBED ??
//   'https://www.instagram.com/herragro.co/';

export const LatestPosts = () => {
  return (
    <div className='container overflow-hidden py-20'>
      <div className='uppercase mb-10'>
        <h2>Instagram</h2>
        <p className='text-gray-500 text-xs'>Últimos posts</p>
      </div>
      <div className='grid grid-cols-3 gap-2'>
        <InstagramEmbed
          url={'https://www.instagram.com/p/DMjMHqhNQ2k/'}
          width={'100%'}
        />
        <InstagramEmbed
          url={'https://www.instagram.com/p/DMghOCMtxsZ/'}
          width={'100%'}
        />
        <InstagramEmbed
          url={'https://www.instagram.com/p/DMaah_Xtv9u/'}
          width={'100%'}
        />
      </div>
    </div>
  );
};

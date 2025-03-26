'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { FaSearch } from 'react-icons/fa';

const ALGOLIA_INDEX_NAME = process.env.NEXT_PUBLIC_ALGOLIA_INDEX;

const HomeSearchBar = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!query.trim()) return;

    const encodedQuery = encodeURIComponent(query.trim());
    router.push(`/assets?${ALGOLIA_INDEX_NAME}[query]=${encodedQuery}`);
  };

  return (
    <form onSubmit={handleSubmit} className='join w-full'>
      <input
        type='text'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder='Ejm: Manual de marca'
        className='input input-bordered lg:text-xl lg:h-[70px] join-item w-full font-light'
      />
      <button
        type='submit'
        className='btn btn-primary join-item lg:h-[70px] bg-black text-yellow-1 border-none hover:bg-red-1'
      >
        <FaSearch className='lg:text-4xl' />
      </button>
    </form>
  );
};

export default HomeSearchBar;

'use client';
import { useState, useEffect } from 'react';
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { Hit as AlgoliaHit } from 'instantsearch.js';
import React from 'react';
import {
  InstantSearch,
  Hits,
  Highlight,
  SearchBox,
  Configure,
} from 'react-instantsearch';
import { Panel } from '@/components/Algolia/Panel';

const ALGOLIA_INDEX_NAME = process.env.NEXT_PUBLIC_ALGOLIA_INDEX;
const BASE_FILTER = 'active:true AND NOT published:false';

const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);

type HitProps = {
  hit: AlgoliaHit<{
    name: string;
  }>;
};

function Hit({ hit }: HitProps) {
  const { hasVideo = false, hasImage = false, hasDocument = false } = hit;
  return (
    <div className=''>
      <div className='font-bold text-lg'>
        <Highlight attribute='name' hit={hit} />
      </div>
      {hasVideo && <span className='badge'>Video</span>}
      {hasImage && <span className='badge'>Images</span>}
      {hasDocument && <span className='badge'>Docs</span>}
    </div>
  );
}

export default function Search() {
  const [filter, setFilter] = useState<string>(BASE_FILTER);
  const [filterParts, setFilterParts] = useState<string[]>([]);

  function onPressFacet(attribute: string) {
    // Add or remove the attribute from the filterParts
    setFilterParts((prev) => {
      const index = prev.indexOf(attribute);
      if (index === -1) {
        return [...prev, attribute];
      }
      return prev.filter((item) => item !== attribute);
    });
  }

  // Build a new filters when filterParts changes
  useEffect(() => {
    if (filterParts.length === 0) {
      setFilter(BASE_FILTER);
      return;
    }

    // Build the new filter
    const newFilter = filterParts.join(' AND ');
    const newFilterString = `${BASE_FILTER} AND ${newFilter}`;
    setFilter(newFilterString);
    return;
  }, [filterParts]);

  return (
    <InstantSearch searchClient={client} indexName={ALGOLIA_INDEX_NAME}>
      <Configure filters={filter} />
      <div className='Container'>
        <div>
          <Panel
            attribute='hasImage'
            type='image'
            onClick={onPressFacet}
            active={filterParts.includes('hasImage:true')}
          />
          <Panel
            attribute='hasVideo'
            type='video'
            onClick={onPressFacet}
            active={filterParts.includes('hasVideo:true')}
          />
          <Panel
            attribute='hasDocument'
            type='document'
            onClick={onPressFacet}
            active={filterParts.includes('hasDocument:true')}
          />
        </div>
        <div>
          <SearchBox />
          <Hits hitComponent={Hit} />
        </div>
      </div>
    </InstantSearch>
  );
}

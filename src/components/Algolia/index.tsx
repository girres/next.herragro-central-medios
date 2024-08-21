'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  ChevronDoubleRightIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/solid';

// Algolia
import { liteClient as algoliasearch } from 'algoliasearch/lite';
import { Hit as AlgoliaHit } from 'instantsearch.js';
import {
  InstantSearch,
  Hits,
  Highlight,
  SearchBox,
  Configure,
  useConnector,
  useInstantSearch,
} from 'react-instantsearch';
import connectStats from 'instantsearch.js/es/connectors/stats/connectStats';

// Components
import { Panel } from '@/components/Algolia/Panel';

// Constants
const ALGOLIA_INDEX_NAME = process.env.NEXT_PUBLIC_ALGOLIA_INDEX;
const BASE_FILTER = 'active:true AND NOT published:false';

// Algolia client
const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);

type HitProps = {
  hit: AlgoliaHit<{
    name: string;
  }>;
};

function NoResults() {
  const { indexUiState } = useInstantSearch();

  return (
    <div className='mt-3 p-5 bg-gray-200 text-xs text-gray-500 rounded-md'>
      <div className='flex items-center'>
        <ExclamationTriangleIcon className='w-8 h-8' />
        <p className='m-0 font-light w-full ml-5'>
          No encontramos recursos digitales para{' '}
          <strong className='bg-yellow-1'>
            <q>{indexUiState.query}</q>
          </strong>
          . Intenta nuevamente y recuerda que puedes buscar por nombre,
          referencia, categoría, color etc.
        </p>
      </div>
    </div>
  );
}

function NoResultsBoundary({ children, fallback }) {
  const { results } = useInstantSearch();

  if (!results.__isArtificial && results.nbHits === 0) {
    return (
      <>
        {fallback}
        <div hidden>{children}</div>
      </>
    );
  }

  return children;
}

function useStats(props) {
  return useConnector(connectStats, props);
}

function Stats(props) {
  const { nbHits } = useStats(props);

  return (
    <div>
      <p className='search-stats text-xs m-0'>
        <strong>{nbHits}</strong>{' '}
        {nbHits === 1 ? 'recurso encontrado' : 'recursos encontrados'}
      </p>
      <div className='divider mb-1 pb-1' />
    </div>
  );
}

function Hit({ hit }: HitProps) {
  const {
    hasVideo = false,
    hasImage = false,
    hasDocument = false,
    slug = '/',
    published = new Date(),
  } = hit;

  return (
    <div className='result-item grid grid-cols-2'>
      <div className='left'>
        <div className='date-published'>
          Publicado el {new Date(published).toLocaleDateString()}
        </div>
        <div className='title'>
          <Highlight attribute='name' hit={hit} />
        </div>
        <div className='categories'>
          <Highlight attribute='categories' hit={hit} separator=' / ' />
        </div>
      </div>
      <div className='right'>
        <div className='content-tags'>
          {hasVideo && (
            <div>
              <Image
                src='/images/video.png'
                alt='Video'
                width={100}
                height={100}
                quality={60}
              />
            </div>
          )}
          {hasImage && (
            <div>
              <Image
                src='/images/image.png'
                alt='Image'
                width={100}
                height={100}
                quality={60}
              />
            </div>
          )}
          {hasDocument && (
            <div>
              <Image
                src='/images/document.png'
                alt='Document'
                width={100}
                height={100}
                quality={60}
              />
            </div>
          )}
        </div>
        <Link href={`/asset/${slug}`} className='btn-yellow-circle'>
          <ChevronDoubleRightIcon className='w-4 h-4' />
        </Link>
      </div>
    </div>
  );
}

export default function Component() {
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
    const newFilter = filterParts.join(' OR ');
    const newFilterString = `${BASE_FILTER} AND (${newFilter})`;
    setFilter(newFilterString);
    return;
  }, [filterParts]);

  return (
    <div className='algolia-block'>
      <InstantSearch searchClient={client} indexName={ALGOLIA_INDEX_NAME}>
        <Configure filters={filter} />
        <div className='search-container'>
          <SearchBox
            autoFocus
            placeholder='Busca archivos por nombre, producto o palabra clave.'
            classNames={{
              input: 'input',
              submit: 'search-bar-submit',
            }}
          />
        </div>
        <div className='filters-container'>
          <Panel
            attribute='hasImage'
            type='image'
            title='Imágenes'
            onClick={onPressFacet}
            active={filterParts.includes('hasImage:true')}
          />
          <Panel
            attribute='hasVideo'
            type='video'
            title='Videos'
            onClick={onPressFacet}
            active={filterParts.includes('hasVideo:true')}
          />
          <Panel
            attribute='hasDocument'
            type='document'
            title='Documentos'
            onClick={onPressFacet}
            active={filterParts.includes('hasDocument:true')}
          />
        </div>
        <div className='results-container'>
          <Stats />
          <div className='hits-container'>
            <NoResultsBoundary fallback={<NoResults />}>
              <Hits
                hitComponent={Hit}
                classNames={{
                  list: 'max-w-[700px] mx-auto',
                }}
              />
            </NoResultsBoundary>
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}

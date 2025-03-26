'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ExclamationTriangleIcon } from '@heroicons/react/24/solid';
import { FaArrowRight } from 'react-icons/fa';

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

import { IoMdImages as IconImage } from 'react-icons/io';
import { IoDocumentTextOutline as IconDoc } from 'react-icons/io5';
import { MdOutlineOndemandVideo as IconVideo } from 'react-icons/md';

// Components
import { Panel } from '@/components/Algolia/Panel';
import { AssetTypeProps } from './Panel';
import clsx from 'clsx';

// Constants
const ALGOLIA_INDEX_NAME = process.env.NEXT_PUBLIC_ALGOLIA_INDEX;
const BASE_FILTER = 'active:true AND NOT published:false';

// Algolia client
const client = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID,
  process.env.NEXT_PUBLIC_ALGOLIA_API_KEY
);

type AssetGroupProps = {
  video: boolean;
  image: boolean;
  document: boolean;
};

type HitProps = {
  hit: AlgoliaHit<{
    name: string;
  }>;
};

const AssetType = ({ type, active = false }: AssetTypeProps) => {
  const size = 'size-6';
  return (
    <div className='text-gray-400 bg-gray-200 size-8 rounded flex items-center justify-center'>
      {type === 'video' && (
        <IconVideo className={clsx(size, active && 'text-red-1')} />
      )}
      {type === 'image' && (
        <IconImage className={clsx(size, active && 'text-red-1')} />
      )}
      {type === 'document' && (
        <IconDoc className={clsx(size, active && 'text-red-1')} />
      )}
    </div>
  );
};

const AssetGroup = ({ video, image, document }: AssetGroupProps) => {
  return (
    <div className='flex items-center gap-3'>
      <AssetType type='video' active={video} />
      <AssetType type='image' active={image} />
      <AssetType type='document' active={document} />
    </div>
  );
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
      <p className='search-stats my-5'>
        <strong className='font-bold'>{nbHits}</strong>{' '}
        {nbHits === 1 ? 'recurso encontrado' : 'recursos encontrados'}
      </p>
      <div className='divider' />
    </div>
  );
}

function CardItem({ hit }: HitProps) {
  const {
    hasVideo = false,
    hasImage = false,
    hasDocument = false,
    slug = '/',
    categories = [],
    updated = new Date(),
  } = hit;

  return (
    <div className='asset-result-item text-xs lg:flex gap-2 justify-between items-end p-5 my-1 rounded-md w-full relative bg-white'>
      <div className='left lg:px-2 w-full lg:w-8/12'>
        <div className='text-[10px] leading-[10px] font-light text-gray-500 mb-1'>
          Actualizado el {new Date(updated).toLocaleDateString()}
        </div>
        <div className='fontBold text-2xl'>
          <Highlight attribute='name' hit={hit} />
        </div>
        <div className='flex flex-wrap gap-2 mt-2'>
          {categories?.map((cat) => (
            <div
              key={cat}
              className='badge badge-outline text-[10px] leading-[10px] text-gray-700 border-gray-300 border'
            >
              {cat}
            </div>
          ))}
        </div>
      </div>
      <div className='right w-full lg:w-4/12 flex flex-col lg:items-end mt-4 lg:mt-0'>
        <AssetGroup video={hasVideo} image={hasImage} document={hasDocument} />
        <Link
          href={`/assets/${slug}`}
          className='btn bg-yellow-1 text-black mt-3 border-none btn-block btn-sm'
        >
          Ver
          <FaArrowRight className='size-4' />
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
    <div className='search-page-container'>
      <InstantSearch
        searchClient={client}
        indexName={ALGOLIA_INDEX_NAME}
        routing={true}
      >
        <Configure filters={filter} />
        <div className='lg:flex lg:min-h-[800px]'>
          <div className='bg-gray-200 w-full lg:w-3/12 p-5 rounded-md mb-5 lg:mb-5'>
            <div className='hidden lg:block'>
              <h3>Filtros:</h3>
              <div className='divider' />
            </div>
            <div className='filters-container lg:space-y-4 flex items-center justify-center gap-2 lg:block'>
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
          </div>
          <div className='w-full lg:w-9/12 lg:px-10'>
            <div className='search-container'>
              <div className='search-box'>
                <SearchBox
                  autoFocus
                  placeholder='Busca archivos por nombre o palabra clave.'
                  classNames={{
                    input: 'input',
                    submit: 'hidden',
                    reset: 'hidden',
                  }}
                />
              </div>
              <Stats />
            </div>
            <div className='results-container'>
              <NoResultsBoundary fallback={<NoResults />}>
                <Hits
                  hitComponent={CardItem}
                  classNames={{
                    list: 'grid gap-4 grid-cols-1 lg:grid-cols-2',
                  }}
                />
              </NoResultsBoundary>
            </div>
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}

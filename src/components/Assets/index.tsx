import Image from 'next/image';
import Link from 'next/link';
import { ArrowDownTrayIcon } from '@heroicons/react/24/solid';

const Icon = ({ type }: { type: string }) => {
  let src = null;

  switch (type) {
    case 'assets.videos':
      src = '/images/video.png';
      break;

    case 'assets.images':
      src = '/images/image.png';
      break;

    case 'assets.documents':
      src = '/images/document.png';
      break;
  }

  return src ? (
    <Image src={src} alt='Video' width={100} height={100} quality={60} />
  ) : null;
};

const Mime = ({ type }: { type: string }) => {
  let src = null;

  switch (type) {
    case 'application/pdf':
      src = '/images/pdfIcon.png';
      break;
  }

  return src ? (
    <Image src={src} alt='type' width={50} height={50} quality={60} />
  ) : null;
};

const ContentVideos = ({ data = [] }: { data: Object[] }) => {
  return (
    <div className='grid grid-cols-1 gap-2'>
      {data.map((item, index) => (
        <div
          key={index}
          className='relative rounded bg-gray-100 flex items-center justify-between border-2 border-gray-300 p-2'
        >
          <p>{item?.attributes?.name ?? '---'}</p>
          <div className='flex items-center'>
            <Mime type={item?.attributes?.mime ?? null} />
            <Link
              href={item?.attributes?.url ?? '#'}
              rel='noopener noreferrer'
              target='_blank'
              className='btn btn-circle ml-4'
            >
              <ArrowDownTrayIcon className='h-6 w-6' />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

const ContentImages = ({ data = [] }: { data: Object[] }) => {
  return (
    <div className='grid grid-cols-2 lg:grid-cols-5 gap-2'>
      {data.map((item, index) => (
        <div
          key={index}
          className='relative rounded bg-gray-100 flex items-center justify-center border-2 border-gray-300 p-3'
        >
          <Image
            src={item?.attributes?.url}
            alt={item?.attributes?.alt}
            width={item?.attributes?.width ?? 200}
            height={item?.attributes?.height ?? 200}
            quality={60}
          />
          <Link
            className='btn btn-circle absolute bottom-2 right-2 z-10'
            href={item?.attributes?.url ?? '#'}
            rel='noopener noreferrer'
            target='_blank'
          >
            <ArrowDownTrayIcon className='h-6 w-6' />
          </Link>
          <div className='bg-yellow-1/40 text-gray-600 absolute top-0 left-0 right-0 w-full text-left p-2 text-xs'>
            <span className=''>{`${item?.attributes?.mime}`}</span>
            <span>{` = `}</span>
            <span>{`${item?.attributes?.height} x ${item?.attributes?.width}`}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

const ContentDocuments = ({ data = [] }: { data: Object[] }) => {
  return (
    <div className='grid grid-cols-1 gap-2'>
      {data.map((item, index) => (
        <div
          key={index}
          className='relative rounded bg-gray-100 flex items-center justify-between border-2 border-gray-300 p-2'
        >
          <p>{item?.attributes?.name ?? '---'}</p>
          <div className='flex items-center'>
            <Mime type={item?.attributes?.mime ?? null} />
            <Link
              href={item?.attributes?.url ?? '#'}
              rel='noopener noreferrer'
              target='_blank'
              className='btn btn-circle ml-4'
            >
              <ArrowDownTrayIcon className='h-6 w-6' />
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

const Content = ({ type, data = [] }: { type: string; data: object[] }) => {
  let Comp = null;

  switch (type) {
    case 'assets.videos':
      Comp = <ContentVideos data={data.videos.data} />;
      break;

    case 'assets.images':
      Comp = <ContentImages data={data.images.data} />;
      break;

    case 'assets.documents':
      Comp = <ContentDocuments data={data.documents.data} />;
      break;
  }

  return Comp;
};

export const AssetCard = ({ data = {} }: { data: object }) => {
  return (
    <div className='asset-card relative rounded-lg shadow p-5 lg:p-10 bg-gray-200'>
      <div className='top flex items-center justify-between'>
        <div className='flex items-center'>
          <div className='mr-2 max-w-10'>
            <Icon type={data?.__component} />
          </div>
          <h2>{data.name}</h2>
        </div>
        <button className='bg-red-1 text-white btn btn-xs border-none'>
          Descargar
          <ArrowDownTrayIcon className='h-4 w-4' />
        </button>
      </div>
      <div className='divider' />
      {data?.description && <p className='desc'>{data.description}</p>}
      <div className='content mt-10'>
        <Content type={data?.__component} data={data} />
      </div>
    </div>
  );
};

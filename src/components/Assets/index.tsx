import Image from 'next/image';
import Link from 'next/link';
import { FileIcon, defaultStyles } from 'react-file-icon';
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

const ContentVideos = ({
  data = [],
  links = [],
}: {
  data: Object[];
  links: Object[];
}) => {
  return (
    <div className='grid grid-cols-1 gap-2'>
      {data &&
        data.length > 0 &&
        data.map((item, index) => {
          const ext = item.attributes.ext.toLowerCase().replace('.', '');
          return (
            <div
              key={index}
              className='relative rounded bg-gray-100 lg:flex items-center justify-between border-2 border-gray-300'
            >
              <p className='p-2 text-center lg:text-left'>
                {item?.attributes?.name ?? '---'}
              </p>
              <div className='flex items-center justify-between lg:justify-center bg-gray-200 p-2'>
                <div className='w-8'>
                  <FileIcon extension={ext} {...defaultStyles[ext]} />
                </div>
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
          );
        })}
      {links &&
        links.length > 0 &&
        links.map((item, index) => {
          return (
            <div
              key={index}
              className='relative rounded bg-gray-100 lg:flex items-center justify-between border-2 border-gray-300'
            >
              <p className='p-2 text-center lg:text-left'>{item.label}</p>
              <div className='flex items-center justify-center bg-gray-200 p-2'>
                <Link
                  href={item.url}
                  rel='noopener noreferrer'
                  target='_blank'
                  className='btn btn-circle'
                >
                  <Image
                    src='/images/youtube.svg'
                    alt='Youtube'
                    height='200'
                    width='200'
                    className='h-8 w-8'
                  />
                </Link>
              </div>
            </div>
          );
        })}
    </div>
  );
};

const ContentImages = ({ data = [] }: { data: Object[] }) => {
  return (
    <div className='grid grid-cols-2 lg:grid-cols-4 gap-2'>
      {data.map((item, index) => {
        const ext = item.attributes.ext.toLowerCase().replace('.', '');
        return (
          <div
            key={index}
            className='relative rounded bg-gray-100 border-2 border-gray-300'
          >
            {/* Image Container */}
            <div className='relative box w-full h-[200px]'>
              <Image
                src={
                  item?.attributes?.formats?.small?.url ?? item.attributes.url
                }
                alt={item?.attributes?.alt ?? index}
                fill
                style={{
                  objectFit: 'contain',
                  objectPosition: 'center',
                  padding: '10px',
                }}
              />
            </div>
            {/* Legend */}
            <div className='bg-gray-200 text-gray-800 w-full text-left p-2 text-xs flex items-center justify-between'>
              <div className='w-8 mr-3'>
                <FileIcon extension={ext} {...defaultStyles[ext]} />
              </div>
              <span>{`${item?.attributes?.height} x ${item?.attributes?.width}`}</span>
              {/* Action Button */}
              <div className='action'>
                <Link
                  className='btn btn-circle'
                  href={`${item.attributes.url}?download=true`}
                  rel='noopener noreferrer'
                  target='_blank'
                  download
                >
                  <ArrowDownTrayIcon className='h-6 w-6' />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

const ContentDocuments = ({ data = [] }: { data: Object[] }) => {
  return (
    <div className='grid grid-cols-1 gap-2'>
      {data.map((item, index) => {
        const ext = item.attributes.ext.toLowerCase().replace('.', '');
        return (
          <div
            key={index}
            className='relative rounded bg-gray-100 lg:flex items-center justify-between border-2 border-gray-300'
          >
            <p className='p-2 text-center lg:text-left'>
              {item?.attributes?.name ?? '---'}
            </p>
            <div className='flex items-center justify-between lg:justify-center bg-gray-200 p-2'>
              <div className='w-8'>
                <FileIcon extension={ext} {...defaultStyles[ext]} />
              </div>
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
        );
      })}
    </div>
  );
};

const Content = ({ type, data = [] }: { type: string; data: object[] }) => {
  let Comp = null;

  switch (type) {
    case 'assets.videos':
      Comp = <ContentVideos data={data.videos.data} links={data.videoLinks} />;
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
        {/* <button className='bg-red-1 text-white btn btn-xs border-none'>
          Descargar
          <ArrowDownTrayIcon className='h-4 w-4' />
        </button> */}
      </div>
      <div className='divider' />
      {data?.description && <p className='desc'>{data.description}</p>}
      <div className='content mt-10'>
        <Content type={data?.__component} data={data} />
      </div>
    </div>
  );
};

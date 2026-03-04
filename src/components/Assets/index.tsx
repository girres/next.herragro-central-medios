'use client';

import Image, { ImageLoader } from 'next/image';
import Link from 'next/link';
import { FileIcon, defaultStyles } from 'react-file-icon';
import {
  ArrowDownTrayIcon,
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
  PlayCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/solid';
import { useState } from 'react';
import clsx from 'clsx';

interface VideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  src,
  poster,
  className,
}) => {
  return (
    <div className={`relative w-full max-w-3xl mx-auto ${className ?? ''}`}>
      <video
        src={src}
        poster={poster}
        controls
        preload='metadata'
        playsInline
        className='w-full h-auto rounded-2xl shadow-lg'
        autoPlay
      >
        Tu navegador no soporta el elemento <code>video</code>.
      </video>
    </div>
  );
};

interface ImageGallery {
  id: number;
  position: number;
  attributes: {
    name: string;
    url: string;
    ext: string;
    alternativeText?: string;
    formats: {
      small: {
        url: string;
      };
    };
  };
}

interface Video {
  id: number;
  attributes: {
    name: string;
    url: string;
    ext: string;
  };
}

const cmsLoader: ImageLoader = ({ src, width, quality }) =>
  `${src}?w=${width}&q=${quality ?? 20}`;

const Icon = ({ type }: { type: string }) => {
  let src: string | null = null;

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
  data: Video[];
  links: Object[];
}) => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  return (
    <div className='grid grid-cols-1 gap-2'>
      {data &&
        data.length > 0 &&
        data.map((item: Video, index) => {
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
                <button
                  type='button'
                  className='btn btn-circle ml-4'
                  onClick={() => setSelectedVideo(item)}
                >
                  <PlayCircleIcon className='size-6' />
                </button>
                <Link
                  // href={item?.attributes?.url ?? '#'}
                  href={`/api/download?url=${encodeURIComponent(item.attributes.url)}&filename=${encodeURIComponent(item.attributes.name)}`}
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
        links.map((item: any, index) => {
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
      {selectedVideo && (
        <dialog id='video-modal' className='modal modal-open'>
          <div className='modal-box w-11/12 max-w-5xl p-0'>
            <div className='bg-gray-50 flex items-center justify-end w-full left-0 right-0 top-0 p-5'>
              <button onClick={() => setSelectedVideo(null)}>
                <XCircleIcon className='size-10' />
              </button>
            </div>
            <div className='p-10 flex flex-col items-center'>
              <h3 className='font-bold text-lg'>
                {selectedVideo.attributes?.name}
              </h3>
              <div className='relative'>
                <VideoPlayer src={selectedVideo.attributes.url} />
              </div>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

const ContentImages = ({ data = [] }: { data: ImageGallery[] }) => {
  const [loadComplete, setLoadComplete] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<ImageGallery | null>(null);
  return (
    <div className='grid grid-cols-2 lg:grid-cols-4 gap-2'>
      {data.map((item: ImageGallery, index: number) => {
        const ext = item.attributes.ext.toLowerCase().replace('.', '');
        return (
          <div
            key={index}
            className='relative rounded bg-gray-100 border-2 border-gray-300 cursor-pointer'
          >
            {/* Image Container */}
            <div
              className='relative box w-full h-[200px]'
              onClick={() =>
                setSelectedImage({
                  ...item,
                  position: index,
                })
              }
            >
              <Image
                src={item.attributes.formats.small.url}
                alt={item.attributes?.alternativeText || item.attributes.name}
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
              <span>{`${item?.attributes?.alternativeText || item?.attributes?.name}`}</span>
              {/* Action Button */}
              <div className='action'>
                <Link
                  className='btn btn-circle'
                  href={`/api/download?url=${encodeURIComponent(item.attributes.url)}&filename=${encodeURIComponent(item.attributes.name)}`}
                  rel='noopener noreferrer'
                  target='_blank'
                >
                  <ArrowDownTrayIcon className='h-6 w-6' />
                </Link>
              </div>
            </div>
          </div>
        );
      })}
      {selectedImage && (
        <dialog id='image-modal' className='modal modal-open'>
          <div className='modal-box w-11/12 max-w-5xl p-0'>
            <div className='bg-gray-50 flex items-center justify-between w-full left-0 right-0 top-0 p-5'>
              <div className='flex items-center gap-10'>
                <button
                  className='btn btn-xs'
                  disabled={selectedImage.position < 1}
                  onClick={() => {
                    setLoadComplete(false);
                    setSelectedImage({
                      ...data[selectedImage.position - 1],
                      position: selectedImage.position - 1,
                    });
                  }}
                >
                  <ArrowLeftCircleIcon className='size-5' />
                  Anterior
                </button>
                <button
                  className='btn btn-xs'
                  disabled={data.length === selectedImage.position + 1}
                  onClick={() => {
                    setLoadComplete(false);
                    setSelectedImage({
                      ...data[selectedImage.position + 1],
                      position: selectedImage.position + 1,
                    });
                  }}
                >
                  <ArrowRightCircleIcon className='size-5' />
                  Siguiente
                </button>
              </div>
              <button onClick={() => setSelectedImage(null)}>
                <XCircleIcon className='size-10' />
              </button>
            </div>
            <div className='p-10 flex flex-col items-center'>
              <h3 className='font-bold text-lg'>
                {selectedImage.attributes?.name}
              </h3>
              <div className='relative'>
                <Image
                  src={selectedImage.attributes.url}
                  alt='Modal'
                  width={800}
                  height={800}
                  quality={100}
                  className={clsx(
                    'max-w-[800px] h-auto w-full opacity-0',
                    loadComplete && 'opacity-100'
                  )}
                  loading='lazy'
                  loader={cmsLoader}
                  onLoad={() => setLoadComplete(true)}
                />
                {!loadComplete && (
                  <div
                    className={
                      'absolute h-full w-full bg-gray-100 animate-pulse z-20 top-0 bottom-0 left-0 right-0 rounded-xl min-h-[500px]'
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </dialog>
      )}
    </div>
  );
};

const ContentDocuments = ({ data = [] }: { data: any[] }) => {
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
                // href={item?.attributes?.url ?? '#'}
                href={`/api/download?url=${encodeURIComponent(item.attributes.url)}&filename=${encodeURIComponent(item.attributes.name)}`}
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

const Content = ({ type, data = {} }: { type: string; data: any }) => {
  let Comp: React.ReactNode | null = null;

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

export const AssetCard = ({ data = {} }: { data: any }) => {
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

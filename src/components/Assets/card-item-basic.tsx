import clsx from 'clsx';
import { AssetTypeProps } from '../Algolia/Panel';

import { IoMdImages as IconImage } from 'react-icons/io';
import { IoDocumentTextOutline as IconDoc } from 'react-icons/io5';
import { MdOutlineOndemandVideo as IconVideo } from 'react-icons/md';
import Link from 'next/link';
import { FaArrowRight } from 'react-icons/fa';

type AssetGroupProps = {
  video: boolean;
  image: boolean;
  document: boolean;
};

export const AssetType = ({ type, active = false }: AssetTypeProps) => {
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

export const AssetGroup = ({ video, image, document }: AssetGroupProps) => {
  return (
    <div className='flex items-center gap-3'>
      <AssetType type='video' active={video} />
      <AssetType type='image' active={image} />
      <AssetType type='document' active={document} />
    </div>
  );
};

export function CardItemBasic({ data }) {
  const assetsByType = {
    videos: [],
    images: [],
    documents: [],
  };

  data.assets?.forEach((asset) => {
    const type = asset.__component?.split('.')[1];
    if (assetsByType[type]) {
      assetsByType[type].push(asset);
    }
  });

  const extractTags = (items, subfields = []) =>
    items.flatMap((item) => {
      const tags = [item?.name].filter(Boolean);
      subfields.forEach((field) => {
        const subItems = item?.[field] || [];
        tags.push(
          ...subItems.map((sub) => sub.name || sub.label).filter(Boolean)
        );
      });
      return tags;
    });

  // Tags
  const videoTags = extractTags(assetsByType.videos, ['videos', 'videoLinks']);
  const imageTags = extractTags(assetsByType.images, ['images']);
  const docTags = extractTags(assetsByType.documents, ['documents']);
  const allTags = [...videoTags, ...imageTags, ...docTags];

  const hasImage = data.assets?.some(
    (asset) => asset.__component === 'assets.images'
  );
  const hasVideo = data.assets?.some(
    (asset) => asset.__component === 'arssets.videos'
  );
  const hasDocument = data.assets?.some(
    (asset) => asset.__component === 'assets.documents'
  );

  const { name, slug = '/', updatedAt } = data;

  return (
    <div className='asset-result-item text-xs lg:flex gap-2 justify-between items-end p-5 my-1 rounded-md w-full relative bg-white'>
      <div className='left lg:px-2 w-full lg:w-8/12'>
        <div className='text-[10px] leading-[10px] font-light text-gray-500 mb-1'>
          Actualizado el {new Date(updatedAt).toLocaleDateString()}
        </div>
        <div className='fontBold text-2xl'>{name}</div>
        <div className='flex flex-wrap gap-2 mt-2'>
          {allTags?.map((cat, index) => (
            <div
              key={index}
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

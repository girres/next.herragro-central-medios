import Image from 'next/image';

// Helper
import { dateFormat } from '@/helpers';

export const TitleAsset = ({
  title,
  date = null,
  tags = [],
}: {
  title: string;
  date?: string | null;
  tags?: string[];
}) => (
  <div className='title'>
    <h1>{title}</h1>
    {date && (
      <p className='text-xs font-medium text-gray-600 my-1'>{`Última actualización ${dateFormat(new Date(date))}`}</p>
    )}
    <div className='space-x-2'>
      {tags.map((tag, index) => (
        <div key={index} className='badge badge-warning text-xs'>
          {tag.name}
        </div>
      ))}
    </div>
  </div>
);

export const TitleBlog = ({
  title,
  author = {},
  date = null,
}: {
  title: string;
  author: object | {};
  date?: string | null;
}) => (
  <div className='title'>
    <h1>{title}</h1>
    {date && (
      <p className='text-xs text-gray-500 my-1'>{`Última actualización ${dateFormat(new Date(date))}`}</p>
    )}
    {author?.name && (
      <div className='flex items-center'>
        {author?.image?.data?.attributes?.url && (
          <Image
            src={author.image.data.attributes.url}
            alt={author.name}
            className='rounded-full h-8 w-8 object-cover inline-block mr-2 border-gray-500 border-[1px]'
            width='200'
            height='200'
          />
        )}
        <div className='my-1'>
          <p className='font-bold text-sm text-gray-600 my-0'>{author.name}</p>
          {author?.position && (
            <p className='font-medium text-xs text-gray-500 my-0'>
              {author.position}
            </p>
          )}
        </div>
      </div>
    )}
  </div>
);

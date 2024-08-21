import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { clsx } from 'clsx';

const Post = ({ data = {}, reverse = 0 }) => {
  const { id = null, attributes = {} } = data || {};
  const {
    title,
    uuid = '',
    slug = '',
    autor = {},
    summary = '',
    publishedAt = new Date(),
  } = attributes || {};

  const authorData = autor?.data?.attributes || {};
  const authorImage = authorData?.image?.data?.attributes || {};

  if (!id) {
    return null;
  }

  return (
    <article id={uuid} className={clsx('post-entry', reverse && 'reverse')}>
      <Link href={`/blog/${slug}`}>
        <div className='wrapper'>
          <div className='image'>
            <Image
              src={authorImage.url}
              alt={authorData.name}
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              sizes='100vw'
            />
          </div>
          <div className='content'>
            <p className='date'>{`Publicado el ${new Date(publishedAt).toLocaleDateString()}`}</p>
            <h3 className='title'>{title}</h3>
            {authorData?.name && <p className='author'>{authorData.name}</p>}
            {summary && <p className='summary'>{summary}</p>}
            <div className='button'>
              <span>Ver Más</span>
            </div>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default Post;

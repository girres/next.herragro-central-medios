import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// Services
import { getPostBySlug } from '@/services/strapi';

export default async function Page(props) {
  const { slug = '' } = props?.params || {};
  const data = await getPostBySlug(slug);

  // Author
  const authorData = data?.autor?.data?.attributes || {};

  // Image
  const image = data?.image?.data?.attributes || {};

  if (!data?.id) {
    return notFound();
  }

  console.log('🚀 ~ Page ~ POST:', data);

  return (
    <main className='main-content'>
      <div className='container py-5'>
        <div className='breadcrumbs text-xs text-gray-500'>
          <ul>
            <li>
              <Link href='/'>Inicio</Link>
            </li>
            <li>
              <Link href='/blog'>Blog</Link>
            </li>
            <li>{data?.title}</li>
          </ul>
        </div>
        {image?.url && (
          <Image
            src={image.url}
            width='1280'
            height='600'
            alt='Something'
            className='mx-auto mb-5 rounded-md'
          />
        )}
        <div className='max-w-[700px] mx-auto'>
          <h1 className='uppercase'>{data?.title ?? '---'}</h1>
          {authorData?.name && (
            <p className='font-medium text-lg text-gray-600 my-1'>
              Por {authorData.name} / {authorData.position}
            </p>
          )}
          <p className='text-xs text-gray-500 my-1'>
            Última actualización: {data?.updatedAt ?? '--'}
          </p>
          <div
            className='ckeditor description py-10 text-base'
            dangerouslySetInnerHTML={{ __html: data?.description || '' }}
          />
        </div>
      </div>
    </main>
  );
}

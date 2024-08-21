import Link from 'next/link';
import { notFound } from 'next/navigation';

// Services
import { getAssetBySlug } from '@/services/strapi';

export default async function Page(props) {
  const { slug = '' } = props?.params || {};
  const data = await getAssetBySlug(slug);
  const assets = data?.assets || [];
  const categories = data?.categories?.data
    ? data.categories.data.map((item) => ({
        id: item.id,
        ...item.attributes,
      }))
    : [];

  if (!data?.id) {
    return notFound();
  }

  console.log('🚀 ~ Page ~ ASSET:', data);

  return (
    <main className='main-content'>
      <div className='container'>
        <div className='breadcrumbs text-xs text-gray-500'>
          <ul>
            <li>
              <Link href='/'>Inicio</Link>
            </li>
            <li>
              <Link href='/asset'>Recursos</Link>
            </li>
            <li>{data.name}</li>
          </ul>
        </div>
        <h1>{data?.name ?? '--'}</h1>
        <p>Última actualización: {data?.publishedAt ?? '--'}</p>
        <p>{data?.description ?? '--'}</p>
        {categories.map((category, index) => (
          <p key={index} className='bg-pink-900'>
            {category.name}
          </p>
        ))}
        {assets.map((asset, index) => (
          <div key={index}>
            <h3>{asset?.name ?? '--'}</h3>
            <p>{asset?.__component ?? '--'}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

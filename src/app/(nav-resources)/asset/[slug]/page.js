import Link from 'next/link';
import { notFound } from 'next/navigation';

// Components
import { TitleAsset } from '@/components/Titles';
import { AssetCard } from '@/components/Assets';

// Services
import { getAssetBySlug } from '@/services/strapi';

export async function generateMetadata({ params }) {
  const { slug = '' } = params || {};
  const data = await getAssetBySlug(slug);

  return {
    title: `${data.name} | Hub Herragro`,
    description:
      'Accede a Hub de Herragro, tu plataforma para distribución de contenidos digitales: catálogos, manuales y recursos exclusivos',
    alternates: {
      canonical: `${process.env?.SITE_URL || 'http://localhost:3000'}/asset/${slug}`,
    },
  };
}

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

  return (
    <>
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
      <div className='pb-10'>
        <TitleAsset
          title={data?.name}
          date={data.publishedAt}
          tags={categories}
        />
      </div>
      <div className='space-y-10'>
        {assets.map((asset, index) => (
          <AssetCard key={index} data={asset} />
        ))}
      </div>
    </>
  );
}

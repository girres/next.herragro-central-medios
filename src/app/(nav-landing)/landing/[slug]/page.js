import { notFound } from 'next/navigation';
// import Image from 'next/image';
// import Link from 'next/link';
import { GoogleTagManager } from '@next/third-parties/google';

// Components
// import { TitleBlog } from '@/components/Titles';
import Hero from '@/components/Marketing/Hero.js';

// Services
import { getMarketingLandingBySlug as getDataBySlug } from '@/services/strapi';

export async function generateMetadata({ params }, parent) {
  const { slug = '' } = params || {};
  const data = await getDataBySlug(slug);
  const { seo = '' } = data || {};
  const { metaTitle = '', metaDescription = '', metaImage = {} } = seo || {};

  // Image
  const image = metaImage?.data?.attributes || {};

  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    title: `${metaTitle} | Hub Herragro`,
    description: metaDescription.substring(0, 150),
    openGraph: {
      images: [image.url, ...previousImages],
    },
    alternates: {
      canonical: `${process.env?.SITE_URL || 'http://localhost:3000'}/landing/${slug}`,
    },
  };
}

export default async function Page(props) {
  const { slug = '' } = props?.params || {};
  const data = await getDataBySlug(slug);
  const { hero = {} } = data || {};

  if (!data?.id) {
    return notFound();
  }

  return (
    <>
      {data?.gtm?.code && <GoogleTagManager gtmId={data?.gtm?.code} />}
      <main className='main-content'>
        <h1 className='hidden'>{data.title}</h1>
        <Hero
          title={hero?.title || null}
          description={hero?.description || null}
          backgroundImage={hero?.backgroundImage?.data?.attributes?.url || null}
          image={hero?.image?.data?.attributes || null}
          cta={hero?.cta || null}
          gtmReady={data?.gtm?.code || false}
          name={data?.name || null}
          social={hero?.social || []}
          ui={data?.ui || {}}
        />
      </main>
    </>
  );
}

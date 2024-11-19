import { GoogleAnalytics } from '@next/third-parties/google';
import Image from 'next/image';
// CSS
import '@/styles/globals.scss';

// Google Analytics TAG
const GTAG = process.env?.NEXT_PUBLIC_GA_ID_LANDING || null;

export const metadata = () => {
  return {
    title: 'Hub Herragro | Distribución de Contenidos Digitales',
    description:
      'Accede a Hub de Herragro, tu plataforma para distribución de contenidos digitales: catálogos, manuales y recursos exclusivos',
    openGraph: {
      images: '/images/SEO_CentralVirtual.jpg',
    },
    alternates: {
      canonical: process.env?.SITE_URL || 'http://localhost:3000',
    },
    metadataBase: new URL(process.env?.SITE_URL || 'http://localhost:3000'),
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
      },
    },
  };
};

export default function RootLayout({ children }) {
  return (
    <html lang='es'>
      <body>
        {children}
        <footer className='pt-20'>
          <div className='bg-[#ffd505]'>
            <div className='container'>
              <div className='flex items-center justify-center py-10 gap-10'>
                <Image
                  src='/images/herragro-red.png'
                  alt='Herragro'
                  width={150}
                  height={150}
                  className='max-w-[100px] lg:max-w-[150px]'
                />
                <Image
                  src='/images/QuedaDemostrado.png'
                  alt='Herragro'
                  width={150}
                  height={150}
                  className='max-w-[100px] lg:max-w-[150px]'
                />
              </div>
            </div>
          </div>
        </footer>
      </body>
      {GTAG && <GoogleAnalytics gaId={GTAG} />}
    </html>
  );
}

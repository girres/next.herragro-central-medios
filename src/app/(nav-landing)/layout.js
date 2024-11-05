import { GoogleAnalytics } from '@next/third-parties/google';

// CSS
import '@/styles/globals.scss';

// Components
import Header from '@/components/Header';

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
        <Header />
        {children}
      </body>
      {GTAG && <GoogleAnalytics gaId={GTAG} />}
    </html>
  );
}

// CSS
import '@/styles/globals.scss';
// import 'instantsearch.css/themes/satellite-min.css';

// Context Provider
import ContextProvider from '@/context/context-provider';

// Components
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { LatestPosts } from '@/components/Instagram';

export const metadata = () => {
  return {
    title: 'Central Virtual Herragro | Distribución de Contenidos Digitales',
    description:
      'Accede a Central Virtual de Herragro, tu plataforma para distribución de contenidos digitales: catálogos, manuales y recursos exclusivos',
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
        <ContextProvider>
          <Header />
          {children}
          <LatestPosts />
          <Footer />
        </ContextProvider>
      </body>
    </html>
  );
}

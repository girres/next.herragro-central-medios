// CSS
import '@/styles/globals.scss';
import 'instantsearch.css/themes/satellite-min.css';

// Context Provider
import ContextProvider from '@/context/context-provider';

// Components
import Header from '@/components/Header';

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <ContextProvider>
          <Header />
          {children}
          <footer>
            <p>Footer goes here</p>
          </footer>
        </ContextProvider>
      </body>
    </html>
  );
}

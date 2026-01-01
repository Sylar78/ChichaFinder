// Layout component - Wraps all pages
import Head from 'next/head';
import Header from './Header';
import Footer from './Footer';

export default function Layout({ children, title = 'ChichaAroundMe' }) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content="Trouvez les meilleurs bars à chicha près de vous" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </div>
    </>
  );
}

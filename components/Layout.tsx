import { useEffect } from 'react';
import Head from "next/head";
import Link from 'next/link';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  useEffect(() => {
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.body.classList.add("dark");
    }
  }, []);

  return (
    <div className="min-h-screen">
      <Head>
        <meta name="color-scheme" content="dark light" />
      </Head>
      <header>
        <nav className="container mx-auto max-w-2xl px-4 py-12">
          <p>
            <Link
              href="/"
              className="font-bold text-gray-900 visited:text-gray-900 dark:text-gray-300 dark:visited:text-gray-300"
            >
              uchinokot.com
            </Link>
          </p>
        </nav>
        {/* ヘッダーコンテンツ */}
      </header>
      <main className="">
        <div className="container mx-auto max-w-2xl px-4 py-12">{children}</div>
      </main>
      <footer className="mt-8">{/* フッターコンテンツ */}</footer>
    </div>
  );
}

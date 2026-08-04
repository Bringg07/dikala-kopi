import { Playfair_Display, Inter } from 'next/font/google';
import './globals.css';

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  metadataBase: new URL('https://dikalakopi.com'),
  title: {
    default: 'DIKALA KOPI S. PARMAN | Every Cup Tells A Story',
    template: '%s | DIKALA KOPI S. PARMAN',
  },
  description: 'Nikmati pengalaman ngopi terbaik dengan suasana hangat, menu berkualitas, dan tempat nyaman untuk bekerja atau berkumpul di S. Parman, Semarang.',
  keywords: ['Kopi Semarang', 'Dikala Kopi', 'Coffee Shop S. Parman', 'Café Nyaman Semarang', 'Reservasi Cafe Semarang'],
  authors: [{ name: 'DIKALA KOPI' }],
  creator: 'DIKALA KOPI',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: 'https://dikalakopi.com',
    title: 'DIKALA KOPI S. PARMAN | Every Cup Tells A Story',
    description: 'Nikmati pengalaman ngopi terbaik dengan suasana hangat dan menu berkualitas.',
    siteName: 'DIKALA KOPI',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24',
        width: 1200,
        height: 630,
        alt: 'DIKALA KOPI S. PARMAN',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DIKALA KOPI S. PARMAN',
    description: 'Nikmati pengalaman ngopi terbaik dengan suasana hangat di S. Parman.',
    images: ['https://images.unsplash.com/photo-1554118811-1e0d58224f24'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${playfair.variable} ${inter.variable}`}>
      <body 
        className="font-sans bg-cream text-espresso antialiased selection:bg-gold selection:text-white"
        suppressHydrationWarning={true}
      >
        {children}
      </body>
    </html>
  );
}
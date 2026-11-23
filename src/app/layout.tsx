import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Providers } from '@/components/layout/Providers'
import { PageTransition } from '@/components/layout/PageTransition'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Preloader } from '@/components/layout/Preloader'
import { JsonLd } from '@/components/layout/JsonLd'
import { site } from '@/data/site'

// Self-hosted with next/font/local so builds never depend on Google's CSS endpoint.
const serif = localFont({
  src: [
    { path: '../../src/fonts/cormorant-normal.woff2', weight: '300 700', style: 'normal' },
    { path: '../../src/fonts/cormorant-italic.woff2', weight: '300 700', style: 'italic' },
  ],
  variable: '--font-serif',
  display: 'swap',
})

const sans = localFont({
  src: '../../src/fonts/dm-sans-normal.woff2',
  weight: '400 700',
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.fullName} — ${site.tagline}`,
    template: `%s · ${site.fullName}`,
  },
  description: site.description,
  applicationName: site.fullName,
  keywords: ['Locale Lagos', 'Afro-Bohemian restaurant', 'Victoria Island restaurant', 'Lagos dining', 'Global meets local'],
  openGraph: {
    type: 'website',
    siteName: site.fullName,
    title: `${site.fullName} — ${site.tagline}`,
    description: site.description,
    url: site.url,
    locale: 'en_NG',
    images: [{ url: '/video/hero-poster.webp', width: 360, height: 640, alt: 'Locale Lagos dining space' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.fullName} — ${site.tagline}`,
    description: site.description,
    images: ['/video/hero-poster.webp'],
  },
  robots: { index: true, follow: true },
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#f3ebe0',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="grain">
        <JsonLd />
        <Providers>
          <Preloader />
          <Header />
          <PageTransition>
            <main id="main">{children}</main>
          </PageTransition>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

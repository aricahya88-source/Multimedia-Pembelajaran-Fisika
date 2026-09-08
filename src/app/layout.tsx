import type { Metadata, Viewport } from 'next';
import './globals.css';
import { AuthProvider } from '@/lib/auth';
import PwaRegister from '@/components/PwaRegister';

export const metadata: Metadata = {
  title: 'MPF — Multimedia Pembelajaran Fisika',
  description: 'LMS OBE berbasis proyek individu untuk mata kuliah Multimedia Pembelajaran Fisika.',
  manifest: '/manifest.webmanifest',
  icons: { icon:[{url:'/favicon.png',sizes:'64x64',type:'image/png'},{url:'/favicon.ico'}], apple:'/icon-192.png' }
};

export const viewport: Viewport = {
  themeColor:'#075EA8',
  width:'device-width',
  initialScale:1,
  viewportFit:'cover'
};

export default function RootLayout({children}:{children:React.ReactNode}) {
  return <html lang="id"><body><AuthProvider>{children}<PwaRegister/></AuthProvider></body></html>;
}

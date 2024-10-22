import type { Metadata } from 'next';
import { Nunito } from 'next/font/google';
import './globals.css';

const nunito = Nunito({
  subsets: ['latin'],
  variable: '--font-nunito',
});
export const metadata: Metadata = {
  title: 'MuseClub',
  description: 'MuseClub is a platform for people to share music with each other.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${nunito.variable} antialiased bg-app-background text-app-text min-h-dvh font-nunito flex flex-col items-center `}
      >
        {children}
      </body>
    </html>
  );
}

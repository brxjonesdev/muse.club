import type { Metadata } from 'next';
import { Rethink_Sans } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { AppStoreProvider } from '@/providers/app-store-provider';

const rethink = Rethink_Sans({
  subsets: ['latin'],
  variable: '--font-rethink',
});
export const metadata: Metadata = {
  title: 'Harmoniq',
  description: 'Harmoniq is a platform for people to share music with each other.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${rethink.variable} antialiased  min-h-dvh font-rethink flex flex-col items-center bg-background `}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <AppStoreProvider>{children}</AppStoreProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

import { cookies } from 'next/headers';
import type { Metadata } from 'next';
import './globals.css';

import { cn } from '@/lib/utils';
import Providers from './providers';

export const metadata: Metadata = {
  title: 'Crosslink - Dashboard',
  description:
    'A web-based application is designed to enhance the quality and structure of internship experiences for university and college students in Rwanda after they have secured placement.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const activeThemeValue = cookieStore.get('active_theme')?.value;
  const isScaled = activeThemeValue?.endsWith('-scaled');

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          'bg-background overscroll-none font-sans antialiased',
          activeThemeValue ? `theme-${activeThemeValue}` : '',
          isScaled ? 'theme-scaled' : '',
        )}
      >
        <Providers activeThemeValue={activeThemeValue}>{children}</Providers>
      </body>
    </html>
  );
}

'use client';

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { store, persistor } from '@/store';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { ActiveThemeProvider } from '@/components/active-theme';
import { Toaster } from 'react-hot-toast';

export default function Providers({
  children,
  activeThemeValue,
}: {
  children: React.ReactNode;
  activeThemeValue: string | undefined;
}) {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          enableColorScheme
        >
          <ActiveThemeProvider initialTheme={activeThemeValue}>
            <Toaster position="top-right" />
            {children}
          </ActiveThemeProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
}

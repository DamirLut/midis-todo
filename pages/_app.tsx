import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { createTheme, NextUIProvider } from '@nextui-org/react';
import { RecoilRoot } from 'recoil';
import RecoilNexus from 'recoil-nexus';
import React from 'react';
import Loading from 'components/Loading';
import dynamic from 'next/dynamic';

const lightTheme = createTheme({
  type: 'light',
});

const darkTheme = createTheme({
  type: 'dark',
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextThemesProvider
      defaultTheme="system"
      attribute="class"
      value={{
        light: lightTheme.className,
        dark: darkTheme.className,
      }}>
      <NextUIProvider>
        <RecoilRoot>
          <RecoilNexus />
          <Component {...pageProps} />
        </RecoilRoot>
      </NextUIProvider>
    </NextThemesProvider>
  );
}

export default dynamic(() => Promise.resolve(MyApp), {
  ssr: false,
});

import '@fontsource/roboto';
import 'react-multi-carousel/lib/styles.css';
import '../styles/globals.css';

import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { I18nextProvider } from 'react-i18next';
import { HydrationProvider, Client } from 'react-hydration-provider';

import i18n from 'src/i18n';
import { theme } from '../config/theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HydrationProvider>
      <I18nextProvider i18n={i18n}>
        <ChakraProvider theme={theme}>
          <Client>
            <Component {...pageProps} />
          </Client>
        </ChakraProvider>
      </I18nextProvider>
    </HydrationProvider>
  );
}

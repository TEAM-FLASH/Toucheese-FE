import Error from '@components/Error/Error.tsx';
import Loading from '@components/Loading/Loading.tsx';
import Toast from '@components/Toast/Toast.tsx';
import { Global, ThemeProvider } from '@emotion/react';
import GlobalStyles from '@styles/GlobalStyles';
import variables from '@styles/Variables';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, useDeferredValue, useEffect, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { RouterProvider } from 'react-router-dom';
import router from './routes.tsx';

const queryClient = new QueryClient();

function App() {
  const [isReady, setIsReady] = useState(false);
  const deferredReady = useDeferredValue(isReady);

  const skipLoading = sessionStorage.getItem('skipLoading');

  useEffect(() => {
    if (!skipLoading) {
      const timer = setTimeout(() => setIsReady(true), 1300);
      return () => clearTimeout(timer);
    } else {
      setIsReady(true);
      sessionStorage.removeItem('skipLoading');
    }
  }, [skipLoading]);

  return (
    <HelmetProvider>
      <ThemeProvider theme={variables}>
        <Global styles={GlobalStyles} />
        <QueryClientProvider client={queryClient}>
          <ErrorBoundary FallbackComponent={Error}>
            <Suspense fallback={<Loading />}>
              {!deferredReady ? (
                <Loading size="big" phrase="세상의 모든 사진관, 터치즈" />
              ) : (
                <RouterProvider router={router} />
              )}
              <Toast />
            </Suspense>
          </ErrorBoundary>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;

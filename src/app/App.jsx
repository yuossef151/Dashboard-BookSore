import { useEffect } from 'react';
import { RouterProvider } from 'react-router';
import { StoreProvider } from './hooks/useStore';
import { router } from '../routes';

export default function App() {
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const redirectedPath = queryParams.get('p');

    if (redirectedPath) {
      const cleanPath = '/Dashboard-BookSore' + redirectedPath;
      window.history.replaceState(null, null, cleanPath);
    }
  }, []);

  return (
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  );
}
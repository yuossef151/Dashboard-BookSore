import { RouterProvider } from 'react-router';
import { StoreProvider } from './hooks/useStore';
import { router } from '../routes';

export default function App() {
  return (
    <StoreProvider>
      <RouterProvider router={router} />
    </StoreProvider>
  );
}

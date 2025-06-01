import type { AppRouter } from '@monorepo-trpc-scaffold/api/index';
import { createTRPCProxyClient, httpBatchLink } from '@trpc/client';
import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpBatchLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    trpc.test.query().then(data => setMessage(data.message));
  }, []);

  return <h1>{message || 'Loading...'}</h1>;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

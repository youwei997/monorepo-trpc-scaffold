import type { AppRouter } from '@monorepo-trpc-scaffold/api/index';
import { createTRPCProxyClient, httpLink } from '@trpc/client';
import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';

const trpc = createTRPCProxyClient<AppRouter>({
  links: [
    httpLink({
      url: 'http://localhost:3000/trpc',
    }),
  ],
});

function App() {
  const [message, setMessage] = useState('');

  useEffect(() => {
    trpc.test.query().then(data => {
      console.log('Received data:', data);

      setMessage(data.message);
    });
  }, []);

  return <h1>{message || 'Loading...'}</h1>;
}

createRoot(document.getElementById('root')!).render(<App />);

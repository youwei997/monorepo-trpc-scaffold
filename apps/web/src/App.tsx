import { greet } from '@monorepo-trpc-scaffold/shared/utils';
import { useEffect, useState } from 'react';
import { trpc } from './trpc';

function App() {
  const [message, setMessage] = useState('');
  const [user, setUser] = useState<any>(null);
  const [newUser, setNewUser] = useState<any>(null);

  useEffect(() => {
    trpc.test.query().then(data => {
      setMessage(data.message);
    });
    trpc.getUser.query({ id: 1 }).then(data => {
      setUser(data);
    });
    trpc.createUser
      .mutate({ name: 'John Doe', email: 'john@example.com' })
      .then(data => {
        setNewUser(data);
      });
  }, []);

  return (
    <div>
      <h1>{greet(message) || 'Loading...'}</h1>
      <p>User: {user ? user.name || user.error : 'Loading user...'}</p>
      <p>New User: {newUser ? newUser.name : 'Creating user...'}</p>
    </div>
  );
}

export default App;

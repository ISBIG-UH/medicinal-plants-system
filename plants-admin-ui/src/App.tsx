import { useEffect, useState } from 'react';
import apiClient from './api'

interface User {
  id: number;
  name: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
      apiClient.get<User[]>("/users")
          .then((response) => setUsers(response.data))
          .catch((error) => console.error("Error fetching users:", error));
  }, []);

  return (
    <>
      <h1 className='text-4xl'>Admin project</h1>
      {users.map((user) => (
        <p key={user.id}>
          {user.name}
        </p>
      ))}
    </>
  )
}

export default App

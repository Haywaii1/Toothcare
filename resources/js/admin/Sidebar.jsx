import React, { useEffect, useState } from 'react';
import axios from '../api/chatApi';

const Sidebar = ({ onUserSelect }) => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('/chat/users').then(res => setUsers(res.data));
  }, []);

  return (
    <div className="w-1/4 bg-white border-r p-4 overflow-y-auto">
      <h2 className="text-lg font-bold mb-4">Chats</h2>
      {users.map(user => (
        <div
          key={user.id}
          onClick={() => onUserSelect(user)}
          className="p-2 hover:bg-gray-100 cursor-pointer rounded"
        >
          <p className="font-medium">{user.name}</p>
          <p className="text-xs text-gray-500">{user.email}</p>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;

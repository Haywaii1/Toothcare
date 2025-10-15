import React, { useEffect, useState } from 'react';
import axios from '../api/chatApi';
import MessageInput from './MessageInput';

const ChatWindow = ({ user }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get(`/chats/${user.id}`).then(res => setMessages(res.data));
  }, [user]);

  const handleSend = async (text) => {
    const res = await axios.post('/chats/send', { message: text, user_id: user.id });
    setMessages(prev => [...prev, res.data.data]);
  };

  return (
    <div className="flex flex-col h-full">
      <div className="border-b p-4 font-semibold bg-white">
        Chat with {user.name}
      </div>

      <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
        {messages.map((msg, i) => (
          <div key={i} className={`mb-2 flex ${msg.is_admin ? 'justify-end' : 'justify-start'}`}>
            <div className={`px-3 py-2 rounded-lg max-w-xs ${msg.is_admin ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}>
              {msg.message}
            </div>
          </div>
        ))}
      </div>

      <MessageInput onSend={handleSend} />
    </div>
  );
};

export default ChatWindow;

import React, { useState } from 'react';

const MessageInput = ({ onSend }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onSend(text);
    setText('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex p-4 border-t bg-white">
      <input
        type="text"
        className="flex-1 border rounded-lg p-2 outline-none"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button className="ml-2 bg-blue-600 text-white px-4 py-2 rounded-lg">Send</button>
    </form>
  );
};

export default MessageInput;

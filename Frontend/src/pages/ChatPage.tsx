import React, { useState } from 'react';
import axios from 'axios';

const ChatPage: React.FC = () => {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse('');
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL}/chat`, { message });
      setResponse(res.data.response);
    } catch (err: any) {
      setResponse('Error: ' + (err.response?.data?.detail || err.message));
    }
    setLoading(false);
  };

  return (
    <div className="p-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">AI Chat Assistant</h2>
      <form onSubmit={handleSend} className="flex gap-2 mb-4">
        <input
          type="text"
          value={message}
          onChange={e => setMessage(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Ask a question..."
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded" disabled={loading}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
      {response && <div className="bg-gray-100 p-4 rounded shadow">{response}</div>}
    </div>
  );
};

export default ChatPage; 
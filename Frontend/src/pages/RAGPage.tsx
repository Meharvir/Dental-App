import React, { useState } from 'react';
import axios from 'axios';

interface Document {
  id: string;
  title: string;
  content: string;
  uploaded_at: string;
}

const RAGPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Document[]>([]);
  const [uploadMsg, setUploadMsg] = useState('');

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/rag/upload`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setUploadMsg('Upload successful!');
    } catch {
      setUploadMsg('Upload failed.');
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/rag/search`, { params: { query } });
      setResults(res.data);
    } catch {
      setResults([]);
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Document Search (RAG)</h2>
      <form onSubmit={handleUpload} className="mb-6 flex gap-2 items-center">
        <input type="file" onChange={e => setFile(e.target.files?.[0] || null)} />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Upload</button>
        {uploadMsg && <span className="ml-2">{uploadMsg}</span>}
      </form>
      <form onSubmit={handleSearch} className="mb-4 flex gap-2">
        <input
          type="text"
          value={query}
          onChange={e => setQuery(e.target.value)}
          className="flex-1 p-2 border rounded"
          placeholder="Search documents..."
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Search</button>
      </form>
      <ul className="space-y-2">
        {results.map(doc => (
          <li key={doc.id} className="p-4 bg-white rounded shadow">
            <b>{doc.title}</b>
            <div className="text-xs text-gray-500">{doc.uploaded_at}</div>
            <div className="mt-2 whitespace-pre-wrap">{doc.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RAGPage; 
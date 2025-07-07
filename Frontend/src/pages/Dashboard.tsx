import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Dental Office Admin Dashboard</h1>
      <nav className="flex flex-col gap-4">
        <Link to="/chat" className="text-blue-600 underline">AI Chat Assistant</Link>
        <Link to="/appointments" className="text-blue-600 underline">Appointments</Link>
        <Link to="/rag" className="text-blue-600 underline">Document Search (RAG)</Link>
      </nav>
    </div>
  );
};

export default Dashboard; 
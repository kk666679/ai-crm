import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DocumentForm from './components/DocumentForm';
import DocumentList from './components/DocumentList';
import './App.css';

function App() {
  const [documents, setDocuments] = useState([]);

  const handleNewDoc = (doc) => {
    setDocuments([...documents, doc]);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Sidebar />
        <DocumentForm onNewDoc={handleNewDoc} />
        <DocumentList documents={documents} />
      </div>
    </div>
  );
}

export default App

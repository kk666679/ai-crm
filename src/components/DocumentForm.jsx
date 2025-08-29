import React, { useState } from 'react';
import api from '../api/client';

export default function DocumentForm({ onNewDoc }) {
  const [template, setTemplate] = useState("Company Profile");
  const [context, setContext] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const res = await api.post("/api/documents/generate", {
        template,
        context: { description: context },
      });
      onNewDoc(res.data);
      setContext(""); // Clear context after successful generation
    } catch (err) {
      setError(err.response?.data?.error || "Failed to generate document");
      console.error("Document generation error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md p-6 rounded-lg mb-6">
      <h3 className="text-lg font-semibold mb-4">Generate Compliance Document</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Template
        </label>
        <select
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option>Company Profile</option>
          <option>Employee Handbook</option>
          <option>NDA</option>
          <option>Privacy Policy</option>
          <option>Terms of Service</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Context
        </label>
        <textarea
          value={context}
          onChange={(e) => setContext(e.target.value)}
          placeholder="Describe your company, industry, specific requirements..."
          rows={4}
          className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading || !context.trim()}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Generating...' : 'Generate Document'}
      </button>
    </form>
  );
}

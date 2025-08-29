import React from 'react';

export default function DocumentList({ documents }) {
  if (documents.length === 0) {
    return (
      <div className="bg-white shadow-md p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Generated Documents</h3>
        <p className="text-gray-500 text-center py-8">
          No documents generated yet. Use the form above to create your first compliance document.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md p-6 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Generated Documents</h3>
      
      <div className="space-y-4">
        {documents.map((doc, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-3">
              <h4 className="font-medium text-blue-600">
                Document #{index + 1}
              </h4>
              <span className="text-sm text-gray-500">
                {new Date().toLocaleDateString()}
              </span>
            </div>
            
            <div className="mb-3">
              <p className="text-sm text-gray-600 mb-2">
                <strong>Status:</strong> 
                <span className="ml-2 text-green-600">Generated Successfully</span>
              </p>
              
              {doc.url && (
                <p className="text-sm text-gray-600">
                  <strong>Storage URL:</strong> 
                  <a 
                    href={doc.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="ml-2 text-blue-600 hover:underline"
                  >
                    View Document
                  </a>
                </p>
              )}
            </div>

            <div className="bg-gray-50 p-3 rounded">
              <h5 className="text-sm font-medium mb-2 text-gray-700">Preview:</h5>
              <p className="text-sm text-gray-600 line-clamp-3">
                {doc.draft.length > 150 ? doc.draft.substring(0, 150) + '...' : doc.draft}
              </p>
            </div>

            <div className="mt-3 flex space-x-2">
              <button className="text-sm bg-blue-100 text-blue-700 px-3 py-1 rounded hover:bg-blue-200">
                Download
              </button>
              <button className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded hover:bg-green-200">
                Copy to CRM
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

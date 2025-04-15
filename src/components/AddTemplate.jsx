import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AddTemplate({ addTemplate }) {
  const [templateName, setTemplateName] = useState('');
  const [templateModule, setTemplateModule] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTemplate = {
      id: Date.now(), // Generate a unique ID
      name: templateName,
      module: templateModule,
    };
    addTemplate(newTemplate);
    navigate('/');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Add New Template</h1>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto bg-white p-6 rounded shadow">
        <div className="mb-4">
          <label htmlFor="templateName" className="block text-sm font-medium text-gray-700">
            Template Name
          </label>
          <input
            type="text"
            id="templateName"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="templateModule" className="block text-sm font-medium text-gray-700">
            Template Module
          </label>
          <input
            type="text"
            id="templateModule"
            value={templateModule}
            onChange={(e) => setTemplateModule(e.target.value)}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          Add Template
        </button>
      </form>
    </div>
  );
}

export default AddTemplate;
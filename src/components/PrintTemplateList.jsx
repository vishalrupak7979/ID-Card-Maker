import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Pencil, Eye, Trash } from 'lucide-react';
import TopMenuBar from './TopMenuBar';
import Pagination from './Pagination'; // Import the Pagination component

const PrintTemplateList = ({ templates }) => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const templatesPerPage = 8;

  // Calculate the templates to display on the current page
  const indexOfLastTemplate = currentPage * templatesPerPage;
  const indexOfFirstTemplate = indexOfLastTemplate - templatesPerPage;
  const currentTemplates = templates.slice(indexOfFirstTemplate, indexOfLastTemplate);

  const totalPages = Math.ceil(templates.length / templatesPerPage);

  const handleAddTemplate = () => {
    navigate('/add-template');
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-[#0B1120] min-h-screen flex flex-col text-white">
      {/* Use the TopMenuBar component */}
      <TopMenuBar />

      {/* Page Content */}
      <div className="flex-grow p-4 md:p-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 gap-4">
          <div>
            <h1 className="text-2xl font-semibold">Print Template</h1>
            <p className="text-sm text-gray-400">System Management</p>
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">Refresh</button>
            <button className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600">Delete</button>
            <button onClick={handleAddTemplate} className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500">Add Template</button>
          </div>
        </div>

        {/* Template Table */}
        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full text-sm text-left bg-[#111827]">
            <thead>
              <tr className="border-b border-gray-700 text-gray-300">
                <th className="p-3"><input type="checkbox" /></th>
                <th className="p-3">Template Name</th>
                <th className="p-3">Module</th>
                <th className="p-3 text-center">Operations</th>
              </tr>
            </thead>
            <tbody>
              {currentTemplates.map((template) => (
                <tr key={template.id} className="border-b border-gray-800 hover:bg-[#1F2937] transition">
                  <td className="p-3"><input type="checkbox" /></td>
                  <td className="p-3">{template.name}</td>
                  <td className="p-3">{template.module}</td>
                  <td className="p-3 text-center flex gap-3 justify-center">
                    <button><Pencil size={16} className="text-yellow-400 hover:text-yellow-300" /></button>
                    <button><Eye size={16} className="text-blue-400 hover:text-blue-300" /></button>
                    <button><Trash size={16} className="text-red-400 hover:text-red-300" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-auto">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default PrintTemplateList;

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrintTemplateList from './components/PrintTemplateList';
import AddTemplate from './components/AddTemplate';

function App() {
  const [templates, setTemplates] = useState([
    { id: 1, name: 'ID Card', module: 'Personnel' },
    { id: 2, name: 'Visitor Receipt', module: 'Visitor' },
    { id: 3, name: 'Visitor Print Card', module: 'Visitor' },
    { id: 4, name: 'Personnel Print Card', module: 'Personnel' },
    { id: 5, name: 'Personnel Print Card', module: 'Personnel' },
    { id: 6, name: 'Personnel Print Card', module: 'Personnel' },
  
   ]);

  const addTemplate = (newTemplate) => {
    setTemplates((prevTemplates) => [...prevTemplates, newTemplate]);
  };

  return (
    <Router>
      <div className="bg-[#0B1120] min-h-screen text-white">
        <Routes>
          <Route path="/" element={<PrintTemplateList templates={templates} />} />
          <Route path="/add-template" element={<AddTemplate addTemplate={addTemplate} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

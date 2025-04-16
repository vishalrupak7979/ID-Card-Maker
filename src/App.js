import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PrintTemplateList from './components/PrintTemplateList';
import AddTemplate from './components/AddTemplate';

function App() {
  const [templates, setTemplates] = useState([
    { id: 1, name: 'ID Card', module: 'Personnel', orientation: 'Vertical', elements: [] },
    { id: 2, name: 'Visitor Receipt', module: 'Visitor', orientation: 'Horizontal', elements: [] },
    { id: 3, name: 'Visitor Print Card', module: 'Visitor', orientation: 'Vertical', elements: [] },
    { id: 4, name: 'Personnel Print Card', module: 'Personnel', orientation: 'Horizontal', elements: [] },
    { id: 5, name: 'Personnel Print Card', module: 'Personnel', orientation: 'Vertical', elements: [] },
    { id: 6, name: 'Personnel Print Card', module: 'Personnel', orientation: 'Horizontal', elements: [] },
  ]);

  return (
    <Router>
      <div className="bg-[#0B1120] min-h-screen text-white">
        <Routes>
          <Route path="/" element={<PrintTemplateList templates={templates} setTemplates={setTemplates} />} />
          <Route path="/add-template" element={<AddTemplate setTemplates={setTemplates} templates={templates} />} />
          <Route path="/edit-template/:id" element={<AddTemplate setTemplates={setTemplates} templates={templates} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Rnd } from 'react-rnd';
import FieldSelectorModal from './FieldSelectorModule';
import TopMenuBar from './TopMenuBar';
import { useParams, useNavigate } from 'react-router-dom';

const AddTemplate = ({ setTemplates, templates }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [templateName, setTemplateName] = useState('');
  const [moduleName, setModuleName] = useState('Personnel');
  const [orientation, setOrientation] = useState('Vertical');
  const [isFrontView, setIsFrontView] = useState(true);
  const [elements, setElements] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [fontSize, setFontSize] = useState(12);
  const [topMargin, setTopMargin] = useState(0);
  const [leftMargin, setLeftMargin] = useState(0);
  const currentSide = isFrontView ? 'front' : 'back';
  const [fieldOptions, setFieldOptions] = useState([
    'Personnel ID', 'Name', 'Department', 'Hire Date', 'Gender', 'Mobile Number',
    'Photo', 'Email', 'Birthday', 'Card Number', 'Position'
  ]);
  const [isFieldSelectorOpen, setIsFieldSelectorOpen] = useState(false);
  const [selectedFields, setSelectedFields] = useState([]);
  const [activeField, setActiveField] = useState(null);
  const [usedFields, setUsedFields] = useState([]);

  useEffect(() => {
    if (id) {
      const templateToEdit = templates.find((template) => template.id === parseInt(id));
      if (templateToEdit) {
        setTemplateName(templateToEdit.name);
        setModuleName(templateToEdit.module);
        setOrientation(templateToEdit.orientation);
        setElements(templateToEdit.elements || []); // Ensure elements are set correctly
      }
    }
  }, [id, templates]);

  const addField = (field) => {
    const newElement = {
      id: uuidv4(),
      type: 'field',
      field,
      x: leftMargin,
      y: topMargin,
      fontSize,
      side: currentSide
    };
    setElements([...elements, newElement]);
  };

  const addImage = (src) => {
    const newElement = {
      id: uuidv4(),
      type: 'image',
      src,
      x: leftMargin,
      y: topMargin,
      width: 60,
      height: 60,
      side: currentSide
    };
    setElements([...elements, newElement]);
  };

  const setBackground = (src) => {
    const filteredElements = elements.filter(el => !(el.type === 'background' && el.side === currentSide));
    const backgroundElement = {
      id: uuidv4(),
      type: 'background',
      src,
      x: 0,
      y: 0,
      width: '100%',
      height: '100%',
      side: currentSide
    };
    setElements([...filteredElements, backgroundElement]);
  };

  const handleStop = (e, d, id) => {
    setElements(prev =>
      prev.map(el =>
        el.id === id
          ? {
            ...el,
            x: d.x,
            y: d.y,
            width: d.width || el.width,
            height: d.height || el.height
          }
          : el
      )
    );
  };

  const handleImageUpload = (e, isBackground = false) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        isBackground ? setBackground(event.target.result) : addImage(event.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddFields = () => {
    setFieldOptions([...fieldOptions, ...selectedFields]);
    setSelectedFields([]);
    setIsFieldSelectorOpen(false);
  };

  const handleFieldClick = (field) => {
    if (usedFields.includes(field)) return;
    setActiveField(field);
    setTextInput('');
  };

  const handleInsertText = () => {
    if (activeField && textInput.trim()) {
      addField(textInput);
      setUsedFields([...usedFields, activeField]);
      setActiveField(null);
      setTextInput('');
    }
  };

  const handleConfirm = () => {
    if (!templateName.trim()) {
      alert('Template name is required!');
      return;
    }

    if (id) {
      // Edit existing template
      setTemplates((prevTemplates) =>
        prevTemplates.map((template) =>
          template.id === parseInt(id)
            ? { ...template, name: templateName, module: moduleName, orientation, elements }
            : template
        )
      );
    } else {
      // Add new template
      const newTemplate = {
        id: uuidv4(),
        name: templateName,
        module: moduleName,
        orientation,
        elements,
      };
      setTemplates((prevTemplates) => [...prevTemplates, newTemplate]);
    }

    navigate('/');
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      <TopMenuBar />

      {/* Content */}
      <div className="flex-grow p-4">
        <div className="mb-4 flex items-center">
          <button
            className="text-blue-400 mr-5"
            onClick={() => navigate('/')}
          >
            ←
          </button>
          <h2 className="text-xl font-bold">{id ? 'Edit Template' : 'Add New Template'}</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <input
            className="col-span-1 p-2 bg-gray-800 border border-gray-600 rounded w-full"
            placeholder="Template Name"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
          />
          <select
            className="col-span-1 p-2 bg-gray-800 border border-gray-600 rounded w-full"
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
          >
            <option value="Personnel">Personnel</option>
            <option value="Visitor">Visitor</option>
          </select>
          <div className="col-span-1 flex items-center gap-4">
            <label>
              <input
                type="radio"
                value="Vertical"
                checked={orientation === 'Vertical'}
                onChange={() => setOrientation('Vertical')}
              /> Vertical
            </label>
            <label>
              <input
                type="radio"
                value="Transverse"
                checked={orientation === 'Transverse'}
                onChange={() => setOrientation('Transverse')}
              /> Transverse
            </label>
          </div>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-[${orientation === 'Vertical' ? '30%' : '40%'}_${orientation === 'Vertical' ? '70%' : '60%'}] gap-4`}>
          <div className="bg-gray-800 p-4 rounded">
            <div className="flex gap-4 mb-4">
              <button
                className={`px-4 py-2 ${isFrontView ? 'bg-blue-500' : 'bg-gray-600'} rounded`}
                onClick={() => setIsFrontView(true)}
              >Front</button>
              <button
                className={`px-4 py-2 ${!isFrontView ? 'bg-blue-500' : 'bg-gray-600'} rounded`}
                onClick={() => setIsFrontView(false)}
              >Back</button>
            </div>
            <div className="h-[400px] bg-black relative overflow-hidden">
              {elements
                .filter(el => el.side === currentSide)
                .map(el => el.type === 'background' ? (
                  <img
                    key={el.id}
                    src={el.src}
                    alt="background"
                    className="absolute w-full h-full object-cover"
                  />
                ) : (
                  <Rnd
                    key={el.id}
                    default={{ x: el.x, y: el.y, width: el.width || 'auto', height: el.height || 'auto' }}
                    enableResizing={el.type !== 'field'}
                    onDragStop={(e, d) => handleStop(e, d, el.id)}
                    onResizeStop={(e, direction, ref, delta, position) =>
                      handleStop(e, { ...position, width: ref.offsetWidth, height: ref.offsetHeight }, el.id)}
                  >
                    <div className="absolute" style={{ fontSize: el.fontSize }}>
                      {el.type === 'field' && <span>{el.field}</span>}
                      {el.type === 'image' && (
                        <img src={el.src} alt="img" className="w-full h-full object-cover rounded-full" />
                      )}
                    </div>
                  </Rnd>
                ))}
            </div>
          </div>

          <div className="bg-gray-800 p-4 rounded">
            <div className="flex flex-wrap gap-4 mb-4">
              <input type="number" placeholder="Left Margin" value={leftMargin} onChange={(e) => setLeftMargin(parseInt(e.target.value))} className="p-2 bg-gray-700 border border-gray-600 rounded" />
              <input type="number" placeholder="Top Margin" value={topMargin} onChange={(e) => setTopMargin(parseInt(e.target.value))} className="p-2 bg-gray-700 border border-gray-600 rounded" />
              <input type="text" placeholder={activeField ? `Enter value for \"${activeField}\"` : "Text"} value={textInput} disabled={!activeField} onChange={(e) => setTextInput(e.target.value)} className={`p-2 border border-gray-600 rounded ${activeField ? 'bg-gray-700' : 'bg-gray-900 text-gray-500'}`} />
              <div className="flex items-center gap-2">
                <button onClick={() => setFontSize(fontSize - 1)} className="px-2 py-1 bg-gray-700 rounded">-</button>
                <input type="number" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))} className="w-12 text-center bg-transparent border-b border-white text-white" />
                <button onClick={() => setFontSize(fontSize + 1)} className="px-2 py-1 bg-gray-700 rounded">+</button>
              </div>
            </div>

            <h1 className='mb-5 text-1xl font-bold'>Select Field</h1>
            <div className="flex flex-wrap gap-2 mb-4">
              {fieldOptions.map(field => (
                <button
                  key={field}
                  disabled={usedFields.includes(field)}
                  className={`px-3 py-1 rounded ${usedFields.includes(field) ? 'bg-blue-500 text-white cursor-not-allowed' : activeField === field ? 'bg-blue-400 text-white' : 'bg-gray-700 hover:bg-blue-500'}`}
                  onClick={() => handleFieldClick(field)}
                >
                  {field}
                </button>
              ))}
              <button onClick={() => setIsFieldSelectorOpen(true)} className="bg-gray-700 px-3 py-1 rounded hover:bg-blue-500 flex items-center">
                <span className="text-white">+</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-4 mb-4">
              <label className="underline cursor-pointer">
                Insert Picture
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, false)} className="hidden" />
              </label>
              <label className="underline cursor-pointer">
                Insert Background Picture
                <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, true)} className="hidden" />
              </label>
              <button onClick={handleInsertText} className="underline disabled:opacity-50" disabled={!activeField || !textInput.trim()}>
                Insert Text
              </button>
              <button onClick={() => addField('______')} className="underline">Insert Underscore</button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto flex justify-center gap-4 p-4 bg-gray-800">
        <button
          className="px-4 py-2 border border-gray-500 rounded w-full md:w-auto"
          onClick={() => navigate('/')}
        >
          Cancel
        </button>
        <button
          className="px-4 py-2 bg-blue-600 rounded w-full md:w-auto"
          onClick={handleConfirm}
        >
          Confirm
        </button>
      </div>

      <FieldSelectorModal
        isOpen={isFieldSelectorOpen}
        onClose={() => setIsFieldSelectorOpen(false)}
        onConfirm={handleAddFields}
        selected={selectedFields}
        setSelected={setSelectedFields}
      />
    </div>
  );
};

export default AddTemplate;

import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Rnd } from 'react-rnd';

const fieldOptions = [
  'Personnel ID', 'Name', 'Department', 'Hire Date', 'Gender', 'Mobile Number',
  'Photo', 'Email', 'Birthday', 'Card Number', 'Position'
];

const AddTemplate = () => {
  const [templateName, setTemplateName] = useState('');
  const [moduleName, setModuleName] = useState('Personnel');
  const [orientation, setOrientation] = useState('Vertical');
  const [isFrontView, setIsFrontView] = useState(true);
  const [elements, setElements] = useState([]);
  const [textInput, setTextInput] = useState('');
  const [fontSize, setFontSize] = useState(12);
  const [topMargin, setTopMargin] = useState(0);
  const [leftMargin, setLeftMargin] = useState(0);

  const addField = (field) => {
    const newElement = {
      id: uuidv4(),
      type: 'field',
      field,
      x: leftMargin,
      y: topMargin,
      fontSize,
      side: isFrontView ? 'front' : 'back'
    };
    setElements([...elements, newElement]);
  };

  const addImage = () => {
    const newElement = {
      id: uuidv4(),
      type: 'image',
      x: leftMargin,
      y: topMargin,
      width: 60,
      height: 60,
      side: isFrontView ? 'front' : 'back'
    };
    setElements([...elements, newElement]);
  };

  const addBackground = () => {
    const newElement = {
      id: uuidv4(),
      type: 'background',
      x: leftMargin,
      y: topMargin,
      width: 60,
      height: 60,
      side: isFrontView ? 'front' : 'back'
    };
    setElements([...elements, newElement]);
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

  return (
    <>
    <div className="p-4 bg-gray-900 text-white  flex flex-col">
      {/* Header */}
      <div className="mb-4 flex items-center">
        <button className="text-blue-400 mr-5">←</button>
        <h2 className="text-xl font-bold">Add New Template</h2>
      </div>

      {/* Main Content */}
      <div className="flex-grow overflow-y-auto">
        <div className="grid grid-cols-3 gap-4 mb-4">
          <input
            className="col-span-1 p-2 bg-gray-800 border border-gray-600 rounded"
            placeholder="Template Name"
            value={templateName}
            onChange={(e) => setTemplateName(e.target.value)}
          />
          <select
            className="col-span-1 p-2 bg-gray-800 border border-gray-600 rounded"
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
          >
            <option value="Personnel">Personnel</option>
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

        <div className="grid grid-cols-5 gap-4">
          {/* Left Side */}
          <div className="col-span-2 bg-gray-800 p-4 rounded">
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
            <div className="h-[400px] bg-black relative">
              {elements
                .filter(el => el.side === (isFrontView ? 'front' : 'back'))
                .map(el => (
                  <Rnd
                    key={el.id}
                    default={{
                      x: el.x,
                      y: el.y,
                      width: el.type === 'field' ? 'auto' : el.width,
                      height: el.type === 'field' ? 'auto' : el.height
                    }}
                    enableResizing={el.type !== 'field'}
                    onDragStop={(e, d) => handleStop(e, d, el.id)}
                    onResizeStop={(e, direction, ref, delta, position) =>
                      handleStop(e, { ...position, width: ref.offsetWidth, height: ref.offsetHeight }, el.id)
                    }
                  >
                    <div className="absolute" style={{ fontSize: el.fontSize }}>
                      {el.type === 'field' && <span>{el.field}</span>}
                      {el.type === 'image' && (
                        <div className="rounded-full bg-white w-full h-full"></div>
                      )}
                      {el.type === 'background' && (
                        <div className="rounded-full bg-white opacity-30 w-full h-full"></div>
                      )}
                    </div>
                  </Rnd>
                ))}
            </div>
          </div>

          {/* Right Side */}
          <div className="col-span-3 bg-gray-800 p-4 rounded">
            <div className="grid grid-cols-3 gap-2 mb-4">
              <input
                type="number"
                placeholder="Left Margin"
                value={leftMargin}
                onChange={(e) => setLeftMargin(parseInt(e.target.value))}
                className="p-2 bg-gray-700 border border-gray-600 rounded"
              />
              <input
                type="number"
                placeholder="Top Margin"
                value={topMargin}
                onChange={(e) => setTopMargin(parseInt(e.target.value))}
                className="p-2 bg-gray-700 border border-gray-600 rounded"
              />
              <input
                type="text"
                placeholder="Text"
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                className="p-2 bg-gray-700 border border-gray-600 rounded"
              />
            </div>

            <div className="flex items-center gap-4 mb-4">
              <span>Font</span>
              <button onClick={() => setFontSize(fontSize - 1)}>-</button>
              <span>{fontSize}</span>
              <button onClick={() => setFontSize(fontSize + 1)}>+</button>
            </div>

            <div className="flex flex-wrap gap-2 mb-4">
              {fieldOptions.map(field => (
                <button
                  key={field}
                  className="bg-gray-700 px-3 py-1 rounded hover:bg-blue-500"
                  onClick={() => addField(field)}
                >{field}</button>
              ))}
            </div>

            <div className="flex gap-4 mb-4">
              <button onClick={addImage} className="underline">Insert Picture</button>
              <button onClick={addBackground} className="underline">Insert Background Picture</button>
              <button onClick={() => addField(textInput)} className="underline">Insert Text</button>
              <button onClick={() => addField('__________')} className="underline">Insert Underscore</button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
    
    </div>
    <div className="mt-auto flex justify-center gap-4 p-4 bg-gray-800">
        <button className="px-4 py-2 border border-gray-500 rounded">Cancel</button>
        <button className="px-4 py-2 bg-blue-600 rounded">Confirm</button>
      </div>
    </>
  );
};

export default AddTemplate;

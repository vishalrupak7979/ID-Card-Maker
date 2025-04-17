import React, { useState } from 'react';

const ViewTemplateModal = ({ isOpen, onClose, template }) => {
  const [isFrontView, setIsFrontView] = useState(true);

  if (!isOpen || !template) return null;

  const currentSide = isFrontView ? 'front' : 'back';
  const dimensions =
    template.orientation === 'Vertical'
      ? { width: 352, height: 499 }
      : { width: 480, height: 315 };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-[#1b2431] text-white rounded-lg p-6 relative shadow-lg w-[90%] max-w-2xl">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">View Template</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white text-xl"
          >
            &times;
          </button>
        </div>

        {/* Front/Back Buttons */}
        <div className="flex justify-center gap-4 mb-4">
          <button
            className={`px-4 py-2 rounded ${
              isFrontView ? 'bg-blue-600' : 'bg-gray-600'
            }`}
            onClick={() => setIsFrontView(true)}
          >
            Front
          </button>
          <button
            className={`px-4 py-2 rounded ${
              !isFrontView ? 'bg-blue-600' : 'bg-gray-600'
            }`}
            onClick={() => setIsFrontView(false)}
          >
            Back
          </button>
        </div>

        {/* Template Display */}
        <div
          className="relative bg-black mx-auto"
          style={{
            width: `${dimensions.width}px`,
            height: `${dimensions.height}px`,
            maxWidth: '100%',
            maxHeight: '100%',
          }}
        >
          {template.elements
            .filter((el) => el.side === currentSide)
            .map((el) =>
              el.type === 'background' ? (
                <img
                  key={el.id}
                  src={el.src}
                  alt="background"
                  className="absolute w-full h-full object-cover"
                />
              ) : el.type === 'field' ? (
                <div
                  key={el.id}
                  className="absolute"
                  style={{
                    top: el.y,
                    left: el.x,
                    fontSize: el.fontSize,
                  }}
                >
                  {el.field}
                </div>
              ) : el.type === 'image' ? (
                <img
                  key={el.id}
                  src={el.src}
                  alt="element"
                  className="absolute"
                  style={{
                    top: el.y,
                    left: el.x,
                    width: el.width,
                    height: el.height,
                  }}
                />
              ) : null
            )}
        </div>

        {/* Close Button */}
        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-500 w-full sm:w-auto"
            onClick={onClose}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ViewTemplateModal;
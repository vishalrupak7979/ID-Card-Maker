import React from 'react';

const fields = [
  "Car ID Ant", "Verify During Passage Mode Time Zone", "First-Personnel Open",
  "Multi-Personnel Open", "Emergency Password Open", "Open During Passage Mode Time Zone",
  "Cancel Alarm", "Operation Interval too Short", "Door Inactive Time Zone Verify Open",
  "Illegal Time Zone", "Access Denied", "Anti-Passback", "Unregistered Personnel"
];

const FieldSelectorModal = ({ isOpen, onClose, onConfirm, selected, setSelected }) => {
  if (!isOpen) return null;

  const toggleField = (field) => {
    if (selected.includes(field)) {
      setSelected(selected.filter(f => f !== field));
    } else {
      setSelected([...selected, field]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[#1E2A38] text-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Select Field</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
        </div>

        <div className="max-h-72 overflow-y-auto space-y-2 pr-2">
          {fields.map(field => (
            <label key={field} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={selected.includes(field)}
                onChange={() => toggleField(field)}
                className="form-checkbox text-blue-500"
              />
              <span>{field}</span>
            </label>
          ))}
        </div>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-500 rounded hover:bg-gray-700 transition"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 rounded hover:from-blue-600 hover:to-blue-700 transition"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default FieldSelectorModal;

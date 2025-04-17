import React, { useEffect, useState } from 'react';
import { Plus, Clock } from 'lucide-react'; // Import icons from Lucide

const getFormattedDateTime = () => {
  const now = new Date();
  const pad = (n) => n.toString().padStart(2, '0');

  const day = pad(now.getDate());
  const month = pad(now.getMonth() + 1);
  const year = now.getFullYear();
  const hours = pad(now.getHours());
  const minutes = pad(now.getMinutes());

  const weekdays = ['SUNDAY', 'MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY'];
  const weekday = weekdays[now.getDay()];

  return `${day}/${month}/${year} ${hours}:${minutes} ${weekday}`;
};

const TopMenuBar = () => {
  const [dateTime, setDateTime] = useState(getFormattedDateTime());

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(getFormattedDateTime());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center pt-2 pl-4 pr-4 pb-2 border-b border-gray-700 bg-[#111827]">
      {/* Centered Menu */}
      <div className="flex space-x-6 text-sm md:text-base font-medium mb-2 items-center">
        <a href="/" className="hover:text-blue-400">Home</a>
        <a href="/" className="hover:text-blue-400">Dashboard</a>
        <div className="flex items-center space-x-1">
          <a href="/" className="hover:text-blue-400">Modules</a>
          <Plus size={16} className="text-white hover:text-blue-400 cursor-pointer" />
        </div>
        <a href="/" className="hover:text-blue-400">Map</a>
      </div>
      {/* Date and Time */}
      <div className="flex items-center text-xs md:text-sm text-gray-400">
        <Clock size={16} className="text-white mr-2" />
        {dateTime}
      </div>
    </div>
  );
};

export default TopMenuBar;
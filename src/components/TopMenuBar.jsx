import React, { useEffect, useState } from 'react';

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
    <div className="flex flex-col md:flex-row justify-between items-center p-4 border-b border-gray-700 bg-[#111827]">
      <div className="flex space-x-6 text-sm md:text-base font-medium">
        <a href="#" className="hover:text-blue-400">Home</a>
        <a href="#" className="hover:text-blue-400">Dashboard</a>
        <a href="#" className="hover:text-blue-400">Modules</a>
        <a href="#" className="hover:text-blue-400">Map</a>
      </div>
      <div className="text-xs md:text-sm text-gray-400 mt-2 md:mt-0">
        {dateTime}
      </div>
    </div>
  );
};

export default TopMenuBar;
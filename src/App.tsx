import React from 'react';
import './App.css';
import RangeDatePicker from './components/RangeDatePicker';

const App: React.FC = () => {
  const startDate = new Date(new Date().getFullYear(), new Date().getMonth(), 8); // MENTION START DATE 
  const endDate = new Date(new Date().getFullYear(), new Date().getMonth(), 21); // MENTION END DATE
  const lastDays = 7;

  const handleDateChange = (dates: string[], weekendDates: Date[]) => {
    console.log("Date Range ", dates);
    console.log("Weekend Dates ", weekendDates);
  };

  return (
    <RangeDatePicker
      startFullDate={startDate || new Date()}
      endFullDate={endDate || new Date()}
      lastDays={lastDays}
      onChange={(dates, weekendDates) => handleDateChange(dates, weekendDates)}
    />
  );
};

export default App;

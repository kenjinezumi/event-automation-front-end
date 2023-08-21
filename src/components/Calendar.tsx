import React from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

interface CalendarComponentProps {
  onDateChange: (date: dayjs.Dayjs | null) => void;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ onDateChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar value={null} onChange={onDateChange} />
    </LocalizationProvider>
  );
};

export default CalendarComponent;

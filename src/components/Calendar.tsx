import React, { useState } from 'react';
import dayjs from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import EventList from './EventList'; // Import your EventList component here
import axios from 'axios'; // Import Axios for making API requests

interface CalendarComponentProps {
  onDateChange: (date: dayjs.Dayjs | null) => void;
}

interface Event {
  event_name: string;
  event_date: string; // Update this to the appropriate date format from the API
  bdr: string;
  contacts: Contact[];
}

interface Contact {
  contact_name: string;
  contact_seniority: string;
}

const CalendarComponent: React.FC<CalendarComponentProps> = ({ onDateChange }) => {
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);
  const [events, setEvents] = useState<Event[]>([]);

  const fetchEventsForDate = async (date: dayjs.Dayjs | null) => {
    try {
      if (date) {
        const response = await axios.get(`http://127.0.0.1:8000/api/events/list/${date.year()}/${date.month() + 1}/${date.date()}/`);
        setEvents(response.data);
        console.log(response.data)
      }
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setSelectedDate(date);
    fetchEventsForDate(date);
    onDateChange(date);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div>
        <DateCalendar value={selectedDate} onChange={handleDateChange} />
        <EventList events={events} />
      </div>
    </LocalizationProvider>
  );
};

export default CalendarComponent;

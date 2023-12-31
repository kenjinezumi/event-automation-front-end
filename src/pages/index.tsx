import React, { useState } from 'react';
import Header from '../components/Header';
import CalendarComponent from '../components/Calendar';
import EventForm from '../components/EventForm';
import Footer from '../components/Footer';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid'; // Import Grid component
import axios from 'axios';

import { Event } from '../entities/events';
import dayjs from 'dayjs';
const HomePage: React.FC = () => {
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<dayjs.Dayjs | null>(null);

  const handleEventSelection = (event: Event) => {
    setSelectedEvent(event);
  };

  const handleEventSubmission = (eventData: Event) => {
    eventData.id = events.length + 1;
    setEvents([...events, eventData]);
    setSelectedEvent(null);
  };

  const handleEventSubmit = (eventData: Event) => {
    // Define your logic to handle event submission here
  };

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setSelectedDate(date);
  };

  function MyCalendar() {
    const [selectedDate, setSelectedDate] = useState(null);
    const [events, setEvents] = useState([]);
  
    const handleCalendarDayClick = async (date: any) => {
      setSelectedDate(date);
  
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/events/${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}/`);
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <Header />
    <Container maxWidth="lg" style={{ flex: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {selectedDate && <p style={{ marginTop: '1rem' }}>Selected Date: {selectedDate?.format('YYYY-MM-DD')}</p>}

          <CalendarComponent onDateChange={handleDateChange} />
        </Grid>
        <Grid item xs={12} md={6}>
        {!selectedDate && (
        <p style={{ textAlign: 'center', verticalAlign:'middle', fontStyle: 'italic', marginTop: '60px' }}>
          Please pick a date.
        </p>
      )}
          {selectedDate && (
            <EventForm
              selectedDate={selectedDate}
              onDateChange={handleDateChange}
              onSubmit={handleEventSubmit}
            />
          )}
        </Grid>
      </Grid>
    </Container>
    <Footer /> {/* Use the Footer component */}
  </div>
  );
};

export default HomePage;

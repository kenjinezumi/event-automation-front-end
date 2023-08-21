// pages/DashboardPage.tsx
import React, { useState } from 'react';
import Header from '../components/Header';
import CalendarComponent from '../components/Calendar';
import EventForm from '../components/EventForm';
import Footer from '../components/Footer';
import Container from '@mui/material/Container';

const DashboardPage: React.FC = () => {
  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <Header />
    <Container maxWidth="lg" style={{ flex: 1 }}>
      <div className="d-flex justify-content-between">
       
      </div>
    </Container>
    <Footer /> {/* Use the Footer component */}
  </div>
  );
};

export default DashboardPage;

import React from 'react';

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

interface EventListProps {
  events: Event[];
}

const EventList: React.FC<EventListProps> = ({ events }) => {
  return (
    <div>
      {events.map((event, index) => (
        <div key={index}>
          <p>Event:{event.event_name}</p>
        </div>
      ))}
    </div>
  );
};

export default EventList;

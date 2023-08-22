import dayjs from 'dayjs';

export interface Event {
  id: number;
  name: string;
  date: dayjs.Dayjs; 
}

export interface EventFormProps {
    selectedDate: dayjs.Dayjs;
    onDateChange: (date: dayjs.Dayjs | null) => void;
    onSubmit: (eventData: EventFormData) => void;
  }
  
  export interface EventFormData {
    accounts: string[],
    event_id: number;
    event_name: string;
    registration_page_url: string;
    event_date: dayjs.Dayjs;
    event_location: string;
    maximum_capacity: number;
    contact: string;
    target_audience: {
      seniority: string[];
      industries: string[];
      functions: string[];
    };
    event_copy: {
      subjectLine: string;
      bodyText: string;
    };
  }

  export interface EventAlgoData{

    event_location: string; 
    maximum_capacity: number; 
    target_audience: {
        seniority: string[];
        industries: string[];
        functions: string[];
    }

  }
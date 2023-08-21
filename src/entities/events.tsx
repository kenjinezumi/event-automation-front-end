import dayjs from 'dayjs';

export interface Event {
  id: number;
  name: string;
  date: dayjs.Dayjs; // Update the type to dayjs.Dayjs
}

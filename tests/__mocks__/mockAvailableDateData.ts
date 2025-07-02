import { convertToDateFormat } from '@store/useSelectDateStore';

export const mockAvailableDateData = {
  disableDates: [],
  availableTimeWithDates: [
    {
      date: `${convertToDateFormat(new Date())}`,
      availableTimeDto: [
        {
          time: '10:00',
          available: true,
        },
        {
          time: '10:30',
          available: true,
        },
        {
          time: '11:00',
          available: true,
        },
        {
          time: '11:30',
          available: true,
        },
        {
          time: '12:00',
          available: true,
        },
        {
          time: '12:30',
          available: true,
        },
        {
          time: '13:00',
          available: true,
        },
        {
          time: '13:30',
          available: true,
        },
        {
          time: '14:00',
          available: true,
        },
        {
          time: '14:30',
          available: true,
        },
        {
          time: '15:00',
          available: true,
        },
        {
          time: '15:30',
          available: true,
        },
        {
          time: '16:00',
          available: false,
        },
        {
          time: '16:30',
          available: false,
        },
        {
          time: '17:00',
          available: true,
        },
        {
          time: '17:30',
          available: true,
        },
        {
          time: '18:00',
          available: true,
        },
        {
          time: '18:30',
          available: true,
        },
        {
          time: '19:00',
          available: true,
        },
        {
          time: '19:30',
          available: true,
        },
        {
          time: '20:00',
          available: true,
        },
        {
          time: '20:30',
          available: true,
        },
        {
          time: '21:00',
          available: true,
        },
        {
          time: '21:30',
          available: true,
        },
        {
          time: '22:00',
          available: true,
        },
        {
          time: '22:30',
          available: true,
        },
        {
          time: '23:00',
          available: true,
        },
        {
          time: '23:30',
          available: true,
        },
      ],
    },
  ],
};

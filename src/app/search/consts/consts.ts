const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

export const getDaydate = (dateString: string) => {
  const date = new Date(dateString);
  const options = { month: 'long', day: 'numeric' } as const;
  const formattedDate = date.toLocaleDateString('en-EN', options);
  const dayName = daysOfWeek[date.getDay()];
  return { date: formattedDate, dayName };
};

export const getTimeFromDateString = (dateString: string) => {
  const date = new Date(dateString);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;

  return formattedTime;
};

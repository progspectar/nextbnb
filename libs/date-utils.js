export const formatDate = (date, format = 'dd-mm-yyyy') => {
  return date.toLocaleString();
};

export const addPeriod = (date, period = 'day', number = 1) => {
  let newDate = new Date(date);

  switch (period) {
    case 'day':
      newDate.setDate(newDate.getDate() + number);
      return newDate;

    default:
      return date;
  }
};

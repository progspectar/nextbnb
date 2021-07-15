import { useState, useEffect } from 'react';
import { DayPickerInput } from './DayPickerInput';
import { formatDate, addPeriod } from '../libs/date-utils';

import 'react-day-picker/lib/style.css';

const today = new Date();
const tomorrow = new Date(today);
tomorrow.setDate(tomorrow.getDate() + 1);

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(tomorrow);

  const datesChanged = (date) => {
    const newDate = addPeriod(date);
    console.log('newDate', newDate);
  };

  useEffect(() => {
    // Обновляем название докуммента, используя API браузера
    const text = `startDate ${formatDate(startDate)} , endDate ${formatDate(
      endDate
    )}`;
    const div = document.querySelector('#debug-div');
    if (div) div.textContent = text;
    //
  });

  return (
    <div className='date-range-picker-container'>
      <div id='debug-div'>debug</div>

      <div>
        <label>From:</label>
        <DayPickerInput
          id='DayPickerInputStart'
          datesChanged={datesChanged}
          setDate={setStartDate}
        />
      </div>
      <div>
        <label>To:</label>
        <DayPickerInput
          id='DayPickerInputEnd'
          datesChanged={datesChanged}
          setdate={setEndDate}
        />
      </div>

      <style jsx>{`
        .date-range-picker-container div {
          display: grid;
          border: 1px solid #ddd;
          grid-template-columns: 30% 70%;
          padding: 10px;
        }
        label {
          padding-top: 10px;
        }
      `}</style>
      <style jsx global>{`
        .DayPickerInput input {
          width: 120px;
          padding: 10px;
          font-size: 16px;
        }
      `}</style>
    </div>
  );
};

export default DateRangePicker;

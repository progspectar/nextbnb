import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';

export default () => (
  <div>
    <div className='date-range-picker-container'></div>
    <div>
      <label>From:</label>
      <DayPickerInput />
    </div>
    <div>
      <label>To:</label>
      <DayPickerInput />
    </div>
    <style jsx>{`
      .date-range-picker-container div {
        display: grid;
        border: 1px solid #ddd;
        grid-template-columns: 30% 70%;
        padding: 10px;
      }
      label {
        padding: 10px;
        text-align: right;
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

import { formatDate } from '../libs/date-utils';

export const DayPickerInput = ({ datesChanged, id, name }) => {
  const onChange = (e) => {
    datesChanged(e.target.value);
    //setDate(e.target.value);
    //datesChanged(e.target.value);
  };

  return (
    <div>
      <input type='date' id={id} name={name} onChange={onChange} />
    </div>
  );
};

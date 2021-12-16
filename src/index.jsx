import ReactDOM from 'react-dom';
import './index.scss';
import CalenderTable from 'components/calender-table';

const events = [
  {
    timerPk: 1,
    dayOfWeek: 2,
    actionTime: '14:50',
    name: 'title1',
  },
  {
    timerPk: 2,
    dayOfWeek: 5,
    actionTime: '15:31',
    name: 'title2 564444444444444444444444444444444444',
  },
  {
    timerPk: 20,
    dayOfWeek: 5,
    actionTime: '15:31',
    name: 'title2 564444444444444444444444444444444444',
  },
  {
    timerPk: 3,
    dayOfWeek: 1,
    actionTime: '16:00',
    name: 'title3',
  },
  {
    timerPk: 4,
    dayOfWeek: 1,
    actionTime: '16:32',
    name: 'title3',
  },
  {
    timerPk: 5,
    dayOfWeek: 2,
    actionTime: '16:33',
    name: 'title4',
  },
  {
    timerPk: 6,
    dayOfWeek: 2,
    actionTime: '16:33',
    name: 'title4',
  },
  {
    timerPk: 7,
    dayOfWeek: 2,
    actionTime: '16:33',
    name: 'title4',
  },
  {
    timerPk: 8,
    dayOfWeek: 2,
    actionTime: '16:33',
    name: 'title4',
  },
  {
    timerPk: 9,
    dayOfWeek: 7,
    actionTime: '18:34',
    name: 'title5',
  },
  {
    timerPk: 10,
    dayOfWeek: 3,
    actionTime: '19:35',
    name: 'title6',
  },
  {
    timerPk: 11,
    dayOfWeek: 4,
    actionTime: '20:35',
    name: 'title6',
  },
];

const daysLabels = {
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
  7: 'Sunday',
};

const customStyle = {
  backgroundColor: '#4B9F5B',
  selectedColor: '#FFA700',
  textColor: '#FFFFFF',
  textSize: '12px',
  margin: '10px',
  padding: '10px',
  headerTextSize: '16px',
  headerTextMargin: '10px',
  headerTextPadding: '10px',
  fixedHeader: true,
};

ReactDOM.render(
  <CalenderTable
    eventsData={events}
    daysLabels={daysLabels}
    customStyle={customStyle}
    handleEventClick={(eventId, selected) => console.log(eventId, selected)}
  />,
  document.getElementById('root'),
);

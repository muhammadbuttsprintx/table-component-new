import ReactDOM from 'react-dom';
import './index.scss';
import CalenderTable1 from 'components/calender-table';
// import CalenderTable from 'components/calender-table/index';

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

const daysLabels = [
  { Day: [{ value: 'Monday' }] },
  { Day: [{ value: 'Tuesday' }] },
  { Day: [{ value: 'Wednesday' }] },
  { Day: [{ value: 'Thursday' }] },
  { Day: [{ value: 'Friday' }] },
  { Day: [{ value: 'Saturday' }] },
  { Day: [{ value: 'Sunday' }] },
];

const customStyle = {
  backgroundColor: '#4B9F5B',
  headerTextPadding: '10px',
  selectedColor: '#FFA700',
  headerTextMargin: '10px',
  headerTextSize: '16px',
  textColor: '#FFFFFF',
  fixedHeader: true,
  textSize: '12px',
  margin: '10px',
  padding: '10px',
  widgetResponsiveTill: '500',
  daysStick: true,
};

ReactDOM.render(
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      overflowY: 'auto',
      height: '100vh',
      width: '100%',
    }}
  >
    <div
      style={{
        backgroundColor: 'grey',
        height: '200px',
        width: '100%',
      }}
    >
      Navbar
    </div>
    <CalenderTable1
      eventsData={events}
      daysLabels={daysLabels}
      customStyle={customStyle}
      handleEventClick={(eventId, selected) => console.log(eventId, selected)}
    />
    <div
      style={{
        backgroundColor: 'grey',
        height: '200px',
        width: '100%',
      }}
    >
      Footer
    </div>
  </div>,
  document.getElementById('root'),
);

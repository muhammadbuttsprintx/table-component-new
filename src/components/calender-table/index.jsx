import { useState, useEffect } from 'react';
import { v4 } from 'uuid';
import style from './calender-table.module.scss';
import { secondRow } from '../../helper';

const CalenderTable = ({
  eventsData,
  daysLabels,
  handleEventClick,
  customStyle,
}) => {
  let newData = [];
  let gridCol = '120px';
  let data = [{ value: 'Day' }];
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState(newData);
  const [isActive, setIsActive] = useState(false);
  const timeStyle = {
    fontSize: '1px',
    color: '#102733',
    backgroundColor: '#102733',
    borderBottom: '2px solid #939393',
    padding: '20px 0',
  };

  // prepare column array
  for (let x = 0; x <= 47; x++) {
    if (newData[x] === undefined) {
      // preparing grid columns value
      gridCol = gridCol + ' 120px';
      newData[x] = {
        ...(x % 2
          ? { value: `${Math.floor(x / 2)}:30` }
          : { value: `${Math.floor(x / 2)}:00` }),
      };
    }
  }

  useEffect(() => {
    let rowData = [];
    rowData = [...daysLabels];

    // preparing row data
    eventsData.forEach(({ dayOfWeek, actionTime, name, timerPk }) => {
      // calculating the current index for the current event
      const time = actionTime.split(':');
      const currentArrIndex = +time[0] * 2 + (+time[1] <= 30 ? 0 : 1);

      // preparing the current time for the current event
      const currentTime =
        currentArrIndex % 2
          ? `${Math.floor(currentArrIndex / 2)}:30`
          : `${Math.floor(currentArrIndex / 2)}:00`;

      // initializing the current time events array if undefined
      if (!rowData[dayOfWeek - 1][currentTime]) {
        rowData[dayOfWeek - 1][currentTime] = [];
      }

      // inserting data in the current time events array if exists
      if (rowData[dayOfWeek - 1][currentTime]) {
        rowData[dayOfWeek - 1][currentTime].push({
          value: name,
          timerPk,
        });
      }
    });

    // setting rows and columns data
    setRows(rowData);
    setColumns([...data, ...newData]);
  }, [daysLabels]);

  const onClick = (eventId) => {
    const selectedEventId = eventId === false ? -1 : eventId;
    const selected =
      eventId === false ? false : isActive === eventId ? false : true;

    // deselect upon clicking the same event
    if (isActive === eventId) {
      setIsActive(false);
      handleEventClick(selectedEventId, selected);
    }

    // select upon clicking the same event
    else {
      setIsActive(eventId);
      handleEventClick(selectedEventId, selected);
    }
  };

  const columnMinWidth = `${
    (customStyle.widgetResponsiveTill - 80) / Object.keys(daysLabels).length
  }px`;

  return (
    <>
      {rows.length >= 1 && (
        <div className={style.tableContainer}>
          <div className={style.table}>
            <div
              className={style.thead}
              style={{ position: customStyle.fixedHeader ? 'sticky' : 'unset' }}
            >
              <div
                className={style.tr}
                style={{
                  gridTemplateColumns: gridCol,
                }}
              >
                {columns.map((column, index) => (
                  <div
                    className={index === 0 ? `${style.th1}` : `${style.th}`}
                    key={v4()}
                    style={{ minWidth: columnMinWidth }}
                  >
                    <span
                      className={style.headingTitle}
                      style={
                        !index
                          ? { ...timeStyle }
                          : {
                              fontSize: customStyle.headerTextSize,
                              margin: customStyle.headerTextMargin,
                              padding: customStyle.headerTextPadding,
                              width: index === 0 ? '95%' : '95%',
                            }
                      }
                    >
                      {column?.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className={style.tbody}>
              {rows.map((row) => (
                <div
                  className={style.tr}
                  style={{
                    gridTemplateColumns: gridCol,
                  }}
                >
                  {columns.map((column, colIndex) =>
                    !row[column.value] ? (
                      <div
                        className={`${style.td} ${style.tdEmpty}`}
                        onClick={() => onClick(false)}
                        style={{ minWidth: columnMinWidth }}
                      ></div>
                    ) : (
                      <div
                        className={
                          colIndex ? `${style.td}` : `${style.firstTd}`
                        }
                        style={{ minWidth: columnMinWidth }}
                      >
                        {row[column.value]?.map((el) => (
                          <span
                            style={{
                              backgroundColor:
                                colIndex === 0
                                  ? 'transparent'
                                  : el.timerPk === isActive
                                  ? customStyle.selectedColor
                                  : customStyle.backgroundColor,
                              fontSize: secondRow(column, el)
                                ? '1px'
                                : customStyle.textSize,
                              color: customStyle.textColor,
                              visibility: secondRow(column, el)
                                ? 'hidden'
                                : 'visible',
                              margin: customStyle.margin,
                              padding: customStyle.padding,
                              width: '95%',
                            }}
                            onClick={() => {
                              onClick(el.timerPk);
                            }}
                          >
                            {el.value}
                          </span>
                        ))}
                      </div>
                    ),
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CalenderTable;

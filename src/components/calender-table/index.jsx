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
  eventsData.forEach(({ dayOfWeek, actionTime, name, timerPk }, index) => {
    const time = actionTime.split(':');
    const currentArrIndex = +time[0] * 2 + (+time[1] <= 30 ? 0 : 1);

    if (newData[currentArrIndex] === undefined) {
      newData[currentArrIndex] = {
        0: [
          currentArrIndex % 2
            ? { value: `${Math.floor(currentArrIndex / 2)}:30` }
            : { value: `${Math.floor(currentArrIndex / 2)}:00` },
        ],
      };
    }
    if (newData[currentArrIndex] !== undefined) {
      if (!newData[currentArrIndex][`${dayOfWeek}`]) {
        newData[currentArrIndex][`${dayOfWeek}`] = [];
      }
    }
    if (newData[currentArrIndex][`${dayOfWeek}`]) {
      newData[currentArrIndex][`${dayOfWeek}`].push({
        value: name,
        timerPk,
      });
    }
  });
  for (let x = 0; x <= 47; x++) {
    if (newData[x] === undefined) {
      newData[x] = {
        0: [
          x % 2
            ? { value: `${Math.floor(x / 2)}:30` }
            : { value: `${Math.floor(x / 2)}:00` },
        ],
      };
    }
  }

  const [rows] = useState(newData);
  const [columns, setColumns] = useState([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    let cols = [
      {
        key: '0',
        name: 'Time',
      },
    ];
    Object.entries(daysLabels).forEach(([key, value]) => {
      cols.push({
        key: Number(key),
        name: value,
      });
    });
    setColumns([...cols]);
  }, [daysLabels]);

  const onClick = (eventId) => {
    const selected =
      eventId === false ? -1 : isActive === eventId ? false : true;
    if (isActive === eventId) {
      setIsActive(false);
      handleEventClick(eventId, selected);
    } else {
      setIsActive(eventId);
      handleEventClick(eventId, selected);
    }
  };

  return (
    <>
      {rows.length >= 1 && (
        <div className={style.tableContainer}>
          <table className={style.table} aria-label="customized table">
            <thead>
              <tr
                className={style.headings}
                style={{
                  gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
                }}
              >
                {columns.map((column, index) => (
                  <th className={style.heading} key={v4()}>
                    <div>
                      <span
                        className={style.headingTitle}
                        style={{
                          fontSize: customStyle.headerTextSize,
                          margin: customStyle.headerTextMargin,
                          padding: customStyle.headerTextPadding,
                          width: index === 0 ? '100%' : '120px',
                        }}
                      >
                        {column.name}
                      </span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr
                  style={{
                    gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
                  }}
                >
                  {columns.map((column, colIndex) =>
                    !row[column.key] ? (
                      <td onClick={() => onClick(false)}></td>
                    ) : (
                      <td>
                        <div>
                          {row[column.key]?.map((el) => (
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
                                width: colIndex ? '120px' : '100%',
                              }}
                              onClick={() => {
                                onClick(el.timerPk);
                              }}
                            >
                              {el.value}
                            </span>
                          ))}
                        </div>
                      </td>
                    ),
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default CalenderTable;

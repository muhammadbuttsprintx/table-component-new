import { useState, useEffect, useRef } from 'react';
import { v4 } from 'uuid';
import style from './calender-table.module.scss';
import { secondRow } from '../../helper';

const CalenderTable = ({
  eventsData,
  daysLabels,
  handleEventClick,
  customStyle,
}) => {
  const ref = useRef(null);
  const timeStyle = {
    fontSize: '1px',
    color: '#102733',
    backgroundColor: '#102733',
    borderBottom: '2px solid #939393',
    padding: '20px 0',
  };
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

  useEffect(() => {
    console.log(ref.current ? ref.current.offsetWidth : 0);
  }, []);

  return (
    <>
      {rows.length >= 1 && (
        <div className={style.tableContainer}>
          <div className={style.table}>
            <div
              className={style.thead}
              ref={ref}
              style={{ position: customStyle.fixedHeader ? 'sticky' : 'unset' }}
            >
              <div
                className={style.tr}
                style={{
                  gridTemplateColumns: `70px 1fr 1fr 1fr 1fr 1fr 1fr 1fr`,
                }}
              >
                {columns.map((column, index) => (
                  <div
                    className={index === 0 ? `${style.th1}` : `${style.th}`}
                    key={v4()}
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
                      {column.name}
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
                    gridTemplateColumns: `70px 1fr 1fr 1fr 1fr 1fr 1fr 1fr`,
                    minWidth: ref.current ? ref.current.offsetWidth : 0,
                  }}
                >
                  {columns.map((column, colIndex) =>
                    !row[column.key] ? (
                      <div
                        className={`${style.td} ${style.tdEmpty}`}
                        onClick={() => onClick(false)}
                      ></div>
                    ) : (
                      <div
                        className={
                          colIndex ? `${style.td}` : `${style.firstTd}`
                        }
                      >
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
                              width: !colIndex ? '95%' : '95%',
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

import React, { FC } from 'react';
import { MONTHS, WEEKNAMES } from '../static-content';
import Button from './Button';
import isWeekend from '../utils';

interface DatePickerProps {
  onChange: (date: Date) => void;
  month: number;
  year: number;
  date: number;
  end: number;
  isEndPicker: boolean;
  handleMonthChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleMonthEndChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  handleYearChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleYearEndChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleClickEvent: (date: number) => void;
  handleClickEndEvent: (date: number) => void;
  setHoverDate: (date: number) => void;
  setHoverDate2: (date: number) => void;
  hover: number;
  hover2: number;
  prevDate: number;
  prevend: number;
  prevmonth: number;
  isClickedSecond: boolean;
}

const DatePicker1: FC<DatePickerProps> = (props) => {
  const {
    onChange,
    month,
    year,
    date,
    end,
    isEndPicker,
    handleMonthChange,
    handleMonthEndChange,
    handleYearChange,
    handleYearEndChange,
    handleClickEvent,
    handleClickEndEvent,
    setHoverDate,
    setHoverDate2,
    hover,
    hover2,
    prevDate,
    prevend,
    prevmonth,
    isClickedSecond,
  } = props;

  const lastOfPrevMonth: Date = new Date(year, month, 0);
  const lastOfMonth: Date = new Date(year, month + 1, 0);
  const firstOfNextMonth: Date = new Date(year, month + 1, 1);

  return (
    <div className='datepicker-container'>
      <div className="datepicker">
        <div className="datepicker-header">
          <div>
            <select className="month-input" value={month} onChange={isEndPicker ? handleMonthEndChange : handleMonthChange}>
              {
                isEndPicker ?
                  MONTHS.map((mont, index) => {
                    return <option key={index} value={index}>{mont}</option>
                  }) :
                  MONTHS.map((mont, index) => {
                    return <option key={index} value={index}>{mont}</option>
                  })
              }
            </select>
            <input type="number" className="year-input" value={year} onChange={isEndPicker ? handleYearEndChange : handleYearChange} />
          </div>
        </div>

        <div className="days">
          {
            WEEKNAMES.map((week, index) => {
              return <span key={index}>{week}</span>
            })
          }
        </div>

        <div className="dates">
          {
            [...Array(lastOfPrevMonth.getDay() + 1)].map((_, idx) => {
              return <Button key={idx} value={lastOfPrevMonth.getDate() - lastOfPrevMonth.getDay() + idx} isSelected={false} isToday={false} isDisabled={true} />
            })
          }
          {
            [...Array(lastOfMonth.getDate())].map((_, idx) => {
              let weekenddate: Date = new Date(year, month, idx + 1);
              let isDisabled: boolean = isWeekend(weekenddate);
              let isSelected: boolean = (date === idx + 1 || end === idx + 1) && !isDisabled;
              let isHovereddirect: boolean = false;
              return <Button idx={idx + 1} key={idx} value={idx + 1} isDisabled={isDisabled} isSelected={isSelected} onClickEvent={isEndPicker ? handleClickEndEvent : handleClickEvent} setHoverDate={isEndPicker ? setHoverDate2 : setHoverDate} start={date} end={end} month={month} year={year} hover={hover} hover2={hover2} isEndPicker={isEndPicker} isHovereddirect={isHovereddirect} prevDate={prevDate} prevend={prevend} isClickedSecond={isClickedSecond} />
            })
          }
          {
            [...Array(7).splice(firstOfNextMonth.getDay())].map((_, idx) => {
              return <Button key={idx} value={firstOfNextMonth.getDate() - firstOfNextMonth.getDay() + firstOfNextMonth.getDay() + idx} isSelected={false} isToday={false} isDisabled={true} />
            })
          }
        </div>
      </div>
    </div>
  )
}

export default DatePicker1;
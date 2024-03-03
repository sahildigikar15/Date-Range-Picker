import React, { FC, useState, useCallback, useRef } from 'react';
import DatePicker1 from './DatePicker1';
import isWeekend from '../utils';
import LastDaysCompute from './LastDaysCompute';

interface RangeDatePickerProps {
    startFullDate: Date;
    endFullDate: Date;
    lastDays: number;
    onChange: (dates: [string, string], weekends: Date[]) => void;
}

const RangeDatePicker: FC<RangeDatePickerProps> = (props) => {
    const { startFullDate, endFullDate, lastDays, onChange } = props;

    let start: Date = startFullDate;
    let end: Date = endFullDate;

    if (start > end) {
        start = new Date();
        end = new Date();
    }

    let startmonth: number = startFullDate.getMonth();
    let startyear: number = startFullDate.getFullYear();
    let startdate: number = startFullDate.getDate();

    let endmonth: number = endFullDate.getMonth();
    let endYear: number = endFullDate.getFullYear();
    let endDate: number = endFullDate.getDate();


    const [selectedDate, setSelectedDate] = useState<number>(startdate);
    const [selectedMonth, setSelectedMonth] = useState<number>(startmonth);
    const [selectedYear, setSelectedYear] = useState<number>(startyear);


    const [selectedEndDate, setSelectedEndDate] = useState<number>(endDate);
    const [selectedEndMonth, setSelectedEndMonth] = useState<number>(endmonth);
    const [selectedEndYear, setSelectedEndYear] = useState<number>(endYear);

    const [selectedEndStartDate, setSelectedEndStartDate] = useState<string>("")
    const [selectedEndStartMonth, setSelectedEndStartMonth] = useState<number>(endmonth);
    const [selectedEndStartYear, setSelectedEndStartYear] = useState<number>(endYear);

    const [hover, setHover] = useState<number | null>(null);
    const [hover2, setHover2] = useState<number | null>(null);

    const isClickedSecond = useRef<boolean>(false);


    let isSameMonthYear: boolean = false;
    if (selectedMonth === selectedEndMonth && selectedYear === selectedEndYear) {
        isSameMonthYear = true;
    }

    const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedMonth(parseInt(e.target.value))
        setSelectedDate(0)
        if (selectedYear == selectedEndYear) setSelectedEndMonth(parseInt(e.target.value) + 1)
        setSelectedEndDate(0)
        setSelectedEndStartDate("")
    }

    const handleMonthEndChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (parseInt(e.target.value) > selectedMonth) {
            setSelectedEndMonth(parseInt(e.target.value))
        } else if (selectedYear < selectedEndYear) {
            setSelectedEndMonth(parseInt(e.target.value))
        }
        setSelectedEndDate(0)
        setSelectedDate(0)
        setSelectedEndStartDate("")
    }

    const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedYear(parseInt(e.target.value))
        if (parseInt(e.target.value) >= selectedEndDate) {
            setSelectedEndYear(parseInt(e.target.value))
            if (selectedMonth >= selectedEndMonth) setSelectedEndMonth(selectedMonth + 1)
        }
        setSelectedDate(0)
        setSelectedEndDate(0)
        setSelectedEndStartDate("")
    }

    const handleYearEndChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        if (parseInt(e.target.value) >= selectedYear) {
            setSelectedEndYear(parseInt(e.target.value))
        }
        setSelectedEndDate(0)
        setSelectedDate(0)
        setSelectedEndStartDate("")
    }

    const handleClickEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (((selectedDate && selectedDate !== 0) && (selectedEndDate && selectedEndDate !== 0)) || ((selectedEndDate && selectedEndDate !== 0) && (selectedEndStartDate && selectedEndStartDate !== ""))) {
            setSelectedDate(0)
            setSelectedEndDate(0)
            setSelectedEndStartDate("")
        } else if (selectedDate && selectedDate !== 0) {
            if (parseInt(e.target.innerText) <= selectedDate) {
                setSelectedDate(0)
                setSelectedEndDate(0)
            } else {
                setSelectedEndDate(parseInt(e.target.innerText))
                setSelectedMonth(selectedMonth)
                setSelectedEndMonth(selectedMonth)
            }

        } else {
            setSelectedDate(parseInt(e.target.innerText))
            setSelectedMonth(selectedMonth)
        }
        setHover2(null)
    }

    const handleClickEndEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (((selectedDate && selectedDate !== 0) && (selectedEndDate && selectedEndDate !== 0)) || ((selectedEndDate && selectedEndDate !== 0) && (selectedEndStartDate && selectedEndStartDate !== ""))) {
            setSelectedDate(0)
            setSelectedEndDate(0)
            setSelectedEndStartDate("")
        } else if (selectedEndDate && selectedEndDate !== 0) {
            if (parseInt(e.target.innerText) <= selectedEndDate) {
                setSelectedDate(0)
                setSelectedEndDate(0)
            } else {
                if (selectedDate === 0 && selectedEndStartDate === "") {
                    setSelectedEndStartDate(parseInt(e.target.innerText));
                    setSelectedEndStartMonth(selectedEndMonth)
                    setSelectedEndStartYear(selectedEndYear)
                } else {
                    setSelectedEndDate(parseInt(e.target.innerText))
                    setSelectedEndMonth(selectedEndMonth)
                }
            }

        } else {
            if (selectedEndDate === 0) {
                setSelectedEndDate(parseInt(e.target.innerText))
                setSelectedEndMonth(isSameMonthYear ? selectedEndMonth + 1 : selectedEndMonth)
            } else {
                setSelectedEndStartDate(parseInt(e.target.innerText));
                setSelectedEndStartMonth(selectedEndMonth)
            }

        }
    }

    const setHoverDate = useCallback((val: number | null) => {
        isClickedSecond.current = false;
        if (val) {
            setHover(val)
        }
    }, [hover])


    const setHoverDate2 = useCallback((val: number | null) => {
        isClickedSecond.current = true;
        if (val) {
            setHover2(val)
        }
    }, [hover])

    const convertToDate = (year: number, month: number, date: number) => {
        let selectedDate = new Date(year, month, date);
        return selectedDate.toLocaleDateString('en-US', {
            year: 'numeric',
            month: "2-digit",
            day: "2-digit"
        })
    }


    const updateStartDate = () => {
        if (selectedDate !== 0) {
            return convertToDate(selectedYear, selectedMonth, selectedDate)
        } else {
            return convertToDate(selectedEndYear, selectedEndMonth, selectedEndDate)
        }
    }

    const updateEndDate = () => {
        if (selectedDate !== 0) {
            return convertToDate(selectedEndYear, selectedEndMonth, selectedEndDate)
        } else {
            return convertToDate(selectedEndStartYear, selectedEndStartMonth, selectedEndStartDate)
        }
    }



    const getWeekendsBetweenDates = (startDate: Date, endDate: Date) => {
        const weekends: Date[] = [];
        let currentDate = new Date(startDate);

        while (currentDate <= endDate) {
            const dayOfWeek = currentDate.getDay();
            if (dayOfWeek === 0 || dayOfWeek === 6) {
                weekends.push(new Date(currentDate));
            }
            currentDate.setDate(currentDate.getDate() + 1);
        }

        return weekends;
    }

    const submit = () => {
        let starting = updateStartDate();
        let ending = updateEndDate();
        console.log(starting + " " + ending);
        // console.log(getWeekendsBetweenDates(new Date(starting), new Date(ending)))
        onChange([starting, ending], [...getWeekendsBetweenDates(new Date(starting), new Date(ending))])
    }

    const lastndays = (n: number) => {
        const lastNDays: Date[] = [];
        let currentDate = new Date(); // Current date
        while (lastNDays.length < n) {
            if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
                lastNDays.unshift(new Date(currentDate));
            }
            currentDate.setDate(currentDate.getDate() - 1);
        }
        setSelectedDate(lastNDays[0].getDate());
        setSelectedMonth(lastNDays[0].getMonth());
        setSelectedYear(lastNDays[0].getFullYear());
        setSelectedEndDate(lastNDays[lastNDays.length - 1].getDate());
        setSelectedEndMonth(lastNDays[lastNDays.length - 1].getMonth());
        setSelectedEndYear(lastNDays[lastNDays.length - 1].getFullYear());
    };


    return (
        <>
            <div className='input-date'>
                <input type="text" className="date-input" placeholder="Select Start date" value={updateStartDate()} />
                <input type="text" className="date-input" placeholder="Select End date" value={updateEndDate()} />
            </div>
            <div className='two'>
                <DatePicker1
                    onChange={onChange}
                    month={selectedMonth}
                    year={selectedYear}
                    date={selectedDate}
                    end={isSameMonthYear ? selectedEndDate : 0}
                    isEndPicker={false}
                    handleMonthChange={(e) => handleMonthChange(e)}
                    handleYearChange={(e) => handleYearChange(e)}
                    handleClickEvent={(e) => handleClickEvent(e)}
                    setHoverDate={(val) => setHoverDate(val)}
                    hover={hover}
                    isClickedSecond={isClickedSecond.current}
                />

                <DatePicker1
                    onChange={onChange}
                    month={isSameMonthYear ? selectedMonth + 1 : selectedEndMonth}
                    year={isSameMonthYear ? selectedYear : selectedEndYear}
                    date={isSameMonthYear ? 0 : selectedEndDate}
                    end={selectedEndStartDate}
                    isEndPicker={true}
                    handleMonthEndChange={(e) => handleMonthEndChange(e)}
                    handleYearEndChange={(e) => handleYearEndChange(e)}
                    handleClickEndEvent={(e) => handleClickEndEvent(e)}
                    setHoverDate2={(val) => setHoverDate2(val)}
                    hover2={hover2}
                    prevDate={selectedDate}
                    prevend={isSameMonthYear ? selectedEndDate : 0}
                    prevmonth={selectedMonth}
                    isClickedSecond={isClickedSecond.current}
                />

                {
                    lastDays && <div className="last-days">
                        <button onClick={() => lastndays(lastDays)}>Last {lastDays} days</button>
                        <button onClick={submit}>Submit</button>
                    </div>
                }

            </div>
        </>
    )
}

export default RangeDatePicker;
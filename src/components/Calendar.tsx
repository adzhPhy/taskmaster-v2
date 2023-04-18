import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { ChevronFirst, ChevronLast } from "lucide-react";
import { twMerge } from "tailwind-merge";

function leapYear(year: number) {
  return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
}

const currentYear = dayjs().year();
const currentMonth = dayjs().month();
const isLeapYear = leapYear(currentYear);

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sept",
  "Oct",
  "Nov",
  "Dec",
];

const numberOfDaysInMonths = [
  31,
  isLeapYear ? 29 : 28,
  31,
  30,
  31,
  30,
  31,
  31,
  30,
  31,
  30,
  31,
];

interface MonthDaysProps {
  day: number;
  dayOfWeek: string;
}

// 0-11 format
function getMonth(month: number, year: number) {
  const numberOfDays = numberOfDaysInMonths[month];
  const monthCalendar: MonthDaysProps[] = [];
  for (let i = 1; i < numberOfDays + 1; i++) {
    const dayString = `${month + 1}-${i}-${year}`;
    const day: Dayjs = dayjs(dayString, "M-D-YYYY");
    monthCalendar.push({
      day: i,
      dayOfWeek: day.$d.toString().substr(0, 3),
    });
  }
  return monthCalendar;
}

const Calendar = () => {
  const [calendarMonth, setCalendarMonth] = useState(currentMonth);
  const [calendarYear, setCalendarYear] = useState(currentYear);

  // get full calendar year
  const getFullCalendarYear = (year: number) => {
    const tempCalendar: Array<MonthDaysProps[]> = [];
    for (let i = 0; i < 12; i++) {
      const month: MonthDaysProps[] = getMonth(i, year);
      tempCalendar.push(month);
    }
    return tempCalendar;
  };

  const fullCalendar = getFullCalendarYear(currentYear);

  // get calendar for current month
  const [calendar, setCalendar] = useState(fullCalendar[calendarMonth]);

  // functions to handle month change
  const handlePrevMonth = () => {
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear(calendarYear - 1);
      // handle calendar for previous year
    } else {
      setCalendarMonth(calendarMonth - 1);
      setCalendar(fullCalendar[calendarMonth - 1]);
    }
  };
  const handleNextMonth = () => {
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear(calendarYear + 1);
      // handle calendar for next year
    } else {
      setCalendarMonth(calendarMonth + 1);
      setCalendar(fullCalendar[calendarMonth + 1]);
    }
  };

  // handle calendar inline
  const handleCalendarInline = () => {
    if (calendar[0].dayOfWeek === "Tue") {
      const calendarInset = "first:col-start-2";
      return calendarInset;
    }
    if (calendar[0].dayOfWeek === "Wed") {
      const calendarInset = "first:col-start-3";
      return calendarInset;
    }
    if (calendar[0].dayOfWeek === "Thu") {
      const calendarInset = "first:col-start-4";
      return calendarInset;
    }
    if (calendar[0].dayOfWeek === "Fri") {
      const calendarInset = "first:col-start-5";
      return calendarInset;
    }
    if (calendar[0].dayOfWeek === "Sat") {
      const calendarInset = "first:col-start-6";
      return calendarInset;
    }
    if (calendar[0].dayOfWeek === "Sun") {
      const calendarInset = "first:col-start-7";
      return calendarInset;
    }
  };

  return (
    <div className="w-full min-h-fit flex flex-col bg-teal-200 justify-center items-center px-2 pb-2">
      <div className="flex flex-row text-2xl text-black justify-center items-center">
        <ChevronFirst size={28} onClick={handlePrevMonth} />
        {`${months[calendarMonth]} ${calendarYear}`}
        <ChevronLast size={28} onClick={handleNextMonth} />
      </div>
      <div className="w-full grid grid-cols-7 grid-rows-5 place-items-end gap-1.5">
        {calendar.map((day: { day: number; dayOfWeek: string }) => (
          <div
            key={day.day}
            className={twMerge(
              handleCalendarInline(),
              "flex flex-col justify-center items-center bg-cyan-400 border-2 text-black rounded-xl px-1"
            )}
          >
            {`${day.dayOfWeek} ${day.day}`}
            <div className="w-full text-wrap bg-slate-300 rounded-md mb-4">
              <input type="text" placeholder="Write your task here" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;

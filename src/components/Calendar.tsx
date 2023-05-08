"use client";
import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { ChevronFirst, ChevronLast } from "lucide-react";
import { twMerge } from "tailwind-merge";
import Link from "next/link";

const Calendar = () => {
  function leapYear(year: number) {
    return (year % 4 == 0 && year % 100 != 0) || year % 400 == 0;
  }

  const currentYear = dayjs().year();
  const currentMonth = dayjs().month();

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

  const getNumberOfDaysInMonths = (month: number, year: number) => {
    const isLeapYear = leapYear(year);
    const numOfDays = [
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
    return numOfDays[month];
  };

  interface MonthDaysProps {
    day: number;
    dayOfWeek: string;
    date: string;
  }

  // 0-11 format
  function getMonth(month: number, year: number) {
    const numberOfDays = getNumberOfDaysInMonths(month, year);
    const monthCalendar: MonthDaysProps[] = [];
    for (let i = 1; i < numberOfDays + 1; i++) {
      const dayString = `${month + 1}-${i}-${year}`;
      const day: Dayjs = dayjs(dayString, "M-D-YYYY");
      monthCalendar.push({
        day: i,
        dayOfWeek: day.$d.toString().substr(0, 3),
        date: dayString,
      });
    }
    return monthCalendar;
  }
  // set state for Month and Year on top of Calendar
  const [calendarMonth, setCalendarMonth] = useState(currentMonth);
  const [calendarYear, setCalendarYear] = useState(currentYear);

  // function to obtain a full calendar year
  const getFullCalendarYear = (year: number) => {
    const tempCalendar: Array<MonthDaysProps[]> = [];
    for (let i = 0; i < 12; i++) {
      const month: MonthDaysProps[] = getMonth(i, year);
      tempCalendar.push(month);
    }
    return tempCalendar;
  };

  //
  const fullCalendarYear = getFullCalendarYear(calendarYear);
  // get calendar for current month
  const [calendar, setCalendar] = useState(fullCalendarYear[calendarMonth]);

  // functions to handle month change
  const handlePrevMonth = () => {
    if (calendarMonth !== 0) {
      setCalendarMonth(calendarMonth - 1);
      setCalendar(fullCalendarYear[calendarMonth - 1]);
    } else {
      setCalendar(getFullCalendarYear(calendarYear - 1)[11]);
      setCalendarYear(calendarYear - 1);
      setCalendarMonth(11);
    }
  };
  const handleNextMonth = () => {
    if (calendarMonth !== 11) {
      setCalendarMonth(calendarMonth + 1);
      setCalendar(fullCalendarYear[calendarMonth + 1]);
      // handle calendar for next year
    } else {
      setCalendar(getFullCalendarYear(calendarYear + 1)[0]);
      setCalendarYear(calendarYear + 1);
      setCalendarMonth(0);
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
      <div className="min-w-full grid grid-cols-7 grid-rows-5 place-items-center gap-1.5 border-2 border-red-800 p-4">
        {calendar.map(
          (day: { day: number; dayOfWeek: string; date: string }) => (
            <Link
              href={`/schedule/daily/${day.date}`}
              key={day.day}
              className={twMerge(
                handleCalendarInline(),
                "cal-card w-full flex flex-col justify-center items-center bg-cyan-300 border-2 text-black rounded-xl px-1 cursour-pointer"
              )}
            >
              <span className="text-lg font-semibold">{`${day.dayOfWeek} ${day.day}`}</span>

              <div className="bg-slate-300 rounded-md mb-2 px-2">
                <div>Tasks here</div>
              </div>
            </Link>
          )
        )}
      </div>
    </div>
  );
};

export default Calendar;

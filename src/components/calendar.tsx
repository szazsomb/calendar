"use client";
import { useState } from "react";

type CalendarProps = {
  date: Date;
};

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
] as const;
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
] as const;

function CalendarWeekDays() {
  return (
    <>
      {days.map((day, index) => (
        <div key={index} className="text-center text-gray-400">
          {day.slice(0, 3).toLocaleUpperCase()}
        </div>
      ))}
    </>
  );
}

const getNameOfFirstDayOfMonth = (date: Date) => {
  const firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  // console.log("nameOfFirst", days[date.getDay()])
  return days[firstDay.getDay()];
};

const getMonthLength = (date: Date) => {
  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  nextMonth.setDate(nextMonth.getDate() - 1);
  // console.log("LastDay", nextMonth.getDate())
  return nextMonth.getDate();
};

const PreviousMonthDates = ({ day }: { day: (typeof days)[number] }) => {
  const emptyDivs = Array.from({ length: days.indexOf(day) }, (_, index) => (
    <div key={index}></div>
  ));
  // console.log("Prev.", emptyDivs.length)
  return <>{emptyDivs}</>;
};

// const CurrentMonthDates = ({ date }: { date: Date }) => {
//   const days = Array.from({ length: getMonthLength(date) }, (_, index) => (
//     <button className={`rounded-full hover:bg-gray-600 date-cell p-2 text-center ${
//       selectedDate === date ? "selected" : ""
//     }`} key={index}>{index+1}</button>
//   ));
//   return <>{days}</>;
// };

export function Calendar() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [currentDate, setCurrentDate] = useState<Date>(new Date());
  const [inspesctedMonthDate, setInspectedMonthDate] = useState(new Date());

  const day = getNameOfFirstDayOfMonth(inspesctedMonthDate);
  const datesArray = Array.from(
    { length: getMonthLength(inspesctedMonthDate) },
    (_, index) => index + 1
  );
  function handleDateClick(day: number): void {
    setSelectedDate(
      new Date(
        inspesctedMonthDate.getFullYear(),
        inspesctedMonthDate.getMonth(),
        day
      )
    );
  }

  return (
    <div>
      <div className="flex justify-between">
        <button
          onClick={() => {
            const nextMonthDate = new Date(inspesctedMonthDate);
            nextMonthDate.setMonth(nextMonthDate.getMonth() - 1);
            nextMonthDate.setDate(1);
            setInspectedMonthDate(nextMonthDate);
          }}
        >{`<`}</button>
        <div>{`${
          months[inspesctedMonthDate.getMonth()]
        } (${inspesctedMonthDate.getFullYear()})`}</div>

        <button
          onClick={() => {
            const nextMonthDate = new Date(inspesctedMonthDate);
            nextMonthDate.setMonth(nextMonthDate.getMonth() + 1);
            nextMonthDate.setDate(1);
            setInspectedMonthDate(nextMonthDate);
            // setSelectedDate(nextMonthDate);
          }}
        >{`>`}</button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        <CalendarWeekDays />
        <PreviousMonthDates day={day} />
        {/* <CurrentMonthDates date={selectedDate}/> */}
        {datesArray.map((day) => (
          <button
            key={day}
            className={`rounded-full text-center hover:bg-gray-600 ${
              selectedDate.getDate() === day &&
              selectedDate.getMonth() === inspesctedMonthDate.getMonth()
                ? "bg-red-900"
                : ""
            } ${
              currentDate.getMonth() === inspesctedMonthDate.getMonth() &&
              currentDate.getDate() === day
                ? "border-2 border-red-400"
                : ""
            }`}
            onClick={() => handleDateClick(day)}
          >
            {day}
          </button>
        ))}
      </div>
    </div>
  );
}

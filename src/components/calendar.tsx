"use client";
import { useEffect, useState } from "react";
import { CalendarEvent } from "@prisma/client";
import { prisma } from "@/db";
import { CalendarEventList } from "./calendareventlist";
import { EventForm } from "./eventform";

type CalendarProps = {
  date: Date;
  setDate: (date: Date) => void;
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

function CalendarWeekDayNames(): JSX.Element {
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
  return days[firstDay.getDay()];
};

const getMonthLength = (date: Date) => {
  const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  nextMonth.setDate(nextMonth.getDate() - 1);
  return nextMonth.getDate();
};

function PreviousMonthDates({
  day,
}: {
  day: (typeof days)[number];
}): JSX.Element {
  const emptyDivs = Array.from({ length: days.indexOf(day) }, (_, index) => (
    <div key={index}></div>
  ));
  return <>{emptyDivs}</>;
}

const setDefaultDate = (date: Date) => {
  const newDate = new Date(date);

  newDate.setHours(0);
  newDate.setMinutes(0);
  newDate.setSeconds(0);
  newDate.setMilliseconds(0);

  return newDate;
};

export function Calendar({ date, setDate }: CalendarProps): JSX.Element {
  const [selectedDate, setSelectedDate] = useState<null | Date>(
    date ? setDefaultDate(date) : null
  );
  const [currentDate] = useState<Date>(new Date());
  const [inspesctedMonthDate, setInspectedMonthDate] = useState<Date>(
    new Date()
  );
  const [events, setEvents] = useState<CalendarEvent[]>([]);

  useEffect(() => {
    if (selectedDate) {
      fetch(`/api/events?searchDate=${selectedDate.toISOString()}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Response was not ok");
          }
          return response.json();
        })
        .then((data: CalendarEvent[]) => {
          setEvents(data);
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        });
    }
  }, [selectedDate]);

  const day = getNameOfFirstDayOfMonth(inspesctedMonthDate);
  const datesArray = Array.from(
    { length: getMonthLength(inspesctedMonthDate) },
    (_, index) => index + 1
  );

  const handleDateClick = (day: number): void => {
    setSelectedDate(
      new Date(
        inspesctedMonthDate.getFullYear(),
        inspesctedMonthDate.getMonth(),
        day
      )
    );
  };

  const shiftMonth = (shiftValue: 1 | -1): void => {
    const newMonthDate = new Date(inspesctedMonthDate);
    newMonthDate.setMonth(newMonthDate.getMonth() + shiftValue);
    setInspectedMonthDate(newMonthDate);
  };

  return (
    <>
      <div className="flex justify-between">
        <button onClick={() => shiftMonth(-1)}>{`<`}</button>
        <div>
          {`${
            months[inspesctedMonthDate.getMonth()]
          } (${inspesctedMonthDate.getFullYear()})`}
        </div>
        <button onClick={() => shiftMonth(1)}>{`>`}</button>
      </div>
      <div className="grid grid-cols-7 gap-2">
        <CalendarWeekDayNames />
        <PreviousMonthDates day={day} />
        {datesArray.map((day) => (
          <button
            key={day}
            className={`rounded-full text-center hover:bg-gray-600 ${
              selectedDate!.getDate() === day &&
              inspesctedMonthDate.getFullYear() === currentDate.getFullYear() &&
              selectedDate!.getMonth() === inspesctedMonthDate.getMonth()
                ? "bg-red-900"
                : ""
            } ${
              currentDate.getMonth() === inspesctedMonthDate.getMonth() &&
              inspesctedMonthDate.getFullYear() === currentDate.getFullYear() &&
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
      <section>
        <h1>
          {selectedDate
            ? `${selectedDate.getFullYear()} ${selectedDate.getMonth()} ${selectedDate.getDate()}`
            : ""}
        </h1>
        <h2>{selectedDate ? `${days[selectedDate.getDay()]}` : null}</h2>
        <div>
          <CalendarEventList events={events} />
          {selectedDate ? (
            <EventForm
              date={selectedDate!}
              setDate={setSelectedDate}
              setEvents={setEvents}
            />
          ) : null}
        </div>
      </section>
    </>
  );
}
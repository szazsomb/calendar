import { addCalendarEvent } from "@/app/actions";
import { CalendarEvent } from "@prisma/client";
import { useState, useTransition } from "react";
import { Calendar } from "./calendar";
import { ColorPicker } from "./colorpicker";

type EventFormProps = {
  event?: CalendarEvent;
  date: Date;
  setDate: (date: Date) => void;
  setEvents: React.Dispatch<
    React.SetStateAction<
      {
        id: number;
        title: string;
        description: string | null;
        date: Date;
        hexColor: string | null;
      }[]
    >
  >;
};

export function EventForm({ event, date, setDate, setEvents }: EventFormProps) {
  const [isPending, startTransition] = useTransition();
  const [hexColor, setHexColor] = useState<string | null>(null);

  return (
    <div className="p-4">
      <div className="flex-col gap-2">
        <div>
          <label
            htmlFor="name"
            className="w-max pr-20 text-gray-300 text-[12px]"
          >
            Title
          </label>
          <input
            required
            minLength={1}
            name="title"
            id="title"
            type="text"
            className="h-[35px] w-full rounded-lg px-[10px] text-[15px] bg-gray-70 border-gray-50 border-2 mb-4 focus-within:bg-gray-50 focus-within:border-gray-40 outline-none text-black"
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="w-max pr-10 text-gray-300 text-[12px]"
          >
            description
          </label>
          <textarea
            name="description"
            id="description"
            className="h-[35px] w-full rounded-lg px-[10px] text-[15px] bg-gray-70 border-gray-50 border-2 mb-4 focus-within:bg-gray-50 focus-within:border-gray-40 outline-none text-black"
          />
        </div>
      </div>
      <div>
        <ColorPicker setColor={setHexColor} />
      </div>
      <button
        className="rounded-xl bg-gray-800"
        onClick={() => {
          const title = (document.getElementById("title") as HTMLInputElement)
            .value;
          const description = (
            document.getElementById("description") as HTMLInputElement
          ).value;
          const formData = new FormData();
          formData.append("title", title);
          formData.append("description", description);
          if (hexColor) {
            formData.append("color", hexColor);
          }
          startTransition(() => addCalendarEvent(date, formData));
          setDate(date);
          setEvents((prevEvents: CalendarEvent[]) => [
            ...prevEvents,
            {
              id: 0,
              title,
              description,
              date,
              hexColor,
            },
          ]);
        }}
      >
        ADD
      </button>
    </div>
  );
}

import { CalendarEvent } from "@prisma/client"
import React from "react"
import { CalendarEventItem } from "./calendareventitem";

type CalendarEventListProps = React.PropsWithChildren<{
    events: CalendarEvent[];
}>

export function CalendarEventList({events}: CalendarEventListProps){

    return(
    <div className="flex flex-col gap-8 p-6 justify-start">
        {events.map((event) => (
            <CalendarEventItem key={event.id} {...event}/>
        ))}
    </div>
    )
}
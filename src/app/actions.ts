"use server";

import { prisma } from "@/db";
import { revalidatePath } from "next/cache";

export async function addCalendarEvent(date: Date, formdata: FormData) {
    const title = formdata.get("title") as string;
    const description = formdata.get("description") as string;
    const hexColor = formdata.get("color") ? formdata.get("color") as string : null; 

    const ISODate = date.toISOString();
    await prisma.calendarEvent.create({
        data: {
            title, description, date: ISODate, hexColor
        }
    })
}
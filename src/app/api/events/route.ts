import { prisma } from "../../../db";
import { NextResponse } from "next/server";

export const GET = async (request: Request) => {

  const { searchParams } = new URL(request.url);

  const selectedISODate = searchParams.get("searchDate") as string;
  
  const events = await prisma.calendarEvent.findMany({
    where: {
      date: selectedISODate,
    },
  });

  return NextResponse.json(events);
};

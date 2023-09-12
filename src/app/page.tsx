"use client";

import { Calendar } from '@/components/calendar'
import { useState } from 'react'

export default function Home() {
  const [topDate, setTopDate] = useState(new Date("2023-09-11"));

  return (
    <main className=" p-12">
      <Calendar date={topDate} setDate={setTopDate}/>
    </main>
  )
}

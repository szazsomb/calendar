import { CalendarEvent } from "@prisma/client"

export const colorVariants: {[key: string]: string} = {
    "f44336" : "bg-[#f44336]",
    "e91e63" : "bg-[#e91e63]",
    "9c27b0" : "bg-[#9c27b0]",
    "673ab7" : "bg-[#673ab7]",
    "3f51b5" : "bg-[#3f51b5]",
    "2196f3" : "bg-[#2196f3]",
    "03a9f4" : "bg-[#03a9f4]",
    "00bcd4" : "bg-[#00bcd4]",
    "009688" : "bg-[#009688]",
    "4caf50" : "bg-[#4caf50]",
    "8bc34a" : "bg-[#8bc34a]",
    "cddc39" : "bg-[#cddc39]",
    "ffeb3b" : "bg-[#ffeb3b]",
    "ffc107" : "bg-[#ffc107]",
    "ff5722" : "bg-[#ff5722]",
    "795548" : "bg-[#795548]",
    "607d8b" : "bg-[#607d8b]",
} as const

function hexToRgba(hex: string, alpha: number = 1) {
    hex = hex.replace(/^#/, '');
  
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
  
    alpha = Math.min(1, Math.max(0, alpha));
  
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export function CalendarEventItem(event: CalendarEvent){

    return (
    <div className={`p-2 rounded-xl ${event.hexColor ? colorVariants[event.hexColor.slice(1)] : "bg-gray-500"}`}>
        <h1 className="font-sans text-2xl font-bold text-left">{event.title}</h1>
        <p className="font-sans text-left">{event.description}</p>
    </div>
    );
}
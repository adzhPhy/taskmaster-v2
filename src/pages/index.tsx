import { Inter } from "next/font/google";
import Calendar from "@/components/Calendar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main className="w-full flex flex-col justify-center items-center border-2 border-red-300">
      DayJs Calendar
      <div className="w-full border-2 border-blue-500">
        <Calendar />
      </div>
    </main>
  );
}

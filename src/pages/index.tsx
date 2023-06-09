import { Inter } from "next/font/google";
import Calendar from "@/components/Calendar";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="main mt-6 w-full min-h-fit flex flex-col justify-center items-center">
      <nav className="w-full flex flex-row justify-between items-center border-2 p-1">
        <div className="left-side flex gap-2">Logo | Hello, User</div>
        <div className="right-side flex gap-2">
          Dashboard | Schedule | Shared Schedules | Settings | Logout
        </div>
      </nav>
      <div className="dashboard w-full border-2 ">
        <div className="dashboard-menu border-2 border-green-600">
          Dashboard Menu Items
        </div>
        Home
      </div>
    </div>
  );
}

import dayjs from "dayjs";

const Schedule = ({ date }: { date: string | null }) => {
  const timeScheduleDay = dayjs(date, "M-D-YYYY");
  return (
    <main className="main mt-6 w-full min-h-fit flex flex-col justify-center items-center border-2 border-slate-400">
      <div>{timeScheduleDay.$d.toString().substr(0, 10)}</div>
      <div className="border-2 border-red-100">
        <ul className="m-1 flex flex-row gap-2">
          <li>Add</li>
          <li>Edit</li>
          <li>Delete</li>
          <li>Share</li>
        </ul>
      </div>
      <div className="w-full grid place-items-center border-2 border-red-600">
        Time Schedule here
        {/* Map through tasks from db  */}
      </div>
    </main>
  );
};

export default Schedule;

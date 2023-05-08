"use client";
import { useRouter } from "next/router";
import Schedule from "@/components/Schedule";

const DailyTaskPage = ({}) => {
  const router = useRouter();
  const { pid } = router.query;
  console.log(pid);
  return (
    <div>
      <Schedule date={pid} />
    </div>
  );
};

export default DailyTaskPage;

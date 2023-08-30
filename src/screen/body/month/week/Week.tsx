import { Day } from "./day/Day";
import type { Schedule, ScheduleTable } from "~/@types/schedule.js";

type Props = {
  year: number;
  month: number;
  start: number;
  end: number;
  scheduleTables: ScheduleTable[];
  getTableIndex: (year: number, month: number, day: number) => number;
  isOnline: boolean;
  registerToSupabase: (
    title: string,
    date: number[],
    start: string,
    end: string,
    memo: string
  ) => Promise<void>;
  updateOnSupabase: (schedule: Schedule) => void;
  deleteFromSupabase: (uid: number) => void;
};

export const Week: React.FC<Props> = ({
  year,
  month,
  start,
  end,
  scheduleTables,
  getTableIndex,
  isOnline,
  registerToSupabase,
  updateOnSupabase,
  deleteFromSupabase,
}) => {
  const loop = new Array(7).fill(0);
  let day = start;

  return (
    <div className="week">
      {loop.map((_, i) => {
        i >= end - start ? (day = -1) : day++;
        return (
          <Day
            key={`day_${i}`}
            year={year}
            month={month}
            day={day}
            row={i}
            scheduleTables={scheduleTables}
            getTableIndex={getTableIndex}
            isOnline={isOnline}
            registerToSupabase={registerToSupabase}
            updateOnSupabase={updateOnSupabase}
            deleteFromSupabase={deleteFromSupabase}
          />
        );
      })}
    </div>
  );
};

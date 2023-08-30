import { Day } from "./day/Day";
import type { ScheduleTable } from "~/@types/schedule.js";
import type { Supabase } from "~/supabase/Supabase";

type Props = {
  year: number;
  month: number;
  start: number;
  end: number;
  scheduleTables: ScheduleTable[];
  supabase: Supabase | null;
  save: (
    uid: number,
    thisTitle: string,
    thisDate: number[],
    thisStart: string,
    thisEnd: string,
    thisMemo: string
  ) => void;
  getTableIndex: (year: number, month: number, day: number) => number;
  isOnline: boolean;
};

export const Week: React.FC<Props> = ({
  year,
  month,
  start,
  end,
  scheduleTables,
  supabase,
  save,
  getTableIndex,
  isOnline,
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
            supabase={supabase}
            save={save}
            getTableIndex={getTableIndex}
            isOnline={isOnline}
          />
        );
      })}
    </div>
  );
};

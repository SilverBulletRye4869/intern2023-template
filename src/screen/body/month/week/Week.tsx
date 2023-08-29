/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Day } from "./day/Day";
import type { ScheduleTable } from "~/@types/schedule.js";
import { SupabaseClient } from "@supabase/supabase-js";
import type { Supabase } from "~/supabase/Supabase";

type Props = {
  year: number;
  month: number;
  start: number;
  end: number;
  scheduleTables: ScheduleTable[];
  supabase: Supabase;
  save: (
    uid: number,
    thisTitle: string,
    thisDate: number[],
    thisStart: string,
    thisEnd: string,
    thisMemo: string
  ) => void;
  getTableIndex: (year: number, month: number, day: number) => number;
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
          />
        );
      })}
    </div>
  );
};

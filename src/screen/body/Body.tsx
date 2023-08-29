/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import Label from "./label/Labels";
import { Month } from "./month/Month";
import type { ScheduleTable } from "~/@types/schedule.js";
import { Schedule } from "~/@types/schedule.js";
import type { Supabase } from "~/supabase/Supabase";

type Props = {
  year: number;
  month: number;
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

export const Body: React.FC<Props> = ({
  year,
  month,
  scheduleTables,
  supabase,
  save,
  getTableIndex,
}) => {
  return (
    <div className="body">
      <Label />
      <Month
        year={year}
        month={month}
        scheduleTables={scheduleTables}
        supabase={supabase}
        save={save}
        getTableIndex={getTableIndex}
      />
    </div>
  );
};

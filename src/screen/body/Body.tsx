import { Labels } from "./label/Labels";
import { Month } from "./month/Month";
import type { ScheduleTable } from "~/@types/schedule.js";
import type { Supabase } from "~/supabase/Supabase";
type Props = {
  year: number;
  month: number;
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

export const Body: React.FC<Props> = ({
  year,
  month,
  scheduleTables,
  supabase,
  save,
  getTableIndex,
  isOnline,
}) => {
  return (
    <div className="body">
      <Labels />
      <Month
        year={year}
        month={month}
        scheduleTables={scheduleTables}
        supabase={supabase}
        save={save}
        getTableIndex={getTableIndex}
        isOnline={isOnline}
      />
    </div>
  );
};

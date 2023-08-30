import { Labels } from "./label/Labels";
import { Month } from "./month/Month";
import type { Schedule, ScheduleTable } from "~/@types/schedule.js";
type Props = {
  year: number;
  month: number;
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
  loadSchedules: (targetYear: number, targetMonth: number) => Promise<void>;
};

export const Body: React.FC<Props> = ({
  year,
  month,
  scheduleTables,
  getTableIndex,
  isOnline,
  registerToSupabase,
  updateOnSupabase,
  deleteFromSupabase,
  loadSchedules,
}) => {
  return (
    <div className="body">
      <Labels />
      <Month
        year={year}
        month={month}
        scheduleTables={scheduleTables}
        getTableIndex={getTableIndex}
        isOnline={isOnline}
        registerToSupabase={registerToSupabase}
        updateOnSupabase={updateOnSupabase}
        deleteFromSupabase={deleteFromSupabase}
        loadSchedules={loadSchedules}
      />
    </div>
  );
};

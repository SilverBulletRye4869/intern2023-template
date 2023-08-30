import { Week } from "./week/Week";
import { useEffect } from "react";
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

const DAY_MAX = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const Month: React.FC<Props> = ({
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
  //指定した年月の最終日を取得する（閏年考慮済み）
  const getLastDay = (year: number, month: number) => {
    return month !== 1 || year % 4 != 0 || (year % 100 == 0 && year % 400 != 0)
      ? DAY_MAX[month]
      : 29;
  };

  const startDayOfWeek = new Date(year, month, 1).getDay(); //1日の曜日を取得
  const lineNum =
    Math.ceil((getLastDay(year, month) - (7 - startDayOfWeek)) / 7) + 1; //列の数
  const loop = new Array(lineNum).fill(0);

  useEffect(() => {
    void loadSchedules(year, month);
  }, [loadSchedules, month, year]);

  let startDay: number = -startDayOfWeek;
  return (
    <div className="month">
      {loop.map((_, i) => {
        return (
          <Week
            year={year}
            month={month}
            start={startDay}
            end={Math.min(getLastDay(year, month), (startDay += 7))}
            key={`week_${i}`}
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

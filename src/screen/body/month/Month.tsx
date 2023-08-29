/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Week } from "./week/Week";
import { useEffect } from "react";
import type { ScheduleTable } from "~/@types/schedule.js";
import type { SupabaseClient } from "@supabase/supabase-js";
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

const DAY_MAX = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const loadedMonth: string[] = [];
export const Month: React.FC<Props> = ({
  year,
  month,
  scheduleTables,
  supabase,
  save,
  getTableIndex,
}) => {
  //指定した年月の最終日を取得する（閏年考慮済み）
  const getLastDay = (year: number, month: number) => {
    return month !== 1 || year % 4 != 0 || (year % 100 == 0 && year % 400 != 0)
      ? DAY_MAX[month]
      : 29;
  };

  useEffect(() => {
    if (loadedMonth.indexOf(getDateAsString()) < 0) void getSchedules();
  }, [getSchedules]);

  async function getSchedules() {
    loadedMonth.push(getDateAsString());
    const { data } = await supabase.getSchedules(year, month);
    if (data == null) return;

    data.forEach((e) => {
      save(
        e.sche_id,
        e.title,
        e.date.split("-").map((s) => parseInt(s)),
        e.startTime != undefined ? e.startTime.slice(0, -3) : "",
        e.endTime != undefined ? e.endTime.slice(0, -3) : "",
        e.memo
      );
    });
  }

  const getDateAsString = () => `${year}-${month}`;

  const startDayOfWeek = new Date(year, month, 1).getDay(); //1日の曜日を取得
  const lineNum =
    Math.ceil((getLastDay(year, month) - (7 - startDayOfWeek)) / 7) + 1; //列の数
  const loop = new Array(lineNum).fill(0);

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
            supabase={supabase}
            save={save}
            getTableIndex={getTableIndex}
          />
        );
      })}
    </div>
  );
};

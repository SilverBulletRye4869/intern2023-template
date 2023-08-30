import { useEffect, useState, useCallback } from "react";

import { Header } from "./header/Header";
import { Body } from "./body/Body";
import type { Schedule, ScheduleTable } from "~/@types/schedule";
import { Supabase } from "~/supabase/Supabase";
import { SignIn } from "./signin/Signin";
import { OfflineWarning } from "./offlineWarning/OfflineWarning";

const HOLIDAY_API = "https://holidays-jp.github.io/api/v1/date.json";

let isHolidayLoaded = false;
const supabase = new Supabase();

export const Screen: React.FC = () => {
  const isOnline = window.navigator.onLine;
  const [scheduleTables, setScheduleTables] = useState<ScheduleTable[]>([]);
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());

  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");

  const setTime = (newYear: number, newMonth: number): void => {
    while (newMonth < 0) {
      newYear--;
      newMonth += 12;
    }
    while (newMonth > 11) {
      newYear++;
      newMonth -= 12;
    }
    setYear(newYear);
    setMonth(newMonth);
  };

  const getTableIndex = useCallback(
    (year: number, month: number, day: number): number => {
      return scheduleTables.findIndex(
        (scheTable: ScheduleTable) =>
          scheTable.year == year &&
          scheTable.month == month &&
          scheTable.day == day
      );
    },
    [scheduleTables]
  );

  const save = useCallback(
    (
      uid: number,
      thisTitle: string,
      thisDate: number[],
      thisStart: string,
      thisEnd: string,
      thisMemo: string,
      isHoliday = false
    ): void => {
      let tableIndex: number = getTableIndex(
        thisDate[0],
        thisDate[1] - 1,
        thisDate[2]
      );
      if (tableIndex == -1) {
        tableIndex = scheduleTables.length;
        scheduleTables[tableIndex] = {
          year: thisDate[0],
          month: thisDate[1] - 1,
          day: thisDate[2],
          isHoliday: isHoliday,
          nextId: 0,
          schedules: [],
        };
      }
      const schedule: Schedule = {
        uid: uid,
        id: scheduleTables[tableIndex].nextId++,
        title: thisTitle,
        start: thisStart,
        end: thisEnd,
        memo: thisMemo,
        allowEdit: !isHoliday,
      };

      const scheduleTable = scheduleTables[tableIndex];
      scheduleTable.schedules = [
        ...scheduleTables[tableIndex].schedules,
        schedule,
      ];

      setScheduleTables([
        ...scheduleTables.slice(0, tableIndex),
        scheduleTable,
        ...scheduleTables.slice(tableIndex + 1, scheduleTables.length),
      ]);
      //setBookNum(bookNum + 1);
    },
    [getTableIndex, scheduleTables]
  );

  const holidayLoad = useCallback(async (): Promise<void> => {
    const res: Response = await fetch(HOLIDAY_API);
    const data: string = await res.text();
    const holidayJson: JSON = JSON.parse(data) as JSON;
    let [key, value]: [string, string] = ["", ""];
    for ([key, value] of Object.entries(holidayJson)) {
      const date: number[] = key.split("-").map((s) => parseInt(s));
      save(-1, value, date, "", "", "祝日", true);
    }
  }, [save]);

  useEffect((): void => {
    if (isHolidayLoaded || !isOnline) return;
    isHolidayLoaded = true;
    void holidayLoad();
  }, [holidayLoad, isOnline]);

  void (async () => {
    console.log("tets");
    if (supabase == null || userName != "") return;
    const id: string | undefined = await supabase.getUserId();
    if (!id) return;
    setUserId(id);
    const name: string | undefined = await supabase.getUserName();
    if (!name) return;
    setUserName(name);
  })();

  return (
    <div className="screen">
      {userId || !isOnline ? (
        <>
          {!isOnline ? <OfflineWarning /> : ""}
          <Header
            year={year}
            month={month}
            setTime={setTime}
            userName={userName}
            supabase={supabase}
          />
          <Body
            year={year}
            month={month}
            scheduleTables={scheduleTables}
            supabase={supabase}
            save={save}
            getTableIndex={getTableIndex}
            isOnline={isOnline}
          />
        </>
      ) : (
        <SignIn supabase={supabase} />
      )}
    </div>
  );
};

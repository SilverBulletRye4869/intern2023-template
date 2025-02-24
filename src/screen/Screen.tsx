import { useEffect, useState, useCallback } from "react";

import { Header } from "./header/Header";
import { Body } from "./body/Body";
import type { Schedule, ScheduleTable } from "~/@types/schedule";
import type { Providers } from "~/supabase/Supabase";
import { Supabase } from "~/supabase/Supabase";
import { SignIn } from "./signin/Signin";
import { OfflineWarning } from "./offlineWarning/OfflineWarning";
import type { PostgrestSingleResponse } from "@supabase/supabase-js";
import type { SupabaseResponse } from "~/@types/supabase";

const HOLIDAY_API = "https://holidays-jp.github.io/api/v1/date.json";

const MIN_YEAR = 100;

const loadedMonth: string[] = [];
let isHolidayLoaded = false;

const supabase = new Supabase();

export const Screen: React.FC = () => {
  const isOnline = window.navigator.onLine; //&& false;

  const [isNoLogin, setNoLogin] = useState<boolean>(false);
  const [scheduleTables, setScheduleTables] = useState<ScheduleTable[]>([]);
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());

  const [userId, setUserId] = useState<string>("");
  const [userName, setUserName] = useState<string>("");
  const [userAddress, setUserAddress] = useState<string>("");
  const [userIconUrl, setUserIconUrl] = useState<string>("");

  //年月を設定する
  const setTime = (newYear: number, newMonth: number): void => {
    while (newMonth < 0) {
      newYear = Math.max(MIN_YEAR, newYear - 1);
      newMonth += 12;
    }
    while (newMonth > 11) {
      newYear++;
      newMonth -= 12;
    }
    setYear(newYear);
    setMonth(newMonth);
  };

  //scheduleTablesからindex番号を取得する
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

  //対変数ほぞん関数
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

  //===================================================== 祝日API

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

  //===================================================== Supabase

  const signIn = (provider: Providers): void => {
    void supabase.signIn(provider);
  };

  const signOut = async (): Promise<boolean> => {
    return await supabase.signOut();
  };

  const loadUserInfo = useCallback(async (): Promise<void> => {
    if (supabase == null) return;

    const id: string | undefined = await supabase.getUserId();
    if (!id) return;
    setUserId(id);

    const name: string | undefined = await supabase.getUserName();
    if (!name) return;
    setUserName(name);

    const address = await supabase.getMailAddress();
    if (!address) return;
    setUserAddress(address);

    const url = await supabase.getIconUrl();
    if (!url) return;
    setUserIconUrl(url);
  }, []);

  useEffect(() => {
    void loadUserInfo();
  }, [loadUserInfo]);

  const registerToSupabase = async (
    title: string,
    date: number[],
    start: string,
    end: string,
    memo: string
  ): Promise<void> => {
    if (supabase == null) return;
    let res: PostgrestSingleResponse<SupabaseResponse[]> | null = null;
    if (!isNoLogin)
      res = await supabase.regisisterSchedule(title, date, start, end, memo);
    const scheduleId =
      res && res.data && !isNoLogin ? res.data[0].scheduleId : -1;
    save(scheduleId, title, date, start, end, memo);
  };

  const updateOnSupabase = (schedule: Schedule): void => {
    if (supabase == null || isNoLogin) return;
    void supabase.updateSchedule(
      schedule.uid,
      schedule.title,
      schedule.start,
      schedule.end,
      schedule.memo
    );
  };

  const deleteFromSupabase = (uid: number): void => {
    if (supabase == null || isNoLogin) return;
    void supabase.deleteSchedule(uid);
  };

  const getDateAsString = (targetYear: number, targetMonth: number): string =>
    `${targetYear}-${targetMonth}`;

  const loadSchedules = async (
    targetYear: number,
    targetMonth: number
  ): Promise<void> => {
    if (
      supabase == null ||
      isNoLogin ||
      loadedMonth.indexOf(getDateAsString(targetYear, targetMonth)) >= 0
    )
      return;
    loadedMonth.push(getDateAsString(targetYear, targetMonth));
    const { data } = await supabase.getSchedules(year, month);
    if (data == null) return;
    data.forEach((e) => {
      save(
        e.scheduleId,
        e.title,
        e.date.split("-").map((s: string) => parseInt(s)),
        e.startTime != undefined ? e.startTime.slice(0, -3) : "",
        e.endTime != undefined ? e.endTime.slice(0, -3) : "",
        e.memo
      );
    });
  };

  //===================================================== JSX
  return (
    <div className="screen">
      {userId || !isOnline || isNoLogin ? (
        <>
          {!isOnline ? <OfflineWarning /> : ""}
          <Header
            year={year}
            month={month}
            setTime={setTime}
            userName={userName}
            userAddress={userAddress}
            userIconUrl={userIconUrl}
            isOnline={isOnline}
            signOut={signOut}
            isNoLogin={isNoLogin}
          />
          <Body
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
        </>
      ) : (
        <SignIn signIn={signIn} setNoLogin={setNoLogin} />
      )}
    </div>
  );
};

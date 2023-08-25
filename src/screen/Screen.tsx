/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { useState } from "react";

import Header from "./header/Header";
import Body from "./body/Body";
export type { Schedule, ScheduleTable };

interface Schedule {
  id: number;
  title: string;
  start: string;
  end: string;
  memo: string;
  allowEdit: boolean;
}

interface ScheduleTable {
  year: number;
  month: number;
  day: number;
  isHoliday: boolean;
  nextId: number;
  sche: Schedule[];
}

const Screen = () => {
  const [scheduleTables, setScheduleTables] = useState<ScheduleTable[]>([]);

  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());

  const setTime = (newYear: number, newMonth: number) => {
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

  if (scheduleTables.length == 0) {
    void fetch("https://holidays-jp.github.io/api/v1/date.json") //1
      .then((response: Response) => response.text()) //2
      .then((data: string) => {
        //3
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const holidayJson: JSON = JSON.parse(data);
        let temp: ScheduleTable[] = [];
        for (const [key, value] of Object.entries(holidayJson)) {
          const date: number[] = key.split("-").map((s) => parseInt(s));
          const schedule: Schedule = {
            title: value,
            id: 0,
            start: "",
            end: "",
            memo: "祝日",
            allowEdit: false,
          };
          const scheduleTable: ScheduleTable = {
            year: date[0],
            month: date[1] - 1,
            day: date[2],
            isHoliday: true,
            nextId: 1,
            sche: [schedule],
          };
          temp = [...temp, scheduleTable];
        }
        setScheduleTables(temp);
      });
  }

  return (
    <div className="screen" key="screen">
      <Header year={year} month={month} setTime={setTime} />
      <Body
        year={year}
        month={month}
        scheduleTables={scheduleTables}
        setScheduleTables={setScheduleTables}
      />
    </div>
  );
};

export default Screen;

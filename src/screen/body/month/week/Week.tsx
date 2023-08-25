import Day from "./day/Day";
import type { ScheduleTable } from "~/screen/Screen";

type Props = {
  year: number;
  month: number;
  start: number;
  end: number;
  scheduleTables: ScheduleTable[];
  setScheduleTables: React.Dispatch<React.SetStateAction<ScheduleTable[]>>;
};

const Week = ({
  year,
  month,
  start,
  end,
  scheduleTables,
  setScheduleTables,
}: Props) => {
  const loop = new Array(7).fill(0);
  let day = start;

  return (
    <div className="week">
      {loop.map((_, i) => {
        i >= end - start ? (day = -1) : day++;
        return (
          <>
            <Day
              year={year}
              month={month}
              day={day}
              row={i}
              scheduleTables={scheduleTables}
              setScheduleTables={setScheduleTables}
            />
          </>
        );
      })}
    </div>
  );
};

export default Week;

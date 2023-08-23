import { Box, ProgressProps } from "@chakra-ui/react";
import ReactDOM from "react-dom/client";
import { useState } from "react";
import PopoverForm from "./form/PopOverForm";

export type { Schedule };

type Props = {
  year: number;
  month: number;
  day: number;
  row: number;
};

interface Schedule {
  title: string;
  start: string;
  end: string;
  memo: string;
}

interface ScheduleTable {
  year: number;
  month: number;
  day: number;
  sche: Schedule[];
}

const scheduleTables: ScheduleTable[] = [];
const Day = ({ year, month, day, row }: Props) => {
  const [bookNum, setBookNum] = useState(0);
  const onHover = (day: number, isOver: boolean) => {
    if (day <= 0) return;
    const bookBox = document.getElementById(`${day}_schedule`);
    if (bookBox == null) return;
    bookBox.style.display = isOver ? "flex" : "none";
    return;
  };

  const getTableIndex = (year: number, month: number, day: number) => {
    return scheduleTables.findIndex(
      (scheTable: ScheduleTable) =>
        scheTable.year == year &&
        scheTable.month == month &&
        scheTable.day == day
    );
  };

  const register = (
    title: string,
    start: string,
    end: string,
    memo: string
  ) => {
    console.log(`${title}-${start}-${end}-${memo}`);
    const sche: Schedule = {
      title: title,
      start: start,
      end: end,
      memo: memo,
    };
    let index: number = getTableIndex(year, month, day);
    if (index == -1) {
      index = scheduleTables.length;
      scheduleTables[index] = {
        year: year,
        month: month,
        day: day,
        sche: [],
      };
    }
    scheduleTables[index].sche = [...scheduleTables[index].sche, sche];
    setBookNum(bookNum + 1);
    return;
  };
  return (
    <Box
      className={`day row${row}`}
      id={`${day}`}
      onMouseOver={() => {
        onHover(day, true);
      }}
      onMouseOut={() => {
        onHover(day, false);
      }}
    >
      <Box className="day_font">{day <= 0 ? "" : day}</Box>
      <Box className="schedule_set">
        {(() => {
          const index = getTableIndex(year, month, day);
          return (
            <Box className="schedule_list">
              {new Array(index < 0 ? 0 : scheduleTables[index].sche.length)
                .fill(0)
                .map((_, i) => {
                  return (
                    <Box className="schedule" key={`schedule_${i}`}>
                      {scheduleTables[index].sche[i].title}
                    </Box>
                  );
                })}
            </Box>
          );
        })()}
        <Box id={`${day}_schedule`} display="none">
          <PopoverForm boxTitle={"新規追加"} register={register} />
        </Box>
      </Box>
    </Box>
  );
};

export default Day;

import { useState } from "react";
import PopoverForm from "./form/PopOverForm";
import {
  Box,
  Popover,
  PopoverTrigger,
  Button,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";

import { TimeIcon, ChatIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

export type { Schedule };

type Props = {
  year: number;
  month: number;
  day: number;
  row: number;
};

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
  nextId: number;
  sche: Schedule[];
}

//const scheduleTables: ScheduleTable[] = [];
const Day = ({ year, month, day, row }: Props) => {
  const [scheduleTables, setScheduleTables] = useState<ScheduleTable[]>([]);
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [memo, setMemo] = useState("");
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

  const register = () => {
    console.log(`${title}-${start}-${end}-${memo}`);

    let tableIndex: number = getTableIndex(year, month, day);
    if (tableIndex == -1) {
      tableIndex = scheduleTables.length;
      scheduleTables[tableIndex] = {
        year: year,
        month: month,
        day: day,
        nextId: 0,
        sche: [],
      };
    }
    const sche: Schedule = {
      id: scheduleTables[tableIndex].nextId++,
      title: title,
      start: start,
      end: end,
      memo: memo,
      allowEdit: true,
    };
    const scheduleTable = scheduleTables[tableIndex];
    scheduleTable.sche = [...scheduleTables[tableIndex].sche, sche];
    setScheduleTables([
      ...scheduleTables.slice(0, tableIndex),
      scheduleTable,
      ...scheduleTables.slice(tableIndex + 1, scheduleTables.length),
    ]);
    initValue();
    //setBookNum(bookNum + 1);
  };

  const update = (sche: Schedule) => {
    sche.title = title;
    sche.start = start;
    sche.end = end;
    sche.memo = memo;
    initValue();

    return;
  };

  const deleter = (id: number) => {
    const tableIndex = getTableIndex(year, month, day);
    if (tableIndex == -1) return;
    const scheIndex = scheduleTables[tableIndex].sche.findIndex(
      (sche: Schedule) => sche.id == id
    );
    delete scheduleTables[tableIndex].sche[scheIndex];
    scheduleTables[tableIndex].sche =
      scheduleTables[tableIndex].sche.filter(Boolean); //詰める
    setBookNum(bookNum - 1);
    return;
  };

  const initValue = (sche: Schedule | null = null) => {
    console.log(`${title} - ${sche ? "t" : "f"}`);
    setTitle(sche ? sche.title : "");
    setStart(sche ? sche.start : "");
    setEnd(sche ? sche.end : "");
    setMemo(sche ? sche.memo : "");
  };

  const popoverform = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    boxTitle: any,
    schedule: Schedule | null,
    registerFunction: (() => void) | ((sche: Schedule) => void)
  ) => {
    return (
      <PopoverForm
        title={title}
        setTitle={setTitle}
        start={start}
        setStart={setStart}
        end={end}
        setEnd={setEnd}
        memo={memo}
        setMemo={setMemo}
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        boxTitle={boxTitle}
        schedule={schedule}
        register={registerFunction}
        init={initValue}
      />
    );
  };

  const date: Date = new Date();
  const isToday: boolean =
    date.getFullYear() == year &&
    date.getMonth() == month &&
    date.getDate() == day;

  return (
    <Box
      className={`day row${row} ${isToday ? "today" : ""}`}
      id={`${day}`}
      onMouseOver={() => {
        onHover(day, true);
      }}
      onMouseOut={() => {
        onHover(day, false);
      }}
    >
      <Box className="day_font">{day <= 0 ? "" : day}</Box>
      {(() => {
        const index = getTableIndex(year, month, day);
        return (
          <Box className="schedule_set">
            {index >= 0 ? (
              <Box className="schedule_list">
                {new Array(scheduleTables[index].sche.length)
                  .fill(0)
                  .map((_, i) => {
                    const schedule = scheduleTables[index].sche[i];
                    return (
                      <Popover key={`schedule_${i}`}>
                        <PopoverTrigger>
                          <Button
                            className="schedule"
                            backgroundColor="#19fe85"
                            onClick={() => initValue(schedule)}
                            isDisabled={!schedule.allowEdit}
                          >
                            {schedule.title}
                          </Button>
                        </PopoverTrigger>
                        <Box className="schedule_detail">
                          <PopoverContent>
                            <PopoverArrow />
                            <PopoverCloseButton />
                            <PopoverHeader className="schedule_detail_header">
                              {schedule.title}
                              <Box className="schedule_detail_headder_button">
                                {popoverform(<EditIcon />, schedule, update)}

                                <Button
                                  onClick={() => deleter(schedule.id)}
                                  isDisabled={!schedule.allowEdit}
                                >
                                  <DeleteIcon />
                                </Button>
                              </Box>
                            </PopoverHeader>
                            <PopoverBody>
                              <Box className="schedule_detail_time">
                                <TimeIcon />
                                {"　"}
                                {`${
                                  schedule.start ? schedule.start : "-- : --"
                                } ~ ${schedule.end ? schedule.end : "-- : --"}`}
                              </Box>
                              <hr />
                              <Box className="schedule_detail_memo">
                                <ChatIcon />
                                {"　"}
                                {`${schedule.memo ? schedule.memo : "---"}`}
                              </Box>
                              <hr />
                            </PopoverBody>
                          </PopoverContent>
                        </Box>
                      </Popover>
                    );
                  })}
              </Box>
            ) : (
              ""
            )}
            <Box id={`${day}_schedule`} display="none">
              {popoverform("新規追加", null, register)}
            </Box>
          </Box>
        );
      })()}
    </Box>
  );
};

export default Day;

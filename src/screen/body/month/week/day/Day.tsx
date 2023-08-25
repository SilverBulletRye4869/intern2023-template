import { useEffect, useState } from "react";
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

import {
  TimeIcon,
  ChatIcon,
  DeleteIcon,
  EditIcon,
  CalendarIcon,
} from "@chakra-ui/icons";
import type { Schedule, ScheduleTable } from "~/screen/Screen";

type Props = {
  year: number;
  month: number;
  day: number;
  row: number;
  scheduleTables: ScheduleTable[];
  setScheduleTables: React.Dispatch<React.SetStateAction<ScheduleTable[]>>;
};

//const scheduleTables: ScheduleTable[] = [];
const Day = ({
  year,
  month,
  day,
  row,
  scheduleTables,
  setScheduleTables,
}: Props) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [memo, setMemo] = useState("");
  const [bookNum, setBookNum] = useState(0);
  const [isFormOpen, setFormOpen] = useState(false);

  const onHover = (day: number, isOver: boolean) => {
    if (day <= 0 || isFormOpen) return;
    const bookBox = document.getElementById(`${day}_schedule`);
    if (bookBox == null) return;
    bookBox.style.display = isOver ? "flex" : "none";
    return;
  };

  useEffect(() => {
    if (isFormOpen) return;
    onHover(day, false);
    return;
  }, [isFormOpen]);

  const getTableIndex = (year: number, month: number, day: number) => {
    return scheduleTables.findIndex(
      (scheTable: ScheduleTable) =>
        scheTable.year == year &&
        scheTable.month == month &&
        scheTable.day == day
    );
  };

  const register = () => {
    console.log(date);
    const targetDate: number[] = date.split("-").map((s) => parseInt(s));
    let tableIndex: number = getTableIndex(
      targetDate[0],
      targetDate[1] - 1,
      targetDate[2]
    );
    if (tableIndex == -1) {
      tableIndex = scheduleTables.length;
      scheduleTables[tableIndex] = {
        year: targetDate[0],
        month: targetDate[1] - 1,
        day: targetDate[2],
        isHoliday: false,
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
    //setBookNum(bookNum + 1);
  };

  const update = (sche: Schedule) => {
    const targetDate: number[] = date.split("-").map((s) => parseInt(s));
    if (
      targetDate[0] == year &&
      targetDate[1] - 1 == month &&
      targetDate[2] == day
    ) {
      sche.title = title;
      sche.start = start;
      sche.end = end;
      sche.memo = memo;
    } else {
      register();
      deleter(sche.id);
    }
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
    setTitle(sche ? sche.title : "");
    setDate(`${year}-${`0${month + 1}`.slice(-2)}-${`0${day}`.slice(-2)}`);
    setStart(sche ? sche.start : "");
    setEnd(sche ? sche.end : "");
    setMemo(sche ? sche.memo : "");
  };

  const popoverform = (
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    boxTitle: any,
    schedule: Schedule | null,
    registerFunction: (() => void) | ((sche: Schedule) => void),
    isEnable = true,
    height = "auto",
    width = "auto",
    triggerFontSize = "auto"
  ) => {
    return (
      <PopoverForm
        title={title}
        setTitle={setTitle}
        date={date}
        setDate={setDate}
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
        initValue={initValue}
        height={height}
        width={width}
        triggerFontSize={triggerFontSize}
        isEnable={isEnable}
        day={day}
        setFormOpen={setFormOpen}
      />
    );
  };

  const today: Date = new Date();
  const isToday: boolean =
    today.getFullYear() == year &&
    today.getMonth() == month &&
    today.getDate() == day;

  const index = getTableIndex(year, month, day);

  return (
    <Box
      className={`day row${
        index >= 0 && scheduleTables[index].isHoliday ? 0 : row
      } ${isToday ? "today" : ""}`}
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
                            backgroundColor={
                              schedule.allowEdit ? "#4dbd45" : "#ff6666"
                            }
                            onClick={() => initValue(schedule)}
                            h="auto"
                            w="95%"
                            fontSize="0.4em"
                            display="flex"
                            marginTop="0.2em"
                            color="black"
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
                                {popoverform(
                                  <EditIcon />,
                                  schedule,
                                  update,
                                  schedule.allowEdit
                                )}
                                {"　"}
                                <Button
                                  onClick={() => deleter(schedule.id)}
                                  isDisabled={!schedule.allowEdit}
                                  h="auto"
                                  w="auto"
                                  backgroundColor="#ff6666"
                                >
                                  <DeleteIcon />
                                </Button>
                              </Box>
                            </PopoverHeader>
                            <PopoverBody>
                              <Box className="schedule_detail_date">
                                <CalendarIcon />
                                {"　"}
                                {`${year}/${month + 1}/${day}`}
                              </Box>
                              <hr />
                              <Box className="schedule_detail_time">
                                <TimeIcon />
                                {"　"}
                                {!schedule.start && !schedule.end
                                  ? "終日"
                                  : `${
                                      schedule.start
                                        ? schedule.start
                                        : "-- : --"
                                    } ~ ${
                                      schedule.end ? schedule.end : "-- : --"
                                    }`}
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
            <Box id={`${day}_schedule`} display="none" marginTop="0.2em">
              {popoverform(
                "新規追加",
                null,
                register,
                true,
                "5%",
                "95%",
                "0.4em"
              )}
            </Box>
          </Box>
        );
      })()}
    </Box>
  );
};

export default Day;

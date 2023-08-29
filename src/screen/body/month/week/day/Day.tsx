/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */

import { useEffect, useState } from "react";
import { PopoverForm } from "./form/PopOverForm";
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
import type { Schedule, ScheduleTable } from "~/@types/schedule.js";
import type { Supabase } from "~/supabase/Supabase";

type Props = {
  year: number;
  month: number;
  day: number;
  row: number;
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

//const scheduleTables: ScheduleTable[] = [];
export const Day: React.FC<Props> = ({
  year,
  month,
  day,
  row,
  scheduleTables,
  supabase,
  save,
  getTableIndex,
}) => {
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

  const register = async (): Promise<void> => {
    //db保存の処理
    const targetDate: number[] = date.split("-").map((s) => parseInt(s));
    const res = await supabase.regisisterSchedule(
      title,
      targetDate,
      start,
      end,
      memo
    );
    const scheduleId = res && res.data ? res.data[0].sche_Id : -1;
    if (scheduleId == 0) return;
    save(scheduleId, title, targetDate, start, end, memo);
  };

  const update = async (schedule: Schedule) => {
    const targetDate: number[] = date.split("-").map((s) => parseInt(s));
    if (
      targetDate[0] == year &&
      targetDate[1] - 1 == month &&
      targetDate[2] == day
    ) {
      schedule.title = title;
      schedule.start = start;
      schedule.end = end;
      schedule.memo = memo;
      const res = await supabase.updateSchedule(
        schedule.uid,
        title,
        start,
        end,
        memo
      );

      console.log(res);
    } else {
      void register();
      deleter(schedule.uid, schedule.id);
    }
    initValue();
    return;
  };

  const deleter = async (uid: number, id: number) => {
    await supabase.deleteSchedule(uid);
    const tableIndex = getTableIndex(year, month, day);
    if (tableIndex == -1) return;
    const scheIndex = scheduleTables[tableIndex].schedules.findIndex(
      (schedule: Schedule) => schedule.id == id
    );
    delete scheduleTables[tableIndex].schedules[scheIndex];
    scheduleTables[tableIndex].schedules =
      scheduleTables[tableIndex].schedules.filter(Boolean); //詰める
    setBookNum(bookNum - 1);
    return;
  };

  const initValue = (schedule: Schedule | null = null): void => {
    setTitle(schedule ? schedule.title : "");
    setDate(`${year}-${`0${month + 1}`.slice(-2)}-${`0${day}`.slice(-2)}`);
    setStart(schedule ? schedule.start : "");
    setEnd(schedule ? schedule.end : "");
    setMemo(schedule ? schedule.memo : "");
  };

  const popoverform = (
    boxTitle: React.ReactNode,
    schedule: Schedule | null,
    registerFunction:
      | ((schedule: Schedule) => Promise<void>)
      | (() => Promise<void>),
    isEnable = true,
    height = "auto",
    width = "auto",
    triggerFontSize = "auto"
  ): JSX.Element => {
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
        boxTitle={boxTitle}
        schedule={schedule}
        registerFunc={registerFunction}
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
                {new Array(scheduleTables[index].schedules.length)
                  .fill(0)
                  .map((_, i) => {
                    const schedule = scheduleTables[index].schedules[i];
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
                                  onClick={() =>
                                    deleter(schedule.uid, schedule.id)
                                  }
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

/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import {
  Box,
  Button,
  Popover,
  PopoverTrigger,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import FocusLock from "react-focus-lock";
import type React from "react";
import { useEffect, useRef } from "react";
import Form from "./Form";
import type { Schedule } from "~/screen/Screen";
import { ClassNames } from "@emotion/react";
/* eslint-disable @typescript-eslint/no-explicit-any */
type Props = {
  boxTitle: any;
  schedule: Schedule | null;
  register: any;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  date: string;
  setDate: React.Dispatch<React.SetStateAction<string>>;
  start: string;
  setStart: React.Dispatch<React.SetStateAction<string>>;
  end: string;
  setEnd: React.Dispatch<React.SetStateAction<string>>;
  memo: string;
  setMemo: React.Dispatch<React.SetStateAction<string>>;
  initValue: any;
  height: string;
  width: string;
  triggerFontSize: string;
  isEnable: boolean;
  day: number;
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
/* eslint-enable @typescript-eslint/no-explicit-any */

const PopoverForm = ({
  title,
  setTitle,
  date,
  setDate,
  start,
  setStart,
  end,
  setEnd,
  memo,
  setMemo,
  boxTitle,
  schedule,
  register,
  initValue,
  height,
  width,
  triggerFontSize,
  isEnable,
  day,
  setFormOpen,
}: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const insideRef = useRef<HTMLDivElement>(null);

  /* eslint-disable @typescript-eslint/no-unsafe-call */
  const onSave = () => {
    if (title == "") return;

    if (schedule) register(schedule);
    else register();

    onClose();
  };

  useEffect(() => {
    const el = insideRef.current;
    if (!el) return;

    const hundleClickOutside = (e: MouseEvent) => {
      const classNames = (e.target as Element).className.toString();
      if (
        !el?.contains(e.target as Node) &&
        classNames.indexOf(`popover_trigger_${day}`) < 0 &&
        classNames.indexOf(`schedule_set`) >= 0
      ) {
        onCancel();
      }
    };
    document.addEventListener("click", hundleClickOutside);
    //クリーンアップ
    return () => {
      document.removeEventListener("click", hundleClickOutside);
    };
  }, [insideRef]);

  const onCancel = () => {
    setFormOpen(false);
    onClose();
  };

  const onStart = () => {
    setFormOpen(true);
    initValue(schedule);
    onOpen();
  };
  /* eslint-enable @typescript-eslint/no-unsafe-call */

  return (
    <Popover
      isOpen={isOpen}
      onOpen={onStart}
      onClose={onCancel}
      placement="right"
      closeOnBlur={false}
    >
      <PopoverTrigger>
        <Button
          backgroundColor="#92e1ab"
          h={height}
          w={width}
          fontSize={triggerFontSize}
          isDisabled={!isEnable}
          color="black"
          className={`popover_trigger_${day}`}
        >
          {boxTitle}
        </Button>
      </PopoverTrigger>
      <PopoverContent p={5}>
        <FocusLock returnFocus persistentFocus={false}>
          <PopoverArrow />
          <PopoverCloseButton />
          <Box ref={insideRef}>
            <Form
              onSave={onSave}
              onCancel={onCancel}
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
            />
          </Box>
        </FocusLock>
      </PopoverContent>
    </Popover>
  );
};

export default PopoverForm;

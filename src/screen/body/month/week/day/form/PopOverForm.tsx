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
import { useCallback, useEffect, useRef } from "react";
import { PopOverContent } from "./PopOverContent";
import type { Schedule } from "~/@types/schedule";
type Props = {
  boxTitle: React.ReactNode;
  schedule: Schedule | null;
  registerFunc: ((schedule: Schedule) => Promise<void>) | (() => Promise<void>);
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
  initValue: (schedule: Schedule | null) => void;
  height: string;
  width: string;
  triggerFontSize: string;
  isEnable: boolean;
  day: number;
  setFormOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

export const PopoverForm: React.FC<Props> = ({
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
  registerFunc,
  initValue,
  height,
  width,
  triggerFontSize,
  isEnable,
  day,
  setFormOpen,
}) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const insideRef = useRef<HTMLDivElement>(null);

  const onSave = () => {
    if (title == "") return;

    if (schedule) void registerFunc(schedule);
    else void registerFunc();
    setFormOpen(false);
    onClose();
  };

  const onCancel = useCallback(() => {
    setFormOpen(false);
    onClose();
  }, [onClose, setFormOpen]);

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
  }, [day, insideRef, onCancel]);

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
            <PopOverContent
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

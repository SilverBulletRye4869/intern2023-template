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
import Form from "./Form";
import type { Schedule } from "../Day";

/* eslint-disable @typescript-eslint/no-explicit-any */
type Props = {
  boxTitle: any;
  schedule: Schedule | null;
  register: any;
  title: string;
  setTitle: React.Dispatch<React.SetStateAction<string>>;
  start: string;
  setStart: React.Dispatch<React.SetStateAction<string>>;
  end: string;
  setEnd: React.Dispatch<React.SetStateAction<string>>;
  memo: string;
  setMemo: React.Dispatch<React.SetStateAction<string>>;
  init: () => void;
};
/* eslint-enable @typescript-eslint/no-explicit-any */

const PopoverForm = ({
  title,
  setTitle,
  start,
  setStart,
  end,
  setEnd,
  memo,
  setMemo,
  boxTitle,
  schedule,
  register,
  init,
}: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();

  /* eslint-disable @typescript-eslint/no-non-null-assertion */

  /* eslint-enable @typescript-eslint/no-non-null-assertion */

  const onSave = () => {
    if (title == "") return;

    /* eslint-disable @typescript-eslint/no-unsafe-call */
    if (schedule) register(schedule);
    else register();
    /* eslint-enable @typescript-eslint/no-unsafe-call */
    onClose();
  };

  const onCancel = () => {
    init();
    onClose();
  };

  return (
    <>
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onCancel}
        placement="right"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Button backgroundColor="#19ffbe">{boxTitle}</Button>
        </PopoverTrigger>
        <PopoverContent p={5}>
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton />
            <Box>
              <Form
                onSave={onSave}
                onCancel={onCancel}
                title={title}
                setTitle={setTitle}
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
    </>
  );
};

export default PopoverForm;

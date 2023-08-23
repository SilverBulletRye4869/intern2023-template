/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  Box,
  Popover,
  PopoverTrigger,
  PopoverArrow,
  PopoverCloseButton,
  PopoverContent,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import FocusLock from "react-focus-lock";
import React from "react";
import Form from "./Form";

export type { fieldRefs };

type Props = {
  boxTitle: string;
  register: (title: string, start: string, end: string, memo: string) => void;
};

interface fieldRefs {
  title: React.MutableRefObject<HTMLInputElement>;
  start: React.MutableRefObject<HTMLInputElement>;
  end: React.MutableRefObject<HTMLInputElement>;
  memo: React.MutableRefObject<HTMLTextAreaElement>;
}

const PopoverForm = ({ boxTitle, register }: Props) => {
  const { onOpen, onClose, isOpen } = useDisclosure();
  const fieldRef: fieldRefs = {
    title: React.useRef<HTMLInputElement>(null!),
    start: React.useRef<HTMLInputElement>(null!),
    end: React.useRef<HTMLInputElement>(null!),
    memo: React.useRef<HTMLTextAreaElement>(null!),
  };

  const onSave = () => {
    const title: string | undefined = fieldRef.title.current?.value;
    const start: string | undefined = fieldRef.start.current?.value;
    const end: string | undefined = fieldRef.end.current?.value;
    const memo: string | undefined = fieldRef.memo.current?.value;
    if (
      title == undefined ||
      start == undefined ||
      end == undefined ||
      memo == undefined ||
      title == ""
    )
      return;
    register(title, start, end, memo);
    onClose();
  };

  return (
    <>
      <Popover
        isOpen={isOpen}
        onOpen={onOpen}
        onClose={onClose}
        placement="right"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <Box
            backgroundColor="#19ffbe"
            justifyContent="start"
            borderRadius="3%"
          >
            {boxTitle}
          </Box>
        </PopoverTrigger>
        <PopoverContent p={5}>
          <FocusLock returnFocus persistentFocus={false}>
            <PopoverArrow />
            <PopoverCloseButton />
            <Form refs={fieldRef} onSave={onSave} onCancel={onClose} />
          </FocusLock>
        </PopoverContent>
      </Popover>
    </>
  );
};

export default PopoverForm;

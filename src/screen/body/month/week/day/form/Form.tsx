/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Box,
  Button,
  Stack,
  ButtonGroup,
  Input,
  Textarea,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import TitleInput from "./TitleInput";
import { useState } from "react";
import type React from "react";

const MEMO_MAX_LENGTH = 255;

type Props = {
  onSave: () => void;
  onCancel: () => void;
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
};

const Form = ({
  onSave,
  onCancel,
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
}: Props) => {
  const [titleCollectState, setTitleCollectState] = useState(true);
  const [dateCollectState, setDateCollectState] = useState(true);
  const [timeCollectState, setTimeCollectState] = useState(true);

  let timeCollect: boolean, dateCollect: boolean, titleCollect: boolean;
  timeCollect = dateCollect = titleCollect = true;

  const onChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    setFunc: React.Dispatch<React.SetStateAction<string>>
  ) => {
    setFunc(event.target.value);
  };

  const formatCheck = () => {
    const startTime = start.replace(":", "");
    const endTime = end.replace(":", "");

    timeCollect =
      (startTime == "" ? -1 : parseInt(startTime)) <=
      (endTime == "" ? 3000 : parseInt(endTime));

    titleCollect = title != "";

    dateCollect = !isNaN(new Date(date.replace("/", "")).getDate());
    setTimeCollectState(timeCollect);
    setTitleCollectState(titleCollect);
    setDateCollectState(dateCollect);
    if (timeCollect && titleCollect && dateCollect) onSave();
  };

  return (
    <Box className="form">
      <Stack spacing={4}>
        <Box className="title_form">
          <Box className="form_font">タイトル</Box>
          <TitleInput
            value={title}
            setValue={setTitle}
            placeholder="タイトルを入力"
            formatCollect={titleCollectState}
          />
        </Box>
        <Box className="date_form">
          <Box className="form_font">実施日</Box>
          <FormControl isInvalid={!dateCollectState}>
            <Input
              placeholder="----/--/--"
              size="md"
              type="date"
              width="80%"
              value={date}
              onChange={(e) => onChange(e, setDate)}
            />
            {dateCollectState ? (
              ""
            ) : (
              <FormErrorMessage>実施日が不適です</FormErrorMessage>
            )}
          </FormControl>
        </Box>
        <Box className="time_form">
          <Box className="form_font">実施時刻</Box>
          <FormControl isInvalid={!timeCollectState}>
            <Input
              placeholder="Select Date and Time"
              size="md"
              type="time"
              width="40%"
              value={start}
              onChange={(e) => onChange(e, setStart)}
            />{" "}
            ~{" "}
            <Input
              placeholder="Select Date and Time"
              size="md"
              type="time"
              width="40%"
              value={end}
              onChange={(e) => onChange(e, setEnd)}
            />
            {timeCollectState ? (
              ""
            ) : (
              <FormErrorMessage>実施時刻が不適です。</FormErrorMessage>
            )}
          </FormControl>
        </Box>
        <Textarea
          placeholder="詳細メモ"
          value={memo}
          onChange={(e) => onChange(e, setMemo)}
          maxLength={MEMO_MAX_LENGTH}
        />
        <ButtonGroup display="flex" justifyContent="flex-end">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={formatCheck}>Save</Button>
        </ButtonGroup>
      </Stack>
    </Box>
  );
};

export default Form;

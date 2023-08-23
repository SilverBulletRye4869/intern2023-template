import {
  Box,
  Button,
  Stack,
  ButtonGroup,
  Input,
  Textarea,
} from "@chakra-ui/react";
import TextInput from "./TextInput";
import { useState } from "react";
import { fieldRefs } from "./PopOverForm";
import { Schedule } from "../Day";

/* eslint-disable */
type Props = {
  refs: fieldRefs;
  onSave: any;
  onCancel: any;
};

const Form = ({ refs, onSave, onCancel }: Props) => {
  return (
    <Stack spacing={4}>
      <Box className="title_form">
        <Box className="form_font">タイトル</Box>
        <TextInput id="first-name" ref={refs.title} placeholder="予定名" />
      </Box>
      <Box className="time_form">
        <Box className="form_font">実施時刻</Box>
        <Input
          placeholder="Select Date and Time"
          size="md"
          type="time"
          width="40%"
          ref={refs.start}
          defaultValue=""
        />{" "}
        ~{" "}
        <Input
          placeholder="Select Date and Time"
          size="md"
          type="time"
          width="40%"
          ref={refs.end}
          defaultValue=""
        />
      </Box>
      <Textarea placeholder="詳細メモ" ref={refs.memo} />
      <ButtonGroup display="flex" justifyContent="flex-end">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button onClick={onSave}>Save</Button>
      </ButtonGroup>
    </Stack>
  );
};

export default Form;

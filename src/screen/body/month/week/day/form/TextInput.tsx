/* eslint-disable */
// 1. Create a text input component
import React, { ForwardedRef } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormHelperText,
  FormErrorMessage,
} from "@chakra-ui/react";

const TextInput = React.forwardRef((props: any, ref: any) => {
  return (
    <FormControl>
      <FormLabel htmlFor={props.id}>{props.label}</FormLabel>
      <Input ref={ref} id={props.id} {...props} />
    </FormControl>
  );
});

export default TextInput;

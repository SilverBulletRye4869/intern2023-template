// 1. Create a text input component
import React from "react";
import { FormControl, FormErrorMessage, Input } from "@chakra-ui/react";

const TITLE_MAX_LENGTH = 10;

type Props = {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  placeholder: string;
  formatCollect: boolean;
};

const TitleInput = React.forwardRef((props: Props, _ref: unknown) => {
  const { value, setValue, placeholder, formatCollect } = props;

  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <FormControl isInvalid={!formatCollect}>
      <Input
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e)}
        maxLength={TITLE_MAX_LENGTH}
      />
      {formatCollect ? (
        ""
      ) : (
        <FormErrorMessage>この項目は必須です</FormErrorMessage>
      )}
    </FormControl>
  );
});

export default TitleInput;

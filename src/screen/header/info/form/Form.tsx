import { Box, Button, Input } from "@chakra-ui/react";
import { useState } from "react";

type Props = {
  year: number;
  month: number;
  setTime: (year: number, month: number) => void;
};

export const Form: React.FC<Props> = ({ year, month, setTime }) => {
  const [inputedYear, setInputedYear] = useState(year);
  const [inputedMonth, setInputedMonth] = useState(month);
  const [yearInvalid, setYearInvalid] = useState<boolean>(false);
  const [monthInvalid, setMonthInvalid] = useState<boolean>(false);

  const handleChangeYear = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;
    const isInvalid = !value.match(/^\d+$/g);
    setYearInvalid(isInvalid);
    if (isInvalid) return;
    setInputedYear(Math.max(100, parseInt(value)));
  };

  const handleChangeMonth = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value: string = event.target.value;
    const isInvalid = !value.match(/^-?\d+$/g);
    setMonthInvalid(isInvalid);
    if (isInvalid) setInputedMonth(month);
    setInputedMonth(parseInt(value));
  };

  const handleClickDecide = () => {
    if (yearInvalid || monthInvalid) return;
    setTime(inputedYear, inputedMonth > 0 ? inputedMonth - 1 : inputedMonth);
  };

  return (
    <Box>
      <Input
        isInvalid={yearInvalid}
        onChange={(e) => handleChangeYear(e)}
        borderColor="gray"
        height="1.3em"
        width="25%"
        padding="0"
        textAlign="center"
        maxLength={4}
      />
      年
      <Input
        isInvalid={monthInvalid}
        onChange={(e) => handleChangeMonth(e)}
        borderColor="gray"
        height="1.3em"
        width="10%"
        padding="0"
        textAlign="center"
        maxLength={2}
      />
      月
      <Button
        width="30%"
        height="50%"
        marginLeft="10%"
        backgroundColor="#05cde6"
        onClick={handleClickDecide}
      >
        移動
      </Button>
    </Box>
  );
};

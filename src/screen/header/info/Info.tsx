import {
  Box,
  Button,
  Popover,
  PopoverTrigger,
  Portal,
  PopoverContent,
  PopoverArrow,
  PopoverHeader,
  PopoverCloseButton,
  PopoverBody,
} from "@chakra-ui/react";

type Props = {
  year: number;
  month: number;
  setTime: (year: number, month: number) => void;
};

export const Info: React.FC<Props> = ({ year, month, setTime }) => {
  const handleClickLeftArrow = () => setTime(year, month - 1);

  const handleClickRightArrow = () => setTime(year, month + 1);

  const handleClickOldYear = () => setTime(year - 1, month);

  const handleClickNextYear = () => setTime(year + 1, month);

  const handleClickNow = () =>
    setTime(new Date().getFullYear(), new Date().getMonth());

  const handleClickSetTime = (targetYear: number, targetMonth: number) =>
    setTime(targetYear, targetMonth);

  return (
    <Box className="info" key="info">
      <Button
        size="xs"
        color="black"
        fontSize="xm"
        onClick={handleClickLeftArrow}
      >
        &lt;
      </Button>
      <Popover>
        <PopoverTrigger>
          <Button size="xs" color="black" fontSize="xm">
            {year}年{month + 1}月
          </Button>
        </PopoverTrigger>
        <Portal>
          <PopoverContent>
            <PopoverArrow />
            <PopoverHeader>年月を変更</PopoverHeader>
            <PopoverCloseButton />
            <PopoverBody>
              <Box className="year_choice" key="year_choice">
                <Button
                  className="year_button"
                  backgroundColor="#ade2d1"
                  onClick={handleClickOldYear}
                >
                  {year - 1}年
                </Button>
                <Button
                  className="year_button"
                  backgroundColor="#ffdddd"
                  onClick={handleClickNow}
                >
                  現在
                </Button>
                <Button
                  className="year_button"
                  backgroundColor="#ade2d1"
                  onClick={handleClickNextYear}
                >
                  {year + 1}年
                </Button>
              </Box>
              <hr />
              <Box className="month_set" key="month_set">
                {new Array(12).fill(0).map((_, m) => {
                  return (
                    <Button
                      backgroundColor="#ade2d1"
                      className="month_button"
                      onClick={() => handleClickSetTime(year, m)}
                      key={`month_button_${m}`}
                    >
                      {m + 1}月
                    </Button>
                  );
                })}
              </Box>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
      <Button
        size="xs"
        color="black"
        fontSize="xm"
        onClick={handleClickRightArrow}
      >
        &gt;
      </Button>
    </Box>
  );
};

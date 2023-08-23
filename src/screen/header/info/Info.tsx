import {
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

const Info = ({ year, month, setTime }: Props) => {
  return (
    <p className="info" key="info">
      <Button
        size="xs"
        color="black"
        fontSize="xm"
        onClick={() => setTime(year, month - 1)}
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
              <div className="year_choice">
                <Button
                  className="year_button"
                  backgroundColor="#ade2d1"
                  onClick={() => setTime(year - 1, month)}
                >
                  {year - 1}年
                </Button>
                <Button
                  className="year_button"
                  backgroundColor="#ffdddd"
                  onClick={() =>
                    setTime(new Date().getFullYear(), new Date().getMonth())
                  }
                >
                  現在
                </Button>
                <Button
                  className="year_button"
                  backgroundColor="#ade2d1"
                  onClick={() => setTime(year + 1, month)}
                >
                  {year + 1}年
                </Button>
              </div>
              <hr />
              <div className="month_set">
                {new Array(12).fill(0).map((_, m) => {
                  return (
                    <>
                      <Button
                        backgroundColor="#ade2d1"
                        className="month_button"
                        onClick={() => setTime(year, m)}
                      >
                        {m + 1}月
                      </Button>
                    </>
                  );
                })}
              </div>
            </PopoverBody>
          </PopoverContent>
        </Portal>
      </Popover>
      <Button
        size="xs"
        color="black"
        fontSize="xm"
        onClick={() => setTime(year, month + 1)}
      >
        &gt;
      </Button>
    </p>
  );
};

export default Info;

import { CalendarIcon, HamburgerIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  IconButton,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
} from "@chakra-ui/react";
type Props = {
  setTime: (year: number, month: number) => void;
  userName: string;
  userAddress: string;
  userIconUrl: string;
  isOnline: boolean;
  signOut: () => Promise<boolean>;
};

export const Title: React.FC<Props> = ({
  setTime,
  userName,
  userAddress,
  userIconUrl,
  isOnline,
  signOut,
}) => {
  const date: Date = new Date();

  const handleClickSetTime = () => setTime(date.getFullYear(), date.getMonth());

  const handleClickSignOut = async () => {
    const res: boolean = await signOut();
    if (!res) return;
    window.location.reload();
    return;
  };

  //useEffecttukau

  return (
    <Box display="flex" flex="left" verticalAlign="center">
      <button className="title" onClick={handleClickSetTime}>
        <CalendarIcon />
        {"　"}
        Calender
      </button>
      {isOnline ? (
        <Popover>
          <PopoverTrigger>
            <Button
              as={IconButton}
              aria-label="Options"
              icon={<HamburgerIcon />}
              variant="outline"
              height="1.5em"
              marginLeft="2em"
            />
          </PopoverTrigger>
          <PopoverContent>
            <PopoverArrow />
            <PopoverCloseButton />
            <PopoverHeader>
              <Box display="flex">
                <Box height="4em" width="auto">
                  <img src={userIconUrl} className="menu_icon" />
                </Box>
                <Box textAlign="left" marginLeft="2em">
                  <Box fontSize="1.5em">{userName}</Box>
                  <Box fontSize="0.75em" color="gray" marginTop="0.75em">
                    {userAddress}
                  </Box>
                </Box>
              </Box>
            </PopoverHeader>
            <PopoverBody>
              <Button
                height="100%"
                fontSize="1em"
                width="100%"
                backgroundColor="#fff"
                onClick={handleClickSignOut}
              >
                サインアウト
              </Button>
            </PopoverBody>
          </PopoverContent>
        </Popover>
      ) : (
        ""
      )}
    </Box>
  );
};

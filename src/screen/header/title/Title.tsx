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
import type { Supabase } from "~/supabase/Supabase";
import { useState } from "react";
type Props = {
  setTime: (year: number, month: number) => void;
  userName: string;
  supabase: Supabase | null;
};

export const Title: React.FC<Props> = ({ setTime, userName, supabase }) => {
  const date: Date = new Date();

  const [mailAddress, setMailAddress] = useState<string>("---@gmail.com");
  const [iconUrl, setIconUrl] = useState("");

  const handleClickSetTime = () => setTime(date.getFullYear(), date.getMonth());

  const handleClickSignOut = async () => {
    if (supabase == null) return;
    const res: boolean = await supabase.signOut();
    console.log(`SignOut-Successed: ${res.toString()}`);
    window.location.reload();
    return;
  };

  void (async () => {
    if (supabase == null) return;
    const res = await supabase.getMailAddress();
    if (!res) return;
    setMailAddress(res);
  })();

  void (async () => {
    if (supabase == null) return;
    const res = await supabase.getIconUrl();
    if (!res) return;
    setIconUrl(res);
  })();

  return (
    <Box display="flex" flex="left" verticalAlign="center">
      <button className="title" onClick={handleClickSetTime}>
        <CalendarIcon />
        {"　"}
        Calender
      </button>
      {supabase ? (
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
                  <img src={iconUrl} className="icon" />
                </Box>
                <Box textAlign="left" marginLeft="2em">
                  <Box fontSize="1.5em">{userName}</Box>
                  <Box fontSize="0.75em" color="gray" marginTop="0.75em">
                    {mailAddress}
                  </Box>
                </Box>
              </Box>
            </PopoverHeader>
            <PopoverBody>
              <Button
                height="1.5em"
                fontSize="1em"
                width="6.5em"
                backgroundColor="#ffc0cb"
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

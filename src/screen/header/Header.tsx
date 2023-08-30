import type React from "react";
import { Info } from "./info/Info";
import { Title } from "./title/Title";

type Props = {
  year: number;
  month: number;
  setTime: (year: number, month: number) => void;
  userName: string;
  userAddress: string;
  userIconUrl: string;
  isOnline: boolean;
  signOut: () => Promise<boolean>;
};

export const Header: React.FC<Props> = ({
  year,
  month,
  setTime,
  userName,
  userAddress,
  userIconUrl,
  isOnline,
  signOut,
}) => {
  return (
    <div className="header" key="header">
      <Title
        setTime={setTime}
        userName={userName}
        userAddress={userAddress}
        userIconUrl={userIconUrl}
        isOnline={isOnline}
        signOut={signOut}
      />
      <Info year={year} month={month} setTime={setTime} />
    </div>
  );
};

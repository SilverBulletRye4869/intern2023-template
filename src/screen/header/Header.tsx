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
  isNoLogin: boolean;
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
  isNoLogin,
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
        isNoLogin={isNoLogin}
      />
      <Info year={year} month={month} setTime={setTime} />
    </div>
  );
};

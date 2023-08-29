import type React from "react";
import { Info } from "./info/Info";
import { Title } from "./title/Title";

type Props = {
  year: number;
  month: number;
  setTime: (year: number, month: number) => void;
};

export const Header: React.FC<Props> = ({ year, month, setTime }) => {
  return (
    <div className="header" key="header">
      <Title setTime={setTime} />
      <Info year={year} month={month} setTime={setTime} />
    </div>
  );
};

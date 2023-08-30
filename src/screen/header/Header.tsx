import type React from "react";
import { Info } from "./info/Info";
import { Title } from "./title/Title";
import type { Supabase } from "~/supabase/Supabase";

type Props = {
  year: number;
  month: number;
  setTime: (year: number, month: number) => void;
  userName: string;
  supabase: Supabase | null;
};

export const Header: React.FC<Props> = ({
  year,
  month,
  setTime,
  userName,
  supabase,
}) => {
  return (
    <div className="header" key="header">
      <Title setTime={setTime} userName={userName} supabase={supabase} />
      <Info year={year} month={month} setTime={setTime} />
    </div>
  );
};

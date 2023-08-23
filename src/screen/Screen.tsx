import { useState } from "react";

import Header from "./header/Header";
import Body from "./body/Body";

const Screen = () => {
  const date = new Date();
  const [year, setYear] = useState(date.getFullYear());
  const [month, setMonth] = useState(date.getMonth());

  const setTime = (newYear: number, newMonth: number) => {
    while (newMonth < 0) {
      newYear--;
      newMonth += 12;
    }
    while (newMonth > 11) {
      newYear++;
      newMonth -= 12;
    }
    setYear(newYear);
    setMonth(newMonth);
  };

  return (
    <div className="screen" key="screen">
      <Header year={year} month={month} setTime={setTime} />
      <Body year={year} month={month} />
    </div>
  );
};

export default Screen;

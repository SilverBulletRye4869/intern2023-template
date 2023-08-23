import Day from "./day/Day";

type Props = {
  year: number;
  month: number;
  start: number;
  end: number;
};

const Week = ({ year, month, start, end }: Props) => {
  const loop = new Array(7).fill(0);
  let day = start;

  return (
    <div className="week">
      {loop.map((_, i) => {
        i >= end - start ? (day = -1) : day++;
        console.log(day);
        return (
          <>
            <Day year={year} month={month} day={day} row={i} />
          </>
        );
      })}
    </div>
  );
};

export default Week;

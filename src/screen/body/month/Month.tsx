import Week from "./week/Week";

type Props = {
  year: number;
  month: number;
};

const dayMax = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const Month = ({ year, month }: Props) => {
  //指定した年月の最終日を取得する（閏年考慮済み）
  const getLastDay = (year: number, month: number) => {
    return month !== 1 || year % 4 != 0 || (year % 100 == 0 && year % 400 != 0)
      ? dayMax[month]
      : 29;
  };

  const startDayOfWeek = new Date(year, month, 1).getDay(); //1日の曜日を取得
  const lineNum =
    Math.ceil((getLastDay(year, month) - (7 - startDayOfWeek)) / 7) + 1; //列の数
  const loop = new Array(lineNum).fill(0);

  let startDay: number = -startDayOfWeek;

  return (
    <div className="month" key="month">
      {loop.map((_, i) => {
        return (
          <Week
            year={year}
            month={month}
            start={startDay}
            end={Math.min(getLastDay(year, month), (startDay += 7))}
            key={`week_${i}`}
          />
        );
      })}
    </div>
  );
};

export default Month;

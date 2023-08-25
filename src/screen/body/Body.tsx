import Label from "./label/Labels";
import Month from "./month/Month";
import type { ScheduleTable } from "../Screen";

type Props = {
  year: number;
  month: number;
  scheduleTables: ScheduleTable[];
  setScheduleTables: React.Dispatch<React.SetStateAction<ScheduleTable[]>>;
};

const Body = ({ year, month, scheduleTables, setScheduleTables }: Props) => {
  return (
    <div className="body" key="body">
      <Label />
      <Month
        year={year}
        month={month}
        scheduleTables={scheduleTables}
        setScheduleTables={setScheduleTables}
      />
    </div>
  );
};

export default Body;

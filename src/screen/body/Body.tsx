import Label from "./label/Labels";
import Month from "./month/Month";

type Props = {
  year: number;
  month: number;
};

const Body = ({ year, month }: Props) => {
  return (
    <p className="body" key="body">
      <Label />
      <Month year={year} month={month} />
    </p>
  );
};

export default Body;

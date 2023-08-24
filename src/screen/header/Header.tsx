import Info from "./info/Info";
import Title from "./title/Title";

type Props = {
  year: number;
  month: number;
  setTime: (year: number, month: number) => void;
};

const Header = ({ year, month, setTime }: Props) => {
  return (
    <div className="header" key="header">
      <Title setTime={setTime} />
      <Info year={year} month={month} setTime={setTime} />
    </div>
  );
};

export default Header;

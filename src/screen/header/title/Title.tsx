import { CalendarIcon } from "@chakra-ui/icons";
type Props = {
  setTime: (year: number, month: number) => void;
};

const Title = ({ setTime }: Props) => {
  const date: Date = new Date();
  return (
    <button
      className="title"
      key="title"
      onClick={() => setTime(date.getFullYear(), date.getMonth())}
    >
      <CalendarIcon />
      {"　"}
      Calender
    </button>
  );
};
export default Title;

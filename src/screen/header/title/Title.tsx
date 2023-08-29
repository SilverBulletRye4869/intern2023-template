import { CalendarIcon } from "@chakra-ui/icons";
type Props = {
  setTime: (year: number, month: number) => void;
};

export const Title: React.FC<Props> = ({ setTime }) => {
  const date: Date = new Date();

  const handleClickSetTime = () => setTime(date.getFullYear(), date.getMonth());

  return (
    <button className="title" onClick={handleClickSetTime}>
      <CalendarIcon />
      {"　"}
      Calender
    </button>
  );
};

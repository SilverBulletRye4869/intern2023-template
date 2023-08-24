type Props = {
  setTime: (year: number, month: number) => void;
};

const Title = ({ setTime }: Props) => {
  const date: Date = new Date();
  return (
    <>
      <button
        className="title"
        key="title"
        onClick={() => setTime(date.getFullYear(), date.getMonth())}
      >
        Calender
      </button>
    </>
  );
};
export default Title;

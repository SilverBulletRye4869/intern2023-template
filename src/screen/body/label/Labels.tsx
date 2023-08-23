const Labels = () => {
  return (
    <div className="labels">
      {["日", "月", "火", "水", "木", "金", "土"].map((day, i) => {
        return (
          <>
            <p className={`label row${i}`}>{day}</p>
          </>
        );
      })}
    </div>
  );
};

export default Labels;

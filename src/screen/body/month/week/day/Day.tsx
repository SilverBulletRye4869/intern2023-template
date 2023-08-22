const Day = ({date, row}: { date:number, row:number}) => {
    return(<><p className={`day row${row}`} key="day">{date <= 0 ? "" : date}</p></>)
}
  
export default Day;
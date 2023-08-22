const Day = ({date}: { date:number}) => {
    return(<><p className="day" key="day">{date <= 0 ? "" : date}</p></>)
}
  
export default Day;
import Week from "./week/Week"

const Month = ({year,month}: {year: number, month: number})=>{
  const startDayOfWeek = new Date(year,month,1).getDay();  //一時定数
  console.log(startDayOfWeek);
  const dayMax = [31,28,31,30,31,30,31,31,30,31,30,31]
    
  const rowNum = Math.ceil((dayMax[month] - (7 - startDayOfWeek)) / 7) + 1;  //列の数
  const loop = new Array(rowNum).fill(0);
  
  let startDay:number = -startDayOfWeek-7;

  return(
    <>
      {
        loop.map(()=>{
          startDay+=7;
          return(
            <>
              <p className="week" key="week">
                <Week start={startDay} end={Math.min(dayMax[month],startDay+7)} />
              </p>  
            </>
          )
       })
      }
    </>
  )
}

export default Month;
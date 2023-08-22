import Day from "./day/Day"

const Week = ({start, end}: { start: number, end: number}) => {
  const loop = new Array(7).fill(0);
  let date = start;
      return(
    <>
      <div className="week" key="week">
         {
        loop.map((_,i)=>{
          i>=(end-start) ? date=-1 : (date++)
          return(<><Day date={date}/></>);
        })
      }
      </div>
    </>
  )
}

export default Week;
import Label from "./label/Labels"
import Month from "./month/Month"

const Body = ({year, month}: {year:number, month:number}) => {
    return(
      <>
        <p className="body" key="body">
          <Label />
          <Month year={year} month={month}/>
        </p>
      </>
    )
}

export default Body;
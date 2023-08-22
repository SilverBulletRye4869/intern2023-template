import Info from "./info/Info"
import Title from "./title/Title"
const Header = ({year, month, setTime}: {year:number, month:number, setTime: (year:number,month:number)=>void}) => {
    return(
      <>
        <div className="header" key="header">
          <Title />
          <Info year={year} month={month} setTime={setTime}/>
        </div>
      </>
    )
}

export default Header;

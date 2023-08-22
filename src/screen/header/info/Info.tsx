import { Button, ButtonGroup } from '@chakra-ui/react'

const Info = ({year, month, setTime}: {year:number, month:number, setTime: (year:number,month:number)=>void}) => {
  return (
    <>
      <p className="info" key="info">
        <Button colorScheme='#d8d8d8' size="xs" color="black" fontSize="xm" onClick={()=>setTime(year,month-1)}>&lt;</Button>
        <Button colorScheme='#d8d8d8' size="xs" color="black" fontSize="xm">{year}年{month+1}月</Button>
        <Button colorScheme='#d8d8d8' size="xs" color="black" fontSize="xm" onClick={()=>setTime(year,month+1)}>&gt;</Button>
      </p>
    </>
  )
}

export default Info;
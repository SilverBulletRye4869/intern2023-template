import { useState } from "react";
import {
  Center,
  HStack,
  Box,
  Button,
  Heading,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import type { ImageProps } from "@chakra-ui/react";
import { motion } from "framer-motion";
import reactLogo from "./assets/react.svg";
import Header from "./header/Header";
import Body from "./body/Body";

const Screen = () => {
  const [year, setYear] = useState(2023);
  const [month, setMonth] = useState(7);

  const setTime = (newYear:number, newMonth: number)=>{
    while(newMonth<0){newYear--;newMonth+=12}
    while(newMonth>11){newYear++;newMonth-=12}
    setYear(newYear);
    setMonth(newMonth);
  }

  return(
    <>
      <div className="screen" key="screen">
        <Header year={year} month={month} setTime={setTime} />
        <Body year={year} month={month}/>
      </div>
    </>
  )
}

export default Screen;
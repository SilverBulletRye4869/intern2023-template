import { Box } from "@chakra-ui/react";

export const Labels = () => {
  return (
    <Box className="labels">
      {["日", "月", "火", "水", "木", "金", "土"].map((day, i) => {
        return (
          <Box className={`label row${i}`} key={`row_${i}`}>
            {day}
          </Box>
        );
      })}
    </Box>
  );
};

import { Box } from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";
export const OfflineWarning = () => {
  return (
    <Box textAlign="left" color="red">
      <br />
      <WarningTwoIcon />
      オフラインのため、「祝日」及び「予定機能」がご利用になれません。
    </Box>
  );
};

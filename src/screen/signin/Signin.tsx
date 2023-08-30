import { Box, Button, Center, Text } from "@chakra-ui/react";
import type { Supabase } from "~/supabase/Supabase";

type Props = {
  supabase: Supabase | null;
};

export const SignIn: React.FC<Props> = ({ supabase }) => {
  if (supabase == null) return <></>;
  return (
    <Center width="100%" height="100%">
      <Box w="250px" height="auto" backgroundColor="#f2f2f2">
        <Text fontSize="2em">サインイン</Text>
        <br />
        <Button
          onClick={supabase.signIn}
          borderRadius="0"
          marginBottom="30px"
          backgroundColor="#c3c3c3"
        >
          Sign in with Google
        </Button>
      </Box>
    </Center>
  );
};

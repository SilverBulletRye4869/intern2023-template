import { Box, Button, Center, Text } from "@chakra-ui/react";
type Props = {
  signIn: () => void;
};

export const SignIn: React.FC<Props> = ({ signIn }) => {
  const handleClickSignIn = () => {
    signIn();
  };
  return (
    <Center width="100%" height="100%">
      <Box w="250px" height="auto" backgroundColor="#f2f2f2">
        <Text fontSize="2em">サインイン</Text>
        <br />
        <Button
          onClick={handleClickSignIn}
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

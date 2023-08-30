import { Box, Button, Center, Text } from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";
type Props = {
  signIn: (provider: "google" | "discord") => void;
};

export const SignIn: React.FC<Props> = ({ signIn }) => {
  const handleClickSignIn = (provider: "google" | "discord") => {
    signIn(provider);
  };

  const getButton = (
    text: string,
    provider: "google" | "discord"
  ): JSX.Element => {
    return (
      <Button
        onClick={() => handleClickSignIn(provider)}
        borderRadius="0"
        marginBottom="30px"
        backgroundColor="#c3c3c3"
        width="200px"
      >
        <img
          src={`src/img/${provider as string}.png`}
          className="signIn_icon"
        />
        {text}
      </Button>
    );
  };

  return (
    <Center width="100%" height="100%">
      <Box w="250px" height="auto" backgroundColor="#f2f2f2">
        <Text fontSize="2em">サインイン</Text>
        <br />
        {getButton("Sign in with Google", "google")}
        {getButton("Sign in with Discord", "discord")}
        <Center marginBottom="30px" color="red" flexFlow="column">
          <WarningTwoIcon />
          <Text width="200px">
            異なるプロバイダ間ではデータは共有されません。
          </Text>
        </Center>
      </Box>
    </Center>
  );
};

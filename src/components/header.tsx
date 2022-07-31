import { Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";

const Header: React.FC = () => {
  return (
    <Flex gap="1rem" p="2rem" w="100%">
      <Image src="/logo.png" boxSize="5rem" alt="jigsaw-logo" />
      <Stack gap="0">
        <Heading fontSize="3rem">Jigsaw</Heading>
        <Text m="0 !important" color="bg.500">
          Turn your images into works of art!
        </Text>
      </Stack>
    </Flex>
  );
};

export default Header;

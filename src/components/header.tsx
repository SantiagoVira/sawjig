import { Flex, Heading, Image, Stack, Text } from "@chakra-ui/react";
import { useIsMobile } from "../hooks/useIsMobile";

const Header: React.FC = () => {
  const isMobile = useIsMobile();
  return (
    <Flex gap="1rem" p="2rem" w="100%">
      <Image
        src="/logo.png"
        boxSize={isMobile ? "4.7rem" : "5rem"}
        alt="sawjig-logo"
      />
      <Stack gap="0">
        <Heading fontSize={isMobile ? "2.5rem" : "3rem"}>Sawjig</Heading>
        <Text
          m="0 !important"
          color="bg.500"
          fontSize={isMobile ? "0.85rem" : "1rem"}>
          Turn your images into works of art!
        </Text>
      </Stack>
    </Flex>
  );
};

export default Header;

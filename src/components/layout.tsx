import { Flex } from "@chakra-ui/react";
import Header from "./header";

const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  return (
    <Flex flexDirection="column" maxW="100vw" minH="100vh" pb="7rem">
      <Header />
      <Flex
        alignItems="center"
        justifyContent="space-evenly"
        flexDirection={{ base: "column", md: "row" }}
        gap="1rem">
        {children}
      </Flex>
    </Flex>
  );
};

export default Layout;

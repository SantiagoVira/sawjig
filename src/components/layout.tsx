import { Flex } from "@chakra-ui/react";
import { useIsMobile } from "../hooks/useIsMobile";
import Header from "./header";

const Layout: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const isMobile = useIsMobile();
  return (
    <Flex flexDirection="column" maxW="100vw" minH="100vh" pb="4rem">
      <Header />
      <Flex
        alignItems="center"
        justifyContent="space-evenly"
        flexDirection={isMobile ? "column" : "row"}
        gap="1rem">
        {children}
      </Flex>
    </Flex>
  );
};

export default Layout;

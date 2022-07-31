import { ChakraProvider, Flex } from "@chakra-ui/react";
import theme from "./theme";
import Header from "./components/header";
import ImageInput from "./components/image-input";
import ImageDisplay from "./components/image-display";
import SizeInput from "./components/size-input";
import ConvertButton from "./components/convert-button";
import DownloadButton from "./components/download-button";
import { ArrowForwardIcon } from "@chakra-ui/icons";

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Flex flexDirection="column" maxW="100vw" minH="100vh" pb="4rem">
        <Header />
        <Flex alignItems="center" justifyContent="space-evenly">
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
            gap="1rem">
            <ImageInput />
            <SizeInput />
          </Flex>
          <Flex flexDirection="column" alignItems="center" gap="1rem">
            <ArrowForwardIcon boxSize={10} />
            <ConvertButton />
          </Flex>
          <Flex
            flexDirection="column"
            alignItems="center"
            justifyContent="space-between"
            gap="1rem">
            <ImageDisplay />
            <DownloadButton />
          </Flex>
        </Flex>
      </Flex>
    </ChakraProvider>
  );
};

export default App;

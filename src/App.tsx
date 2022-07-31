import { ChakraProvider, Flex } from "@chakra-ui/react";
import theme from "./theme";
import ImageInput from "./components/image-input";
import ImageDisplay from "./components/image-display";
import SizeInput from "./components/size-input";
import ConvertButton from "./components/convert-button";
import DownloadButton from "./components/download-button";
import Layout from "./components/layout";

const App: React.FC = () => {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
          gap="1rem">
          <ImageInput />
          <SizeInput />
        </Flex>

        <ConvertButton />
        <Flex
          flexDirection="column"
          alignItems="center"
          justifyContent="space-between"
          gap="1rem">
          <ImageDisplay />
          <DownloadButton />
        </Flex>
      </Layout>
    </ChakraProvider>
  );
};

export default App;

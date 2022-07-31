import { ArrowDownIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Flex, Tooltip } from "@chakra-ui/react";
import axios from "axios";
import { useAtom } from "jotai";
import {
  displayImage,
  inputImageAtom,
  errorCodeAtom,
  numTiles,
} from "../atoms";
import { useIsMobile } from "../hooks/useIsMobile";

const ConvertButton: React.FC = () => {
  const [inputImage] = useAtom(inputImageAtom);
  const [errorCode] = useAtom(errorCodeAtom);
  const [, setDisplay] = useAtom(displayImage);
  const [[rows, cols]] = useAtom(numTiles);

  const isMobile = useIsMobile();

  const isDisabled = inputImage === "" || errorCode !== 0;
  const content = [
    "Jigsaw!",
    "Upload your own image to try it out!",
    "You gotta have some rows!",
    "You gotta have some columns!",
    "You gotta have at most 50 rows!",
    "You gotta have at most 50 columns!",
  ];
  const label = content[errorCode];

  const convert = async () => {
    const formData = new FormData();
    formData.append("image", inputImage);
    formData.append("rows", rows.toString());
    formData.append("cols", cols.toString());

    const response = await axios.put(
      process.env.REACT_APP_BACKEND_URL!,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        responseType: "blob",
      }
    );
    setDisplay(URL.createObjectURL(response.data));
  };
  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      gap="1rem"
      w={isMobile ? "90%" : "fit-content"}>
      <Tooltip
        label={label}
        closeDelay={200}
        shouldWrapChildren
        borderColor="bg.500 !important"
        border="1px solid"
        bg="bg.900"
        borderRadius="8px"
        p="0.6rem"
        isDisabled={isMobile || errorCode === 0}>
        <Button
          onClick={
            isDisabled ? () => console.log("Unable to Convert Image") : convert
          }
          backgroundColor={isDisabled ? "bg.800" : "pink.500"}
          _hover={{
            bgColor: isDisabled ? "bg.800" : "pink.600",
          }}
          _active={{
            bgColor: isDisabled ? "bg.800" : "pink.700",
          }}
          aria-label="arrow-icon"
          w="100%">
          {isMobile ? (
            <Flex gap="0.5rem">
              {errorCode === 0 && <ArrowDownIcon boxSize={5} />} {label}
            </Flex>
          ) : (
            <Flex gap="0.5rem">
              Jigsaw!
              <ArrowForwardIcon boxSize={5} />
            </Flex>
          )}
        </Button>
      </Tooltip>
    </Flex>
  );
};

export default ConvertButton;

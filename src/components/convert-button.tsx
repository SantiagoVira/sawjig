import { ArrowDownIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Flex, Spinner, Tooltip } from "@chakra-ui/react";
import axios from "axios";
import { useAtom } from "jotai";
import {
  displayImage,
  inputImageAtom,
  errorCodeAtom,
  numTiles,
  inputImageSize,
  isLoadingImage,
} from "../atoms";
import { useIsMobile } from "../hooks/useIsMobile";

const ConvertButton: React.FC = () => {
  const [inputImage] = useAtom(inputImageAtom);
  const [errorCode] = useAtom(errorCodeAtom);
  const [, setDisplay] = useAtom(displayImage);
  const [[rows, cols]] = useAtom(numTiles);
  const [[imageWidth, imageHeight]] = useAtom(inputImageSize);
  const [isLoading, setIsLoading] = useAtom(isLoadingImage);

  const isMobile = useIsMobile();

  const isDisabled = inputImage === "" || errorCode !== 0 || isLoading;
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
    setIsLoading(true);
    const formData = new FormData();
    formData.append("image", inputImage);
    formData.append("rows", rows);
    formData.append("cols", cols);
    formData.append("isPortrait", imageHeight > imageWidth ? "isPortrait" : "");

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
    setIsLoading(false);
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
          disabled={isDisabled}
          onClick={convert}
          backgroundColor="pink.500"
          _hover={{
            bgColor: "pink.600",
          }}
          _active={{
            bgColor: "pink.700",
          }}
          aria-label="convert-button"
          w="100%">
          {isMobile ? (
            <Flex gap="0.5rem">
              {errorCode === 0 &&
                (isLoading ? (
                  <Spinner size="md" />
                ) : (
                  <ArrowDownIcon boxSize={6} />
                ))}{" "}
              {label}
            </Flex>
          ) : (
            <Flex gap="0.5rem">
              Jigsaw!
              {isLoading ? (
                <Spinner size="md" />
              ) : (
                <ArrowForwardIcon boxSize={6} />
              )}
            </Flex>
          )}
        </Button>
      </Tooltip>
    </Flex>
  );
};

export default ConvertButton;

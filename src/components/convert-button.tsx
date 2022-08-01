import { ArrowDownIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Flex, Spinner, Tooltip } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { inputImageAtom, errorCodeAtom, isLoadingImage } from "../atoms";
import { useIsMobile } from "../hooks/useIsMobile";
import { useConvert } from "../hooks/convert";

const ConvertButton: React.FC = () => {
  const [inputImage] = useAtom(inputImageAtom);
  const [errorCode] = useAtom(errorCodeAtom);
  const [isLoading] = useAtom(isLoadingImage);

  const isMobile = useIsMobile();

  const isDisabled = inputImage === "" || errorCode !== 0 || isLoading;
  const content = [
    "Sawjig!",
    "Upload your own image to try it out!",
    "You gotta have some rows!",
    "You gotta have some columns!",
    "You gotta have at most 50 rows!",
    "You gotta have at most 50 columns!",
  ];
  const label = content[errorCode];

  const convert = useConvert();
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
              Sawjig!
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

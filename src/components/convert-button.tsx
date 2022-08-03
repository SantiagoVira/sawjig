import { ArrowDownIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Button, Flex, Spinner, Tooltip } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { inputImageFileAtom, isLoadingImageAtom } from "../atoms";
import { useIsMobile } from "../hooks/useIsMobile";
import { useConvert } from "../hooks/convert";
import { useErrorCode } from "../hooks/useErrorCode";

const ConvertButton: React.FC = () => {
  const [inputImageFile] = useAtom(inputImageFileAtom);
  const [isLoadingImage] = useAtom(isLoadingImageAtom);

  const isMobile = useIsMobile();

  const { errorCode, errorMessage } = useErrorCode();
  const convert = useConvert();

  const isDisabled = inputImageFile === "" || errorCode !== 0 || isLoadingImage;

  return (
    <Flex
      flexDirection="column"
      alignItems="center"
      gap="1rem"
      w={isMobile ? "90%" : "fit-content"}>
      <Tooltip
        label={errorMessage}
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
                (isLoadingImage ? (
                  <Spinner size="md" />
                ) : (
                  <ArrowDownIcon boxSize={6} />
                ))}{" "}
              {errorMessage}
            </Flex>
          ) : (
            <Flex gap="0.5rem">
              Sawjig!
              {isLoadingImage ? (
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

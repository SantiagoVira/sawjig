import { Text } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { displayImageBlobAtom } from "../atoms";
import { useIsIOS } from "../hooks/useIsIOS";
import StyledImage from "./image";

const ImageDisplay: React.FC = () => {
  const [displayImageBlob] = useAtom(displayImageBlobAtom);
  const isIOS = useIsIOS();

  return (
    <>
      <StyledImage
        src={displayImageBlob}
        alt="cut-up-image"
        borderRadius="16px"
      />
      {true && (
        <Text
          borderColor="bg.500 !important"
          border="1px solid"
          bg="bg.900"
          borderRadius="8px"
          p="0.6rem">
          To save your result, hold down on the image above and select "Add to
          Photos"
        </Text>
      )}
    </>
  );
};

export default ImageDisplay;

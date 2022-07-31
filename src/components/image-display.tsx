import { Image } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { displayImage } from "../atoms";

const ImageDisplay: React.FC = () => {
  const [source] = useAtom(displayImage);
  return (
    <Image
      display="block"
      src={source}
      alt="cut-up-image"
      maxW="450"
      maxH="450"
      borderRadius="16px"
    />
  );
};

export default ImageDisplay;

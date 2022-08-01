import { useAtom } from "jotai";
import { displayImage } from "../atoms";
import StyledImage from "./image";

const ImageDisplay: React.FC = () => {
  const [source] = useAtom(displayImage);

  return (
    <StyledImage
      src={source}
      alt="cut-up-image"
      borderRadius="16px"
      aria-orientation="vertical"
    />
  );
};

export default ImageDisplay;

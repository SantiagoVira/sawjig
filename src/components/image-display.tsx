import { useAtom } from "jotai";
import { displayImageBlobAtom } from "../atoms";
import StyledImage from "./image";

const ImageDisplay: React.FC = () => {
  const [displayImageBlob] = useAtom(displayImageBlobAtom);

  return (
    <StyledImage
      src={displayImageBlob}
      alt="cut-up-image"
      borderRadius="16px"
    />
  );
};

export default ImageDisplay;

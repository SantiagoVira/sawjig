import { ImageProps, Image } from "@chakra-ui/react";

export const maxImageSize = {
  base: "calc(0.9 * 100vw)",
  md: "300px",
  lg: "420px",
  xl: "450px",
};

const StyledImage: React.FC<ImageProps> = (props) => {
  return (
    <Image
      display="block"
      maxW={maxImageSize}
      maxH={maxImageSize}
      borderRadius="16px"
      {...props}
    />
  );
};

export default StyledImage;

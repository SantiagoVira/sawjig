import { ImageProps, Image } from "@chakra-ui/react";

const StyledImage: React.FC<ImageProps> = (props) => {
  return (
    <Image
      display="block"
      maxW={{ base: "calc(0.9 * 100vw)", md: "450px" }}
      maxH={{ base: "calc(0.9 * 100vw)", md: "450px" }}
      borderRadius="16px"
      imageOrientation="from-image"
      {...props}
    />
  );
};

export default StyledImage;

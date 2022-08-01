import { Box, Center, Input, Button } from "@chakra-ui/react";
import React, { useRef } from "react";
import { useAtom } from "jotai";
import {
  errorCodeAtom,
  inputImageAtom,
  inputImageSize,
  numTiles,
  originalImage,
} from "../atoms";
import Grid from "./grid";
import { useIsMobile } from "../hooks/useIsMobile";
import StyledImage from "./image";
import { useConvert } from "../hooks/convert";

const ImageInput: React.FC = () => {
  const [image, setImage] = useAtom(originalImage);
  const [, setinputImageAtom] = useAtom(inputImageAtom);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [imageSize, setImageSize] = useAtom(inputImageSize);

  const [, setErrorCode] = useAtom(errorCodeAtom);
  const [[rows, cols]] = useAtom(numTiles);
  const isMobile = useIsMobile();
  const convert = useConvert();

  return (
    <>
      <Input
        ref={fileInputRef}
        type="file"
        name={"Submit Image"}
        id={"Submit Image"}
        accept="image/*"
        autoComplete="off"
        style={{ display: "none" }}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files && e.target.files[0]) {
            const imType = e.target.files[0]["type"];
            if (
              imType.split("/")[0] !== "image" ||
              imType.split("/")[1] === "gif"
            ) {
              return;
            } // not image
            setImage(URL.createObjectURL(e.target.files[0])); // Blob
            setinputImageAtom(e.target.files[0]); // File

            setErrorCode(0);
            setErrorCode((code) => (parseInt(cols) > 50 ? 5 : code));
            setErrorCode((code) => (parseInt(rows) > 50 ? 4 : code));
            setErrorCode((code) =>
              cols === "" || parseInt(cols) < 1 ? 3 : code
            );
            setErrorCode((code) =>
              rows === "" || parseInt(rows) < 1 ? 2 : code
            );
          }
        }}
      />
      <Center w="fit-content">
        <Box
          position="relative"
          onClick={() => fileInputRef.current?.click()}
          sx={{
            "&:hover .overlay": {
              opacity: 1,
            },
          }}>
          <Grid w={imageSize[0]} h={imageSize[1]} key={`${isMobile}`}>
            <StyledImage
              src={image}
              alt="selected-image"
              borderRadius="16px"
              onLoad={(data: React.BaseSyntheticEvent) => {
                setImageSize([
                  data.target.offsetWidth,
                  data.target.offsetHeight,
                ]);

                convert();
              }}
            />
          </Grid>

          <Box
            _hover={{ cursor: "pointer" }}
            className="overlay"
            position="absolute"
            top={0}
            left={0}
            bottom={0}
            right={0}
            h="100%"
            w="100%"
            opacity={0}
            transition="0.2s ease-in"
            backdropFilter="blur(5px)"
            borderRadius="16px">
            <Button
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              sx={{
                msTransform: "translate(-50%, -50%)",
              }}
              textAlign="center"
              color="white"
              borderRadius="md"
              fontSize="14px"
              backgroundColor="pink.500"
              _hover={{
                bgColor: "pink.600",
              }}
              _active={{
                bgColor: "pink.700",
              }}>
              Upload
            </Button>
          </Box>
        </Box>
      </Center>
    </>
  );
};

export default ImageInput;

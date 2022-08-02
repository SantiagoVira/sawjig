import { Box, Center, Input, Button } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useAtom } from "jotai";
import {
  originalImageFileAtom,
  inputImageSizeAtom,
  inputImageNaturalSizeAtom,
} from "../atoms";
import Grid from "./grid";
import { useIsMobile } from "../hooks/useIsMobile";
import StyledImage from "./image";
import { useConvert } from "../hooks/convert";
import { useErrorToast } from "../hooks/useErrorToast";
import { useCheckError, useErrorCode } from "../hooks/useErrorCode";

const ImageInput: React.FC = () => {
  const [, setOriginalImageFile] = useAtom(originalImageFileAtom);
  const [, setInputImageSize] = useAtom(inputImageSizeAtom);
  const [, setInputImageNaturalSize] = useAtom(inputImageNaturalSizeAtom);

  const [inputBlob, setInputBlob] = useState<string>("/logo/gradient.png");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isMobile = useIsMobile();
  const convert = useConvert();

  // Errors
  const { errorCode } = useErrorCode();
  const checkErrors = useCheckError();
  const gifError = useErrorToast("Image cannot be a gif (yet)");
  const nonImageError = useErrorToast("You gotta use an image!");

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
            if (imType.split("/")[0] !== "image") {
              nonImageError();
            } else if (imType.split("/")[1] === "gif") {
              gifError();
            } else {
              setInputBlob(URL.createObjectURL(e.target.files[0]));
              setOriginalImageFile(e.target.files[0]);

              checkErrors();
              checkErrors();
              checkErrors();
              checkErrors();
              checkErrors();
            }
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
          <Grid key={`${isMobile}`}>
            <StyledImage
              src={inputBlob}
              alt="selected-image"
              borderRadius="16px"
              onLoad={(
                data: React.BaseSyntheticEvent<any, any, HTMLImageElement>
              ) => {
                setInputImageNaturalSize([
                  data.target.naturalWidth,
                  data.target.naturalHeight,
                ]);
                setInputImageSize([data.target.width, data.target.height]);
                checkErrors();
                checkErrors();
                checkErrors();
                checkErrors();
                checkErrors();

                if (inputBlob !== "/logo/gradient.png" && errorCode === 0) {
                  convert();
                }
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

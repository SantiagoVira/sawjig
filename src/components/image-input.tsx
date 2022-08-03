import { Box, Center, Input, Button } from "@chakra-ui/react";
import React, { useRef, useState } from "react";
import { useAtom } from "jotai";
import {
  inputImageFileAtom,
  inputImageSizeAtom,
  inputImageNaturalSizeAtom,
  isLoadingImageAtom,
} from "../atoms";
import Grid from "./grid";
import { useIsMobile } from "../hooks/useIsMobile";
import StyledImage from "./image";
import { useConvert } from "../hooks/convert";
import { useErrorToast } from "../hooks/useErrorToast";
import { useCheckError } from "../hooks/useErrorCode";
import { useWarningToast } from "../hooks/useWarningToast";

const ImageInput: React.FC = () => {
  const [inputImageFile, setInputImageFile] = useAtom(inputImageFileAtom);
  const [, setInputImageSize] = useAtom(inputImageSizeAtom);
  const [, setInputImageNaturalSize] = useAtom(inputImageNaturalSizeAtom);
  const [isLoadingImage] = useAtom(isLoadingImageAtom);

  const [inputBlob, setInputBlob] = useState<string>("/sawjig_default.png");

  const fileInputRef = useRef<HTMLInputElement>(null);

  const isMobile = useIsMobile();
  const convert = useConvert();

  // Errors
  const checkErrors = useCheckError();
  const errorToast = useErrorToast();
  const warningToast = useWarningToast();

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
        disabled={isLoadingImage}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          if (e.target.files && e.target.files[0]) {
            const imType = e.target.files[0]["type"];
            if (imType.split("/")[0] !== "image") {
              errorToast("You gotta use an image!");
            } else if (imType.split("/")[1] === "gif") {
              errorToast("Image cannot be a gif (yet)");
            } else {
              if (e.target.files[0].size > 1400000)
                warningToast("Bigger files may take longer to process");
              setInputBlob(URL.createObjectURL(e.target.files[0]));
              setInputImageFile(e.target.files[0]);

              checkErrors({ inputImageFile: inputImageFile });
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
                const errorCode = checkErrors({
                  inputImageWidth: data.target.naturalWidth,
                  inputImageHeight: data.target.naturalHeight,
                });

                if (inputBlob !== "/sawjig_default.png" && errorCode === 0) {
                  convert({
                    inputImageWidth: data.target.naturalWidth,
                    inputImageHeight: data.target.naturalHeight,
                  });
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
              backgroundColor={isLoadingImage ? "bg.800" : "pink.500"}
              _hover={{
                bgColor: isLoadingImage ? "bg.800" : "pink.600",
              }}
              _active={{
                bgColor: isLoadingImage ? "bg.800" : "pink.700",
              }}
              disabled={isLoadingImage}>
              Upload
            </Button>
          </Box>
        </Box>
      </Center>
    </>
  );
};

export default ImageInput;

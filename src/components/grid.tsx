import { Center, Divider, HStack, VStack } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { gridSizeAtom, inputImageSizeAtom } from "../atoms";
import { useErrorCode } from "../hooks/useErrorCode";
import { maxImageSize } from "./image";

const arraySizeN = (n: string) => {
  const num = parseInt(n);
  const size = num < 2 || isNaN(num) ? 0 : num > 50 ? 50 : num - 1;
  return [...Array(size)];
};

const Grid: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [[gridRows, gridCols]] = useAtom(gridSizeAtom);
  const [[inputImageWidth, inputImageHeight]] = useAtom(inputImageSizeAtom);
  const { errorCode } = useErrorCode();

  if (errorCode === 6) return <>{children}</>;

  return (
    <Center>
      <VStack
        position="absolute"
        w={inputImageWidth}
        h={inputImageHeight}
        maxW={maxImageSize}
        maxH={maxImageSize}
        alignItems="center"
        justifyContent="space-evenly"
        borderRadius="16px"
        overflow="hidden">
        {arraySizeN(gridRows).map((e, i) => (
          <Divider
            orientation="horizontal"
            key={`h-${i}`}
            w="100%"
            mt="0 !important"
          />
        ))}
      </VStack>
      <HStack
        position="absolute"
        w={inputImageWidth || "0"}
        h={inputImageHeight || "0"}
        maxW={maxImageSize}
        maxH={maxImageSize}
        alignItems="center"
        justifyContent="space-evenly"
        borderRadius="16px"
        overflow="hidden">
        {arraySizeN(gridCols).map((e, i) => (
          <Divider
            orientation="vertical"
            key={`v-${i}`}
            h="100%"
            mt="0 !important"
          />
        ))}
      </HStack>
      {children}
    </Center>
  );
};

export default Grid;

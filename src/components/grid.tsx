import { Center, Divider, HStack, VStack } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { numTiles } from "../atoms";

const arraySizeN = (n: string) => {
  const num = parseInt(n);
  const size = num < 2 || isNaN(num) ? 0 : num > 50 ? 50 : num - 1;
  return [...Array(size)];
};

const Grid: React.FC<
  React.PropsWithChildren<{ w: number | undefined; h: number | undefined }>
> = ({ w, h, children }) => {
  const [[rows, cols]] = useAtom(numTiles);

  return (
    <Center>
      <VStack
        position="absolute"
        w={w || "0"}
        h={h || "0"}
        alignItems="center"
        justifyContent="space-evenly"
        borderRadius="16px"
        overflow="hidden">
        {arraySizeN(rows).map((e, i) => (
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
        w={w || "0"}
        h={h || "0"}
        alignItems="center"
        justifyContent="space-evenly"
        borderRadius="16px"
        overflow="hidden">
        {arraySizeN(cols).map((e, i) => (
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

import { HStack, Input } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { gridSizeAtom } from "../atoms";
import { useCheckError, useErrorCode } from "../hooks/useErrorCode";

const SizeInput: React.FC = () => {
  const [[gridRows, gridCols], setGridSize] = useAtom(gridSizeAtom);
  const { errorCode } = useErrorCode();
  const checkErrors = useCheckError();

  return (
    <HStack alignItems="center" gap="0.5rem">
      <Input
        type="number"
        borderColor={errorCode === 4 || errorCode === 2 ? "tomato" : "bg.500"}
        _placeholder={{ color: "tomato", opacity: 0.3 }}
        placeholder="# Rows"
        px="0.6rem"
        defaultValue={gridRows}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setGridSize([e.target.value, gridCols]);
          checkErrors();
        }}
        w="5rem"
      />
      <Input
        type="number"
        borderColor={errorCode === 5 || errorCode === 3 ? "tomato" : "bg.500"}
        _placeholder={{ color: "tomato", opacity: 0.3 }}
        placeholder="# Cols"
        px="0.6rem"
        defaultValue={gridCols}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setGridSize([gridRows, e.target.value]);
          checkErrors();
        }}
        w="5rem"
      />
    </HStack>
  );
};

export default SizeInput;

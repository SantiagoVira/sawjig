import { HStack, Input, Text } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useState } from "react";
import { gridSizeAtom } from "../atoms";
import { useCheckError } from "../hooks/useErrorCode";

const SizeInput: React.FC = () => {
  const [isEmpty, setIsEmpty] = useState([false, false]);

  const [[gridRows, gridCols], setGridSize] = useAtom(gridSizeAtom);

  const checkErrors = useCheckError();

  return (
    <HStack alignItems="center" gap="0.3rem">
      <Input
        type="number"
        borderColor={isEmpty[0] ? "tomato" : "bg.500"}
        _placeholder={{ color: "tomato", opacity: 0.3 }}
        placeholder="# Rows"
        px="0.6rem"
        defaultValue={gridRows}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setIsEmpty((prev) => [e.target.value === "", prev[1]]);
          setGridSize([e.target.value, gridCols]);
          checkErrors({ gridRows: e.target.value, gridCols: gridCols });
        }}
        w="5rem"
      />{" "}
      <Text>X</Text>
      <Input
        type="number"
        borderColor={isEmpty[1] ? "tomato" : "bg.500"}
        _placeholder={{ color: "tomato", opacity: 0.3 }}
        placeholder="# Cols"
        px="0.6rem"
        defaultValue={gridCols}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setIsEmpty((prev) => [prev[0], e.target.value === ""]);
          setGridSize([gridRows, e.target.value]);
          checkErrors({ gridRows: gridRows, gridCols: e.target.value });
        }}
        w="5rem"
      />
    </HStack>
  );
};

export default SizeInput;

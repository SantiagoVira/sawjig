import { HStack, Input, Text } from "@chakra-ui/react";
import { SetStateAction, useAtom } from "jotai";
import { numTiles, errorCodeAtom, inputImageAtom } from "../atoms";

const StyledInput: React.FC<{
  val: string[];
  setVal: (update: SetStateAction<string[]>) => void;
  updateIndex: number;
  name: string;
  error: boolean;
}> = ({ val, setVal, updateIndex, name, error }) => {
  const [, setErrorCode] = useAtom(errorCodeAtom);
  const [inputImage] = useAtom(inputImageAtom);

  return (
    <Input
      type="number"
      borderColor={error ? "tomato" : "bg.500"}
      _placeholder={{ color: "tomato", opacity: 0.3 }}
      placeholder={`# ${name}`}
      px="0.6rem"
      defaultValue={val[updateIndex]}
      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
        const rows = updateIndex === 0 ? e.target.value : val[0];
        const cols = updateIndex === 0 ? val[1] : e.target.value;
        setVal([rows, cols]);

        setErrorCode(0);
        setErrorCode((code) => (parseInt(cols) > 50 ? 5 : code));
        setErrorCode((code) => (parseInt(rows) > 50 ? 4 : code));
        setErrorCode((code) => (cols === "" || parseInt(cols) < 1 ? 3 : code));
        setErrorCode((code) => (rows === "" || parseInt(rows) < 1 ? 2 : code));
        setErrorCode((code) => (inputImage === "" ? 1 : code));
      }}
      w="5rem"
    />
  );
};

const SizeInput: React.FC = () => {
  const [tiles, setTiles] = useAtom(numTiles);
  const [errorCode] = useAtom(errorCodeAtom);
  return (
    <HStack alignItems="center" gap="0.5rem">
      <StyledInput
        val={tiles}
        setVal={setTiles}
        updateIndex={0}
        name="Rows"
        error={errorCode === 4 || errorCode === 2}
      />
      <Text>X</Text>
      <StyledInput
        val={tiles}
        setVal={setTiles}
        updateIndex={1}
        name="Cols"
        error={errorCode === 5 || errorCode === 3}
      />
    </HStack>
  );
};

export default SizeInput;

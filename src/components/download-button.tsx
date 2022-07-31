import { Text } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { displayImage } from "../atoms";

const DownloadButton: React.FC = () => {
  const [link] = useAtom(displayImage);

  return (
    <a href={link} download="Jigsaw.png">
      <Text
        p="0.5rem 0.8rem"
        bg="pink.500"
        _hover={{ bg: "pink.600" }}
        _active={{ bg: "pink.700" }}
        borderRadius="0.375rem">
        Download!
      </Text>
    </a>
  );
};

export default DownloadButton;

import { Text } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { displayImageBlobAtom } from "../atoms";
import { useIsIOS } from "../hooks/useIsIOS";

const DownloadButton: React.FC = () => {
  const [displayImageBlob] = useAtom(displayImageBlobAtom);
  const isIOS = useIsIOS();

  return isIOS ? (
    <></>
  ) : (
    <a href={displayImageBlob} download="Sawjig.png">
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

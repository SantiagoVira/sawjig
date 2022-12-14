import { useToast } from "@chakra-ui/react";

export const useErrorToast = () => {
  const toast = useToast();

  return (title: string) =>
    toast({
      title: title,
      status: "error",
      isClosable: true,
    });
};

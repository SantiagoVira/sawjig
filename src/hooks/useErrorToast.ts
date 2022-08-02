import { useToast } from "@chakra-ui/react";

export const useErrorToast = (title: string) => {
  const toast = useToast();

  return () =>
    toast({
      title: title,
      status: "error",
      isClosable: true,
    });
};

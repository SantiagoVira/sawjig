import { useToast } from "@chakra-ui/react";

export const useWarningToast = () => {
  const toast = useToast();

  return (title: string) =>
    toast({
      title: title,
      status: "warning",
      isClosable: true,
    });
};

import { useState, useCallback } from "react";

export const useDisclosure = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const onOpen = useCallback(() => {
    setIsOpen(true);
  }, [isOpen]);

  const onClose = useCallback(() => {
    setIsOpen(false);
  }, [isOpen]);

  return { isOpen, onOpen, onClose };
};

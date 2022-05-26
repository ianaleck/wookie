import {
  Box,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerOverlay,
  HStack,
  IconButton,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import React from "react";
import { MdClose } from "react-icons/md";
import { FaSearch } from "react-icons/fa";
import SearchForm from "./SearchForm";

export default function MobileSearch() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Stack
        flex={{ base: 1, md: 0 }}
        justify={"flex-end"}
        direction={"row"}
        spacing={6}
        display={{ base: "flex", md: "none" }}
        onClick={onOpen}
      >
        <IconButton
          aria-label=""
          border="1px solid"
          borderColor={"gray.600"}
          icon={
            <Box position="relative">
              <FaSearch />
            </Box>
          }
          borderRadius="40px"
          _hover={{ bg: "gray.700", borderColor: "gray.400" }}
          bg="gray.10"
        />
      </Stack>
      <Drawer isOpen={isOpen} placement="top" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerBody bg="gray.700">
            <HStack>
              <SearchForm />
              <IconButton
                colorScheme={"red"}
                size="sm"
                aria-label=""
                icon={<MdClose />}
                onClick={onClose}
              />
            </HStack>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}

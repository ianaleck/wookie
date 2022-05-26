import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import React from "react";
import { MdSearch } from "react-icons/md";
import { debounceMyFunction } from "debounce-my-function";
import { useNavigate } from "react-router-dom";

export default function SearchForm() {
  const navigate = useNavigate();

  const debouncedFunction = debounceMyFunction((value: string) => {
    navigate(`/search?q=${value}`);
  }, 1000);
  return (
    <InputGroup>
      <Input
        placeholder="Search"
        onChange={(e) => debouncedFunction(e.target.value as string)}
        borderRadius="40px"
        bg="gray.10"
        _focus={{ borderColor: "gray.400" }}
        _hover={{ borderColor: "gray.400" }}
      />
      <InputRightElement children={<MdSearch />} />
    </InputGroup>
  );
}

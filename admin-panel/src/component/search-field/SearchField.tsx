import { Container, Flex, Input, Space } from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { IconSearch } from "@tabler/icons-react";
import React, { memo, useEffect } from "react";

interface IProps {
  onChangeText?: (value: string) => void;
}

const TableSearch: React.FC<IProps> = ({ onChangeText }) => {
  const [value, setValue] = useDebouncedState("", 400);

  useEffect(() => {
    onChangeText && onChangeText(value);
  }, [value, onChangeText]);

  return (
    <Container mt={14}>
      <Flex direction={{ base: "column", sm: "row" }} gap="sm" align="center">
        <Input
          placeholder="Search by name"
          onChange={(e) => setValue(e.target.value)}
          icon={<IconSearch size={18} />}
        />
      </Flex>
      <Space h="md" />
    </Container>
  );
};

export default memo(TableSearch);

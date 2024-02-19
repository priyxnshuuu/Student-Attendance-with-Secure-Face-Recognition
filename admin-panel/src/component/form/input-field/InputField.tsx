import { Box, Text, TextInput } from "@mantine/core";
import { GetInputProps } from "@mantine/form/lib/types";
import React, { memo } from "react";

interface IInputField {
  label: string;
  getInputProps: GetInputProps<any>;
  name: string;
}

const InputField: React.FC<IInputField> = ({ label, getInputProps, name }) => {
  return (
    <Box style={{ marginTop: "1rem", marginBottom: "1rem" }}>
      <Text mb={15} style={{ marginBottom: "0.4rem", marginTop: "0.4rem" }}>
        {label}
      </Text>
      <TextInput placeholder="" {...getInputProps(name)} />
    </Box>
  );
};

export default memo(InputField);

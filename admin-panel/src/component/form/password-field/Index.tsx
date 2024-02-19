import { Box, PasswordInput, Text } from "@mantine/core";
import { GetInputProps } from "@mantine/form/lib/types";
import React, { memo } from "react";

interface IPasswordField {
  label: string;
  getInputProps: GetInputProps<any>;
  name: string;
}

const PasswordField: React.FC<IPasswordField> = ({
  label,
  getInputProps,
  name,
}) => {
  return (
    <Box style={{ marginTop: "1rem", marginBottom: "1rem" }}>
      <Text mb={15} style={{ marginBottom: "0.4rem", marginTop: "0.4rem" }}>
        {label}
      </Text>
      <PasswordInput {...getInputProps(name)} />
    </Box>
  );
};

export default memo(PasswordField);

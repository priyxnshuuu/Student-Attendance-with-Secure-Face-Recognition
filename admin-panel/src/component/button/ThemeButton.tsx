import { Button, Text } from "@mantine/core";
import React, { memo } from "react";

import { ButtonProps } from "@mantine/core/lib/Button";
interface IButton extends ButtonProps {
  title: string;
}

const ThemeButton = (props: IButton) => {
  const { title } = props;
  return (
    <Button {...props} style={{ backgroundColor: "#ff008a" }}>
      <Text>{title}</Text>
    </Button>
  );
};

export default memo(ThemeButton);

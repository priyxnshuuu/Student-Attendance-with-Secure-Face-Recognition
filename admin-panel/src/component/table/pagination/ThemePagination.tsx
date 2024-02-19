import React, { memo, useState, useEffect } from "react";
import { Pagination, createStyles } from "@mantine/core";

import { useDebouncedValue } from "@mantine/hooks";
import { CONSTANTS } from "../../../constant";

const ThemePagination: React.FC<TTablePaging> = ({ setPage, totalPages }) => {
  const { classes } = useStyles();
  const [active, setActive] = useState(1);

  const [debounce] = useDebouncedValue(active, 200);

  useEffect(() => {
    setPage(debounce);
  }, [debounce, setPage]);

  if (totalPages && totalPages <= CONSTANTS.PAGE_LIMIT) {
    return null;
  }

  return (
    <Pagination
      className={classes.page}
      value={active}
      onChange={setActive}
      size={"sm"}
      total={Math.ceil(totalPages / CONSTANTS.PAGE_LIMIT)}
      radius="sm"
      mt={20}
      styles={(theme) => ({
        control: {
          "&[data-active]": {
            backgroundImage: theme.fn.gradient({
              from: "#F00F89",
              to: "#F00F89",
            }),
            border: 0,
          },
        },
      })}
    />
  );
};
const useStyles = createStyles((theme) => ({
  page: {
    // paddingTop: 70,
  },
}));

export default memo(ThemePagination);

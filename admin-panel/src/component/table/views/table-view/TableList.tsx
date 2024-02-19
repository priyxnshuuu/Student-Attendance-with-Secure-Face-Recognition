import React, { memo } from "react";
import { Box, createStyles } from "@mantine/core";

import DynamicTable from "./DynamicTable";

const TableList: React.FC<TTableListView> = ({ columns = [], data = [] }) => {
  const { classes } = useStyles();

  return (
    <Box>
      <div className={classes.tableContainer}>
        <DynamicTable data={data} columns={columns} />
      </div>
    </Box>
  );
};

const useStyles = createStyles((theme) => ({
  tableContainer: {
    border: "1px solid #D3D3D3",
    marginTop: 25,
    borderRadius: 5,
    width: "100%",
  },

  pagination: {
    display: "flex",
    marginTop: 25,
  },
}));

export default memo(TableList);

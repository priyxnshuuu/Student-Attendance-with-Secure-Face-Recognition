import { Box } from "@mantine/core";
import React, { useMemo, useState } from "react";
import TableHeader from "./table-header/TableHeader";
import GridView from "./views/grid-view/GridView";
import TableList from "./views/table-view/TableList";
import ThemePagination from "./pagination/ThemePagination";
import ThemeLoader from "../loader/ThemeLoader";

const CustomTable: React.FC<TCustomTable> = ({
  headerProps,
  columns,
  data,
  loading,
  paginationProps,
}) => {
  const [type, setType] = useState<TTableView>("list");

  const fields = useMemo(() => {
    const obj: any = {};
    columns.forEach((value, key) => {
      obj[key] = value.key;
    });

    return obj;
  }, [columns]);

  return (
    <Box style={{ position: "relative", minHeight: "100vh" }}>
      <TableHeader {...headerProps} setType={setType} view={type} />
      <Box style={{ position: "relative", minHeight: "75vh" }}>
        {type === "grid" ? (
          <GridView fields={fields} data={data} gridColumns={4} />
        ) : (
          <TableList data={data} columns={columns} />
        )}
        <ThemeLoader loading={loading ?? false} />
      </Box>

      <Box>
        {paginationProps && (
          <ThemePagination
            setPage={paginationProps.setPage}
            totalPages={paginationProps.totalPages}
          />
        )}
      </Box>
    </Box>
  );
};

export default CustomTable;

import React from "react";
import { Table } from "@mantine/core";

const DynamicTable: React.FC<TTableListView> = ({ data = [], columns }) => {
  return (
    <Table horizontalSpacing="xl" verticalSpacing="md" highlightOnHover h={60}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key}>{column.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row._id}>
            {columns.map((column) => (
              <td key={column.key}>
                {column.renderCell ? column.renderCell(row) : row[column.key]}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default DynamicTable;

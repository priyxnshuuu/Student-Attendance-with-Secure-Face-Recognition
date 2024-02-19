import React, { useMemo, useRef, useState } from "react";
import { ActionIcon, Box } from "@mantine/core";
import { useGetAllStudent } from "../../hooks/students/query/getAllStudent.query";
import StudentModal, { IStudentModalRef } from "./modal/StudentModal";
import CustomTable from "../../component/table";
import ThemeButton from "../../component/button/ThemeButton";
import { COLUMNS } from "../../columns";
import { CONSTANTS } from "../../constant";
import { IconEdit, IconPlus } from "@tabler/icons-react";

const Students = () => {
  const modalRef = useRef<IStudentModalRef>(null);
  const tableColumns = [...COLUMNS.student];
  const [search, setSearch] = useState("");
  const [activePage, setActivePage] = useState(1);
  const [pagedData, setPagedData] = useState({
    total: 10,
  });
  const { refetch, data, isLoading } = useGetAllStudent({
    paging: {
      itemPerPage: CONSTANTS.PAGE_LIMIT,
      page: activePage,
    },
    searchParams: {
      search,
    },
  });
  console.log(data);
  const students = useMemo(() => {
    if (!isLoading && data) {
      setPagedData(data.pageData);
      return data.data;
    } else {
      return [];
    }
  }, [isLoading, data]);

  tableColumns.push({
    header: "Edit Student",
    key: "editStudent",
    renderCell: (row) => (
      <ActionIcon
        onClick={() => {
          modalRef.current?.toggleModal();
          modalRef.current?.updateData(row);
        }}
      >
        <IconEdit />
      </ActionIcon>
    ),
  });

  return (
    <Box>
      <StudentModal reload={refetch} ref={modalRef} />
      <CustomTable
        loading={isLoading}
        columns={tableColumns}
        data={students}
        paginationProps={{
          setPage: setActivePage,
          totalPages: pagedData.total || 0, // Add a default value of 0 if pagedData.total is undefined
        }}
        headerProps={{
          search: true,
          onChangeText: (text) => setSearch(text),
          rightComponent: (
            <Box onClick={() => modalRef.current?.toggleModal()}>
              <ThemeButton
                title="Add Students"
                mr={15}
                leftIcon={<IconPlus size={20} />}
              />
            </Box>
          ),
        }}
      />
    </Box>
  );
};

export default Students;

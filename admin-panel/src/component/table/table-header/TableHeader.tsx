import { Box, createStyles } from "@mantine/core";

import React from "react";
import { BsListUl } from "react-icons/bs";
import { FiGrid } from "react-icons/fi";
import SearchField from "../../search-field/SearchField";

interface ITableHeader extends TTableHeaderProps {
  view: TTableView;
  setType: React.Dispatch<React.SetStateAction<TTableView>>;
}

const TableHeader: React.FC<ITableHeader> = ({
  setType,
  view,
  onChangeText,
  rightComponent,
  search,
}) => {
  const { classes } = useStyles();
  return (
    <Box className={classes.flex}>
      <Box className={classes.people}>
        {search && <SearchField onChangeText={onChangeText} />}
      </Box>
      <Box className={classes.iconContainer}>
        <Box
          className={`${classes.iconlist} ${
            view === "grid" ? classes.icon1Active : classes.icon1
          }`}
          onClick={() => setType("grid")}
        >
          <FiGrid size={24} />
        </Box>
        <Box
          className={`${classes.iconlist} ${
            view === "list" ? classes.icon2Active : classes.icon2
          }`}
          onClick={() => setType("list")}
        >
          <BsListUl size={24} />
        </Box>
        {rightComponent}
      </Box>
    </Box>
  );
};

const useStyles = createStyles((theme) => ({
  flex: {
    display: "flex",
    justifyContent: "space-between",
    border: "1px solid #D3D3D3",
    borderRadius: 5,
  },

  iconContainer: {
    display: "flex",
    listStyle: "none",
    padding: 0,
    alignItems: "center",
  },
  iconlist: {
    marginRight: 15,
    border: "1px solid #D3D3D3",
    padding: 10,
    paddingBottom: 8,
    display: "flex",
    alignItems: "center",
    transition: "background-color 0.4s, border 0.4s, color 0.3s",
    cursor: "pointer",
  },
  icon1: {
    color: "#808080",
    "&:hover": {
      backgroundColor: "#0097ED",
      border: "1px solid #0097ED",
      color: "white",
    },
  },
  icon2: {
    color: "grey",
    "&:hover": {
      backgroundColor: "#0097ED",
      border: "1px solid #0097ED",
      color: "white",
    },
  },
  icon1Active: {
    color: "white",
    backgroundColor: "#0097ED",
    border: "1px solid #0097ED",
  },
  btn: {
    background: "#00882E",
    height: "45px",
  },
  icon2Active: {
    background: "#0097ED",
    color: "white",
    "&:hover": {
      backgroundColor: "#0097ED",
      border: "1px solid #0097ED",
      color: "white",
    },
  },
  iconLink: {
    textDecoration: "none",
  },
  textListItem: {
    display: "flex",
    alignItems: "center",
    color: "white",
  },
  textList: {
    paddingTop: 5,
    paddingRight: 20,
    paddingLeft: 20,
    backgroundColor: "#F00F89",
    border: "1px solid #F00F89",
  },
  people: {
    display: "flex",
    alignItems: "center",
  },
}));

export default TableHeader;

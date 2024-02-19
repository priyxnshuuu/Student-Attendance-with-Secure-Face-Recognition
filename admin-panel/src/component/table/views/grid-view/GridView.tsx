import React from "react";
import { Box, Grid, Text } from "@mantine/core";
import { createStyles } from "@mantine/core";

const GridView: React.FC<TGridView> = ({
  data = [],
  gridColumns = 4,
  keyName = "_id",
  renderGridView,
  fields,
}) => {
  const { classes } = useStyles();

  return (
    <Grid className={classes.main}>
      {data.map((item) => (
        <Grid.Col
          key={item[keyName]}
          md={6}
          lg={gridColumns}
          className={classes.grid}
        >
          {renderGridView ? (
            renderGridView(item)
          ) : (
            <Box className={classes.card}>
              {Object.entries(fields).map((key: any) => {
                return (
                  <Text size={"xs"}>
                    <b>{key[1]}</b> : {item[key[1]]}
                  </Text>
                );
              })}
            </Box>
          )}
        </Grid.Col>
      ))}
    </Grid>
  );
};

const useStyles = createStyles(() => ({
  main: {
    marginTop: 25,
    paddingLeft: 9,
    paddingRight: 9,
  },
  grid: {
    display: "block",
    width: "25%",
  },
  card: {
    border: "1px solid #D3D3D3",
    overflow: "auto",
    lineHeight: 1,
    background: "white",
    padding: 10,
    borderRadius: 5,
    fontFamily: "'Montserrat', sans-serif",
  },
  email: {
    color: "#F00F89",
  },
  rollno: {
    color: "grey",
  },
}));

export default GridView;

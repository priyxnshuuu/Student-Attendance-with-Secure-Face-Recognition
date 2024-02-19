import { Box, Flex, Text, createStyles } from "@mantine/core";
import { data } from "./data/PresentRecordData";
const PresentRecord = () => {
  const { classes } = useStyles();
  const presentBox = data.map((item) => (
    <Box className={classes.presentDate}>
      <Text weight={700} size="xs">
        {item.start} - {item.end}
      </Text>
      <Text weight={500} size="xs" c="dimmed">
        Present Days : {item.present}
      </Text>
    </Box>
  ));
  return (
    <Box mt={20}>
      <Flex
        mih={50}
        gap="md"
        justify="space-between"
        align="center"
        direction="row"
        wrap="wrap"
      >
        {presentBox}
      </Flex>
    </Box>
  );
};
const useStyles = createStyles((theme) => ({
  presentDate: {
    backgroundColor: "#f2f3f4",
    padding: "0.7rem",
    flexGrow: 1,
  },
}));
export default PresentRecord;

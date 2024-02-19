import {
  createStyles,
  Title,
  Text,
  Container,
  Group,
  rem,
  Button,
  Box,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";

const ErrorPage: React.FC<TErrorData> = ({
  errorCode = 404,
  errorTitle = "Invalid URL",
  errorMessage = "The requested url was not found",
}) => {
  const navigate = useNavigate();

  const { classes } = useStyles();
  return (
    <Box className={classes.root}>
      <Container>
        <Box className={classes.label}>{errorCode}</Box>
        <Title className={classes.title}>{errorTitle}</Title>
        <Text size="lg" align="center" className={classes.description}>
          {errorMessage}
        </Text>
        <Group position="center">
          <Button className={classes.goBackBtn} onClick={() => navigate(-1)}>
            Go back
          </Button>
        </Group>
      </Container>
    </Box>
  );
};
export default ErrorPage;
const useStyles = createStyles((theme) => ({
  root: {
    margin: rem(40),
    backgroundColor: "white",
  },

  label: {
    textAlign: "center",
    fontWeight: 600,
    fontSize: rem(100),
    lineHeight: 1,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color: "#ff008a",
  },

  title: {
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    textAlign: "center",
    fontWeight: 800,
    fontSize: rem(22),
    color: "#f752ab",
  },

  description: {
    maxWidth: "810px",
    margin: "auto",
    fontSize: rem(17),
    marginTop: theme.spacing.xl,
    marginBottom: `calc(${theme.spacing.xl} * 1.5)`,
    color: "black",
  },

  goBackBtn: {
    display: "flex",
    alignItems: "center",
    textDecoration: "none",
    fontSize: theme.fontSizes.xl,
    color: "white",
    justifyContent: "center",
    backgroundColor: "#ff008a",
    marginBottom: ".2rem",
    height: 45,
    width: 150,
    padding: `${theme.spacing.sm} ${theme.spacing.sm}`,
    fontWeight: 500,
    borderRadius: "0.5rem",
    "&:hover": {
      backgroundColor: "#ff008a",
      color: "white",
    },
  },
}));

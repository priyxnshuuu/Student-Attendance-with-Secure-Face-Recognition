import {
  createStyles,
  Paper,
  Button,
  Group,
  Anchor,
  Box,
  Title,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import IMAGES from "../../images/index";
import { useForm, yupResolver } from "@mantine/form";
import { initialValue } from "../../form/initial-value";
import InputField from "../../component/form/input-field/InputField";
import { useCallback } from "react";
import { validations } from "../../form/validation";
import { TForgotIniValues } from "../../form/initial-value/forgotPassword.values";
import { useForgotPasswordAdmin } from "../../hooks/forgot-pass/mutation/useForgotPasswordAdmin.mutation";
import { notifications } from "@mantine/notifications";

const useStyles = createStyles((theme) => ({
  controls: {
    [theme.fn.smallerThan("xs")]: {
      flexDirection: "column-reverse",
    },
  },

  control: {
    [theme.fn.smallerThan("xs")]: {
      width: "100%",
      textAlign: "center",
    },
  },
  logo: {
    margin: "auto",
    marginTop: "4rem",
  },
  main: {
    backgroundColor: "white",
  },
  box: {
    width: "25rem",
    margin: "auto",
    marginTop: theme.spacing.xl,
  },
  title: {
    textAlign: "center",
    margin: "0",
    fontFamily: "sans-serif",
  },
  text: {
    fontSize: theme.fontSizes.sm,
    textAlign: "center",
    marginTop: theme.spacing.sm,
  },
  btn: {
    background: "#00882E",
    height: "2.5rem",
  },
  box2: {
    display: "flex",
    marginTop: "10px",
    margin: "auto",
  },
  text2: {
    margin: "0",
  },
}));

const ForgotPass = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const { mutateAsync } = useForgotPasswordAdmin();
  const { getInputProps, onSubmit } = useForm({
    initialValues: initialValue.forgotPasswordValues,
    validate: yupResolver(validations.forgotPassword),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });
  const handleForgotPassword = useCallback(
    async (values: TForgotIniValues) => {
      const res = await mutateAsync(values);

      if (res.status === "success") {
        notifications.show({
          color: "Blue",
          message: res.message,
        });
      } else {
        notifications.show({
          color: "red",
          message: res.data.message,
        });
      }
    },
    [mutateAsync]
  );

  return (
    <Box className={classes.main}>
      <Box>
        <Group>
          <img className={classes.logo} src={IMAGES.logo} alt="" />
        </Group>
        <Title align="center" style={{ color: "#045e9b", marginTop: "2rem" }}>
          Shri Vaishnav Vidyapeeth Vishwavidyalaya
        </Title>
      </Box>
      <Box className={classes.box}>
        <Paper withBorder shadow="xl" radius="lg" p={20} mt={30}>
          <h1 className={classes.title}> Forgot Password?</h1>
          <p className={classes.text}>
            Enter your email to get a password reset link
          </p>
          <form onSubmit={onSubmit(handleForgotPassword)}>
            <InputField
              label="Email"
              name="email"
              getInputProps={getInputProps}
            />
            <Group position="apart" mt="lg" className={classes.controls}>
              <Button
                type="submit"
                variant="gradient"
                fullWidth
                mt="xl"
                className={classes.btn}
              >
                Reset Password
              </Button>
              <Box className={classes.box2}>
                <p className={classes.text2}>Remember your password?</p>
                <Anchor color="dimmed" size="sm" className={classes.control}>
                  <Box onClick={() => navigate("/login")} ml={5} c={"blue"}>
                    Login
                  </Box>
                </Anchor>
              </Box>
            </Group>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};
export default ForgotPass;

import {
  Anchor,
  Paper,
  Group,
  Button,
  createStyles,
  Box,
  Title,
} from "@mantine/core";
import { useNavigate } from "react-router-dom";
import IMAGES from "../../images/index";
import { useCallback } from "react";
import { useForm, yupResolver } from "@mantine/form";
import { initialValue } from "../../form/initial-value";
import InputField from "../../component/form/input-field/InputField";
import PasswordField from "../../component/form/password-field/Index";
import { TLoginIniValues } from "../../form/initial-value/login.values";
import { validations } from "../../form/validation";
import { useLoginMutation } from "../../hooks/auth/mutation/useLogin.mutation";
import { notifications } from "@mantine/notifications";
import { useIsAuthenticated, useSignIn } from "react-auth-kit";
import moment from "moment";
const useStyles = createStyles((theme) => ({
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
  logo: {
    margin: "auto",
    marginTop: "4rem",
  },
  main: {
    backgroundColor: "#ffffff",
  },
  btn: {
    background: "#00882E",
    height: "2.5rem",
  },
  errorMessage: {
    color: "red",
    textAlign: "center",
  },
}));

const Login = () => {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const isAuthenticated = useIsAuthenticated();
  const { isLoading, mutateAsync } = useLoginMutation();
  const signIn = useSignIn();
  const { getInputProps, onSubmit } = useForm({
    initialValues: initialValue.loginIniValues,
    validate: yupResolver(validations.login),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });

  const handleLogin = useCallback(
    async (values: TLoginIniValues) => {
      const res = await mutateAsync(values);
      console.log(res);
      if (
        res.status === "success" &&
        signIn({
          ...res.data,
          expiresIn: moment(res.data.expiresIn).minutes(),
        })
      ) {
        navigate("/", { replace: true });
        console.log(res.data.authState.name);
        localStorage.setItem("name", res.data.authState.name);
      } else {
        notifications.show({
          color: "red",
          title: "Login Failed",
          message: res.data.message,
        });
      }
    },
    [mutateAsync, navigate, signIn]
  );
  if (isAuthenticated()) {
    window.location.replace("/");
  }
  return (
    <Box className={classes.main}>
      <Box>
        <Group>
          <img className={classes.logo} src={IMAGES.logo} alt="" />
        </Group>
        <Title align="center" style={{ color: "#045e9b", marginTop: "2rem" }}>
          Shri Vaishnav Vidyapeeth Vishwavidyalaya
        </Title>
        <Group></Group>
      </Box>
      <Box className={classes.box}>
        <Paper withBorder shadow="xl" p={20} mt={30} radius="lg">
          <h1 className={classes.title}> Login</h1>
          <p className={classes.text}>Access to our dashboard</p>

          <form onSubmit={onSubmit(handleLogin)}>
            <InputField
              label="Email"
              name="email"
              getInputProps={getInputProps}
            />
            <PasswordField
              label="Password"
              name="password"
              getInputProps={getInputProps}
            />

            <Group position="right" mt="lg">
              <Anchor
                component="button"
                size="sm"
                onClick={() => navigate("/forgot-password")}
              >
                Forgot password?
              </Anchor>
            </Group>

            <Button
              disabled={isLoading}
              loading={isLoading}
              type="submit"
              variant="gradient"
              fullWidth
              mt="xl"
              className={classes.btn}
            >
              Login
            </Button>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};

export default Login;

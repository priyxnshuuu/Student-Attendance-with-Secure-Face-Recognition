import { createStyles, Paper, Button, Group, Box } from "@mantine/core";
import { useNavigate } from "react-router-dom";
import IMAGES from "../../images/index";
import { useForm, yupResolver } from "@mantine/form";
import { initialValue } from "../../form/initial-value";
import { validations } from "../../form/validation";
import { useCallback, useMemo } from "react";
import { TResetIniValues } from "../../form/initial-value/Reset.values";
import PasswordField from "../../component/form/password-field/Index";
import { useResetPasswordAdmin } from "../../hooks/reset-pass/mutation/useReset.mutation";
import { notifications } from "@mantine/notifications";
import { useGetVerifyToken } from "../../hooks/reset-pass/query/useVerifyResetToken.query";
import ErrorPage from "../error-page/Index";
import ThemeLoader from "../../component/loader/ThemeLoader";

const ResetPassword = () => {
  const navigate = useNavigate();
  const { classes } = useStyles();
  const { mutateAsync } = useResetPasswordAdmin();
  const { getInputProps, onSubmit } = useForm({
    initialValues: initialValue.ResetIniValues,
    validate: yupResolver(validations.reset),
    validateInputOnBlur: true,
    validateInputOnChange: true,
  });
  const { data, isLoading } = useGetVerifyToken();

  const token = useMemo(() => {
    if (!isLoading && data && data.status === "success") {
      return data.data;
    } else {
      return undefined;
    }
  }, [data, isLoading]);

  const handleReset = useCallback(
    async (values: TResetIniValues) => {
      const res = await mutateAsync(values);

      if (res.status === "success") {
        notifications.show({
          color: "blue",
          title: res.title,
          message: res.message,
        });
        navigate("/login");
      } else {
        notifications.show({
          color: "red",
          title: res.title,
          message: res.message,
        });
      }
    },
    [mutateAsync, navigate]
  );
  if (isLoading) {
    return <ThemeLoader loading={isLoading} />;
  }

  if (!token) {
    return (
      <ErrorPage
        errorCode={498}
        errorTitle="Invalid token or URL"
        errorMessage="Your password reset link is not valid, or already used."
      />
    );
  }

  return (
    <Box className={classes.main}>
      <Box>
        <Group>
          <img className={classes.logo} src={IMAGES.logo} alt="" />
        </Group>
      </Box>
      <Box className={classes.box}>
        <Paper withBorder shadow="xl" p={20} mt={30} radius="lg">
          <h1 className={classes.title}>Reset Password</h1>
          <p className={classes.text}>Enter your new password</p>
          <form onSubmit={onSubmit(handleReset)}>
            <PasswordField
              label="New Password"
              name="pass1"
              getInputProps={getInputProps}
            />
            <PasswordField
              label="Confirm Password"
              name="pass2"
              getInputProps={getInputProps}
            />
            <Group position="apart" className={classes.controls}>
              <Button
                type="submit"
                variant="gradient"
                fullWidth
                mt="xl"
                className={classes.btn}
                onClick={() => handleReset}
              >
                Reset Password
              </Button>
            </Group>
          </form>
        </Paper>
      </Box>
    </Box>
  );
};
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
    backgroundColor: "#ffffff",
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
}));
export default ResetPassword;

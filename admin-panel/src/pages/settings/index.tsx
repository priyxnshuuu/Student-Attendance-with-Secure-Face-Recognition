import React, { useEffect } from "react";
import InputField from "../../component/form/input-field/InputField";
import { useForm, yupResolver } from "@mantine/form";
import ThemeButton from "../../component/button/ThemeButton";
import { Box, createStyles } from "@mantine/core";
import { useUpdateSettings } from "../../hooks/settings/mutation/updateSettings.mutation";
import { TSettingsValues } from "../../form/initial-value/settings.values";
import { useGetSettings } from "../../hooks/settings/query/getSettings.query";
import { notifications } from "@mantine/notifications";
import { initialValue } from "../../form/initial-value";
import { validations } from "../../form/validation";

const Settings = () => {
  const { getInputProps, setValues, onSubmit } = useForm({
    initialValues: initialValue.settingsIniValues,
    validateInputOnBlur: true,
    validateInputOnChange: true,
    validate: yupResolver(validations.settings),
  });
  const { classes } = useStyles();
  const { mutateAsync: updateSettings } = useUpdateSettings();

  const { data: settingsData, isLoading: settingsLoading } = useGetSettings();

  useEffect(() => {
    if (!settingsLoading && settingsData) {
      setValues(settingsData.data);
    } else {
      setValues(initialValue.settingsIniValues);
    }
  }, [settingsData, setValues, settingsLoading]);

  const handleUpdate = async (values: TSettingsValues) => {
    try {
      const res = await updateSettings(values);
      if (res.status === "success") {
        notifications.show({
          color: "green",
          message: res.message,
        });
      } else {
        notifications.show({
          color: "red",
          message: res.data.message,
        });
      }
    } catch (error) {}
  };

  return (
    <Box>
      <form onSubmit={onSubmit(handleUpdate)}>
        <Box className={classes.mainBox}>
          <Box className={classes.input}>
            <InputField
              label="Check In Time"
              getInputProps={getInputProps}
              name="checkIn"
            ></InputField>
          </Box>
          <Box className={classes.input}>
            <InputField
              label="Check Out Time"
              getInputProps={getInputProps}
              name="checkOut"
            ></InputField>
          </Box>
        </Box>
        <Box className={classes.button}>
          <ThemeButton type="submit" title="Update" w={300}></ThemeButton>
        </Box>
      </form>
    </Box>
  );
};

const useStyles = createStyles((theme) => ({
  mainBox: {
    display: "flex",
    justifyContent: "space-around",
    width: "100%",
  },
  button: {
    paddingTop: "37px",
    justifyContent: "center",
    display: "flex",
  },
  input: {
    width: "40%",
  },
}));

export default Settings;

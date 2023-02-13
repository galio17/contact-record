import { TextFieldProps } from "@mui/material";

export type InputProps = Omit<TextFieldProps, "helperText"> & {
  name: string;
};

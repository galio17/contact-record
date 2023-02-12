import { TextField } from "@mui/material";
import { memo } from "react";
import { useFormContext } from "react-hook-form";
import { InputProps } from "./interface";

const Input = ({ name, ...inputProps }: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const helperText = errors[name]?.message as string | undefined;
  const error = {
    helperText,
    error: !!helperText,
  };

  return <TextField {...error} {...inputProps} {...register(name)} />;
};

export default memo(Input);

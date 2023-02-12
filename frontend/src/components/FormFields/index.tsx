import { yupResolver } from "@hookform/resolvers/yup";
import { FormProvider, useForm } from "react-hook-form";
import Input from "./Input";
import { FormProps } from "./interface";

const Form = ({ children, validator, onValid, onInvalid }: FormProps) => {
  const methods = useForm({
    resolver: validator ? yupResolver(validator) : undefined,
  });

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onValid, onInvalid)}>
        {children}
      </form>
    </FormProvider>
  );
};

export default Form;
export { Input };

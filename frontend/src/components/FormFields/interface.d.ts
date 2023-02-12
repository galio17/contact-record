export interface FormProps {
  children: ReactNode;
  validator?: ObjectSchema<any>;
  onValid: SubmitHandler<any>;
  onInvalid?: SubmitErrorHandler<any>;
}

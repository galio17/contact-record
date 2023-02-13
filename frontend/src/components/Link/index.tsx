import { Link as MuiLink } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { LinkProps } from "./interface";

const Link = ({ children, ...linkProps }: LinkProps) => {
  return (
    <MuiLink component={RouterLink} {...linkProps}>
      {children}
    </MuiLink>
  );
};

export default Link;

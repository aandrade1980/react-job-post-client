import React from "react";
import { Tooltip, IconButton } from "@material-ui/core"

const CustomButton = ({ children, component, onClick, title, to }) => {
  return (
    <Tooltip title={title}>
      <IconButton onClick={onClick} component={component} to={to}>
        {children}
      </IconButton>
    </Tooltip>
  );
};

export default CustomButton;

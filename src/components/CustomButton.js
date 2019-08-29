import React from "react";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";

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

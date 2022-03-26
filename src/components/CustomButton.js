import React from 'react';

/** MUI */
import { IconButton, Tooltip } from '@mui/material';

const CustomButton = ({ children, component, onClick, title, to }) => (
  <Tooltip title={title}>
    <IconButton onClick={onClick} component={component} to={to}>
      {children}
    </IconButton>
  </Tooltip>
);

export default CustomButton;

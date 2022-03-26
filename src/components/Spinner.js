import React from "react";

// MUI
import { CircularProgress } from '@mui/material';

const Spinner = ({ color = "secondary", size = 80, className }) => (
  <CircularProgress color={color} size={size} className={className} />
);

export default Spinner;

/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Button } from 'primereact/button';

const CustomButton = ({ label, severity, onClick, ...rest }) => {
  return (
    <Button label={label} severity={severity} onClick={onClick} {...rest} />
  )
}

export default CustomButton;
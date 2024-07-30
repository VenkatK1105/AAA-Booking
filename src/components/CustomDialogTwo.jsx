/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { Dialog } from "primereact/dialog";

const CustomDialogTwo = ({ children, visible, ...rest }) => {
  return (
    <Dialog
      header="Header"
      visible={visible}
      breakpoints={{ "960px": "75vw", "641px": "100vw" }}
      {...rest}
    >
      {children}
    </Dialog>
  );
};

export default CustomDialogTwo;

/* eslint-disable react/prop-types */
import React from "react";
import { Dialog } from "primereact/dialog";
import "./styles/PaymentAlertDialog.css"

const PaymentAlertDialog = ({ children, header, visible, onHide }) => {
  return (
    <Dialog className="custom-alert-dialog" visible={visible} onHide={onHide} header={header} style={{ width: "30vw" }} breakpoints={{ "960px": "75vw", "641px": "100vw" }} modal>
      <div className="bg-white px-4 pb-4 sm:p-3 sm:pb-4">
        <div className="mt-1 text-center sm:ml-4 sm:text-left">
          {children}
        </div>
      </div>
    </Dialog>
  );
};

export default PaymentAlertDialog;

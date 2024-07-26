import React from 'react';
import { Toast } from 'primereact/toast';
import { toastRef } from '../services/toastService';
 // Adjust the import path as needed

const CustomToast = () => {
  return <Toast ref={toastRef} />;
};

export default CustomToast;
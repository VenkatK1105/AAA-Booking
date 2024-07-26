import { createRef } from "react";
import { Toast } from "primereact/toast";

const toastRef = createRef();

const showToast = (severity, summary, detail, life = 3000) => {
  if (toastRef.current) {
    toastRef.current.show({ severity, summary, detail, life });
  }
};

export { toastRef, showToast };

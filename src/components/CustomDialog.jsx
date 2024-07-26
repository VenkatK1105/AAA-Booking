/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React, { Fragment } from "react";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  Transition,
} from "@headlessui/react";

const CustomDialog = ({ children, formData, ...rest }) => {
  const { isOpen, closeModal } = rest;
  const isFormValid = false;
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog static as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-[640px] transform overflow-hidden bg-white rounded-md text-left align-middle shadow-xl transition-all">
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default CustomDialog;

/* eslint-disable no-unused-vars */
import React, { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import { BookingFormProvider } from "./context/BookingFormContext";
import CustomSpinner from "./components/CustomSpinner";
const BookingForm = lazy(() => import("./frontend/BookingForm/BookingForm"));
const Unauthorized = lazy(() => import("./pages/Unauthorized"));
const Login = lazy(() => import("./pages/Login"));
const SignUp = lazy(() => import("./pages/SignUp"));

const routes = [
  {
    path: "login",
    element: (
      <Suspense fallback={<CustomSpinner />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "register",
    element: (
      <Suspense fallback={<CustomSpinner />}>
        <SignUp />
      </Suspense>
    ),
  },
  {
    path: "unauthorized",
    element: (
      <Suspense fallback={<CustomSpinner />}>
        <Unauthorized />
      </Suspense>
    ),
  },
  {
    path: "",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={<CustomSpinner />}>
            <BookingFormProvider>
              <BookingForm />
            </BookingFormProvider>
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];

export default routes;

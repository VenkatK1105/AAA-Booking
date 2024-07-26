/* eslint-disable no-unused-vars */
import { Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import BookingForm from "./frontend/BookingForm/BookingForm";
import Unauthorized from "./pages/Unauthorized";
import { BookingFormProvider } from "./context/BookingFormContext";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

const routes = [
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "register",
    element: <SignUp />,
  },
  {
    path: "unauthorized",
    element: <Unauthorized />,
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
          <BookingFormProvider>
            <BookingForm />
          </BookingFormProvider>
        )
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to="/" replace />,
  },
];

export default routes;

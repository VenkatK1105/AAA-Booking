/* eslint-disable react/prop-types */
import './styles/paypal.css';

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const PayPalButton = ({ layout, amount, onSuccess, onError, ...rest }) => {
  const paypalOptions = {
    "client-id": import.meta.env.VITE_APP_PAYPAL_CLIENT_ID,
    currency: "USD",
  };

  return (
    <PayPalScriptProvider options={paypalOptions}>
      <PayPalButtons
        style={{ layout: layout, height: 52 }}
        createOrder={(data, actions) => {
          return actions.order.create({
            purchase_units: [
              {
                amount: {
                  value: amount,
                },
              },
            ],
          });
        }}
        onApprove={(data, actions) => {
          return actions.order.capture().then(function (details) {
            onSuccess(details); // Handle successful payment
          });
        }}
        onError={(err) => {
          onError(err); // Handle error
        }}
        {...rest}
      />
    </PayPalScriptProvider>
  );
};

export default PayPalButton;

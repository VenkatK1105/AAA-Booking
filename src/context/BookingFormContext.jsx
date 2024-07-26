import { createContext, useContext, useState } from "react";

const BookingFormContext = createContext();

// eslint-disable-next-line react/prop-types
export const BookingFormProvider = ({ children }) => {
  const [visibleBreakDown, setVisibleBreakDown] = useState(false);
  const[user, setUser] = useState(null);

  const handleShowsBreakDown = () => {
    setVisibleBreakDown(true);
  };

  return (
    <BookingFormContext.Provider
      value={{
        visibleBreakDown,
        handleShowsBreakDown,
        user, 
        setUser
      }}
    >
      {children}
    </BookingFormContext.Provider>
  );
};

export const useBookingForm = () => useContext(BookingFormContext);

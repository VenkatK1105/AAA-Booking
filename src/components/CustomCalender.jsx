/* eslint-disable no-undef */
import { Calendar } from "react-multi-date-picker";
import "./styles/customCalander.css";
import useWindowSize from "../hooks/useWindowSize";

// eslint-disable-next-line react/prop-types
const CustomCalender = ({ numberOfMonths, ...rest }) => {
  const { width } = useWindowSize();
  const monthOfCol = width < 991 ? 1 : numberOfMonths || 1;
  const today = new Date();

  return (
    <Calendar
      numberOfMonths={monthOfCol}
      minDate={today}
      defaultValue={today}
      containerClassName="custom-container"
      containerStyle={{
        width: "100%",
      }}
      {...rest}
    />
  );
};

export default CustomCalender;

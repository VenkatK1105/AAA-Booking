/* eslint-disable no-undef */
import { Calendar } from "react-multi-date-picker";
import "./styles/customCalander.css"

// eslint-disable-next-line react/prop-types
const CustomCalender = ({numberOfMonths, ...rest}) => {
  const today = new Date();
  return <Calendar numberOfMonths={numberOfMonths} minDate={today} defaultValue={today} containerClassName="custom-container" containerStyle={{
    width: "100%"
  }} {...rest} />;
};

export default CustomCalender;

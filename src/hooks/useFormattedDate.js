import { useState, useEffect } from "react";
import { format } from "date-fns";

const useFormattedDate = (date, dateFormat = "EEEE, do MMMM yyyy") => {
  const [formattedDate, setFormattedDate] = useState("");

  useEffect(() => {
    if (date) {
      const newFormattedDate = format(new Date(date), dateFormat);
      setFormattedDate(newFormattedDate);
    }
  }, [date, dateFormat]);

  return formattedDate;
};

export default useFormattedDate;

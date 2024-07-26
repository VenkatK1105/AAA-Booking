import { useState } from "react";

const useCounterSelector = (initialValue = 1, min = 0) => {
  const [count, setCount] = useState(initialValue);
  const onClickPlus = () => {
    setCount(count + 1);
  };
  const onClickMinus = () => {
    setCount(Math.max(count - 1, min));
  };
  return { onClickPlus, onClickMinus, count };
};

export default useCounterSelector;

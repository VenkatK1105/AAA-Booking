import useCounterSelector from "../hooks/useCounterSelector";
import { classNames } from "primereact/utils";

// eslint-disable-next-line react/prop-types
const Counter = ({ label, initialValue, onChange, min }) => {
  const { count, onClickPlus, onClickMinus } = useCounterSelector(initialValue);

  const handlePlus = () => {
    onClickPlus();
    onChange(count + 1);
  };

  const handleMinus = () => {
    if (count > min) {
      onClickMinus();
      onChange(count - 1);
    }
  };

  return (
    <div className="flex counter">
      <button
        type="button"
        onClick={handleMinus}
        disabled={count <= 0}
        className={classNames(
          "h-7 w-7 flex items-center justify-center border rounded-full p-1 bg-white text-navy-800 border-solid border-[#A2B9CF] text-[10px] hover:bg-[#F4F7FF] hover:text-[#024FA3] cursor-pointer ",
          {
            "opacity-[0.3]": count == 0,
          }
        )}
      >
        <i className="pi pi-minus"></i>
      </button>
      {/* <span>
        {count >= 0 && count} {label && label}
      </span> */}
      <button
        type="button"
        onClick={handlePlus}
        disabled={count >= 10}
        className="h-7 w-7 flex items-center justify-center border rounded-full p-1 bg-white text-navy-800 border-solid border-[#A2B9CF] text-[10px] hover:bg-[#F4F7FF] hover:text-[
    #024FA3] cursor-pointer"
      >
        <i className="pi pi-plus"></i>
      </button>
    </div>
  );
};

export default Counter;

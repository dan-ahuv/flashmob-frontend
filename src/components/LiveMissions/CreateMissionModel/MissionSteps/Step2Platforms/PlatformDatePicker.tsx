import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  selected: Date | null;
  onChange: (date: Date | null) => void;
  minDate?: Date;
  maxDate?: Date;
  minTime?: Date;
  maxTime?: Date;
  placeholder?: string;
  disabled?: boolean;
}

const PlatformDatePicker: React.FC<Props> = ({
  selected,
  onChange,
  minDate,
  maxDate,
  minTime,
  maxTime,
  placeholder,
  disabled = false,
}) => {
  return (
    <div className="w-full">
      <DatePicker
        selected={selected}
        onChange={onChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="yyyy-MM-dd HH:mm"
        minDate={minDate}
        maxDate={maxDate}
        minTime={minTime}
        maxTime={maxTime}
        disabled={disabled}
        className={`p-2 rounded w-full text-sm ${
          disabled
            ? "bg-[var(--background-disabled)] text-gray-400 cursor-not-allowed"
            : "bg-[var(--background)]"
        }`}
        placeholderText={placeholder}
        popperPlacement="bottom-start"
      />
    </div>
  );
};

export default PlatformDatePicker;

import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

interface Props {
  selected: Date | null; // must be Date or null
  onChange: (date: Date | null) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
  openToDate?: Date;
  minTime?: Date;
  maxTime?: Date;
}

const GenericMissionDatePicker: React.FC<Props> = ({
  selected,
  onChange,
  placeholder,
  className,
  disabled,
  minDate,
  maxDate,
  openToDate,
  minTime,
  maxTime,
}) => {
  // Only pass minTime / maxTime if they exist
  const safeMinTime = minTime ?? undefined;
  const safeMaxTime = maxTime ?? undefined;

  return (
    <div className="w-full">
      <DatePicker
        selected={selected ?? null} 
        onChange={onChange}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={15}
        dateFormat="yyyy-MM-dd HH:mm"
        placeholderText={placeholder}
        className={className}
        disabled={disabled}
        minDate={minDate}
        maxDate={maxDate}
        openToDate={openToDate}
        minTime={safeMinTime}
        maxTime={safeMaxTime}
      />
    </div>
  );
};

export default GenericMissionDatePicker;

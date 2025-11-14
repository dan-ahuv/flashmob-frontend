import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { parseISO, setHours, setMinutes } from "date-fns";
import type { Technician, Matzat, Mamash } from "../../../../../types/mission";

interface MemberCardProps<T extends Technician | Matzat | Mamash> {
  type: "technicians" | "matzats" | "mamashs";
  member: T;
  index: number;
  missionStart?: Date;
  missionEnd?: Date;
  updateMember: <K extends Technician | Matzat | Mamash>(
    type: "technicians" | "matzats" | "mamashs",
    index: number,
    field: keyof K,
    value: any
  ) => void;
  deleteMember: (
    type: "technicians" | "matzats" | "mamashs",
    index: number
  ) => void;
}

function MemberCard<T extends Technician | Matzat | Mamash>({
  type,
  member,
  index,
  missionStart,
  missionEnd,
  updateMember,
  deleteMember,
}: MemberCardProps<T>) {
  const startDate = member.assignedTime.start
    ? parseISO(member.assignedTime.start)
    : null;
  const endDate = member.assignedTime.end
    ? parseISO(member.assignedTime.end)
    : null;

  const getMinEndTime = () => {
    if (!startDate) return undefined;
    const minEnd = new Date(startDate);
    minEnd.setMinutes(minEnd.getMinutes() + 1); // at least 1 minute after start
    return minEnd;
  };

  const defaultMinTime = missionStart
    ? missionStart
    : setHours(setMinutes(new Date(), 0), 0);
  const defaultMaxTime = missionEnd
    ? missionEnd
    : setHours(setMinutes(new Date(), 59), 23);

  return (
    <div className="relative rounded-md p-2 bg-[var(--background)] flex flex-col gap-2 border-2 border-[var(--accent)]">
      {/* Delete button */}
      <button
        onClick={() => deleteMember(type, index)}
        className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center rounded-full text-[var(--text)] hover:text-red-500 transition"
        title="Delete"
      >
        ×
      </button>

      {/* Name field */}
      <div className="flex flex-col">
        <label
          className="text-sm text-[var(--text)] mb-1"
          htmlFor={`${type}-name-${index}`}
        >
          Name
        </label>
        <input
          id={`${type}-name-${index}`}
          aria-label={`${type.slice(0, -1)} name`}
          type="text"
          placeholder="Name"
          value={member.name}
          onChange={(e) => updateMember(type, index, "name", e.target.value)}
          className="w-40 p-1 rounded-md text-sm"
        />
      </div>

      {/* Time selectors */}
      <div className="flex flex-col gap-1">
        {/* Start Time */}
        <label className="text-sm text-[var(--text)]">
          Start Time
          <DatePicker
            selected={startDate}
            onChange={(date: Date | null) =>
              updateMember(type, index, "assignedTime", {
                ...member.assignedTime,
                start: date ? date.toISOString() : "",
              })
            }
            showTimeSelect
            placeholderText="Select start time"
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="yyyy-MM-dd HH:mm"
            minDate={missionStart}
            maxDate={missionEnd}
            minTime={defaultMinTime}
            maxTime={defaultMaxTime}
            portalId="datepicker-portal"
            popperPlacement="top-start"
            className="w-full p-1 rounded-md text-sm"
          />
        </label>

        {/* End Time */}
        <label className="text-sm text-[var(--text)]">
          End Time
          <DatePicker
            selected={endDate}
            onChange={(date: Date | null) =>
              updateMember(type, index, "assignedTime", {
                ...member.assignedTime,
                end: date ? date.toISOString() : "",
              })
            }
            showTimeSelect
            placeholderText="Select end time"
            timeFormat="HH:mm"
            timeIntervals={15}
            dateFormat="yyyy-MM-dd HH:mm"
            minDate={missionStart}
            maxDate={missionEnd}
            minTime={startDate ? getMinEndTime() : defaultMinTime}
            maxTime={defaultMaxTime}
            disabled={!startDate} // disable until start selected
            portalId="datepicker-portal"
            popperPlacement="top-start"
            className={`w-full p-1 rounded-md text-sm ${
              !startDate
                ? "bg-[var(--background-disabled)] text-gray-400 cursor-not-allowed"
                : "bg-[var(--background)]"
            }`}
          />
        </label>
      </div>
    </div>
  );
}

export default MemberCard;

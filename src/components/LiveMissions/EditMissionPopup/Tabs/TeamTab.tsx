import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { Mission, TimeRange } from "../../../../types/mission";

interface Props {
  mission: Mission;
  setMission: (updated: Mission) => void;
}

const TeamTab: React.FC<Props> = ({ mission, setMission }) => {
  const { technicians = [], matzats = [], mamashs = [] } = mission;

  // Mission start and end from mission.time
  const missionStart = mission.time?.start ? new Date(mission.time.start) : null;
  const missionEnd = mission.time?.end ? new Date(mission.time.end) : null;

  const addMember = (type: "tech" | "mat" | "mam") => {
    const newMember = {
      name: "",
      assignedTime: { start: "", end: "" } as TimeRange,
    };
    if (type === "tech")
      setMission({ ...mission, technicians: [...technicians, newMember] });
    if (type === "mat")
      setMission({ ...mission, matzats: [...matzats, newMember] });
    if (type === "mam")
      setMission({ ...mission, mamashs: [...mamashs, newMember] });
  };

  const updateMember = (
    type: "tech" | "mat" | "mam",
    index: number,
    key: "name" | "assignedTime",
    value: any
  ) => {
    const updateArray = (arr: any[]) => {
      const newArr = [...arr];
      newArr[index][key] = value;
      return newArr;
    };

    if (type === "tech")
      setMission({ ...mission, technicians: updateArray(technicians) });
    if (type === "mat")
      setMission({ ...mission, matzats: updateArray(matzats) });
    if (type === "mam")
      setMission({ ...mission, mamashs: updateArray(mamashs) });
  };

  const removeMember = (type: "tech" | "mat" | "mam", index: number) => {
    const remove = (arr: any[]) => arr.filter((_, i) => i !== index);

    if (type === "tech")
      setMission({ ...mission, technicians: remove(technicians) });
    if (type === "mat")
      setMission({ ...mission, matzats: remove(matzats) });
    if (type === "mam")
      setMission({ ...mission, mamashs: remove(mamashs) });
  };

  const sections = [
    { title: "Technicians", data: technicians, add: () => addMember("tech"), type: "tech" },
    { title: "Matzats", data: matzats, add: () => addMember("mat"), type: "mat" },
    { title: "Mamashs", data: mamashs, add: () => addMember("mam"), type: "mam" },
  ];

  return (
    <div className="flex flex-col gap-4 h-full p-4">
      <div className="flex gap-4 flex-1">
        {sections.map(({ title, data, add, type }) => (
          <div
            key={title}
            className="flex-1 flex flex-col bg-[var(--secondary)] rounded p-3 gap-2 overflow-y-auto"
          >
          <h4 className="font-bold mb-2 flex justify-between items-center text-[var(--faded-text)]">
            {title}
            <button
              className="text-gray-500 hover:text-[var(--accent)] font-bold text-lg"
              onClick={add}
              title={`Add ${title}`}
            >
              +
            </button>
          </h4>


            {data.map((member: any, i: number) => {
              const startDate = member.assignedTime.start
                ? new Date(member.assignedTime.start)
                : null;

              const endDate = member.assignedTime.end
                ? new Date(member.assignedTime.end)
                : null;

              return (
                <div
                  key={i}
                  className="flex flex-col gap-2 bg-[var(--background)] border-2 border-[var(--accent)] rounded p-2"
                >

                {/* Name field with Delete button */}
                <div className="flex flex-col w-full">
                  <div className="flex justify-between items-center mb-1">
                    <label
                      className="text-xs text-[var(--text)]"
                      htmlFor={`${type}-name-${i}`}
                    >
                      Name
                    </label>
                    <button
                      className="text-gray-400 hover:text-red-500 font-bold text-sm"
                      onClick={() => removeMember(type as any, i)}
                      title="Delete Member"
                    >
                      ✕
                    </button>
                  </div>
                  <input
                    id={`${type}-name-${i}`}
                    type="text"
                    value={member.name}
                    placeholder="Name"
                    className="w-full px-1 py-1 text-sm rounded"
                    onChange={(e) => updateMember(type as any, i, "name", e.target.value)}
                  />
                </div>



                  {/* START TIME — OWN LINE */}
                  <div className="flex flex-col w-full">
                    <label className="text-xs mb-1">Start Time</label>
                    <DatePicker
                      selected={startDate || missionStart}
                      onChange={(date: Date | null) =>
                        updateMember(type as any, i, "assignedTime", {
                          ...member.assignedTime,
                          start: date ? date.toISOString() : "",
                          end: "",
                        })
                      }
                      showTimeSelect
                      timeIntervals={15}
                      dateFormat="yyyy-MM-dd HH:mm"
                      placeholderText="Select start time"
                      minDate={missionStart || undefined}
                      maxDate={missionEnd || undefined}
                      minTime={missionStart || undefined}
                      maxTime={missionEnd || undefined}
                      popperPlacement="bottom-start"    // open downward
                      className="w-full p-1 rounded text-sm"
                    />
                  </div>

                  {/* END TIME — OWN LINE */}
                  <div className="flex flex-col w-full">
                    <label className="text-xs mb-1">End Time</label>
                    <DatePicker
                      selected={endDate}
                      onChange={(date: Date | null) =>
                        updateMember(type as any, i, "assignedTime", {
                          ...member.assignedTime,
                          end: date ? date.toISOString() : "",
                        })
                      }
                      showTimeSelect
                      timeIntervals={15}
                      dateFormat="yyyy-MM-dd HH:mm"
                      placeholderText="Select end time"
                      disabled={!startDate}
                      minDate={startDate || missionStart || undefined}
                      maxDate={missionEnd || undefined}
                      minTime={startDate || missionStart || undefined}
                      maxTime={missionEnd || undefined}
                      popperPlacement="bottom-start"
                      className={`w-full p-1 rounded text-sm ${
                        !startDate ? "cursor-not-allowed" : ""
                      }`}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamTab;

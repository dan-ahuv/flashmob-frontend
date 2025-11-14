import React from "react";
import type { Mission, TimeRange } from "../../../../types/mission";

interface Props {
  mission: Mission;
  setMission: (updated: Mission) => void;
}

const TeamTab: React.FC<Props> = ({ mission, setMission }) => {
  const { technicians = [], matzats = [], mamashs = [] } = mission;

  const addMember = (type: "tech" | "mat" | "mam") => {
    const newMember = { name: "", assignedTime: { start: "", end: "" } as TimeRange };
    if (type === "tech") setMission({ ...mission, technicians: [...technicians, newMember] });
    if (type === "mat") setMission({ ...mission, matzats: [...matzats, newMember] });
    if (type === "mam") setMission({ ...mission, mamashs: [...mamashs, newMember] });
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

    if (type === "tech") setMission({ ...mission, technicians: updateArray(technicians) });
    if (type === "mat") setMission({ ...mission, matzats: updateArray(matzats) });
    if (type === "mam") setMission({ ...mission, mamashs: updateArray(mamashs) });
  };

  const removeMember = (type: "tech" | "mat" | "mam", index: number) => {
    const removeFromArray = (arr: any[]) => arr.filter((_, i) => i !== index);
    if (type === "tech") setMission({ ...mission, technicians: removeFromArray(technicians) });
    if (type === "mat") setMission({ ...mission, matzats: removeFromArray(matzats) });
    if (type === "mam") setMission({ ...mission, mamashs: removeFromArray(mamashs) });
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
          <div key={title} className="flex-1 flex flex-col bg-[var(--secondary)] rounded p-3 gap-2 overflow-y-auto">
            <h4 className="font-bold mb-2">{title}</h4>

            <div className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 font-bold text-[var(--faded-text)] items-center pb-1 mb-2 px-1">
              <div>Name</div>
              <div>Start</div>
              <div>End</div>
              <button
                className="text-gray-500 hover:text-[var(--accent)] font-bold text-lg"
                onClick={add}
                title={`Add ${title}`}
              >
                +
              </button>
            </div>

            {data.map((member: any, i: number) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2 items-center bg-[var(--background)] border-2 border-[var(--accent)] rounded p-2 min-h-[50px]"
              >
                <input
                  type="text"
                  value={member.name}
                  placeholder="Name"
                  className="w-full px-2 py-1"
                  onChange={(e) => updateMember(type as any, i, "name", e.target.value)}
                />
                <input
                  type="datetime-local"
                  value={member.assignedTime.start}
                  onChange={(e) =>
                    updateMember(type as any, i, "assignedTime", {
                      ...member.assignedTime,
                      start: e.target.value,
                    })
                  }
                  className="w-full px-2 py-1"
                />
                <input
                  type="datetime-local"
                  value={member.assignedTime.end}
                  onChange={(e) =>
                    updateMember(type as any, i, "assignedTime", {
                      ...member.assignedTime,
                      end: e.target.value,
                    })
                  }
                  className="w-full px-2 py-1"
                />
                <button
                  className="text-gray-400 hover:text-red-500 font-bold text-lg px-2"
                  onClick={() => removeMember(type as any, i)}
                  title="Delete Member"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamTab;

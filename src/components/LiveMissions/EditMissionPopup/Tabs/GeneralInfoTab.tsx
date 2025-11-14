import React from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import type { Mission } from "../../../../types/mission";
import { STATIONS } from "../../../../types/station";
import { ROUTES } from "../../../../types/route";
import { SECTIONS, type Section } from "../../../../types/section";
import type { Station } from "../../../../types/station";
import type { Route } from "../../../../types/route";
import SpaceFiller from "../../../../assets/SectionPics/Red_flag.svg.png";

const sectionImages: Record<Section, string> = {
  "110": SpaceFiller,
  "130": SpaceFiller,
  "140": SpaceFiller,
  "150": SpaceFiller,
  "160": SpaceFiller,
  "161": SpaceFiller,
  "170": SpaceFiller,
  "180": SpaceFiller,
  "190": SpaceFiller,
};

interface Props {
  mission: Mission;
  setMission: (updated: Mission) => void;
}

const GeneralInfoTab: React.FC<Props> = ({ mission, setMission }) => {
  const isPlanned = mission.status === "planned-missions";

  const startDate = mission.time.start ? new Date(mission.time.start) : null;
  const endDate = mission.time.end ? new Date(mission.time.end) : null;
  const now = new Date();

  return (
    <div className="flex flex-col gap-4 h-full p-4">
      <div className="flex-1 rounded p-3 flex flex-col gap-3 overflow-y-auto">

        {/* Mission Name */}
        <div className="flex flex-col">
          <label className="text-sm text-[var(--text)]">
            Mission name
          </label>
          <input
            type="text"
            value={mission.name}
            placeholder="Mission Name"
            className="px-2 py-1 h-12 w-full border-2 border-[var(--accent)] rounded shadow focus:ring-2 focus:[var(--accent)] bg-[var(--secondary)]"
            onChange={(e) => setMission({ ...mission, name: e.target.value })}
          />
        </div>

        {/* Station, Backup Station, Route - side by side */}
        <div className="flex gap-3">
          {/* Station */}
          <div className="flex-1 flex flex-col">
            <label className="text-sm text-[var(--text)]">
              Station
            </label>
            <select
              value={mission.station || ""}
              onChange={(e) =>
                setMission({
                  ...mission,
                  station: e.target.value
                    ? (e.target.value as Station)
                    : undefined,
                })
              }
              className="w-full px-2 py-1 h-12 appearance-none focus:outline-none border-2 border-[var(--accent)] rounded shadow focus:ring-2 focus:[var(--accent)] bg-[var(--secondary)]"
            >
              {isPlanned && <option value="">None</option>}
              {STATIONS.map((s) => (
                <option
                  key={s}
                  value={s}
                  disabled={mission.backupStation === s}
                >
                  Station {s}
                </option>
              ))}
            </select>
          </div>

          {/* Backup Station */}
          <div className="flex-1 flex flex-col">
            <label className="text-sm text-[var(--text)]">
              Backup Station
            </label>
            <select
              value={mission.backupStation || ""}
              onChange={(e) =>
                setMission({
                  ...mission,
                  backupStation: e.target.value
                    ? (e.target.value as Station)
                    : undefined,
                })
              }
              className="w-full px-2 py-1 h-12 appearance-none focus:outline-none border-2 border-[var(--accent)] rounded shadow focus:ring-2 focus:[var(--accent)] bg-[var(--secondary)]"
            >
              {isPlanned && <option value="">None</option>}
              {STATIONS.map((s) => (
                <option
                  key={s}
                  value={s}
                  disabled={mission.station === s}
                >
                  Station {s}
                </option>
              ))}
            </select>
          </div>

          {/* Route */}
          <div className="flex-1 flex flex-col">
            <label className="text-sm text-[var(--text)]">
              Route
            </label>
            <select
              value={mission.route || ""}
              onChange={(e) =>
                setMission({
                  ...mission,
                  route: e.target.value
                    ? (e.target.value as Route)
                    : ("" as Route),
                })
              }
              className="w-full px-2 py-1 h-12 appearance-none focus:outline-none border-2 border-[var(--accent)] rounded shadow focus:ring-2 focus:[var(--accent)] bg-[var(--secondary)]"
            >
              {isPlanned && <option value="">None</option>}
              {ROUTES.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Section Carousel */}
        <div className="flex flex-col">
          <label className="text-sm text-[var(--text)]">
            Section
          </label>
          <div className="flex gap-4 overflow-x-auto py-3 scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-200 px-2">
            {SECTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setMission({ ...mission, section: s })}
                className={`flex flex-col items-center border-2 rounded-lg border-[var(--accent)] overflow-hidden min-w-[150px] transition transform hover:scale-105 ${
                  mission.section === s ? "ring-4 ring-[var(--accent)]" : ""
                }`}
              >
                <img
                  src={sectionImages[s]}
                  alt={s}
                  className="w-40 h-24 object-cover"
                />
                <div className="text-center text-sm font-semibold mt-1">{s}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Time Range */}
        <div className="flex flex-col">
          <label className="text-sm text-[var(--text)]">Mission Time</label>
          <div className="flex gap-2">
            {/* Start Time */}
            <DatePicker
              selected={startDate}
              onChange={(date: Date | null) => {
                if (!date) return;
                setMission({
                  ...mission,
                  time: { ...mission.time, start: date.toISOString() },
                })
              }}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="yyyy-MM-dd HH:mm"
              minDate={now}
              className="flex-1 px-2 py-1 w-full h-12 border-2 border-[var(--accent)] rounded shadow focus:ring-2 focus:[var(--accent)] bg-[var(--secondary)]"
              placeholderText="Select start time"
            />

            {/* End Time */}
            <DatePicker
              selected={endDate}
              onChange={(date: Date | null) => {
                if (!date) return;
                setMission({
                  ...mission,
                  time: { ...mission.time, end: date.toISOString() },
                })
              }}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              dateFormat="yyyy-MM-dd HH:mm"
              minDate={startDate || now}
              minTime={startDate || now}
              disabled={!startDate}
              className="flex-1 px-2 py-1 w-full h-12 border-2 border-[var(--accent)] rounded shadow focus:ring-2 focus:[var(--accent)] bg-[var(--secondary)]"
              placeholderText="Select end time"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralInfoTab;

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

  const startTime = mission.time.start ? new Date(mission.time.start) : null;
  const endTime = mission.time.end ? new Date(mission.time.end) : null;

  const now = new Date();

  const startOfToday = new Date();
  startOfToday.setHours(0, 0, 0, 0);

  const endOfToday = new Date();
  endOfToday.setHours(23, 59, 0, 0);

  // --- NEW HELPERS ---
  const getMinTimeForStart = (date: Date) => {
    const today = new Date();
    if (date.toDateString() === today.toDateString()) {
      return today;
    } else {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
    }
  };

  const getMinTimeForEnd = (date: Date, start: Date) => {
    if (date.toDateString() === start.toDateString()) {
      return start;
    } else {
      return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0, 0);
    }
  };


  return (
    <div className="flex flex-col gap-4 h-full p-4">
      <div className="flex-1 rounded p-3 flex flex-col gap-3 overflow-y-auto">
        {/* Mission Name */}
        <div className="flex flex-col">
          <label className="text-sm text-[var(--text)]">Mission name</label>
          <input
            type="text"
            value={mission.name}
            placeholder="Mission Name"
            className="px-2 py-1 h-12 w-100 border-2 border-[var(--accent)] rounded shadow focus:ring-2 bg-[var(--secondary)]"
            onChange={(e) => setMission({ ...mission, name: e.target.value })}
          />
        </div>

        {/* Station + Backup Station + Route */}
        <div className="flex gap-3">
          {/* Station */}
          <div className="flex-1 flex flex-col">
            <label className="text-sm text-[var(--text)]">Station</label>
            <select
              value={mission.station || ""}
              onChange={(e) =>
                setMission({
                  ...mission,
                  station: e.target.value ? (e.target.value as Station) : undefined,
                })
              }
              className="w-full px-2 py-1 h-12 border-2 border-[var(--accent)] rounded shadow bg-[var(--secondary)]"
            >
              {isPlanned && <option value="">None</option>}
              {STATIONS.map((s) => (
                <option key={s} value={s} disabled={mission.backupStation === s}>
                  Station {s}
                </option>
              ))}
            </select>
          </div>

          {/* Backup Station */}
          <div className="flex-1 flex flex-col">
            <label className="text-sm text-[var(--text)]">Backup Station</label>
            <select
              value={mission.backupStation || ""}
              onChange={(e) =>
                setMission({
                  ...mission,
                  backupStation: e.target.value ? (e.target.value as Station) : undefined,
                })
              }
              className="w-full px-2 py-1 h-12 border-2 border-[var(--accent)] rounded shadow bg-[var(--secondary)]"
            >
              {isPlanned && <option value="">None</option>}
              {STATIONS.map((s) => (
                <option key={s} value={s} disabled={mission.station === s}>
                  Station {s}
                </option>
              ))}
            </select>
          </div>

          {/* Route */}
          <div className="flex-1 flex flex-col">
            <label className="text-sm text-[var(--text)]">Route</label>
            <select
              value={mission.route || ""}
              onChange={(e) =>
                setMission({
                  ...mission,
                  route: e.target.value ? (e.target.value as Route) : ("" as Route),
                })
              }
              className="w-full px-2 py-1 h-12 border-2 border-[var(--accent)] rounded shadow bg-[var(--secondary)]"
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
          <label className="text-sm text-[var(--text)]">Section</label>
          <div className="flex gap-4 overflow-x-auto py-3 px-2">
            {SECTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setMission({ ...mission, section: s })}
                className={`flex flex-col items-center border-2 rounded-lg border-[var(--accent)] overflow-hidden min-w-[150px] transition hover:scale-105 ${
                  mission.section === s ? "ring-4 ring-[var(--accent)]" : ""
                }`}
              >
                <img src={sectionImages[s]} alt={s} className="w-40 h-24 object-cover" />
                <div className="text-center text-sm font-semibold mt-1">{s}</div>
              </button>
            ))}
          </div>
        </div>

        {/* TIME RANGE */}
        <div className="flex flex-col">
          <label className="text-sm text-[var(--text)]">Mission Time</label>

          <div className="flex gap-3 flex-wrap">
            {/* Start Time */}
            <div className="flex flex-col gap-1">
              <DatePicker
                selected={startTime || now}
                onChange={(date: Date | null) => {
                  if (!date) return;
                  setMission({
                    ...mission,
                    time: {
                      start: date.toISOString(),
                      end:
                        endTime && endTime > date ? endTime.toISOString() : "",
                    },
                  });
                }}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="yyyy-MM-dd HH:mm"
                minDate={now}
                minTime={getMinTimeForStart(startTime || now)}
                maxTime={endOfToday}
                className="p-3 border-2 border-[var(--accent)] rounded shadow w-64 bg-[var(--secondary)]"
                placeholderText="Select start time"
              />
            </div>

            {/* End Time */}
            <div className="flex flex-col gap-1">
              <DatePicker
                selected={endTime || startTime || now}
                onChange={(date: Date | null) => {
                  if (!date) return;
                  setMission({
                    ...mission,
                    time: {
                      start: mission.time.start || "",
                      end: date.toISOString(),
                    },
                  });
                }}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="yyyy-MM-dd HH:mm"
                minDate={startTime || now}
                minTime={startTime ? getMinTimeForEnd(endTime || startTime || now, startTime) : now}
                maxTime={endOfToday}
                disabled={!startTime}
                className="p-3 border-2 border-[var(--accent)] rounded shadow w-64 bg-[var(--secondary)]"
                placeholderText="Select end time"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeneralInfoTab;

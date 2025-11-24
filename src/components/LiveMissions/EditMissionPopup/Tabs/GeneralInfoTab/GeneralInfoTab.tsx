import React from "react";
import type { Mission } from "../../../../../types/mission";
import MissionNameInput from "./MissionNameInput";
import StationSelector from "./StationSelector";
import RouteSelector from "./RouteSelector";
import SectionCarousel from "./SectionCarousel";
import MissionTimePicker from "./MissionTimePicker";
import BackupStationSelector from "./BackupStationSelector";

interface Props {
  mission: Mission;
  setMission: (updated: Mission) => void;
}

const GeneralInfoTab: React.FC<Props> = ({ mission, setMission }) => {
  return (
    <div className="flex flex-col gap-4 h-full p-4">
      <div className="flex-1 rounded p-3 flex flex-col gap-4 overflow-y-auto">

        <MissionNameInput
          name={mission.name}
          setMission={setMission}
          mission={mission}
        />

        <div className="flex gap-3 w-full">
          <div className="flex-1">
            <StationSelector mission={mission} setMission={setMission} />
          </div>
          <div className="flex-1">
            <BackupStationSelector mission={mission} setMission={setMission} />
          </div>
          <div className="flex-1">
            <RouteSelector mission={mission} setMission={setMission} />
          </div>
        </div>



        <SectionCarousel
          selected={mission.section}
          setMission={setMission}
          mission={mission}
        />

        <MissionTimePicker mission={mission} setMission={setMission} />

      </div>
    </div>
  );
};

export default GeneralInfoTab;

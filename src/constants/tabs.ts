// src/constants/tabs.ts
import LiveMissionsIcon from "../assets/TabsIcons/live-missions.png";
import RikudReportIcon from "../assets/TabsIcons/rikud-report.png";
import CalendarIcon from "../assets/TabsIcons/calendar.png";
import AIAgentIcon from "../assets/TabsIcons/ai-agent.png";
import StatisticsIcon from "../assets/TabsIcons/statistics.png";
import JugglerIcon from "../assets/TabsIcons/juggler.png";
import AutoHoterIcon from "../assets/TabsIcons/auto-hoter.png";
import MissionPlayerIcon from "../assets/TabsIcons/mission-player.png";
import AutoHoter from "../pages/AutoHoter/AutoHoter";
import LiveMissions from "../pages/LiveMissions/LiveMissions";
import Calendar from "../pages/Calendar/Calendar";
import RikudReport from "../pages/RikudReport/RikudReport";
import AiAgent from "../pages/AiAgent/AiAgent";
import Statistics from "../pages/Statistics/Statistics";
import Juggler from "../pages/Juggler/Juggler";
import MissionPlayer from "../pages/MissionPlayer/MissionPlayer";

export type Tab = {
  name: string;
  icon: string;
  route: string;
  component: React.FC;
};

export const tabs: Tab[] = [
  {
    name: "Live Missions",
    icon: LiveMissionsIcon,
    route: "/live-missions",
    component: LiveMissions,
  },
  {
    name: "Rikud Report",
    icon: RikudReportIcon,
    route: "/rikud-report",
    component: RikudReport,
  },
  {
    name: "Calendar",
    icon: CalendarIcon,
    route: "/calendar",
    component: Calendar,
  },
  {
    name: "AI Agent",
    icon: AIAgentIcon,
    route: "/ai-agent",
    component: AiAgent,
  },
  {
    name: "Statistics",
    icon: StatisticsIcon,
    route: "/statistics",
    component: Statistics,
  },
  {
    name: "Juggler",
    icon: JugglerIcon,
    route: "/juggler",
    component: Juggler,
  },
  {
    name: "Auto Hoter",
    icon: AutoHoterIcon,
    route: "/auto-hoter",
    component: AutoHoter,
  },
  {
    name: "Mission Player",
    icon: MissionPlayerIcon,
    route: "/mission-player",
    component: MissionPlayer,
  },
];


import { Routes, Route, Navigate } from "react-router-dom";
import { tabs } from "../../constants/tabs";

const AppRouter: React.FC = () => {
  const DefaultComponent = tabs.find(tab => tab.route === "/live-missions")?.component;

  return (
    <Routes>
      {tabs.map((tab) => {
        const Component = tab.component;
        return <Route key={tab.route} path={tab.route} element={<Component />} />;
      })}

      {/* Redirect root to /live-missions */}
      <Route path="/" element={<Navigate to="/live-missions" replace />} />

      {/* Wildcard fallback */}
      {DefaultComponent && <Route path="*" element={<DefaultComponent />} />}
    </Routes>
  );
};

export default AppRouter;

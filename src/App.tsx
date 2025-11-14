import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import AppRouter from "./components/Router/Router";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <AppRouter />
      </Layout>
    </Router>
  );
};

export default App;

// App.js
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import ExclusionDataEntry from "./components/ExclusionDataEntry";
import GiftDistribution from "./components/GiftDistribution";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/exclusion" element={<ExclusionDataEntry />} />
          <Route path="/gift" element={<GiftDistribution />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;

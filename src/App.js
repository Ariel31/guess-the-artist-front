import logo from "./logo.svg";
import "./App.css";
import GameLayout from "./Layout/GameLayout";
import { Route, Routes } from "react-router-dom";
import ScoreBoard from "./Layout/ScoreBoard";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<GameLayout />} path="/" />
        <Route element={<ScoreBoard />} path="score" />
      </Routes>
    </div>
  );
}

export default App;

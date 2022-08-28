import { Repo } from "@pages/Repo";
import { Repos } from "@pages/Repos";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Repos />} />
        <Route path="/repo/:owner/:name" element={<Repo />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

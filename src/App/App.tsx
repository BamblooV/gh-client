import { ROUTES } from "@config/routes";
import Repo from "@pages/Repo";
import Repos from "@pages/Repos";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.MAIN} element={<Repos />} />
        <Route path={ROUTES.REPO} element={<Repo />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

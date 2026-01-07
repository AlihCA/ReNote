import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";
import Home from "./pages/Home";
import Explore from "./pages/Explore";
import ResourceDetail from "./pages/ResourceDetail";
import Upload from "./pages/Upload";
import Collections from "./pages/Collections";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/resource/:id" element={<ResourceDetail />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/collections" element={<Collections />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
      </Route>
    </Routes>
  );
}

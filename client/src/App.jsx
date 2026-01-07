import { Routes, Route } from "react-router-dom";
import AppLayout from "./components/AppLayout";

import Home from "./pages/Home";
import Explore from "./pages/Explore";
import ResourceDetail from "./pages/ResourceDetail";
import Upload from "./pages/Upload";
import Collections from "./pages/Collections";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";

import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import ProtectedLayout from "./components/ProtectedLayout";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/resource/:id" element={<ResourceDetail />} />
        <Route path="/about" element={<About />} />

        {/* Auth */}
        <Route path="/sign-in/*" element={<SignInPage />} />
        <Route path="/sign-up/*" element={<SignUpPage />} />

        {/* Protected */}
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/collections" element={<Collections />} />
        </Route>
      </Route>
    </Routes>
  );
}

import { Link } from "react-router-dom";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-14 border-t border-border/70 bg-bg0/40">
      <div className="mx-auto max-w-6xl px-4 py-8 flex flex-col md:flex-row gap-6 md:items-center md:justify-between">
        {/* Left: Brand */}
        <div>
          <div className="text-lg font-extrabold bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
            ReNote
          </div>
          <p className="text-xs text-mutetext mt-2 max-w-sm">
            Explore, upload, and summarize academic resources in one place.
          </p>
        </div>

        {/* Middle: Links */}
        <nav className="flex flex-wrap gap-3 text-sm">
          <Link to="/" className="text-mutetext hover:text-text transition">
            Home
          </Link>
          <Link to="/explore" className="text-mutetext hover:text-text transition">
            Repositories
          </Link>
          <Link to="/about" className="text-mutetext hover:text-text transition">
            About
          </Link>
          <Link to="/upload" className="text-mutetext hover:text-text transition">
            Upload
          </Link>
          <Link to="/collections" className="text-mutetext hover:text-text transition">
            Collections
          </Link>
        </nav>

        {/* Right: Copyright */}
        <div className="text-xs text-mutetext">
          © {year} ReNote. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

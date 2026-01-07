import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search } from "lucide-react";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 text-sm rounded-md transition ${
    isActive ? "text-accent" : "text-mutetext hover:text-text"
  }`;

export default function Navbar() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    navigate(`/explore?q=${encodeURIComponent(q)}`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/30 backdrop-blur-md bg-black/20">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
            ReNote
          </span>
        </Link>

        <nav className="hidden sm:flex items-center gap-1 ml-2">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/explore" className={navLinkClass}>Repositories</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
        </nav>

        <div className="flex-1" />

        <form onSubmit={onSubmit} className="hidden md:flex items-center">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-mutetext"
            />

            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Type here to Search"
              className="w-[340px] rounded-full bg-surface/60 border border-border/70 pl-9 pr-4 py-2 text-sm outline-none focus:border-accent/70 focus:shadow-glow"
            />
          </div>
        </form>

        <div className="flex items-center gap-2">
          <SignedOut>
            <Link
              to="/sign-in"
              className="px-4 py-2 text-sm rounded-lg border border-border/70 hover:border-accent/70 text-mutetext hover:text-text
              transition-all duration-200 ease-out [cubic-bezier(0.4,0,0.2,1)]"
            >
              Sign in
            </Link>

            <Link
              to="/sign-up"
              className="px-4 py-2 text-sm rounded-lg font-medium text-bg0
                        bg-gradient-to-r from-accent to-accent2
                        hover:bg-border hover:from-transparent hover:to-transparent
                        hover:text-accent
                        transition-all duration-500 ease-out [cubic-bezier(0.4,0,0.2,1)]"
            >
              Sign-up
            </Link>
          </SignedOut>

          <SignedIn>
            <Link
              to="/dashboard"
              className="px-4 py-2 text-sm rounded-lg border border-border/70 hover:border-accent/70 text-mutetext hover:text-text transition"
            >
              Dashboard
            </Link>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

      </div>
    </header>
  );
}


/*import { Link, NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Search } from "lucide-react";

const navLinkClass = ({ isActive }) =>
  `px-3 py-2 text-sm rounded-md transition ${
    isActive ? "text-accent" : "text-mutetext hover:text-text"
  }`;

export default function Navbar() {
  const [q, setQ] = useState("");
  const navigate = useNavigate();

  function onSubmit(e) {
    e.preventDefault();
    navigate(`/explore?q=${encodeURIComponent(q)}`);
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/30 backdrop-blur-md bg-black/20">
      <div className="mx-auto max-w-6xl px-4 h-16 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-extrabold tracking-wide bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
            ReNote
          </span>
        </Link>

        <nav className="hidden sm:flex items-center gap-1 ml-2">
          <NavLink to="/" className={navLinkClass}>Home</NavLink>
          <NavLink to="/explore" className={navLinkClass}>Repositories</NavLink>
          <NavLink to="/about" className={navLinkClass}>About</NavLink>
        </nav>

        <div className="flex-1" />

        <form onSubmit={onSubmit} className="hidden md:flex items-center">
          <div className="relative">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-mutetext"
            />

            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Type here to Search"
              className="w-[340px] rounded-full bg-surface/40 backdrop-blur-sm border border-border/50 pl-9 pr-4 py-2 text-sm outline-none focus:border-accent/70 focus:shadow-glow transition-all"
            />
          </div>
        </form>

        <div className="flex items-center gap-2">
          <Link
            to="/dashboard"
            className="px-4 py-2 text-sm rounded-lg border border-border/50 hover:border-accent/70 text-mutetext hover:text-text backdrop-blur-sm bg-white/5 hover:bg-white/10 transition-all duration-200"
          >
            Sign in
          </Link>
          <Link
            to="/dashboard"
            className="px-4 py-2 text-sm rounded-lg font-medium text-white bg-gradient-to-r from-accent to-accent2 hover:opacity-90 transition-opacity shadow-lg shadow-accent/20"
          >
            Sign-up
          </Link>
        </div>
      </div>
    </header>
  );
}
*/
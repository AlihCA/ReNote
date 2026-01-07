import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import heroBg from "../assets/hero-bg.png";

export default function Home() {
  const [scrollOpacity, setScrollOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const fadeEnd = 480;

      setScrollOpacity(Math.max(0, 1 - y / fadeEnd));
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <>
      {/* Background layer */}
      <div
        className="fixed inset-0 pointer-events-none transition-opacity duration-500"
        style={{ opacity: scrollOpacity, zIndex: -2 }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroBg})`,
          }}
        />

        {/* Overlay gradients for readability + depth */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/35 to-black/75" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.18),transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_40%,rgba(236,72,153,0.12),transparent_55%)]" />
      </div>

      {/* Hero */}
      <div
        className="fixed inset-0 flex items-center justify-center px-4"
        style={{
          paddingTop: "4rem", // matches navbar height (64px)
          opacity: scrollOpacity,
        }}
      >
        <div className="pointer-events-auto w-full max-w-3xl">
          <div className="relative overflow-hidden rounded-3xl
                          border border-white/15
                          bg-black/20
                          backdrop-blur-md
                          shadow-xl shadow-black/30">

            {/* subtle top highlight */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-transparent to-transparent pointer-events-none" />
            {/* soft glow */}
            <div className="absolute -inset-32 bg-[radial-gradient(circle,rgba(168,85,247,0.22),transparent_60%)] pointer-events-none" />

            <div className="relative px-7 md:px-12 py-12 md:py-14 text-center">
              <p className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-200">
                ✦ Build your personal universe of resources
              </p>

              <h1 className="mt-5 text-3xl md:text-5xl font-semibold leading-tight text-white">
                Explore and build your
                <span className="bg-gradient-to-r from-accent to-accent2 bg-clip-text text-transparent">
                  {" "}stars of knowledge
                </span>
                .
              </h1>

              <p className="mt-5 text-gray-200/90 text-base md:text-lg leading-relaxed">
                Upload resources, generate summaries, organize into collections,
                and search your repository.
              </p>

              <div className="mt-9 flex flex-col sm:flex-row gap-3 justify-center">
                <Link
                  to="/dashboard"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-accent to-accent2 text-white font-medium shadow-lg shadow-accent/25
                            hover:bg-border hover:from-transparent hover:to-transparent
                            hover:text-accent
                            transition-all duration-500 ease-out [cubic-bezier(0.4,0,0.2,1)]"
                >
                  Get Started
                </Link>

                <Link
                  to="/explore"
                  className="px-6 py-3 rounded-xl border border-white/15 text-white bg-white/5 hover:bg-white/10
                            hover:border-accent/70 text-mutetext hover:text-text
                            transition-all duration-200 ease-out [cubic-bezier(0.4,0,0.2,1)]"
                
                >
                  Explore Repositories
                </Link>
              </div>

              {/* optional scroll hint */}
              <div className="mt-10 text-xs text-gray-300/70">
                Scroll to enter your workspace ↓
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Spacer */}
      <div className="h-[200vh]" />
    </>
  );
}

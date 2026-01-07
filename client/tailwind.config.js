/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        bg0: "#070411",
        bg1: "#0B061A",
        surface: "#120A2A",
        surface2: "#160C33",
        border: "#2A174A",
        accent: "#D946EF",   // pink-purple
        accent2: "#A855F7",  // violet
        text: "#F2E9FF",
        mutetext: "#C7B8E6",
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(217,70,239,0.25), 0 10px 30px rgba(168,85,247,0.15)",
      },
      backgroundImage: {
        hero: "radial-gradient(1200px 600px at 60% 35%, rgba(217,70,239,0.22), transparent 60%), radial-gradient(900px 500px at 30% 70%, rgba(168,85,247,0.18), transparent 55%), linear-gradient(180deg, #070411 0%, #0B061A 100%)",
      },
    },
  },
  plugins: [],
};

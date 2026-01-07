export default function SidebarFilters({ active, setActive }) {
  const items = ["Type", "Date", "Tags"];

  return (
    <aside className="w-full md:w-64 border border-border/70 bg-surface/40 rounded-2xl p-4">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-mutetext">Filter by</span>
      </div>

      <div className="space-y-2">
        {items.map((label) => {
          const isOn = active === label;
          return (
            <button
              key={label}
              onClick={() => setActive(label)}
              className={`w-full text-left px-3 py-2 rounded-lg text-sm border transition ${
                isOn
                  ? "bg-accent/20 border-accent/40 text-text"
                  : "bg-surface/30 border-border/60 text-mutetext hover:text-text hover:border-accent/40"
              }`}
            >
              {label}
            </button>
          );
        })}
      </div>
    </aside>
  );
}

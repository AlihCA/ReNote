import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SidebarFilters from "../components/SidebarFilters";
import ResourceCard from "../components/ResourceCard";
import { mockResources } from "../data/mockResources";

export default function Explore() {
  const [activeFilter, setActiveFilter] = useState("Type");
  const [sort, setSort] = useState("Recents");
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";

  const filtered = useMemo(() => {
    const base = mockResources.filter((r) =>
      (r.title + " " + r.description + " " + r.tags.join(" "))
        .toLowerCase()
        .includes(q.toLowerCase())
    );

    const sorted = [...base].sort((a, b) => {
      if (sort === "A-Z") return a.title.localeCompare(b.title);
      // Recents
      return new Date(b.updatedAt) - new Date(a.updatedAt);
    });

    return sorted;
  }, [q, sort]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[260px_1fr] gap-6">
      <SidebarFilters active={activeFilter} setActive={setActiveFilter} />

      <section className="border border-border/70 bg-surface/30 rounded-2xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <div className="flex items-center gap-2 text-sm text-mutetext">
            <span className="opacity-80">Filter:</span>
            <span className="text-text">{activeFilter}</span>
            {q ? <span className="ml-2">• Searching: “{q}”</span> : null}
          </div>

          <div className="flex items-center gap-2">
            <label className="text-xs text-mutetext">Sort by:</label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="text-sm rounded-lg bg-surface/40 border border-border/70 px-3 py-2 outline-none focus:border-accent/70"
            >
              <option>Recents</option>
              <option>A-Z</option>
            </select>

            <button className="px-3 py-2 rounded-lg text-sm border border-accent/35 bg-accent/10 hover:bg-accent/20 transition">
              ♡ Save
            </button>

            <button className="w-10 h-10 rounded-lg border border-border/70 bg-surface/40 hover:border-accent/60 transition">
              …
            </button>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          {filtered.map((r) => (
            <ResourceCard key={r.id} r={r} />
          ))}

          {filtered.length === 0 && (
            <div className="text-center text-mutetext py-12">
              No results found.
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

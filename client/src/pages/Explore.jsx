import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import SidebarFilters from "../components/SidebarFilters";
import ResourceCard from "../components/ResourceCard";
import { useResources } from "../contexts/ResourcesContext";

export default function Explore() {
  const { resources } = useResources();
  const [activeFilter, setActiveFilter] = useState("Type");
  const [sort, setSort] = useState("Recents");
  const [params, setParams] = useSearchParams();
  const q = params.get("q") || "";

  const filtered = useMemo(() => {
  const query = q.trim().toLowerCase();

  const scoreResource = (r) => {
    if (!query) return 0;
    let score = 0;

    const title = (r.title || "").toLowerCase();
    const desc = (r.description || "").toLowerCase();
    const tags = (r.tags || []).join(" ").toLowerCase();

    if (title.includes(query)) score += 50;
    if (tags.includes(query)) score += 25;
    if (desc.includes(query)) score += 10;

    // small boost: earlier match in title
    const idx = title.indexOf(query);
    if (idx >= 0) score += Math.max(0, 20 - idx / 5);

    return score;
  };

  let base = resources;

  // if query exists, filter down to matches
  if (query) {
    base = resources.filter((r) =>
      ((r.title || "") + " " + (r.description || "") + " " + (r.tags || []).join(" "))
        .toLowerCase()
        .includes(query)
    );
  }

  const scored = base.map((r) => ({ r, score: scoreResource(r) }));

  scored.sort((a, b) => {
    // if query exists, rank by score first
    if (query && b.score !== a.score) return b.score - a.score;

    // fallback sorting
    if (sort === "A-Z") return a.r.title.localeCompare(b.r.title);
        return new Date(b.r.updatedAt) - new Date(a.r.updatedAt);
      });

      return scored.map((x) => x.r);
    }, [q, sort, resources]);

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

            <button className="w-10 h-10 rounded-lg border border-border/70 bg-surface/40 hover:border-accent/60 transition">
              …
            </button>
          </div>
        </div>

        <div className="mt-5 space-y-4">
          {filtered.map((r) => (
            <ResourceCard key={r.id} r={r} query={q} />
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

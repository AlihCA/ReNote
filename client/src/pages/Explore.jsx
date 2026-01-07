// src/pages/Explore.jsx
import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ResourceCard from "../components/ResourceCard";
import AO3Filters from "../components/AO3Filters";
import { useResources } from "../contexts/ResourcesContext";

export default function Explore() {
  const { resources } = useResources();

  const [params] = useSearchParams();
  const q = params.get("q") || "";

  // AO3-style filters (live)
  const [filters, setFilters] = useState({
    types: [],
    includeTags: [],
    excludeTags: [],
    dateFrom: "",
    dateTo: "",
    sort: "Recents",
  });

  const filtered = useMemo(() => {
    const query = (q || "").trim().toLowerCase();

    // 1) Keyword filter (title/desc/tags)
    let base = resources;

    if (query) {
      base = base.filter((r) =>
        ((r.title || "") +
          " " +
          (r.description || "") +
          " " +
          (r.tags || []).join(" "))
          .toLowerCase()
          .includes(query)
      );
    }

    // 2) Type filter
    if (filters.types.length) {
      base = base.filter((r) => filters.types.includes(r.type));
    }

    // 3) Include tags (must contain ALL include tags)
    if (filters.includeTags.length) {
      base = base.filter((r) => {
        const tags = r.tags || [];
        return filters.includeTags.every((t) => tags.includes(t));
      });
    }

    // 4) Exclude tags (must contain NONE exclude tags)
    if (filters.excludeTags.length) {
      base = base.filter((r) => {
        const tags = r.tags || [];
        return filters.excludeTags.every((t) => !tags.includes(t));
      });
    }

    // 5) Date range (only works if you have ISO date strings like "2026-01-08")
    // If your updatedAt is "December 28, 2025" this will not work reliably.
    if (filters.dateFrom) {
      base = base.filter((r) => (r.updatedAtISO || "").slice(0, 10) >= filters.dateFrom);
    }
    if (filters.dateTo) {
      base = base.filter((r) => (r.updatedAtISO || "").slice(0, 10) <= filters.dateTo);
    }

    // 6) Sort
    const sorted = [...base].sort((a, b) => {
      if (filters.sort === "A-Z") return (a.title || "").localeCompare(b.title || "");
      // Recents: assuming newest are already first in your array (upload pushes to front)
      return 0;
    });

    return sorted;
  }, [q, resources, filters]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
      {/* AO3-like sidebar */}
      <AO3Filters resources={resources} filters={filters} setFilters={setFilters} />

      <section className="border border-border/70 bg-surface/30 rounded-2xl p-5">
        <div className="flex flex-col sm:flex-row sm:items-center gap-3 justify-between">
          <div className="text-sm text-mutetext">
            {q ? (
              <span>
                Showing results for <span className="text-text">“{q}”</span>
              </span>
            ) : (
              <span>Browse repositories</span>
            )}
          </div>

          {/* Optional: keep a small menu button for future */}
          <button className="w-10 h-10 rounded-lg border border-border/70 bg-surface/40 hover:border-accent/60 transition">
            …
          </button>
        </div>

        {/* Active filter summary (AO3 vibe) */}
        <div className="mt-3 flex flex-wrap gap-2 text-xs text-mutetext">
          {q ? <Pill label={`Search: ${q}`} /> : null}
          {filters.types.map((t) => (
            <Pill key={`type-${t}`} label={`Type: ${t}`} />
          ))}
          {filters.includeTags.map((t) => (
            <Pill key={`in-${t}`} label={`+${t}`} />
          ))}
          {filters.excludeTags.map((t) => (
            <Pill key={`ex-${t}`} label={`-${t}`} />
          ))}
          {(filters.dateFrom || filters.dateTo) && (
            <Pill
              label={`Date: ${filters.dateFrom || "…"} → ${filters.dateTo || "…"} `}
            />
          )}
        </div>

        <div className="mt-5 space-y-4">
          {filtered.map((r) => (
            <ResourceCard key={r.id} r={r} query={q} />
          ))}

          {filtered.length === 0 && (
            <div className="text-center text-mutetext py-12">No results found.</div>
          )}
        </div>
      </section>
    </div>
  );
}

function Pill({ label }) {
  return (
    <span className="px-2 py-1 rounded-full border border-border/60 bg-surface/30">
      {label}
    </span>
  );
}

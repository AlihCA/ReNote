import { useMemo, useState } from "react";

export default function AO3Filters({ resources, filters, setFilters }) {
  const [tagInput, setTagInput] = useState("");
  const [tagInputEx, setTagInputEx] = useState("");

  const types = useMemo(() => {
    const s = new Set(resources.map((r) => r.type).filter(Boolean));
    return Array.from(s).sort();
  }, [resources]);

  const allTags = useMemo(() => {
    const s = new Set();
    resources.forEach((r) => (r.tags || []).forEach((t) => s.add(t)));
    return Array.from(s).sort();
  }, [resources]);

  function toggleType(t) {
    setFilters((prev) => ({
      ...prev,
      types: prev.types.includes(t)
        ? prev.types.filter((x) => x !== t)
        : [...prev.types, t],
    }));
  }

  function addTag(which, value) {
    const v = value.trim();
    if (!v) return;

    setFilters((prev) => {
      const current = prev[which];
      if (current.includes(v)) return prev;

      // prevent same tag being in include & exclude at the same time
      const other = which === "includeTags" ? "excludeTags" : "includeTags";

      return {
        ...prev,
        [which]: [...current, v],
        [other]: prev[other].filter((x) => x !== v),
      };
    });
  }

  function removeTag(which, value) {
    setFilters((prev) => ({
      ...prev,
      [which]: prev[which].filter((x) => x !== value),
    }));
  }

  function resetAll() {
    setFilters({
      types: [],
      includeTags: [],
      excludeTags: [],
      dateFrom: "",
      dateTo: "",
      sort: "Recents",
    });
    setTagInput("");
    setTagInputEx("");
  }

  return (
    <aside className="border border-border/70 bg-surface/30 rounded-2xl p-5 sticky top-20 h-fit">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Sort and Filter</h3>
        <button
          onClick={resetAll}
          className="text-xs text-mutetext hover:text-accent transition"
        >
          Reset
        </button>
      </div>

      {/* Sort */}
      <div className="mt-4">
        <label className="text-xs text-mutetext">Sort by</label>
        <select
          value={filters.sort}
          onChange={(e) => setFilters((p) => ({ ...p, sort: e.target.value }))}
          className="mt-2 w-full text-sm rounded-lg bg-surface/40 border border-border/70 px-3 py-2 outline-none focus:border-accent/70"
        >
          <option>Recents</option>
          <option>A-Z</option>
        </select>
      </div>

      {/* Type */}
      <div className="mt-5">
        <div className="text-sm font-medium">Type</div>
        <div className="mt-2 space-y-2">
          {types.map((t) => (
            <label key={t} className="flex items-center gap-2 text-sm text-mutetext">
              <input
                type="checkbox"
                checked={filters.types.includes(t)}
                onChange={() => toggleType(t)}
              />
              <span className="text-text">{t}</span>
            </label>
          ))}
          {types.length === 0 && (
            <div className="text-xs text-mutetext">No types available</div>
          )}
        </div>
      </div>

      {/* Include tags */}
      <div className="mt-6">
        <div className="text-sm font-medium">Include tags</div>
        <div className="mt-2 flex gap-2">
          <input
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            list="all-tags"
            placeholder="Add tag..."
            className="flex-1 rounded-lg bg-surface/40 border border-border/70 px-3 py-2 text-sm outline-none focus:border-accent/70"
          />
          <button
            onClick={() => {
              addTag("includeTags", tagInput);
              setTagInput("");
            }}
            className="px-3 py-2 rounded-lg text-sm border border-border/70 bg-surface/40 hover:border-accent/60 transition"
          >
            Add
          </button>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {filters.includeTags.map((t) => (
            <TagChip key={t} label={t} onRemove={() => removeTag("includeTags", t)} />
          ))}
        </div>
      </div>

      {/* Exclude tags */}
      <div className="mt-6">
        <div className="text-sm font-medium">Exclude tags</div>
        <div className="mt-2 flex gap-2">
          <input
            value={tagInputEx}
            onChange={(e) => setTagInputEx(e.target.value)}
            list="all-tags"
            placeholder="Add tag..."
            className="flex-1 rounded-lg bg-surface/40 border border-border/70 px-3 py-2 text-sm outline-none focus:border-accent/70"
          />
          <button
            onClick={() => {
              addTag("excludeTags", tagInputEx);
              setTagInputEx("");
            }}
            className="px-3 py-2 rounded-lg text-sm border border-border/70 bg-surface/40 hover:border-accent/60 transition"
          >
            Add
          </button>
        </div>

        <div className="mt-2 flex flex-wrap gap-2">
          {filters.excludeTags.map((t) => (
            <TagChip key={t} label={t} onRemove={() => removeTag("excludeTags", t)} />
          ))}
        </div>
      </div>

      {/* Date range */}
      <div className="mt-6">
        <div className="text-sm font-medium">Date</div>
        <div className="mt-2 grid grid-cols-2 gap-2">
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => setFilters((p) => ({ ...p, dateFrom: e.target.value }))}
            className="rounded-lg bg-surface/40 border border-border/70 px-3 py-2 text-sm outline-none focus:border-accent/70"
          />
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => setFilters((p) => ({ ...p, dateTo: e.target.value }))}
            className="rounded-lg bg-surface/40 border border-border/70 px-3 py-2 text-sm outline-none focus:border-accent/70"
          />
        </div>
        <div className="text-xs text-mutetext mt-2">
          (Works best if your resources store ISO dates.)
        </div>
      </div>

      <datalist id="all-tags">
        {allTags.map((t) => (
          <option key={t} value={t} />
        ))}
      </datalist>
    </aside>
  );
}

function TagChip({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-full border border-accent/25 bg-accent/10 text-text">
      {label}
      <button onClick={onRemove} className="text-mutetext hover:text-accent">
        ✕
      </button>
    </span>
  );
}

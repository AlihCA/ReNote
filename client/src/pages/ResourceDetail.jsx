import { useMemo, useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import { useResources } from "../contexts/ResourcesContext";
import { useCollections } from "../contexts/CollectionsContext";
import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function ResourceDetail() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    function onDocClick(e) {
      if (!menuRef.current) return;
      if (!menuRef.current.contains(e.target)) setOpen(false);
    }
    if (open) document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, [open]);

  const { collections, toggleResource } = useCollections();
  const { deleteResource, resources } = useResources();
  const navigate = useNavigate();
  const { id } = useParams();
  const r = useMemo(() => resources.find((x) => x.id === id), [resources, id]);

  const [summary, setSummary] = useState(
    "This is an AI-generated summary placeholder. In the full version, ReNote will extract key points, objectives, and conclusions from the document."
  );
  const [loading, setLoading] = useState(false);

  if (!r) {
    return (
      <div className="text-mutetext">
        Resource not found.{" "}
        <Link className="text-accent" to="/explore">
          Back
        </Link>
      </div>
    );
  }

  async function reSummarize() {
    setLoading(true);
    setTimeout(() => {
      setSummary(
        "Updated summary (mock): This resource focuses on building an academic repository system with search, tagging, and summarization features to improve access to learning materials."
      );
      setLoading(false);
    }, 900);
  }

  return (
    <div className="border border-border/70 bg-surface/30 rounded-2xl p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">{r.title}</h2>
          <div className="text-sm text-mutetext mt-2 flex flex-wrap gap-3">
            <span>Type: {r.type}</span>
            <span>Updated: {r.updatedAt}</span>
            <span>✦ {r.stars}</span>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="relative" ref={menuRef}>
            <button
              onClick={() => setOpen((o) => !o)}
              className="px-3 py-2 rounded-lg text-sm border border-accent/35 bg-accent/10 hover:bg-accent/20 transition"
            >
              Save to Collection
            </button>
            <button
              onClick={() => {
                if (confirm("Are you sure you want to delete this resource?")) {
                  deleteResource(r.id);
                  navigate("/explore");
                }
              }}
              className="px-3 py-2 rounded-lg text-sm border border-border/70 bg surface/40 hover:border-red-400 hover:text-red-400 transition"
            >
              Delete
            </button>

            {open && (
              <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border/70 bg-surface/95 backdrop-blur shadow-lg z-20">
                {collections.length === 0 && (
                  <div className="px-3 py-2 text-sm text-mutetext">
                    No collections yet
                  </div>
                )}

                {collections.map((c) => {
                  const saved = c.resourceIds.includes(r.id);
                  return (
                    <button
                      key={c.id}
                      onClick={() => toggleResource(c.id, r.id)}
                      className="w-full text-left px-3 py-2 text-sm hover:bg-accent/10 flex items-center gap-2"
                    >
                      <span className="w-4">
                        {saved ? (
                          <Check size={16} className="text-accent" />
                        ) : null}
                      </span>
                      <span className="flex-1">{c.name}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-5">
        <div className="border border-border/70 bg-surface/40 rounded-2xl p-4 min-h-[260px]">
          <div className="text-sm text-mutetext mb-3">Preview (mock)</div>
          <div className="text-sm leading-relaxed text-mutetext">
            Preview area. Later: embed PDF, show text, or show extracted pages.
          </div>
        </div>

        <div className="border border-border/70 bg-surface/40 rounded-2xl p-4">
          <div className="flex items-center justify-between gap-3">
            <div className="text-sm text-mutetext">AI-generated summary</div>
            <button
              onClick={reSummarize}
              className="px-3 py-2 rounded-lg text-sm bg-accent text-bg0 font-medium hover:bg-accent/90 transition"
            >
              {loading ? "Re-summarizing..." : "Re-summarize"}
            </button>
          </div>

          <p className="mt-3 text-sm text-text/90 leading-relaxed">{summary}</p>
        </div>
      </div>
    </div>
  );
}

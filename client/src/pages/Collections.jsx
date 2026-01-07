import { useMemo, useState } from "react";
import { useCollections } from "../contexts/CollectionsContext";
import { useResources } from "../contexts/ResourcesContext";
import { Link } from "react-router-dom";
import { Pencil, Trash2, X } from "lucide-react";

export default function Collections() {
  const [error, setError] = useState("");

  const { collections, createCollection, toggleResource, renameCollection, deleteCollection } =
    useCollections();
  const { resources } = useResources();

  const [name, setName] = useState("");
  const [activeId, setActiveId] = useState(collections[0]?.id || null);

  // Manage modal
  const [manageId, setManageId] = useState(null);
  const manageCollection = collections.find((c) => c.id === manageId) || null;
  const [renameValue, setRenameValue] = useState("");

  const active = collections.find((c) => c.id === activeId) || null;

  const activeItems = useMemo(() => {
    if (!active) return [];
    return resources.filter((r) => active.resourceIds.includes(r.id));
  }, [active, resources]);

  function onCreate(e) {
    e.preventDefault();

    if (!name.trim()) {
      setError("Collection name is required.");
      return;
    }

    createCollection(name.trim());
    setName("");
    setError("");
  }

  function openManage(c) {
    setManageId(c.id);
    setRenameValue(c.name);
  }

  function onRename() {
    const n = renameValue.trim();
    if (!n || !manageCollection) return;
    renameCollection(manageCollection.id, n);
    setManageId(null);
  }

  function onDelete() {
    if (!manageCollection) return;
    const wasActive = manageCollection.id === activeId;
    deleteCollection(manageCollection.id);
    setManageId(null);
    if (wasActive) setActiveId(null);
  }

  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-[320px_1fr] gap-6">
      {/* Left: Collections list */}
      <aside className="border border-border/70 bg-surface/30 rounded-2xl p-5">
        <h2 className="text-xl font-semibold">Collections</h2>

        <form onSubmit={onCreate} className="mt-4 flex gap-2">
          <input
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              if (error) setError("");
            }}
            placeholder="New collection name"
            required
            className={`flex-1 rounded-lg bg-surface/40 border px-4 py-2 text-sm outline-none
              ${error ? "border-red-400/60" : "border-border/70"}
              focus:border-accent/70`}
          />
          <button
            type="submit"
            className="px-4 py-2 rounded-lg font-medium text-bg0 bg-gradient-to-r from-accent to-accent2 hover:opacity-90 transition"
          >
            Create
          </button>
        </form>

        <div className="mt-5 space-y-2">
          {collections.length === 0 && (
            <div className="text-sm text-mutetext py-6 text-center">
              No collections yet.
            </div>
          )}

          {collections.map((c) => {
            const isActive = c.id === activeId;
            return (
              <div
                key={c.id}
                className={`flex items-center gap-2 rounded-xl border px-3 py-2 transition ${
                  isActive
                    ? "border-accent/50 bg-accent/10"
                    : "border-border/60 bg-surface/20 hover:border-accent/40"
                }`}
              >
                <button
                  onClick={() => setActiveId(c.id)}
                  className="flex-1 text-left"
                >
                  <div className="text-sm font-medium">{c.name}</div>
                  <div className="text-xs text-mutetext">
                    {c.resourceIds.length} items
                  </div>
                </button>

                <button
                  onClick={() => openManage(c)}
                  className="p-2 rounded-lg border border-border/60 bg-surface/30 hover:border-accent/40 transition"
                  title="Manage"
                >
                  <Pencil size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </aside>

      {/* Right: Active collection viewer */}
      <section className="border border-border/70 bg-surface/30 rounded-2xl p-6">
        {!active ? (
          <div className="text-center text-mutetext py-16">
            Select a collection to view its resources.
          </div>
        ) : (
          <>
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-xl font-semibold">{active.name}</h3>
                <p className="text-sm text-mutetext mt-1">
                  {activeItems.length} resources
                </p>
              </div>

              <button
                onClick={() => openManage(active)}
                className="px-3 py-2 rounded-lg text-sm border border-border/60 bg-surface/30 hover:border-accent/40 transition flex items-center gap-2"
              >
                <Pencil size={16} />
                Manage
              </button>
            </div>

            <div className="mt-5 space-y-3">
              {activeItems.length === 0 ? (
                <div className="text-sm text-mutetext py-10 text-center">
                  This collection is empty. Add items from a resource’s “Save to Collection”.
                </div>
              ) : (
                activeItems.map((r) => (
                  <div
                    key={r.id}
                    className="border border-border/60 bg-surface/20 rounded-2xl p-4 flex items-start gap-4"
                  >
                    <div className="flex-1">
                      <Link
                        to={`/resource/${r.id}`}
                        className="font-semibold hover:text-accent transition"
                      >
                        {r.title}
                      </Link>
                      <p className="text-sm text-mutetext mt-1">
                        {r.description}
                      </p>

                      <div className="mt-2 text-xs text-mutetext flex flex-wrap gap-3">
                        <span>Type: {r.type}</span>
                        <span>Updated: {r.updatedAt}</span>
                        <span>★ {r.stars}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => toggleResource(active.id, r.id)}
                      className="px-3 py-2 rounded-lg text-sm border border-border/60 bg-surface/30 hover:border-accent/40 transition"
                      title="Remove from collection"
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>
          </>
        )}
      </section>

      {/* Manage modal */}
      {manageCollection && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center px-4">
          <div className="w-full max-w-md rounded-2xl border border-border/70 bg-surface/90 backdrop-blur p-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="text-lg font-semibold">Manage Collection</h4>
                <p className="text-sm text-mutetext mt-1">
                  {manageCollection.name}
                </p>
              </div>
              <button
                onClick={() => setManageId(null)}
                className="p-2 rounded-lg border border-border/60 bg-surface/30 hover:border-accent/40 transition"
                title="Close"
              >
                <X size={16} />
              </button>
            </div>

            <div className="mt-4 space-y-3">
              <label className="text-xs text-mutetext">Rename</label>
              <input
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                className="w-full rounded-lg bg-surface/40 border border-border/70 px-3 py-2 text-sm outline-none focus:border-accent/70"
              />

              <button
                onClick={onRename}
                className="w-full px-4 py-2 rounded-lg font-medium text-bg0 bg-gradient-to-r from-accent to-accent2 hover:opacity-90 transition"
              >
                Save Changes
              </button>

              <button
                onClick={onDelete}
                className="w-full px-4 py-2 rounded-lg font-medium border border-red-400/40 bg-red-500/10 hover:bg-red-500/15 transition flex items-center justify-center gap-2"
              >
                <Trash2 size={16} />
                Delete Collection
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

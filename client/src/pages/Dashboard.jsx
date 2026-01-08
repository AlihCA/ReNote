import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useResources } from "../contexts/ResourcesContext";
import { useCollections } from "../contexts/CollectionsContext";
import { Upload, Folder, BookOpen } from "lucide-react";

export default function Dashboard() {
  const { resources } = useResources();
  const { collections } = useCollections();

  const recentResources = useMemo(
    () => resources.slice(0, 3),
    [resources]
  );

  const totalResources = resources.length;
  const totalCollections = collections.length;
  const totalSaved = collections.reduce(
    (sum, c) => sum + c.resourceIds.length,
    0
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <section className="border border-border/70 bg-surface/30 rounded-2xl p-6">
        <h1 className="text-2xl font-semibold">
          Welcome back! ♡
        </h1>
        <p className="text-mutetext mt-1">
          Here’s a snapshot of your ReNote workspace.
        </p>
      </section>

      {/* Stats */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard
          icon={<BookOpen size={20} />}
          label="Resources"
          value={totalResources}
        />
        <StatCard
          icon={<Folder size={20} />}
          label="Collections"
          value={totalCollections}
        />
        <StatCard
          icon={<Upload size={20} />}
          label="Saved items"
          value={totalSaved}
        />
      </section>

      {/* Main content */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent uploads */}
        <div className="border border-border/70 bg-surface/30 rounded-2xl p-6">
          <h2 className="text-lg font-semibold">
            Recent uploads
          </h2>

          <div className="mt-4 space-y-3">
            {recentResources.length === 0 ? (
              <p className="text-sm text-mutetext">
                You haven’t uploaded anything yet.
              </p>
            ) : (
              recentResources.map((r) => (
                <Link
                  key={r.id}
                  to={`/resource/${r.id}`}
                  className="block rounded-xl border border-border/60 bg-surface/20 px-4 py-3 hover:border-accent/50 transition"
                >
                  <div className="font-medium">{r.title}</div>
                  <div className="text-xs text-mutetext mt-1">
                    {r.type} • Updated {r.updatedAt}
                  </div>
                </Link>
              ))
            )}
          </div>

          <Link
            to="/explore"
            className="inline-block mt-4 text-sm text-accent hover:underline"
          >
            View all resources →
          </Link>
        </div>

        {/* Collections activity */}
        <div className="border border-border/70 bg-surface/30 rounded-2xl p-6">
          <h2 className="text-lg font-semibold">
            Collections overview
          </h2>

          <div className="mt-4 space-y-3">
            {collections.length === 0 ? (
              <p className="text-sm text-mutetext">
                You haven’t created any collections yet.
              </p>
            ) : (
              collections.map((c) => (
                <div
                  key={c.id}
                  className="rounded-xl border border-border/60 bg-surface/20 px-4 py-3"
                >
                  <div className="font-medium">{c.name}</div>
                  <div className="text-xs text-mutetext mt-1">
                    {c.resourceIds.length} saved resources
                  </div>
                </div>
              ))
            )}
          </div>

          <Link
            to="/collections"
            className="inline-block mt-4 text-sm text-accent hover:underline"
          >
            Manage collections →
          </Link>
        </div>
      </section>

      {/* Quick actions */}
      <section className="border border-border/70 bg-surface/30 rounded-2xl p-6">
        <h2 className="text-lg font-semibold">
          Quick actions
        </h2>

        <div className="mt-4 flex flex-wrap gap-3">
          <QuickAction
            to="/upload"
            label="Upload Resource"
            icon={<Upload size={18} />}
          />
          <QuickAction
            to="/collections"
            label="View Collections"
            icon={<Folder size={18} />}
          />
          <QuickAction
            to="/explore"
            label="Explore Repository"
            icon={<BookOpen size={18} />}
          />
        </div>
      </section>
    </div>
  );
}

function StatCard({ icon, label, value }) {
  return (
    <div className="border border-border/70 bg-surface/30 rounded-2xl p-5 flex items-center gap-3">
      <div className="w-10 h-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center">
        {icon}
      </div>
      <div>
        <div className="text-sm text-mutetext">{label}</div>
        <div className="text-xl font-semibold">{value}</div>
      </div>
    </div>
  );
}

function QuickAction({ to, label, icon }) {
  return (
    <Link
      to={to}
      className="flex items-center gap-2 px-4 py-2 rounded-xl
                 border border-border/60 bg-surface/20
                 hover:border-accent/50 hover:bg-accent/5 transition"
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}

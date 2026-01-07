import { Link } from "react-router-dom";

export default function ResourceCard({ r }) {
  return (
    <div className="border border-border/70 bg-surface/40 rounded-2xl p-5 hover:border-accent/60 transition">
      <div className="flex items-start gap-4">
        <div className="w-10 h-10 rounded-full bg-accent/40 border border-accent/30 flex-shrink-0" />

        <div className="flex-1">
          <Link
            to={`/resource/${r.id}`}
            className="font-semibold leading-snug hover:text-accent transition"
          >
            {r.title}
          </Link>
          <p className="text-sm text-mutetext mt-2">
            Description: {r.description}
          </p>

          <div className="flex flex-wrap gap-2 mt-3">
            {r.tags.map((t) => (
              <span
                key={t}
                className="text-xs px-2.5 py-1 rounded-full border border-accent/25 bg-accent/10 text-text"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mt-3 text-xs text-mutetext">
            <span>● {r.category}</span>
            <span>✦ {r.stars}</span>
            <span>Updated on {r.updatedAt}</span>
            <span className="ml-auto text-accent/80">{r.type}</span>
          </div>
        </div>

        <button className="px-3 py-2 rounded-lg text-sm border border-accent/35 bg-accent/10 hover:bg-accent/20 transition">
          ✧ Star
        </button>
      </div>
    </div>
  );
}

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useResources } from "../contexts/ResourcesContext";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [title, setTitle] = useState("");
  const [tags, setTags] = useState("");
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false);

  const { addResource } = useResources();
  const navigate = useNavigate();

  function startUpload(e) {
    e.preventDefault();
    if (!file || !title) return;

    setUploading(true);
    setProgress(0);

    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(interval);

          const newResource = {
            id: Date.now().toString(),
            title,
            description: "Uploaded resource (mock description).",
            tags: tags.split(",").map(t => t.trim()).filter(Boolean),
            type: file.name.split(".").pop().toUpperCase(),
            updatedAt: new Date().toISOString().slice(0, 10),
            stars: 0,
            category: "User Upload",
          };

          addResource(newResource);
          navigate(`/resource/${newResource.id}`);
          return 100;
        }
        return p + 10;
      });
    }, 120);
  }

  return (
    <div className="max-w-xl mx-auto border border-border/70 bg-surface/30 rounded-2xl p-6">
      <h2 className="text-xl font-semibold">Upload Resource</h2>

      <form onSubmit={startUpload} className="mt-6 space-y-4">
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          className="block w-full text-sm text-mutetext"
        />

        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Resource title"
          className="w-full rounded-lg bg-surface/40 border border-border/70 px-4 py-2 text-sm outline-none focus:border-accent/70"
        />

        <input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma separated)"
          className="w-full rounded-lg bg-surface/40 border border-border/70 px-4 py-2 text-sm outline-none focus:border-accent/70"
        />

        {uploading && (
          <div className="w-full h-2 rounded-full bg-border/40 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-accent to-accent2 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}

        <button
          type="submit"
          disabled={uploading}
          className="w-full mt-2 px-4 py-2 rounded-lg font-medium text-bg0
                     bg-gradient-to-r from-accent to-accent2
                     hover:opacity-90 transition disabled:opacity-50"
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
      </form>
    </div>
  );
}

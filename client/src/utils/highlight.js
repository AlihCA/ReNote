export function splitHighlight(text, query) {
  const str = String(text ?? "");
  const q = (query ?? "").trim();
  if (!q) return [{ text: str, match: false }];

  const escaped = q.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(escaped, "ig");

  const parts = [];
  let lastIndex = 0;

  for (const m of str.matchAll(re)) {
    const start = m.index ?? 0;
    const end = start + m[0].length;

    if (start > lastIndex) {
      parts.push({ text: str.slice(lastIndex, start), match: false });
    }
    parts.push({ text: str.slice(start, end), match: true });
    lastIndex = end;
  }

  if (lastIndex < str.length) {
    parts.push({ text: str.slice(lastIndex), match: false });
  }

  return parts;
}

export default function WorkstreamPlaceholder({
  title,
  owner,
  description,
  badge = "Scaffold Only",
}) {
  return (
    <section className="page-section placeholder-page">
      <div className="placeholder-shell app-card">
        <div className="placeholder-badge">{badge}</div>
        <h1>{title}</h1>
        <p className="placeholder-copy">{description}</p>

        <div className="placeholder-meta">
          <div>
            <span className="meta-label">Assigned To</span>
            <strong>{owner}</strong>
          </div>
          <div>
            <span className="meta-label">Status</span>
            <strong>Not included in this trimmed handoff</strong>
          </div>
        </div>
      </div>
    </section>
  );
}

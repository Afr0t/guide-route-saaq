import Sign from "./Sign.jsx";

export default function ContentRenderer({ item, index }) {
  if (item.type === "step") {
    return (
      <div className="item-step">
        <div className="item-step-num">{index + 1}</div>
        <div>
          <div className="item-step-label">{item.label}</div>
          {item.detail && <div className="item-step-detail">{item.detail}</div>}
        </div>
      </div>
    );
  }

  if (item.type === "rule") {
    return (
      <div className="item-rule">
        <span className="item-rule-marker">▸</span>
        <span>{item.text}</span>
      </div>
    );
  }

  if (item.type === "alert") {
    return (
      <div className="item-alert">
        <span className="item-alert-marker">⚠</span>
        <span>{item.text}</span>
      </div>
    );
  }

  if (item.type === "info") {
    return (
      <div className="item-info">
        <span className="item-info-marker">ℹ</span>
        <span>{item.text}</span>
      </div>
    );
  }

  if (item.type === "heading") {
    return <div className="item-heading">{item.text}</div>;
  }

  if (item.type === "list") {
    return (
      <ul className="item-list">
        {item.items.map((li, j) => (
          <li key={j}>{li}</li>
        ))}
      </ul>
    );
  }

  if (item.type === "table") {
    return (
      <div className="item-table-wrap">
        <table className="item-table">
          <thead>
            <tr>
              {item.headers.map((h, j) => (
                <th key={j}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {item.rows.map((row, j) => (
              <tr key={j}>
                {row.map((cell, k) => (
                  <td key={k}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }

  if (item.type === "sign") {
    // Single sign with explanatory text (texte adjacent → image décorative)
    return (
      <div className="item-sign">
        <div className="item-sign-visual">
          <Sign id={item.sign} size={item.size || 90} label={item.title || item.text || ""} />
        </div>
        <div className="item-sign-body">
          {item.title && <div className="item-sign-title">{item.title}</div>}
          {item.text && <div className="item-sign-text">{item.text}</div>}
        </div>
      </div>
    );
  }

  if (item.type === "signGrid") {
    // Grid of signs (e.g. all interdiction signs together)
    return (
      <div className="item-sign-grid">
        {item.signs.map((s, j) => (
          <div className="sign-card" key={j}>
            <div className="sign-card-visual">
              <Sign id={s.sign} size={s.size || 80} label="" />
            </div>
            <div className="sign-card-label">{s.label}</div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

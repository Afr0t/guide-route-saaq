import ContentRenderer from "./ContentRenderer.jsx";

export default function SectionCard({ section, isOpen, onToggle, domId }) {
  return (
    <div id={domId} className={`section${isOpen ? " is-open" : ""}`}>
      <button
        className="section-toggle"
        onClick={onToggle}
        aria-expanded={isOpen}
      >
        <span className="section-title">{section.title}</span>
        <span className="section-chevron" aria-hidden="true">
          ▾
        </span>
      </button>
      {isOpen && (
        <div className="section-body">
          {section.content.map((item, i) => (
            <ContentRenderer key={i} item={item} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}

import type { PortfolioItem } from "../../types/portfolio.ts";
import "./ProjectGrid.css";
type Props = { items: PortfolioItem[] };
function ProjectGrid({ items }: Props) {
  return (
    <div className="project-grid">
      {items.map((item) => (
        <article className="project-card" key={item.id}>
          <div
            className="project-card__visual"
            style={
              item.imageUrl
                ? { backgroundImage: `url(${item.imageUrl})` }
                : undefined
            }
          >
            <span>{item.imageUrl ? "" : "✦"}</span>
          </div>
          <div className="project-card__body">
            <p className="project-card__tech">{item.dateLabel}</p>
            <h3>{item.title}</h3>
            <p className="project-card__subtitle">{item.subtitle}</p>
            <p>{item.description}</p>
            <div>
              {item.tags.map((tag) => (
                <span className="tag" key={tag}>
                  {tag}
                </span>
              ))}
            </div>
            {item.link && (
              <a href={item.link} target="_blank" rel="noreferrer">
                Ver proyecto ↗
              </a>
            )}
          </div>
        </article>
      ))}
    </div>
  );
}
export default ProjectGrid;

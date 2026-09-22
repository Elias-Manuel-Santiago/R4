import type { PortfolioItem } from "../../types/portfolio.ts";
import "./ProjectGrid.css";
/** Proyectos que se mostrarán como tarjetas de la cuadrícula. */
type Props = { items: PortfolioItem[] };

/** Renderiza cada proyecto y usa su imagen, cuando existe, como fondo de la tarjeta. */
function ProjectGrid({ items }: Props) {
  return (
    <div className="project-grid">
      {items.map((item) => (
        <article className="project-card" key={item.id}>
          {/* Sin imagen se conserva un símbolo para evitar una tarjeta visualmente vacía. */}
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
            {/* El enlace solo se crea si el proyecto tiene una URL válida para mostrar. */}
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

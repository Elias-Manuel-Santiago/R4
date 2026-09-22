import type { PortfolioItem } from "../../types/portfolio.ts";
import "./SkillsGrid.css";
/** Colección de habilidades que se representará como tarjetas. */
type Props = { items: PortfolioItem[] };

/** Recorre las habilidades y les asigna una numeración visual según su posición. */
function SkillsGrid({ items }: Props) {
  return (
    <div className="skills-grid">
      {items.map((item, index) => (
        <article className="skill-card" key={item.id}>
          <span className="skill-card__number">0{index + 1}</span>
          <h3>{item.title}</h3>
          <p className="skill-card__subtitle">{item.subtitle}</p>
          <p>{item.description}</p>
          {/* Cada etiqueta se muestra por separado para conservar el estilo de chip. */}
          <div>
            {item.tags.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </article>
      ))}
    </div>
  );
}
export default SkillsGrid;

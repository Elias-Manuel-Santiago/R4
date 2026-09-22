import type { PortfolioItem } from "../../types/portfolio.ts";
import "./ExperienceList.css";
/** Listas que se combinan en una línea de tiempo única. */
type Props = { experiences: PortfolioItem[]; achievements: PortfolioItem[] };

/** Une experiencias y logros, y respeta el orden definido por la persona administradora. */
function ExperienceList({ experiences, achievements }: Props) {
  // No se modifica ninguna lista de entrada: se crea una nueva antes de ordenarla.
  const all = [...experiences, ...achievements].sort(
    (a, b) => a.displayOrder - b.displayOrder,
  );
  return (
    <div className="timeline">
      {all.map((item) => (
        <article className="timeline__item" key={item.id}>
          <p className="timeline__date">{item.dateLabel}</p>
          <div>
            {/* El tipo de item define la etiqueta visible de la línea de tiempo. */}
            <span className="timeline__kind">
              {item.section === "achievement" ? "Logro" : "Experiencia"}
            </span>
            <h3>{item.title}</h3>
            <p className="timeline__subtitle">{item.subtitle}</p>
            <p>{item.description}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
export default ExperienceList;

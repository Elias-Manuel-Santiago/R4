import "./SectionTitle.css";

/** Texto auxiliar y título principal de una sección del portafolio. */
type Props = { eyebrow: string; title: string };

/** Estandariza la cabecera visual compartida por todas las secciones. */
function SectionTitle({ eyebrow, title }: Props) {
  return (
    <header className="section-title">
      <p>{eyebrow}</p>
      <h2>{title}</h2>
    </header>
  );
}
export default SectionTitle;

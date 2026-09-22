import "./PortfolioFooter.css";

/** Acción que abre el modo de edición del contenido. */
type Props = { onOpenAdmin: () => void };

/** Muestra el pie de página y el disparador accesible del panel administrativo. */
function PortfolioFooter({ onOpenAdmin }: Props) {
  return (
    <footer className="portfolio-footer">
      <p>Hecho con React, hooks y mucho mate.</p>
      <button
        className="admin-trigger"
        type="button"
        aria-label="Abrir modo administrador"
        title="Modo administrador"
        onClick={onOpenAdmin}
      >
        •
      </button>
    </footer>
  );
}
export default PortfolioFooter;

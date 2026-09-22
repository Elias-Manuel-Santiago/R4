import "./ThemeButton.css";

/** Tema actual y acción que debe ejecutarse al pulsar el botón. */
type Props = { tema: "dark" | "light"; onToggle: () => void };

/** Informa cuál será el siguiente tema y delega el cambio al hook de tema. */
function ThemeButton({ tema, onToggle }: Props) {
  const nextTheme = tema === "dark" ? "claro" : "oscuro";
  return (
    <button
      className="theme-button"
      type="button"
      onClick={onToggle}
      aria-label={`Cambiar al modo ${nextTheme}`}
      title={`Cambiar al modo ${nextTheme}`}
    >
      {tema === "dark" ? "☀" : "☾"}
    </button>
  );
}
export default ThemeButton;

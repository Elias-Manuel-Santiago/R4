import "./Header.css";
/** Datos mínimos que la barra superior necesita para presentarse. */
type HeaderProps = { name: string };

/** Muestra la marca y los enlaces de navegación interna de una sola página. */
function Header({ name }: HeaderProps) {
  return (
    <header className="site-header">
      <a
        className="site-header__brand"
        href="#inicio"
        aria-label="Ir al inicio"
      >
        {name}
      </a>
      <nav aria-label="Navegación principal">
        <a href="#habilidades">Habilidades</a>
        <a href="#experiencia">Experiencia</a>
        <a href="#proyectos">Proyectos</a>
        <a href="#contacto">Contacto</a>
      </nav>
    </header>
  );
}
export default Header;

import "./Header.css";
type HeaderProps = { name: string };
function Header({ name }: HeaderProps) {
  return (
    <header className="site-header">
      <a
        className="site-header__brand"
        href="#inicio"
        aria-label="Ir al inicio"
      >
        <span aria-hidden="true">✦</span>
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

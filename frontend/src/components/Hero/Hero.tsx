import { Fade } from "react-awesome-reveal";
import type { Profile } from "../../types/portfolio.ts";
import "./Hero.css";
/** Perfil que alimenta el bloque de presentación principal. */
type HeroProps = { profile: Profile };

/** Presenta los datos personales destacados y dirige a la sección de proyectos. */
function Hero({ profile }: HeroProps) {
  return (
    <section className="hero" id="inicio">
      <Fade triggerOnce>
        <div className="hero__stamp">
          PORTFOLIO
          <br />
          2026
        </div>
        <p className="hero__availability">● {profile.availability}</p>
        <h1>
          Hola, soy <span>{profile.name}.</span>
        </h1>
        <p className="hero__role">{profile.role}</p>
        <p className="hero__intro">{profile.intro}</p>
        <div className="hero__meta">
          <span>⌖ {profile.location}</span>
          <a href="#proyectos">Ver proyectos ↓</a>
        </div>
      </Fade>
    </section>
  );
}
export default Hero;

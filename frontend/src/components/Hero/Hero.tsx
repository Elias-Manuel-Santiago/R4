import { keyframes } from "@emotion/react";
import Reveal, { Fade } from "react-awesome-reveal";
import type { Profile } from "../../types/portfolio.ts";
import "./Hero.css";
/** Perfil que alimenta el bloque de presentación principal. */
type HeroProps = { profile: Profile };

const typewriter = keyframes`
  from {
    clip-path: inset(0 100% 0 0);
    opacity: 1;
    animation-timing-function: steps(28, end);
  }

  to {
    clip-path: inset(0 0 0 0);
    opacity: 1;
  }
`;

/** Presenta los datos personales destacados y dirige a la sección de proyectos. */
function Hero({ profile }: HeroProps) {
  return (
    <section className="hero" id="inicio">
        <p className="hero__availability">● {profile.availability}</p>
        <Reveal keyframes={typewriter} duration={1800} delay={150} triggerOnce>
          <h1>
            Hola, soy <span>{profile.name}.</span>
          </h1>
        </Reveal>
        <p className="hero__role">{profile.role}</p>
        <p className="hero__intro">{profile.intro}</p>
        <div className="hero__meta">
          <span>⌖ {profile.location}</span>
          <a href="#proyectos">Ver proyectos ↓</a>
        </div>
    </section>
  );
}
export default Hero;

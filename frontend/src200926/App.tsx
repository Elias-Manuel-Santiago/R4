import { useState } from "react";
import { Fade, Slide } from "react-awesome-reveal";
import AdminPanel from "./components/AdminPanel/AdminPanel.tsx";
import ExperienceList from "./components/ExperienceList/ExperienceList.tsx";
import Header from "./components/Header/Header.tsx";
import Hero from "./components/Hero/Hero.tsx";
import PortfolioFooter from "./components/PortfolioFooter/PortfolioFooter.tsx";
import ProjectGrid from "./components/ProjectGrid/ProjectGrid.tsx";
import SectionTitle from "./components/SectionTitle/SectionTitle.tsx";
import SkillsGrid from "./components/SkillsGrid/SkillsGrid.tsx";
import ThemeButton from "./components/ThemeButton/ThemeButton.tsx";
import { usePortfolio } from "./hooks/usePortfolio.ts";
import { useTema } from "./hooks/useTheme.ts";
import "./App.css";

function App() {
  const { tema, toggleTema } = useTema();
  const portfolio = usePortfolio();
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <main className="app-shell">
      <Header name={portfolio.data.profile.name} />
      {portfolio.error && (
        <p className="connection-notice" role="status">
          Mostrando contenido de ejemplo. Iniciá el backend para cargar tu
          información guardada.
        </p>
      )}
      <Hero profile={portfolio.data.profile} />
      <section className="portfolio-section" id="habilidades">
        <Fade triggerOnce>
          <SectionTitle
            eyebrow="01 / herramientas"
            title="Habilidades que uso para crear."
          />
          <SkillsGrid items={portfolio.bySection.skills} />
        </Fade>
      </section>
      <section
        className="portfolio-section portfolio-section--tinted"
        id="experiencia"
      >
        <Slide direction="up" triggerOnce>
          <SectionTitle
            eyebrow="02 / recorrido"
            title="Experiencia y logros."
          />
          <ExperienceList
            experiences={portfolio.bySection.experience}
            achievements={portfolio.bySection.achievement}
          />
        </Slide>
      </section>
      <section className="portfolio-section" id="proyectos">
        <Fade triggerOnce>
          <SectionTitle
            eyebrow="03 / selección"
            title="Proyectos realizados."
          />
          <ProjectGrid items={portfolio.bySection.project} />
        </Fade>
      </section>
      <section
        className="portfolio-section portfolio-section--contact"
        id="contacto"
      >
        <Fade triggerOnce>
          <SectionTitle
            eyebrow="04 / contacto"
            title="¿Creamos algo útil juntas?"
          />
          <a
            className="contact-link"
            href={`mailto:${portfolio.data.profile.email}`}
          >
            {portfolio.data.profile.email}
          </a>
        </Fade>
      </section>
      <PortfolioFooter onOpenAdmin={() => setAdminOpen(true)} />
      <ThemeButton tema={tema} onToggle={toggleTema} />
      {adminOpen && (
        <AdminPanel
          portfolio={portfolio.data}
          busy={portfolio.saving}
          onClose={() => setAdminOpen(false)}
          onCreate={portfolio.createItem}
          onUpdate={portfolio.updateItem}
          onDelete={portfolio.deleteItem}
          onUpdateProfile={portfolio.updateProfile}
        />
      )}
    </main>
  );
}

export default App;

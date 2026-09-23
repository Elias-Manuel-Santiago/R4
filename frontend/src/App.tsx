import { useState } from "react";
import { Fade, Slide } from "react-awesome-reveal";
import AdminPanel from "./components/AdminPanel/AdminPanel.tsx";
import AdminLogin from "./components/AdminLogin/AdminLogin.tsx";
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

/** Ensambla la página pública y conecta el panel administrador al estado de la app. */
function App() {
  const { tema, toggleTema } = useTema();
  const portfolio = usePortfolio();
  const [adminOpen, setAdminOpen] = useState(false);
  const [adminLoginOpen, setAdminLoginOpen] = useState(false);
  const [adminPassword, setAdminPassword] = useState<string>();

  function openAdmin() {
    setAdminLoginOpen(true);
  }

  function closeAdmin() {
    setAdminPassword(undefined);
    setAdminOpen(false);
  }

  return (
    <main className="app-shell">
      <Header name={portfolio.data.profile.name} />
      {/* Explica que se muestran datos locales cuando no se pudo acceder al servidor. */}
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
        <Slide direction="left" triggerOnce>
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
            title="Si me necesitás"
          />
          <a
            className="contact-link"
            href={`mailto:${portfolio.data.profile.email}`}
          >
            {portfolio.data.profile.email}
          </a>
          {portfolio.data.profile.phone && (
            <a
              className="contact-link"
              href={`tel:${portfolio.data.profile.phone.replace(/[^+\d]/g, "")}`}
            >
              {portfolio.data.profile.phone}
            </a>
          )}
        </Fade>
      </section>
      <PortfolioFooter onOpenAdmin={openAdmin} />
      <ThemeButton tema={tema} onToggle={toggleTema} />
      {/* El formulario administrativo solo existe en pantalla después de abrirlo. */}
      {adminOpen && (
        <AdminPanel
          portfolio={portfolio.data}
          busy={portfolio.saving}
          onClose={closeAdmin}
          onCreate={(item) => portfolio.createItem(item, adminPassword!)}
          onUpdate={(id, item) => portfolio.updateItem(id, item, adminPassword!)}
          onDelete={(id) => portfolio.deleteItem(id, adminPassword!)}
          onUpdateProfile={(profile) =>
            portfolio.updateProfile(profile, adminPassword!)
          }
        />
      )}
      {adminLoginOpen && (
        <AdminLogin
          onAuthenticated={(password) => {
            setAdminPassword(password);
            setAdminLoginOpen(false);
            setAdminOpen(true);
          }}
          onClose={() => setAdminLoginOpen(false)}
        />
      )}
    </main>
  );
}

export default App;

/** Secciones que la interfaz sabe mostrar y que acepta la API. */
export type PortfolioSection =
  | "skills"
  | "experience"
  | "achievement"
  | "project";
/** Datos de una tarjeta de habilidad, experiencia, logro o proyecto. */
export type PortfolioItem = {
  id: number;
  section: PortfolioSection;
  title: string;
  subtitle: string;
  description: string;
  dateLabel: string;
  tags: string[];
  link: string;
  imageUrl: string;
  displayOrder: number;
};
/** Información personal que se muestra en la cabecera del portafolio. */
export type Profile = {
  name: string;
  role: string;
  intro: string;
  email: string;
  location: string;
  availability: string;
};
/** Respuesta completa consumida por la aplicación. */
export type PortfolioData = { profile: Profile; items: PortfolioItem[] };

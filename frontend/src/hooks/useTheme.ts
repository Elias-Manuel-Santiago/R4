import { useEffect, useState } from "react";
/** Los dos temas visuales admitidos por la página. */
type Tema = "dark" | "light";

/** Recupera la preferencia guardada o, si no existe, usa la del sistema operativo. */
function obtenerTemaInicial(): Tema {
  const guardado = localStorage.getItem("tema") as Tema | null;
  if (guardado === "dark" || guardado === "light") return guardado;
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}
// El hook concentra la persistencia de preferencia para mantener el componente simple.
export function useTema() {
  const [tema, setTema] = useState<Tema>(obtenerTemaInicial);
  useEffect(() => {
    // La clase en <html> activa las variables CSS del tema elegido.
    document.documentElement.classList.toggle("dark", tema === "dark");
    localStorage.setItem("tema", tema);
  }, [tema]);
  return {
    tema,
    // Alterna el tema sin repetir esta condición en los componentes visuales.
    toggleTema: () =>
      setTema((actual) => (actual === "dark" ? "light" : "dark")),
  };
}

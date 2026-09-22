import { useEffect, useState } from "react";
type Tema = "dark" | "light";
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
    document.documentElement.classList.toggle("dark", tema === "dark");
    localStorage.setItem("tema", tema);
  }, [tema]);
  return {
    tema,
    toggleTema: () =>
      setTema((actual) => (actual === "dark" ? "light" : "dark")),
  };
}

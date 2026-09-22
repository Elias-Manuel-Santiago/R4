import "./App.css";
import SkillsList from "./components/SkillsList.tsx";

/** Contenedor mínimo de la versión anterior; delega la vista a SkillsList. */
function App() {
  return (
    <>
      <SkillsList />
    </>
  );
}

export default App;

import { useEffect, useMemo, useState } from "react";
import portfolioSnapshot from "../data/portfolioSnapshot.json";
import { portfolioApi } from "../services/portfolioApi.ts";
import type {
  PortfolioData,
  PortfolioItem,
  PortfolioSection,
  Profile,
} from "../types/portfolio.ts";
/** Orden de las secciones que se transforma en grupos para la interfaz. */
const sections: PortfolioSection[] = [
  "skills",
  "experience",
  "achievement",
  "project",
];
export function usePortfolio() {
  // El snapshot se incorpora al bundle, por lo que la primera vista no espera a la base.
  const [data, setData] = useState<PortfolioData>(
    portfolioSnapshot as PortfolioData,
  );
  const [error, setError] = useState(false);
  const [saving, setSaving] = useState(false);
  useEffect(() => {
    // Luego se sincroniza en segundo plano con la información más reciente de la API.
    portfolioApi
      .load()
      .then(setData)
      .catch(() => setError(true));
  }, []);
  const bySection = useMemo(
    // Agrupa y ordena los elementos solo cuando cambia la lista original.
    () =>
      Object.fromEntries(
        sections.map((section) => [
          section,
          data.items
            .filter((item) => item.section === section)
            .sort((a, b) => a.displayOrder - b.displayOrder),
        ]),
      ) as Record<PortfolioSection, PortfolioItem[]>,
    [data.items],
  );
  async function execute(action: () => Promise<void>) {
    // Todas las operaciones de escritura comparten el indicador de espera y el error.
    setSaving(true);
    try {
      await action();
      setError(false);
    } catch {
      setError(true);
    } finally {
      setSaving(false);
    }
  }
  const createItem = async (
    item: Omit<PortfolioItem, "id">,
    adminPassword: string,
  ) =>
    execute(async () => {
      const saved = await portfolioApi.createItem(item, adminPassword);
      setData((current) => ({ ...current, items: [...current.items, saved] }));
    });
  const updateItem = async (
    id: number,
    item: Omit<PortfolioItem, "id">,
    adminPassword: string,
  ) =>
    execute(async () => {
      const saved = await portfolioApi.updateItem(id, item, adminPassword);
      setData((current) => ({
        ...current,
        items: current.items.map((currentItem) =>
          currentItem.id === id ? saved : currentItem,
        ),
      }));
    });
  const deleteItem = async (id: number, adminPassword: string) =>
    execute(async () => {
      await portfolioApi.deleteItem(id, adminPassword);
      setData((current) => ({
        ...current,
        items: current.items.filter((item) => item.id !== id),
      }));
    });
  const updateProfile = async (profile: Profile, adminPassword: string) =>
    execute(async () => {
      const saved = await portfolioApi.updateProfile(profile, adminPassword);
      setData((current) => ({ ...current, profile: saved }));
    });
  return {
    data,
    bySection,
    error,
    saving,
    createItem,
    updateItem,
    deleteItem,
    updateProfile,
  };
}

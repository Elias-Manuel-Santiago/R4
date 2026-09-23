import type {
  PortfolioData,
  PortfolioItem,
  Profile,
} from "../types/portfolio.ts";
// En producción se define VITE_API_URL; durante desarrollo Vite redirige /api al backend local.
const apiUrl = import.meta.env.VITE_API_URL ?? "/api";

/**
 * Envía una solicitud HTTP a la API y traduce una respuesta fallida en un error.
 * El tipo genérico T indica el dato que se espera recibir al finalizar.
 */
async function request<T>(
  path: string,
  options?: RequestInit,
  adminPassword?: string,
): Promise<T> {
  const headers = new Headers(options?.headers);
  headers.set("Content-Type", "application/json");
  if (adminPassword) headers.set("X-Admin-Password", adminPassword);
  const response = await fetch(`${apiUrl}${path}`, {
    headers,
    ...options,
  });
  if (!response.ok) throw new Error("No se pudo comunicar con la API.");
  if (response.status === 204) return undefined as T;
  return response.json() as Promise<T>;
}
/** Operaciones disponibles para consultar y modificar los datos del portafolio. */
export const portfolioApi = {
  // La API expone esta lectura como POST; no lleva cuerpo porque solo solicita el portafolio.
  load: () => request<PortfolioData>("/portfolio", { method: "POST" }),
  createItem: (item: Omit<PortfolioItem, "id">, adminPassword: string) =>
    request<PortfolioItem>("/items", {
      method: "POST",
      body: JSON.stringify(item),
    }, adminPassword),
  updateItem: (
    id: number,
    item: Omit<PortfolioItem, "id">,
    adminPassword: string,
  ) =>
    request<PortfolioItem>(`/items/${id}`, {
      method: "PUT",
      body: JSON.stringify(item),
    }, adminPassword),
  deleteItem: (id: number, adminPassword: string) =>
    request<void>(`/items/${id}`, { method: "DELETE" }, adminPassword),
  updateProfile: (profile: Profile, adminPassword: string) =>
    request<Profile>("/profile", {
      method: "PUT",
      body: JSON.stringify(profile),
    }, adminPassword),
  verifyAdminPassword: (password: string) =>
    request<void>("/admin/verify", {
      method: "POST",
      body: JSON.stringify({ password }),
    }),
};

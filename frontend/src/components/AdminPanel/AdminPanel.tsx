import { useMemo, useState, type FormEvent } from "react";
import type {
  PortfolioData,
  PortfolioItem,
  PortfolioSection,
  Profile,
} from "../../types/portfolio.ts";
import "./AdminPanel.css";

/** Datos y acciones que el panel recibe de la aplicación principal. */
type Props = {
  portfolio: PortfolioData;
  busy: boolean;
  onClose: () => void;
  onCreate: (item: Omit<PortfolioItem, "id">) => Promise<void>;
  onUpdate: (id: number, item: Omit<PortfolioItem, "id">) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  onUpdateProfile: (profile: Profile) => Promise<void>;
};
/** Estado editable de un material; tagsText facilita editar las etiquetas en un input. */
type ItemDraft = {
  section: PortfolioSection;
  title: string;
  subtitle: string;
  description: string;
  dateLabel: string;
  tags: string[];
  tagsText: string;
  link: string;
  imageUrl: string;
  displayOrder: number;
};
/** Opciones permitidas por el selector de sección. */
const sections: PortfolioSection[] = [
  "skills",
  "experience",
  "achievement",
  "project",
];
/** Nombres visibles y orden de agrupación para los tipos de material. */
const sectionLabels: Record<PortfolioSection, string> = {
  skills: "Habilidades",
  experience: "Experiencia",
  achievement: "Logros",
  project: "Proyectos",
};
type ConditionalField = "dateLabel" | "tagsText" | "link" | "imageUrl";
/** Campos que se muestran en cada tipo según los componentes públicos del portfolio. */
const availableFields: Record<PortfolioSection, readonly ConditionalField[]> = {
  skills: ["tagsText"],
  experience: ["dateLabel"],
  achievement: ["dateLabel"],
  project: ["dateLabel", "tagsText", "link", "imageUrl"],
};
/** Valores iniciales usados al crear un material nuevo. */
const emptyDraft: ItemDraft = {
  section: "skills",
  title: "",
  subtitle: "",
  description: "",
  dateLabel: "",
  tags: [],
  tagsText: "",
  link: "",
  imageUrl: "",
  displayOrder: 1,
};
/** Convierte las etiquetas del array a texto separado por comas para el formulario. */
function draftFromItem(item?: PortfolioItem): ItemDraft {
  return item ? { ...item, tagsText: item.tags.join(", ") } : emptyDraft;
}

/** Evita guardar información que no se utiliza en el tipo seleccionado. */
function itemFromDraft(draft: ItemDraft): Omit<PortfolioItem, "id"> {
  const { tagsText, ...base } = draft;
  const fieldIsAvailable = (field: ConditionalField) =>
    availableFields[draft.section].includes(field);
  return {
    ...base,
    dateLabel: fieldIsAvailable("dateLabel") ? base.dateLabel : "",
    tags: fieldIsAvailable("tagsText")
      ? tagsText
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean)
      : [],
    link: fieldIsAvailable("link") ? base.link : "",
    imageUrl: fieldIsAvailable("imageUrl") ? base.imageUrl : "",
  };
}

/** Formulario reutilizable: crea un material o carga uno existente para editarlo. */
function ItemForm({
  item,
  busy,
  onSave,
  onCancel,
}: {
  item?: PortfolioItem;
  busy: boolean;
  onSave: (draft: Omit<PortfolioItem, "id">) => Promise<void>;
  onCancel: () => void;
}) {
  const [draft, setDraft] = useState<ItemDraft>(() => draftFromItem(item));
  // La clave genérica impide actualizar una propiedad que no forme parte del borrador.
  const update = <K extends keyof ItemDraft>(key: K, value: ItemDraft[K]) =>
    setDraft((current) => ({ ...current, [key]: value }));
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onSave(itemFromDraft(draft));
    if (!item) setDraft(emptyDraft);
  }
  const fieldIsAvailable = (field: ConditionalField) =>
    availableFields[draft.section].includes(field);
  return (
    <form className="admin-form admin-item-form" onSubmit={submit}>
      <h3>{item ? "Editar material" : "Agregar material"}</h3>
      <label>
        Sección
        <select
          value={draft.section}
          onChange={(event) =>
            update("section", event.target.value as PortfolioSection)
          }
        >
          {sections.map((section) => (
            <option key={section} value={section}>
              {sectionLabels[section]}
            </option>
          ))}
        </select>
      </label>
      <label>
        Título
        <input
          required
          value={draft.title}
          onChange={(event) => update("title", event.target.value)}
        />
      </label>
      <label>
        Subtítulo
        <input
          value={draft.subtitle}
          onChange={(event) => update("subtitle", event.target.value)}
        />
      </label>
      <label className="admin-form__full-width">
        Descripción
        <textarea
          required
          rows={3}
          value={draft.description}
          onChange={(event) => update("description", event.target.value)}
        />
      </label>
      <div className="admin-form__row admin-form__full-width">
        <label>
          {draft.section === "project" ? "Tecnologías" : "Fecha"}
          <input
            disabled={!fieldIsAvailable("dateLabel")}
            value={draft.dateLabel}
            onChange={(event) => update("dateLabel", event.target.value)}
          />
        </label>
        <label>
          Orden
          <input
            min="1"
            type="number"
            value={draft.displayOrder}
            onChange={(event) =>
              update("displayOrder", Number(event.target.value))
            }
          />
        </label>
      </div>
      <label>
        Etiquetas (separadas por coma)
        <input
          disabled={!fieldIsAvailable("tagsText")}
          value={draft.tagsText}
          onChange={(event) => update("tagsText", event.target.value)}
        />
      </label>
      <label>
        Enlace
        <input
          disabled={!fieldIsAvailable("link")}
          type="url"
          value={draft.link}
          onChange={(event) => update("link", event.target.value)}
        />
      </label>
      <label>
        URL de imagen
        <input
          disabled={!fieldIsAvailable("imageUrl")}
          type="url"
          value={draft.imageUrl}
          onChange={(event) => update("imageUrl", event.target.value)}
        />
      </label>
      <div className="admin-actions admin-form__full-width">
        <button className="admin-button" disabled={busy}>
          {busy ? "Guardando…" : "Guardar"}
        </button>
        {item && (
          <button
            className="admin-button admin-button--secondary"
            type="button"
            onClick={onCancel}
          >
            Cancelar edición
          </button>
        )}
      </div>
    </form>
  );
}

/** Diálogo que permite editar el perfil y administrar los materiales del portafolio. */
function AdminPanel({
  portfolio,
  busy,
  onClose,
  onCreate,
  onUpdate,
  onDelete,
  onUpdateProfile,
}: Props) {
  const [profile, setProfile] = useState(portfolio.profile);
  // undefined representa el modo de creación; un item habilita el modo de edición.
  const [editing, setEditing] = useState<PortfolioItem | undefined>();
  const [pendingDeletion, setPendingDeletion] = useState<
    PortfolioItem | undefined
  >();
  const itemsBySection = useMemo(
    () =>
      [...portfolio.items].sort(
        (first, second) =>
          sections.indexOf(first.section) - sections.indexOf(second.section) ||
          first.displayOrder - second.displayOrder ||
          first.id - second.id,
      ),
    [portfolio.items],
  );
  async function saveProfile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await onUpdateProfile(profile);
  }
  async function deletePendingItem() {
    if (!pendingDeletion) return;
    await onDelete(pendingDeletion.id);
    setPendingDeletion(undefined);
  }
  return (
    <div className="admin-overlay" role="presentation">
      <section
        className="admin-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-title"
      >
        <header className="admin-panel__header">
          <div>
            <p>Modo administrador</p>
            <h2 id="admin-title">Editar portfolio</h2>
          </div>
          <button
            className="admin-close"
            type="button"
            onClick={onClose}
            aria-label="Cerrar editor"
          >
            ×
          </button>
        </header>
        <form className="admin-form admin-profile" onSubmit={saveProfile}>
          <h3>Datos personales</h3>
          <label>
            Nombre
            <input
              required
              value={profile.name}
              onChange={(event) =>
                setProfile({ ...profile, name: event.target.value })
              }
            />
          </label>
          <label>
            Rol
            <input
              required
              value={profile.role}
              onChange={(event) =>
                setProfile({ ...profile, role: event.target.value })
              }
            />
          </label>
          <label className="admin-form__full-width">
            Presentación
            <textarea
              required
              rows={3}
              value={profile.intro}
              onChange={(event) =>
                setProfile({ ...profile, intro: event.target.value })
              }
            />
          </label>
          <div className="admin-form__row admin-form__full-width">
            <label>
              Email
              <input
                required
                type="email"
                value={profile.email}
                onChange={(event) =>
                  setProfile({ ...profile, email: event.target.value })
                }
              />
            </label>
            <label>
              Ubicación
              <input
                value={profile.location}
                onChange={(event) =>
                  setProfile({ ...profile, location: event.target.value })
                }
              />
            </label>
          </div>
          <label className="admin-form__full-width">
            Disponibilidad
            <input
              value={profile.availability}
              onChange={(event) =>
                setProfile({ ...profile, availability: event.target.value })
              }
            />
          </label>
          <button
            className="admin-button admin-form__full-width"
            disabled={busy}
          >
            {busy ? "Guardando…" : "Guardar perfil"}
          </button>
        </form>
        <div className="admin-materials">
          {/* key reinicia el estado interno del formulario al cambiar de material. */}
          <ItemForm
            key={editing?.id ?? "new"}
            item={editing}
            busy={busy}
            onCancel={() => setEditing(undefined)}
            onSave={async (draft) => {
              // Se decide entre actualizar el item seleccionado o crear uno desde cero.
              if (editing) {
                await onUpdate(editing.id, draft);
                setEditing(undefined);
              } else {
                await onCreate(draft);
              }
            }}
          />
          <div className="admin-list">
            <h3>Materiales existentes</h3>
            {itemsBySection.map((item) => (
              <article key={item.id}>
                <span>{sectionLabels[item.section]}</span>
                <strong>{item.title}</strong>
                <div>
                  <button type="button" onClick={() => setEditing(item)}>
                    Editar
                  </button>
                  <button
                    type="button"
                    disabled={busy}
                    onClick={() => setPendingDeletion(item)}
                  >
                    Eliminar
                  </button>
                </div>
              </article>
          ))}
          </div>
        </div>
      </section>
      {pendingDeletion && (
        <div className="admin-confirmation" role="presentation">
          <section
            aria-describedby="delete-material-description"
            aria-labelledby="delete-material-title"
            aria-modal="true"
            className="admin-confirmation__dialog"
            role="dialog"
          >
            <p>Acción irreversible</p>
            <h2 id="delete-material-title">¿Eliminar material?</h2>
            <p id="delete-material-description">
              Vas a eliminar “{pendingDeletion.title}”. Esta acción no se puede
              deshacer.
            </p>
            <div className="admin-confirmation__actions">
              <button
                autoFocus
                className="admin-button admin-button--secondary"
                disabled={busy}
                onClick={() => setPendingDeletion(undefined)}
                type="button"
              >
                Cancelar
              </button>
              <button
                className="admin-button admin-button--danger"
                disabled={busy}
                onClick={() => void deletePendingItem()}
                type="button"
              >
                {busy ? "Eliminando…" : "Eliminar material"}
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
export default AdminPanel;

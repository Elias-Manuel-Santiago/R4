import { useState, type FormEvent } from "react";
import { portfolioApi } from "../../services/portfolioApi.ts";
import "./AdminLogin.css";

type Props = {
  onClose: () => void;
  onAuthenticated: (password: string) => void;
};

/** Pide la contraseña sin guardarla ni mostrarla fuera del formulario. */
function AdminLogin({ onClose, onAuthenticated }: Props) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSending(true);
    setError("");
    try {
      await portfolioApi.verifyAdminPassword(password);
      const verifiedPassword = password;
      setPassword("");
      onAuthenticated(verifiedPassword);
    } catch {
      setError("No se pudo validar la contraseña. Revisala e intentá nuevamente.");
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="admin-login-overlay" role="presentation">
      <section
        className="admin-login"
        aria-labelledby="admin-login-title"
        aria-modal="true"
        role="dialog"
      >
        <button
          aria-label="Cerrar acceso administrador"
          className="admin-login__close"
          onClick={onClose}
          type="button"
        >
          ×
        </button>
        <p>Área privada</p>
        <h2 id="admin-login-title">Acceso administrador</h2>
        <form onSubmit={submit}>
          <label>
            Contraseña
            <input
              autoComplete="current-password"
              autoFocus
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              value={password}
            />
          </label>
          {error && <p className="admin-login__error" role="alert">{error}</p>}
          <button className="admin-button" disabled={sending}>
            {sending ? "Verificando…" : "Ingresar"}
          </button>
        </form>
      </section>
    </div>
  );
}

export default AdminLogin;

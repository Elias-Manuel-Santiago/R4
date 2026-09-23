import { timingSafeEqual } from "node:crypto";

/** Indica si el servicio tiene los dos secretos necesarios para habilitar el editor. */
export function adminAuthIsConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

/** Compara dos secretos sin revelar el valor configurado por diferencias de tiempo. */
export function passwordIsValid(password) {
  if (!adminAuthIsConfigured() || typeof password !== "string") return false;
  const expected = Buffer.from(process.env.ADMIN_PASSWORD, "utf8");
  const received = Buffer.from(password, "utf8");
  return (
    expected.length === received.length && timingSafeEqual(expected, received)
  );
}

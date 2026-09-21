import connection from './db.js'

const validSections = ['skills', 'experience', 'achievement', 'project']
const profileDefault = { name: '', role: '', intro: '', email: '', location: '', availability: '' }

function clientError(message) { const error = new Error(message); error.status = 400; return error }
function notFound(message) { const error = new Error(message); error.status = 404; return error }

function parseTags(tags) {
  if (Array.isArray(tags)) return tags.map(tag => String(tag).trim()).filter(Boolean)
  try { const parsed = JSON.parse(tags || '[]'); return Array.isArray(parsed) ? parsed : [] } catch { return [] }
}

function mapItem(row) { return { ...row, tags: parseTags(row.tags), displayOrder: Number(row.displayOrder) } }
function itemValues(item) {
  if (!validSections.includes(item.section)) throw clientError('La sección indicada no existe.')
  if (!String(item.title ?? '').trim() || !String(item.description ?? '').trim()) throw clientError('Título y descripción son obligatorios.')
  return [item.section, String(item.title).trim(), String(item.subtitle ?? '').trim(), String(item.description).trim(), String(item.dateLabel ?? '').trim(), JSON.stringify(parseTags(item.tags)), String(item.link ?? '').trim(), String(item.imageUrl ?? '').trim(), Math.max(1, Number(item.displayOrder) || 1)]
}

function profileValues(profile) {
  if (!String(profile.name ?? '').trim() || !String(profile.role ?? '').trim() || !String(profile.email ?? '').trim()) throw clientError('Nombre, rol y email son obligatorios.')
  return ['name', 'role', 'intro', 'email', 'location', 'availability'].map(field => String(profile[field] ?? '').trim())
}

const itemColumns = 'id, section, title, subtitle, description, date_label AS dateLabel, tags, link, image_url AS imageUrl, display_order AS displayOrder'

export async function listarSkills() {
  const [rows] = await connection.query('SELECT id, titulo, descripcion FROM skills')
  return rows
}

export async function listarPortfolio() {
  const [profiles] = await connection.query('SELECT name, role, intro, email, location, availability FROM portfolio_profile WHERE id = 1')
  const [items] = await connection.query(`SELECT ${itemColumns} FROM portfolio_items ORDER BY display_order, id`)
  return { profile: { ...profileDefault, ...profiles[0] }, items: items.map(mapItem) }
}

export async function crearItem(item) {
  const values = itemValues(item)
  const [result] = await connection.execute('INSERT INTO portfolio_items (section, title, subtitle, description, date_label, tags, link, image_url, display_order) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', values)
  const [rows] = await connection.execute(`SELECT ${itemColumns} FROM portfolio_items WHERE id = ?`, [result.insertId])
  return mapItem(rows[0])
}

export async function actualizarItem(id, item) {
  if (!Number.isInteger(id) || id < 1) throw clientError('Identificador inválido.')
  const values = itemValues(item)
  const [result] = await connection.execute('UPDATE portfolio_items SET section = ?, title = ?, subtitle = ?, description = ?, date_label = ?, tags = ?, link = ?, image_url = ?, display_order = ? WHERE id = ?', [...values, id])
  if (!result.affectedRows) throw notFound('No se encontró el material.')
  const [rows] = await connection.execute(`SELECT ${itemColumns} FROM portfolio_items WHERE id = ?`, [id])
  return mapItem(rows[0])
}

export async function eliminarItem(id) {
  if (!Number.isInteger(id) || id < 1) throw clientError('Identificador inválido.')
  const [result] = await connection.execute('DELETE FROM portfolio_items WHERE id = ?', [id])
  if (!result.affectedRows) throw notFound('No se encontró el material.')
}

export async function actualizarPerfil(profile) {
  const values = profileValues(profile)
  await connection.execute('INSERT INTO portfolio_profile (id, name, role, intro, email, location, availability) VALUES (1, ?, ?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE name = VALUES(name), role = VALUES(role), intro = VALUES(intro), email = VALUES(email), location = VALUES(location), availability = VALUES(availability)', values)
  const [rows] = await connection.query('SELECT name, role, intro, email, location, availability FROM portfolio_profile WHERE id = 1')
  return rows[0]
}

import './ThemeButton.css'
type Props = { tema: 'dark' | 'light'; onToggle: () => void }
function ThemeButton({ tema, onToggle }: Props) { const nextTheme = tema === 'dark' ? 'claro' : 'oscuro'; return <button className="theme-button" type="button" onClick={onToggle} aria-label={`Cambiar al modo ${nextTheme}`} title={`Cambiar al modo ${nextTheme}`}>{tema === 'dark' ? '☀' : '☾'}</button> }
export default ThemeButton

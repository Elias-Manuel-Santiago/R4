import './PortfolioFooter.css'
type Props = { onOpenAdmin: () => void }
function PortfolioFooter({ onOpenAdmin }: Props) { return <footer className="portfolio-footer"><p>Hecho con React, hooks y mucho mate.</p><button className="admin-trigger" type="button" aria-label="Abrir modo administrador" title="Modo administrador" onClick={onOpenAdmin}>•</button></footer> }
export default PortfolioFooter

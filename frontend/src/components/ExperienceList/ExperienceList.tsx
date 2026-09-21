import type { PortfolioItem } from '../../types/portfolio.ts'
import './ExperienceList.css'
type Props = { experiences: PortfolioItem[]; achievements: PortfolioItem[] }
function ExperienceList({ experiences, achievements }: Props) { const all = [...experiences, ...achievements].sort((a, b) => a.displayOrder - b.displayOrder); return <div className="timeline">{all.map(item => <article className="timeline__item" key={item.id}><p className="timeline__date">{item.dateLabel}</p><div><span className="timeline__kind">{item.section === 'achievement' ? 'Logro' : 'Experiencia'}</span><h3>{item.title}</h3><p className="timeline__subtitle">{item.subtitle}</p><p>{item.description}</p></div></article>)}</div> }
export default ExperienceList

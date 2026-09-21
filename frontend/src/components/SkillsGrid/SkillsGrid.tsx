import type { PortfolioItem } from '../../types/portfolio.ts'
import './SkillsGrid.css'
type Props = { items: PortfolioItem[] }
function SkillsGrid({ items }: Props) { return <div className="skills-grid">{items.map((item, index) => <article className="skill-card" key={item.id}><span className="skill-card__number">0{index + 1}</span><h3>{item.title}</h3><p className="skill-card__subtitle">{item.subtitle}</p><p>{item.description}</p><div>{item.tags.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div></article>)}</div> }
export default SkillsGrid

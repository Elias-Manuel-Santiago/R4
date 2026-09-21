import './SectionTitle.css'
type Props = { eyebrow: string; title: string }
function SectionTitle({ eyebrow, title }: Props) { return <header className="section-title"><p>{eyebrow}</p><h2>{title}</h2></header> }
export default SectionTitle

export type PortfolioSection = 'skills' | 'experience' | 'achievement' | 'project'
export type PortfolioItem = { id: number; section: PortfolioSection; title: string; subtitle: string; description: string; dateLabel: string; tags: string[]; link: string; imageUrl: string; displayOrder: number }
export type Profile = { name: string; role: string; intro: string; email: string; location: string; availability: string }
export type PortfolioData = { profile: Profile; items: PortfolioItem[] }

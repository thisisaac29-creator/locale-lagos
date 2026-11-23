import type { Metadata } from 'next'
import { MenuTabs } from '@/components/menu/MenuTabs'

export const metadata: Metadata = {
  title: 'Menu',
  description:
    'Explore the Locale Lagos menu, with dishes, drinks, desserts and shisha and prices where available.',
}

export default function MenuPage() {
  return (
    <>
      <section className="frame pb-6 pt-28 md:pb-8 md:pt-36" aria-labelledby="menu-title">
        <h1 id="menu-title" className="display text-[clamp(3.25rem,13vw,8rem)]">
          Menu
        </h1>
      </section>
      <MenuTabs />
    </>
  )
}

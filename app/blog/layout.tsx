import { PublicHeader, PublicFooter } from '@/src/features/shared/components/layout'

/**
 * Public Layout - Layout for blog and public pages
 */
export default function BlogLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicHeader />
      <main>{children}</main>
      <PublicFooter />
    </>
  )
}

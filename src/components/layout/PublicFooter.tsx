import Link from 'next/link'
import { routes } from '@/src/config/routes'

/**
 * PublicFooter - Footer for public pages
 */
export function PublicFooter() {
  return (
    <footer className="border-t bg-muted/40">
      <div className="wrapper py-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          <div>
            <h3 className="font-semibold mb-3">Product</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href={routes.blog} className="hover:text-foreground">
                  Blog
                </Link>
              </li>
              <li>
                <Link href={routes.auth.login} className="hover:text-foreground">
                  Sign In
                </Link>
              </li>
              <li>
                <Link href={routes.auth.signup} className="hover:text-foreground">
                  Sign Up
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link href={routes.dashboard.home} className="hover:text-foreground">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link href={routes.posts.createPost} className="hover:text-foreground">
                  Write
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Company</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-3">Legal</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <a href="#" className="hover:text-foreground">
                  Privacy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-foreground">
                  Terms
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} Blog App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

import { FCWithChildren } from '../helpers'
import { Footer } from './Footer'

export const Layout: FCWithChildren = ({ children }) => (
  <div className="container mx-auto text-stone-800 flex flex-col min-h-screen">
    <main className="grow">{children}</main>
    <div className="mt-40">
      <Footer />
    </div>
  </div>
)

import Navbar from './Navbar'
import Sidebar from './Sidebar'
import Footer from './Footer'

export default function CustomerLayout({ title = 'Dashboard', children }) {
  return (
    <div className="app-shell">
      <Sidebar role="customer" />
      <div className="main-panel">
        <Navbar title={title} />
        <main className="page-content">{children}</main>
        <Footer />
      </div>
    </div>
  )
}

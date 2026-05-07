import { Outlet } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

export function Layout() {
  return (
    <div>
      <div className="bg-academyNavy">
        <Navbar />
      </div>
      <Outlet />
      <Footer />
    </div>
  );
}

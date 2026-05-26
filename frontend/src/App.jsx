import { Link, Outlet } from 'react-router-dom';

export default function App() {
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/dashboard">Dashboard</Link>
      </nav>
      <main>
        <Outlet />
      </main>
    </>
  );
}


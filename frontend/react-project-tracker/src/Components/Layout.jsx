import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

const Layout = () => {
  return (
    <div className={styles.appContainer}>
        <header className={styles.navbar}>
            <div className={styles.navbarContent}>
                <div className={styles.logo}>🏠 Project Tracker</div>
                <nav className={styles.navLinks}>
                    <NavLink to="/" className={({ isActive }) => isActive ? styles.active : styles.link}>
                        Home
                    </NavLink>
                    <NavLink to="/about" className={({ isActive }) => isActive ? styles.active : styles.link}>
                        About
                    </NavLink>
                </nav>
            </div>
        </header>

        <main className={styles.mainContent}>
            <Outlet />
        </main>

        <footer className={styles.footer}>
            &copy; {new Date().getFullYear()} Daniel Greenberg. All rights reserved.
        </footer>
    </div>
    );
};

export default Layout;

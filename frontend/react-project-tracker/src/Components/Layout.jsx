import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";
import { useAuth } from "../Context/AuthContext";

const Layout = () => {
    const { login, logout, isAuthenticated, token } = useAuth();

  return (
    <div className={styles.appContainer}>
        <header className={styles.navbar}>
            <div className={styles.navbarContent}>
                <div className={styles.logo}>Project Budget Tracker</div>
                <nav className={styles.navLinks}>
                    <NavLink to="/" className={({ isActive }) => isActive ? styles.active : styles.link}>
                        Home
                    </NavLink>
                    <NavLink to="/about" className={({ isActive }) => isActive ? styles.active : styles.link}>
                        About
                    </NavLink>
                    {isAuthenticated ? (
                        <button onClick={logout} className={styles.link}>Logout</button>
                    ) : (
                        <>
                            <NavLink to="/login" className={styles.link}>Login</NavLink>
                            <NavLink to="/signup" className={styles.link}>Signup</NavLink>
                        </>
                    )}
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

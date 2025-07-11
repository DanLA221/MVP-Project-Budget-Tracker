import { NavLink, Outlet, Link } from "react-router-dom";
import styles from "./Layout.module.css";
import { useAuth } from "../Context/AuthContext";

const Layout = () => {
    const { logout, isAuthenticated } = useAuth();

  return (
    <div className={styles.appContainer}>
        <header className={styles.navbar}>
            <div className={styles.navbarContent}>
                <div className={styles.logo}>
                    <Link to="/" className={styles.link}>
                        Project Budget Tracker
                    </Link>
                </div>

                <nav className={styles.navLinks}>
                    {isAuthenticated && (
                        <NavLink to="/dashboard" className={({ isActive }) => isActive ? styles.active : styles.link}>
                            Dashboard
                        </NavLink>
                    )}
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

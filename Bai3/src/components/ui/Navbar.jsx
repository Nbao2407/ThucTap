import { Link, useLocation } from "react-router-dom";
import styles from "../styles/Navbar.module.scss";
import classNames from 'classnames';

const Navbar = () => {
    const location = useLocation();

    return (
        <nav className={styles.navbar}>
            <div className={styles.logo}>Bai 3</div>
            <div className={styles.links}>
                <Link 
                    to="/todo" 
                    className={classNames(styles.link, { [styles.active]: location.pathname === '/todo' })}
                >
                    Todo App
                </Link>
                <Link 
                    to="/counter" 
                    className={classNames(styles.link, { [styles.active]: location.pathname === '/counter' })}
                >
                    Counter
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;

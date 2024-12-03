import styles from "./NavBar.module.css"; // Import the CSS module

function NavBar() {
  return (
    <nav className={`navbar navbar-expand-lg ${styles.navbar}`}>
      <div
        className={`container-fluid d-flex align-items-center ${styles.navContainer}`}
      >
        {/* Logo on the left */}
        <a className={`navbar-brand ${styles.logo}`} href="#">
          LOGO
        </a>

        {/* Center menu */}
        <div
          className={`collapse navbar-collapse justify-content-center`}
          id="navbarNavDropdown"
        >
          <ul className={`navbar-nav ${styles.menu}`}>
            <li className="nav-item">
              <a
                className={`nav-link active ${styles.navLink}`}
                aria-current="page"
                href="#"
              >
                Home
              </a>
            </li>
            <li className="nav-item">
              <a className={`nav-link ${styles.navLink}`} href="#">
                Client
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className={`nav-link dropdown-toggle ${styles.navLink}`}
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Generate
              </a>
              <ul className="dropdown-menu">
                <li>
                  <a className="dropdown-item" href="#">
                    Action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Another action
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="#">
                    Something else here
                  </a>
                </li>
              </ul>
            </li>
          </ul>
        </div>

        {/* Logout on the right */}
        <a className={`nav-link ms-auto ${styles.logout}`} href="#">
          Logout
        </a>
      </div>
    </nav>
  );
}

export default NavBar;

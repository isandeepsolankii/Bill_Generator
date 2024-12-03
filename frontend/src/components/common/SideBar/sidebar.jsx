import styles from "./sidebar.module.css"; // Import the CSS module

function SideBar() {
  return (
    <div className={styles.sidebar}>
      <h1 className={styles.heading}>Side Bar</h1>
      <ul className={styles.menu}>
        <li>Home</li>
        <li>Profile</li>
        <li>Settings</li>
        <li>Logout</li>
      </ul>
    </div>
  );
}

export default SideBar;

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Cookies } from "react-cookie";
import styles from "./navbar.module.css";

export default function Navbar() {
  const router = useRouter();
  const cookies = new Cookies();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    cookies.remove("token", { path: "/" });
    router.push("/login");
  };

  return (
    <nav className={styles["nav-container"]}>
      <span className={styles.logo}>MyCompany</span>

      <div className={styles.profile}>
        <button
          className={styles["profile-button"]}
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          Profile ⌄
        </button>
        {dropdownOpen && (
          <div className={styles["dropdown-menu"]}>
            <button onClick={() => router.push("/profile")}>
              View
            </button>
            <button onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </nav>
  );
}

"use client"

import styles from "./footer.module.css"

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.contact}>
        <p>Contact me: <a href="mailto:your.email@example.com" style={{color: "#60a5fa"}}>your.email@example.com</a></p>
      </div>
      <div className={styles["social-icons"]}>
        <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
            <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 001.88-2.37 8.61 8.61 0 01-2.72 1.04 4.29 4.29 0 00-7.3 3.92A12.18 12.18 0 013 4.79a4.28 4.28 0 001.33 5.72 4.23 4.23 0 01-1.94-.54v.05a4.29 4.29 0 003.44 4.2 4.3 4.3 0 01-1.93.07 4.29 4.29 0 004 2.98 8.6 8.6 0 01-5.32 1.84A8.8 8.8 0 012 19.54a12.12 12.12 0 006.56 1.92c7.88 0 12.2-6.53 12.2-12.19 0-.19 0-.37-.01-.56A8.65 8.65 0 0024 5.5a8.3 8.3 0 01-2.54.7z"/>
          </svg>
        </a>

        <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
            <path d="M4.98 3.5a2.5 2.5 0 11-.01 5 2.5 2.5 0 01.01-5zM3 8.8h4v11H3v-11zm7.5 0h3.75v1.54h.05a4.1 4.1 0 013.69-2c3.95 0 4.68 2.6 4.68 5.97v6.5h-4v-5.76c0-1.38-.03-3.15-1.92-3.15-1.92 0-2.22 1.5-2.22 3.05v5.86h-4v-11z"/>
          </svg>
        </a>

        <a href="https://github.com/yourprofile" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
            <path d="M12 2a10 10 0 00-3.16 19.49c.5.1.68-.22.68-.48v-1.69c-2.77.6-3.36-1.34-3.36-1.34a2.64 2.64 0 00-1.11-1.46c-.9-.62.07-.61.07-.61a2.1 2.1 0 011.53 1.04 2.14 2.14 0 002.92.83 2.14 2.14 0 01.64-1.34c-2.21-.25-4.53-1.1-4.53-4.91a3.83 3.83 0 011-2.68 3.56 3.56 0 01.1-2.65s.84-.27 2.75 1.02a9.48 9.48 0 015 0c1.91-1.29 2.75-1.02 2.75-1.02a3.56 3.56 0 01.1 2.65 3.82 3.82 0 011 2.68c0 3.82-2.32 4.66-4.54 4.9a2.4 2.4 0 01.68 1.87v2.78c0 .27.18.59.69.49A10 10 0 0012 2z"/>
          </svg>
        </a>
      </div>
    </footer>
  )
}

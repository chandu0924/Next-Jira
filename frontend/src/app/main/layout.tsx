// app/main/layout.tsx
"use client"

import Navbar from "../../components/Navbar/page"
import LeftSidebar from "../../components/Leftsidebar/page"
import RightSidebar from "../../components/Rightsidebar/page"
import Footer from "../../components/Footer/page"

export default function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="page-container">
      <Navbar />
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <LeftSidebar />
        <main style={{ flex: 1, padding: "1rem" }}>
          {children}
        </main>
        <RightSidebar />
      </div>
      <Footer />
    </div>
  )
}

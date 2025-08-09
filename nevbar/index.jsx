import React, { useState, useEffect } from "react";

export default function App() {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(null);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleDropdown = (menu) => {
    setDropdownOpen(dropdownOpen === menu ? null : menu);
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">MyLogo</div>

        {/* Hamburger for mobile */}
        {isMobile ? (
          <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </div>
        ) : null}

        {/* Menu */}
        <ul
          className={`nav-links ${
            isMobile ? (menuOpen ? "show" : "hide") : ""
          }`}
        >
          <li>Home</li>

          <li
            onMouseEnter={() => !isMobile && setDropdownOpen("services")}
            onMouseLeave={() => !isMobile && setDropdownOpen(null)}
            onClick={() => isMobile && toggleDropdown("services")}
          >
            Services ▾
            {dropdownOpen === "services" && (
              <ul className="dropdown">
                <li>Web Development</li>
                <li>Mobile Apps</li>
                <li>UI/UX Design</li>
              </ul>
            )}
          </li>

          <li
            onMouseEnter={() => !isMobile && setDropdownOpen("products")}
            onMouseLeave={() => !isMobile && setDropdownOpen(null)}
            onClick={() => isMobile && toggleDropdown("products")}
          >
            Products ▾
            {dropdownOpen === "products" && (
              <ul className="dropdown">
                <li>Product 1</li>
                <li>Product 2</li>
                <li>Product 3</li>
              </ul>
            )}
          </li>

          <li>Contact</li>
        </ul>
      </nav>

      {/* Internal CSS */}
      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        body {
          font-family: Arial, sans-serif;
        }
        .navbar {
          background: #333;
          color: #fff;
          padding: 10px 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          position: relative;
        }
        .logo {
          font-size: 1.5rem;
          font-weight: bold;
        }
        .nav-links {
          list-style: none;
          display: flex;
          gap: 20px;
        }
        .nav-links li {
          position: relative;
          cursor: pointer;
        }
        .dropdown {
          position: absolute;
          top: 100%;
          left: 0;
          background: #444;
          list-style: none;
          min-width: 150px;
          border-radius: 4px;
          overflow: hidden;
        }
        .dropdown li {
          padding: 10px;
          cursor: pointer;
        }
        .dropdown li:hover {
          background: #555;
        }
        .hamburger {
          font-size: 1.5rem;
          cursor: pointer;
          display: none;
        }
        /* Mobile Styles */
        @media (max-width: 768px) {
          .hamburger {
            display: block;
          }
          .nav-links {
            position: absolute;
            top: 60px;
            left: 0;
            background: #333;
            width: 100%;
            flex-direction: column;
            display: none;
          }
          .nav-links.show {
            display: flex;
          }
          .nav-links.hide {
            display: none;
          }
          .nav-links li {
            padding: 15px;
          }
        }
      `}</style>
    </div>
  );
}

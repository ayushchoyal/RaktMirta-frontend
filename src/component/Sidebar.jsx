// import React from "react";
// import { Nav } from "react-bootstrap";
// import {
//   FaHome,
//   FaHandHoldingHeart,
//   FaUserFriends,
//   FaHospital,
//   FaInfoCircle,
//   FaBars,
//    FaFileMedicalAlt
// } from "react-icons/fa";
// import "bootstrap/dist/css/bootstrap.min.css";

// const Sidebar = ({ isOpen, setIsOpen }) => {
//   return (
//     <>
//       {/* ---------- INLINE CSS FOR SIDEBAR + MOBILE NAV ---------- */}
//       <style>
//         {`
//           /* Desktop Sidebar */
//           .sidebar-desktop {
//             transition: width 0.3s ease;
//           }

//           /* Hide mobile nav by default */
//           .sidebar-mobile {
//             display: none;
//           }

//           /* Mobile UI */
//           @media (max-width: 768px) {
//             .sidebar-desktop {
//               display: none !important;
//             }

//             .sidebar-mobile {
//               display: block;
//               position: fixed;
//               bottom: 0;
//               left: 0;
//               width: 100%;
//               background: #dc3545; /* Danger color */
//               z-index: 10000;
//               border-top: 2px solid rgba(255, 255, 255, 0.3);
//             }

//             .sidebar-mobile a {
//               padding: 6px 10px;
//               color: white !important;
//             }
//           }
//         `}
//       </style>

//       {/* ------------ DESKTOP SIDEBAR ------------ */}
//       <div
//         className="sidebar-desktop bg-danger text-white p-3 vh-100 position-fixed"
//         style={{ width: isOpen ? "220px" : "60px" }}
//       >
//         {/* Toggle Button */}
//         <div
//           className="d-flex justify-content-between align-items-center mb-4"
//           style={{ cursor: "pointer" }}
//           onClick={() => setIsOpen(!isOpen)}
//         >
//           <span className="fw-bold">{isOpen ? "RaktMitra" : "RM"}</span>
//           <FaBars />
//         </div>

//         {/* Navigation Items */}
//         <Nav className="flex-column">
//           <Nav.Link href="/" className="text-white d-flex align-items-center mb-3">
//             <FaHome className="me-2" />
//             {isOpen && "Home"}
//           </Nav.Link>

//           <Nav.Link href="/blood_donor" className="text-white d-flex align-items-center mb-3">
//             <FaHandHoldingHeart className="me-2" />
//             {isOpen && "Donors"}
//           </Nav.Link>

//           {/* <Nav.Link href="/patients" className="text-white d-flex align-items-center mb-3">
//             <FaUserFriends className="me-2" />
//             {isOpen && "Patients"}
//           </Nav.Link> */}

//           <Nav.Link href="/AICheckup" className="text-white d-flex align-items-center mb-3">
//              <FaFileMedicalAlt className="me-2" />
//             {isOpen && "AI Checkup"}
//           </Nav.Link>

//           <Nav.Link href="/bloodbanks" className="text-white d-flex align-items-center mb-3">
//             <FaHospital className="me-2" />
//             {isOpen && "Blood Banks"}
//           </Nav.Link>

//           <Nav.Link href="/info" className="text-white d-flex align-items-center mb-3">
//             <FaInfoCircle className="me-2" />
//             {isOpen && "Information"}
//           </Nav.Link>
//         </Nav>
//       </div>

//       {/* ------------ MOBILE BOTTOM NAV ------------ */}
//       <div className="sidebar-mobile bg-danger text-white">
//         <Nav className="d-flex justify-content-around align-items-center py-2">

//           <Nav.Link href="/" className="text-white">
//             <FaHome size={22} />
//           </Nav.Link>

//           <Nav.Link href="/blood_donor" className="text-white">
//             <FaHandHoldingHeart size={22} />
//           </Nav.Link>

//           <Nav.Link href="/patients" className="text-white">
//             <FaUserFriends size={22} />
//           </Nav.Link>

//           <Nav.Link href="/bloodbanks" className="text-white">
//             <FaHospital size={22} />
//           </Nav.Link>

//           <Nav.Link href="/info" className="text-white">
//             <FaInfoCircle size={22} />
//           </Nav.Link>

//         </Nav>
//       </div>
//     </>
//   );
// };

// export default Sidebar;

import React from "react";
import { NavLink, Link } from "react-router-dom";

import {
  FaHome,
  FaHandHoldingHeart,
  FaHospital,
  FaInfoCircle,
  FaBars,
  FaFileMedicalAlt,
  FaTint,
  FaTimes,
} from "react-icons/fa";

const Sidebar = ({ isOpen, setIsOpen }) => {
  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: FaHome,
    },
    {
      name: "Donors",
      path: "/blood_donor",
      icon: FaHandHoldingHeart,
    },
    {
      name: "AI Checkup",
      path: "/AICheckup",
      icon: FaFileMedicalAlt,
    },
    {
      name: "Blood Banks",
      path: "/bloodbanks",
      icon: FaHospital,
    },
    {
      name: "Information",
      path: "/info",
      icon: FaInfoCircle,
    },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const closeMobileSidebar = () => {
    if (window.innerWidth <= 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* ================= CSS ================= */}

      <style>{`

        /* MAIN SIDEBAR */

        .rm-sidebar {
          position: fixed;
          top: 0;
          left: 0;
          bottom: 0;

          display: flex;
          flex-direction: column;

          width: 248px;

          background: #172338;
          color: #ffffff;

          z-index: 1100;

          overflow-x: hidden;
          overflow-y: auto;

          transition: width 0.3s ease,
                      transform 0.3s ease;

          scrollbar-width: thin;
          scrollbar-color: #3b4960 #172338;
        }

        .rm-sidebar.rm-collapsed {
          width: 76px;
        }

        /* BRAND */

        .rm-sidebar-brand {
          min-height: 88px;

          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;

          padding: 18px 16px;

          border-bottom: 1px solid
            rgba(255, 255, 255, 0.1);
        }

        .rm-sidebar-brand-link {
          display: flex;
          align-items: center;
          gap: 12px;

          min-width: 0;

          color: #ffffff;
          text-decoration: none;
        }

        .rm-sidebar-logo {
          width: 36px;
          height: 42px;

          display: flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          border-radius: 50% 50% 50% 10%;

          background: #e63946;
          color: white;

          font-size: 21px;

          transform: rotate(-45deg);
        }

        .rm-sidebar-logo svg {
          transform: rotate(45deg);
        }

        .rm-sidebar-brand-text {
          font-size: 22px;
          font-weight: 800;
          letter-spacing: -0.5px;
          white-space: nowrap;
        }

        .rm-sidebar-brand-text span {
          color: #ff5362;
        }

        .rm-sidebar-toggle {
          width: 32px;
          height: 32px;

          display: flex;
          align-items: center;
          justify-content: center;

          flex-shrink: 0;

          border: none;
          border-radius: 8px;

          background: transparent;
          color: #cbd5e1;

          font-size: 17px;

          cursor: pointer;

          transition: all 0.2s ease;
        }

        .rm-sidebar-toggle:hover {
          background: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }

        .rm-collapsed .rm-sidebar-brand {
          flex-direction: column;
          justify-content: center;
          gap: 10px;
          padding: 12px 6px;
        }

        /* NAVIGATION */

        .rm-sidebar-nav {
          display: flex;
          flex-direction: column;
          gap: 8px;

          flex: 1;

          padding: 22px 11px;
        }

        .rm-sidebar-label {
          min-height: 16px;

          padding: 0 13px;
          margin-bottom: 8px;

          color: #8290a5;

          font-size: 10px;
          font-weight: 700;
          letter-spacing: 1.5px;
        }

        .rm-sidebar-link {
          position: relative;

          min-height: 48px;

          display: flex;
          align-items: center;
          gap: 14px;

          padding: 12px 14px;

          border-radius: 9px;

          color: #d5ddeb;
          text-decoration: none;

          white-space: nowrap;

          transition: background 0.2s ease,
                      color 0.2s ease,
                      transform 0.2s ease;
        }

        .rm-sidebar-link:hover {
          background: rgba(255, 255, 255, 0.08);
          color: #ffffff;

          transform: translateX(2px);
        }

        .rm-sidebar-link.active {
          background: linear-gradient(
            100deg,
            #e63946,
            #d92e42
          );

          color: #ffffff;

          box-shadow: 0 5px 14px
            rgba(230, 57, 70, 0.2);
        }

        .rm-sidebar-icon {
          width: 22px;
          min-width: 22px;

          display: flex;
          align-items: center;
          justify-content: center;

          font-size: 19px;
        }

        .rm-sidebar-link-text {
          font-size: 14px;
          font-weight: 500;
        }

        .rm-collapsed .rm-sidebar-nav {
          padding-left: 10px;
          padding-right: 10px;
        }

        .rm-collapsed .rm-sidebar-link {
          justify-content: center;
          padding: 12px 8px;
        }

        /* BOTTOM DONATION CARD */

        .rm-sidebar-bottom {
          margin: 10px 15px 22px;
          padding: 18px 14px;

          border: 1px solid
            rgba(255, 83, 98, 0.65);

          border-radius: 16px;

          background: rgba(255, 255, 255, 0.025);
        }

        .rm-sidebar-heart {
          color: #ff5362;
          font-size: 48px;
          line-height: 1;
          text-align: center;
          margin-bottom: 12px;
        }

        .rm-sidebar-bottom h6 {
          margin-bottom: 8px;

          color: #ffffff;

          font-size: 15px;
          font-weight: 600;
          line-height: 1.6;
        }

        .rm-sidebar-bottom h6 span {
          color: #ff5362;
        }

        .rm-sidebar-bottom p {
          margin: 0;

          color: #aebbd0;

          font-size: 12px;
          line-height: 1.6;
        }

        /* MOBILE OVERLAY */

        .rm-sidebar-overlay {
          display: none;
        }

        /* MOBILE BOTTOM NAVIGATION */

        .rm-mobile-nav {
          display: none;
        }

        /* RESPONSIVE */

        @media (max-width: 768px) {

          .rm-sidebar {
            width: 260px !important;

            transform: translateX(-100%);

            z-index: 1200;
          }

          .rm-sidebar.rm-mobile-open {
            transform: translateX(0);
          }

          .rm-sidebar.rm-collapsed {
            transform: translateX(-100%);
          }

          .rm-sidebar .rm-sidebar-brand,
          .rm-sidebar.rm-collapsed .rm-sidebar-brand {
            flex-direction: row;
            justify-content: space-between;
            padding: 18px 16px;
          }

          .rm-sidebar .rm-sidebar-brand-text {
            display: inline;
          }

          .rm-sidebar .rm-sidebar-nav {
            padding: 22px 11px;
          }

          .rm-sidebar .rm-sidebar-link {
            justify-content: flex-start;
            padding: 12px 14px;
          }

          .rm-sidebar-overlay {
            display: block;

            position: fixed;
            inset: 0;

            background: rgba(15, 23, 42, 0.5);

            z-index: 1150;
          }

          .rm-mobile-nav {
            position: fixed;
            left: 0;
            right: 0;
            bottom: 0;

            min-height: 66px;

            display: flex;
            align-items: center;
            justify-content: space-around;
            gap: 4px;

            padding: 6px 5px;
            padding-bottom: calc(
              6px + env(safe-area-inset-bottom)
            );

            background: #172338;

            border-top: 1px solid
              rgba(255, 255, 255, 0.1);

            box-shadow: 0 -5px 20px
              rgba(15, 23, 42, 0.12);

            z-index: 1100;
          }

          .rm-mobile-nav-link {
            flex: 1;
            min-width: 0;

            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 5px;

            padding: 7px 2px;

            border-radius: 8px;

            color: #b9c5d7;
            text-decoration: none;

            transition: all 0.2s ease;
          }

          .rm-mobile-nav-link svg {
            font-size: 18px;
          }

          .rm-mobile-nav-link span {
            font-size: 10px;
            white-space: nowrap;
          }

          .rm-mobile-nav-link.active,
          .rm-mobile-nav-link:hover {
            background: rgba(230, 57, 70, 0.15);
            color: #ff5362;
          }
        }

      `}</style>

      {/* ================= MOBILE OVERLAY ================= */}

      {isOpen && (
        <div
          className="rm-sidebar-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* ================= DESKTOP SIDEBAR ================= */}

      <aside
        className={`
          rm-sidebar
          ${isOpen ? "" : "rm-collapsed"}
          ${isOpen ? "rm-mobile-open" : ""}
        `}
      >
        {/* BRAND */}

        <div className="rm-sidebar-brand">
          <Link
            to="/"
            className="rm-sidebar-brand-link"
            onClick={closeMobileSidebar}
          >
            <span className="rm-sidebar-logo">
              <FaTint />
            </span>

            {isOpen && (
              <span className="rm-sidebar-brand-text">
                Rakt<span>Mitra</span>
              </span>
            )}
          </Link>

          <button
            type="button"
            className="rm-sidebar-toggle"
            onClick={toggleSidebar}
            aria-label="Toggle sidebar"
            title="Toggle sidebar"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>

        {/* NAVIGATION */}

        <nav className="rm-sidebar-nav">
          {isOpen && (
            <div className="rm-sidebar-label">
              MENU
            </div>
          )}

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                title={!isOpen ? item.name : undefined}
                onClick={closeMobileSidebar}
                className={({ isActive }) =>
                  `rm-sidebar-link ${
                    isActive ? "active" : ""
                  }`
                }
              >
                <span className="rm-sidebar-icon">
                  <Icon />
                </span>

                {isOpen && (
                  <span className="rm-sidebar-link-text">
                    {item.name}
                  </span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* DONATION MESSAGE */}

        {isOpen && (
          <div className="rm-sidebar-bottom">
            <div className="rm-sidebar-heart">
              ♡
            </div>

            <h6>
              Small Donations,
              <br />
              <span>Big Differences</span>
            </h6>

            <p>
              Be a hero. Help save lives.
            </p>
          </div>
        )}
      </aside>

      {/* ================= MOBILE BOTTOM NAV ================= */}

      <nav className="rm-mobile-nav">
        {navItems
          .filter((item) => item.name !== "AI Checkup")
          .map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                onClick={closeMobileSidebar}
                className={({ isActive }) =>
                  `rm-mobile-nav-link ${
                    isActive ? "active" : ""
                  }`
                }
                aria-label={item.name}
                title={item.name}
              >
                <Icon />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
      </nav>
    </>
  );
};

export default Sidebar;

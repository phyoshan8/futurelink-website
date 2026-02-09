import { Menu, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import logo from "../../../public/futureLinkLogo.jpg";
import { ModeToggle } from "../mode-toggle";

interface NavLink {
  title: string;
  path: string;
}

const MobileHeader: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  const navLinks: NavLink[] = [
    { 
      title: "Courses", 
      path: "/courses",
    },
    { 
      title: "About", 
      path: "/about",
    },
    { 
      title: "Contact", 
      path: "/contact",
    },
  ];

  return (
    <>
      <div
        className={`${isScrolled ? "h-18" : "h-24"} transition-all duration-500`}
      ></div>

      <nav
        className={`fixed top-0 right-0 left-0 z-50 transition-all duration-500 ease-in-out font-canela ${
          isScrolled
            ? "bg-linear-to-r from-blue-400 to-indigo-500 shadow-xl shadow-indigo-500/30"
            : "bg-white/80 shadow-lg backdrop-blur-md dark:bg-slate-950/80 dark:shadow-slate-900/20"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div
            className={`flex items-center justify-between transition-all duration-500 ${
              isScrolled ? "h-18" : "h-24"
            }`}
          >
            {/* Logo */}
            <div
              className={`flex items-center transition-all duration-500 ease-out ${
                isLoaded
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <img
                src={logo}
                alt="FutureLink Logo"
                className={`transition-all duration-500 rounded-full ${
                  isScrolled ? "h-10 w-10" : "h-12 w-12"
                }`}
              />
              <div className="flex flex-col items-end ml-3">
                <p
                  className={`font-playfair font-bold whitespace-nowrap transition-all duration-500 leading-none ${
                    isScrolled
                      ? "text-xl text-white"
                      : "text-2xl text-indigo-700 dark:text-indigo-400"
                  }`}
                >
                  Future Link
                </p>
                <span 
                  className={`font-montserrat text-[0.65rem] uppercase tracking-widest font-medium transition-all duration-500 ${
                      isScrolled ? "text-white/80" : "text-gray-500 dark:text-slate-400"
                  }`}
                >
                  Education
                </span>
              </div>
            </div>

            {/* Mobile Actions */}
            <div className="flex items-center space-x-4">
              {/* Dark/Light Mode Toggle */}
              <ModeToggle
                isScrolled={isScrolled}
                isLoaded={isLoaded}
                animationDelay="0ms"
              />

              {/* Hamburger Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`rounded-lg p-2 transition-colors duration-300 ${
                  isScrolled
                    ? "text-white hover:bg-white/20"
                    : "text-gray-700 hover:bg-gray-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Full Screen Slide-down Menu */}
        <div
          className={`absolute top-full left-0 w-full origin-top overflow-hidden transition-all duration-500 ease-in-out ${
            isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
          } ${
            isScrolled
              ? "bg-linear-to-r from-blue-400 to-indigo-500"
              : "bg-white/95 backdrop-blur-md dark:bg-slate-950/95"
          }`}
          style={{ height: "calc(100vh - 100%)" }}
        >
          <div className="flex h-full w-full flex-col justify-start px-8 pt-12 items-center">
            <div className="space-y-6 w-full max-w-sm flex flex-col items-center">
              {navLinks.map((link) => {
                 const isActive = location.pathname === link.path;
                 return (
                  <div 
                    key={link.path}
                    className="group relative w-fit cursor-pointer"
                  >
                    <div className="relative inline-block">
                      <Link
                        to={link.path}
                        className={`relative z-10 block text-2xl sm:text-3xl font-medium tracking-wide transition-colors duration-300 ${
                          isActive
                            ? isScrolled ? "text-white" : "text-indigo-600 dark:text-indigo-400"
                            : isScrolled ? "text-white/70" : "text-gray-600 dark:text-slate-400"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.title}
                      </Link>
                      
                      {/* Simple Underline for Active/Hover */}
                      <div className={`absolute bottom-0 left-0 h-0.5 transition-all duration-300 ease-out origin-left ${
                        isActive ? "w-full" : "w-0" 
                      } ${
                         isScrolled ? "bg-white" : "bg-indigo-600 dark:bg-indigo-400"
                      }`} />
                    </div>
                  </div>
                 );
              })}

              <button
                className={`mt-10 rounded-full px-8 py-3 text-base font-semibold shadow-lg shadow-indigo-500/20 transition-all duration-300 transform hover:scale-105 active:scale-95 w-full max-w-[200px] flex items-center justify-center ${
                  isScrolled
                    ? "bg-white text-indigo-600 hover:bg-gray-50"
                    : "bg-linear-to-r from-blue-600 to-indigo-600 text-white hover:shadow-indigo-500/40"
                }`}
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MobileHeader;

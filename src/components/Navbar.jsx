import { useState, useEffect } from "react";

const Navbar = ({ hidden = false }) => {
  if (hidden) return null;

  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      if (window.scrollY > 80 && mobileMenuOpen) {
        // keep mobile menu behavior smooth
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Skills", href: "#skills" },
    { name: "Project", href: "#project" },
    { name: "Contact", href: "#contact" },
  ];

  const handleLinkClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const target = document.querySelector(href);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-zinc-950/85 backdrop-blur-md border-b border-zinc-800/80 py-3 sm:py-4 shadow-lg shadow-black/30"
            : "bg-transparent py-5 sm:py-7"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => handleLinkClick(e, "#home")}
            className="flex items-center gap-2 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600 to-indigo-600 flex items-center justify-center font-bold text-white text-base shadow-md shadow-violet-500/30">
              I
            </div>
            <span className="text-xl sm:text-2xl font-bold text-white tracking-tight">
              Ijaz<span className="text-violet-500">.</span>
            </span>
          </a>

          {/* Desktop Navigation Menu */}
          <nav className="hidden md:flex items-center gap-1 sm:gap-2 bg-zinc-900/60 backdrop-blur-md px-4 py-1.5 rounded-full border border-zinc-800/80 shadow-md">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleLinkClick(e, link.href)}
                className="px-4 py-2 text-sm font-medium text-zinc-300 hover:text-white rounded-full hover:bg-zinc-800/80 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Right Action & Mobile Toggle */}
          <div className="flex items-center gap-3">
            <a
              href="./assets/Ijaz_Ahmed_Resume.pdf"
              download="Ijaz_Ahmed_Resume.pdf"
              className="hidden sm:inline-flex items-center gap-2 text-xs sm:text-sm font-semibold bg-violet-600/20 hover:bg-violet-600 text-violet-300 hover:text-white border border-violet-500/30 hover:border-violet-500 px-4 py-2 rounded-full transition-all duration-200"
            >
              <span>Resume</span>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
              </svg>
            </a>

            {/* Mobile Hamburger Toggle Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-10 h-10 rounded-xl bg-zinc-800/80 border border-zinc-700/80 flex items-center justify-center text-white focus:outline-none cursor-pointer"
              aria-label="Toggle menu"
            >
              <svg
                className="w-5 h-5 transition-transform duration-200"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-2 px-4 pb-4 animate-in fade-in duration-200">
            <div className="bg-zinc-900/95 border border-zinc-800 rounded-2xl p-4 shadow-2xl backdrop-blur-xl flex flex-col gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleLinkClick(e, link.href)}
                  className="px-4 py-3 rounded-xl text-base font-medium text-zinc-300 hover:text-white hover:bg-zinc-800 transition"
                >
                  {link.name}
                </a>
              ))}
              <div className="pt-2 border-t border-zinc-800 mt-1 flex gap-2">
                <a
                  href="./assets/Ijaz_Ahmed_Resume.pdf"
                  download="Ijaz_Ahmed_Resume.pdf"
                  className="w-full text-center py-2.5 rounded-xl bg-violet-600 text-white font-semibold text-sm shadow-md"
                >
                  Download Resume
                </a>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Spacer so content doesn't get covered by fixed navbar */}
      <div className="h-16 sm:h-20" />
    </>
  );
};

export default Navbar;

import { useState, useEffect } from "react";
import "remixicon/fonts/remixicon.css";
import Dock from "./Dock/Dock";
import { VscHome, VscArchive, VscAccount, VscTools, VscMail } from "react-icons/vsc";

const Footer = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const items = [
    { icon: <VscHome size={isMobile ? 16 : 18} />, label: "Home", onClick: () => document.getElementById("home")?.scrollIntoView({ behavior: "smooth" }) },
    { icon: <VscAccount size={isMobile ? 16 : 18} />, label: "About Me", onClick: () => document.getElementById("about")?.scrollIntoView({ behavior: "smooth" }) },
    { icon: <VscTools size={isMobile ? 16 : 18} />, label: "Skills", onClick: () => document.getElementById("skills")?.scrollIntoView({ behavior: "smooth" }) },
    { icon: <VscArchive size={isMobile ? 16 : 18} />, label: "Project", onClick: () => document.getElementById("project")?.scrollIntoView({ behavior: "smooth" }) },
    { icon: <VscMail size={isMobile ? 16 : 18} />, label: "Contact", onClick: () => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }) },
  ];

  return (
    <footer className="mt-20 sm:mt-32 pb-8 flex flex-col items-center relative z-10 w-full">
      {/* Flex container adaptif */}
      <div className="w-full flex flex-col md:flex-row items-center md:justify-between gap-6 px-2">
        
        {/* Brand / Name */}
        <div className="flex items-center gap-2 order-1 md:order-none text-center md:text-left">
          <span className="text-xl font-bold text-white tracking-tight">
            Ijaz Ahmed<span className="text-white/60">.</span>
          </span>
          <span className="text-xs text-zinc-500 font-medium">© {new Date().getFullYear()}</span>
        </div>

        {/* Social Links */}
        <div className="flex gap-4 order-2 md:order-none text-zinc-400">
          <a href="https://github.com/ijazahmd-dev" target="_blank" rel="noopener noreferrer" title="GitHub" className="hover:text-white transition"><i className="ri-github-fill ri-xl"></i></a>
          <a href="mailto:ijazahmed5432100@gmail.com" title="Email" className="hover:text-white transition"><i className="ri-mail-fill ri-xl"></i></a>
        </div>

        {/* Dock */}
        <div className="order-3 md:order-none w-full sm:w-auto flex justify-center">
          <Dock 
            items={items}
            panelHeight={isMobile ? 24 : 30}
            baseItemSize={isMobile ? 42 : 54}
            magnification={isMobile ? 65 : 85}
            distance={isMobile ? 120 : 180}
          />
        </div>

      </div>
    </footer>
  );
};

export default Footer;

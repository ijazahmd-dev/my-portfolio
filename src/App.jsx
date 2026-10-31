import { useRef, useState, useEffect } from "react";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import ShinyText from "./components/ShinyText/ShinyText";
import BlurText from "./components/BlurText/BlurText";
import ScrambledText from "./components/ScrambledText/ScrambledText";
import SplitText from "./components/SplitText/SplitText";
import Lanyard from "./components/Lanyard/Lanyard";
import GlassIcons from "./components/GlassIcons/GlassIcons";
import { listTools, listProyek } from "./data";
import ChromaGrid from "./components/ChromaGrid/ChromaGrid";
import ProjectModal from "./components/ProjectModal/ProjectModal"; // <-- IMPORT MODAL
import Aurora from "./components/Aurora/Aurora";
import AOS from 'aos';
import ChatRoom from "./components/ChatRoom";
import ContactForm from "./components/ContactForm/ContactForm";
import 'aos/dist/aos.css'; // You can also use <link> for styles
// ..
AOS.init();

function App() {
  const aboutRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const [selectedProject, setSelectedProject] = useState(null); // null = modal tertutup

  const handleProjectClick = (project) => {
    setSelectedProject(project);
  };

  const handleCloseModal = () => {
    setSelectedProject(null);
  };

  const handleContactClick = () => {
    const contactEl = document.getElementById("contact");
    if (contactEl) {
      contactEl.scrollIntoView({ behavior: "smooth" });
    }
  };

  const [selectedToolCategory, setSelectedToolCategory] = useState("All");
  const toolCategories = ["All", "Backend", "Frontend", "Database", "DevOps", "Tools"];

  const filteredTools = selectedToolCategory === "All"
    ? listTools
    : listTools.filter((t) => t.category === selectedToolCategory);
  // -------------------------

  useEffect(() => {
    // Prevent browser from keeping old scroll position on refresh
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    // Always start at top of the page
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );

    if (aboutRef.current) {
      observer.observe(aboutRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="absolute top-0 left-0 w-full h-full -z-10 ">
        <Aurora
          colorStops={["#577870", "#1F97A6", "#127B99"]}
          blend={0.5}
          amplitude={1.0}
          speed={0.5}
        />
      </div>
      <main className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">

        {/* Hero Section */}
        <div className="hero grid md:grid-cols-2 items-center pt-4 sm:pt-10 gap-8 md:gap-10 grid-cols-1">
          <div className="animate__animated animate__fadeInUp animate__delay-3s flex flex-col items-start">
            <div className="flex items-center gap-3 mb-4 sm:mb-6 bg-zinc-800/90 border border-zinc-700/60 w-fit p-3 sm:p-4 rounded-2xl shadow-md">
              <img src="./assets/ijaz_avatar.png" alt="Ijaz Ahmed" className="w-8 h-8 sm:w-10 sm:h-10 object-cover rounded-xl border border-zinc-700" />
              <q className="text-xs sm:text-sm text-zinc-300">Avoid or just undertake it</q>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 leading-tight">
              <ShinyText text="Hi I'm Ijaz Ahmed" disabled={false} speed={3} className='custom-class' />
            </h1>
            <BlurText
              text="A passionate application and web developer dedicated to crafting modern, high-performance digital experiences through innovative and user-friendly solutions."
              delay={150}
              animateBy="words"
              direction="top"
              className="mb-6 text-sm sm:text-base text-zinc-300 leading-relaxed"
            />
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
              <a 
                href="./assets/Ijaz_Ahmed_Resume.pdf" 
                download="Ijaz_Ahmed_Resume.pdf" 
                className="font-semibold bg-[#1a1a1a] py-3.5 px-6 rounded-full border border-gray-700 hover:bg-[#222] transition-colors text-center text-sm sm:text-base shadow-md"
              >
                <ShinyText text="Download CV" disabled={false} speed={3} className="custom-class" />
              </a>

              <a 
                href="#project" 
                className="font-semibold bg-[#1a1a1a] py-3.5 px-6 rounded-full border border-gray-700 hover:bg-[#222] transition-colors text-center text-sm sm:text-base shadow-md"
              >
                <ShinyText text="Explore My Projects" disabled={false} speed={3} className="custom-class" />
              </a>
            </div>

          </div>
          <div className="flex justify-center w-full md:w-auto md:ml-auto mt-4 md:mt-0 animate__animated animate__fadeInUp animate__delay-4s">
            <ProfileCard
              name="Ijaz Ahmed"
              title="Web Developer"
              handle="ijazahmd-dev"
              status="Online"
              contactText="Contact Me"
              avatarUrl="./assets/ijaz_portfolio_image.png"
              showUserInfo={true}
              enableTilt={true}
              enableMobileTilt={false}
              onContactClick={handleContactClick}
            />
          </div>
        </div>

        {/* Tentang / About Me */}
        <div className="mt-16 sm:mt-24 md:mt-32 mx-auto w-full max-w-[1600px] rounded-2xl sm:rounded-3xl border-2 sm:border-4 md:border-[5px] border-violet-500/40 shadow-[0_0_30px_rgba(168,85,247,0.3)] bg-gradient-to-br from-[#0a0a0a] via-[#111111] to-[#1a1a1a] p-4 sm:p-6 md:p-8" id="about">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-10 pt-0 px-2 sm:px-4 md:px-6" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
            <div className="basis-full md:basis-7/12 pr-0 md:pr-8 pb-6 md:pb-0 border-b md:border-b-0 md:border-r border-violet-500/30 w-full">
              {/* Kolom kiri */}
              <div className="flex-1 text-left">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 sm:mb-5">
                  About Me
                </h2>

                <BlurText
                  text="I’m Ijaz Ahmed, a full-stack developer passionate about building modern, high-performance applications with an intuitive user experience. I enjoy working with the latest technologies like Artificial Intelligence, Machine Learning, and cloud-based development, blending creativity with precision to deliver impactful solutions. With over one year of experience and more than 10 completed projects, I’m committed to helping users and businesses grow in the digital era through functional, aesthetic, and scalable digital products."
                  delay={150}
                  animateBy="words"
                  direction="top"
                  className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8 text-gray-300"
                />

                <div className="grid grid-cols-2 sm:flex sm:flex-row items-center sm:justify-start gap-4 sm:gap-12 text-center sm:text-left mb-6 w-full">
                  <div className="bg-zinc-800/40 sm:bg-transparent p-3 sm:p-0 rounded-xl border border-zinc-700/40 sm:border-0">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1">
                      10<span className="text-violet-500">+</span>
                    </h1>
                    <p className="text-xs sm:text-sm text-zinc-400">Projects Finished</p>
                  </div>
                  <div data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" data-aos-once="true" className="bg-zinc-800/40 sm:bg-transparent p-3 sm:p-0 rounded-xl border border-zinc-700/40 sm:border-0">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-1">
                      1<span className="text-violet-500">+</span>
                    </h1>
                    <p className="text-xs sm:text-sm text-zinc-400">Year of Experience</p>
                  </div>
                </div>

                <ShinyText
                  text="Working with heart, creating with mind."
                  disabled={false}
                  speed={3}
                  className="text-xs sm:text-sm md:text-base text-violet-400 font-medium"
                />
              </div>
            </div>

            {/* Kolom kanan (3D Lanyard) */}
            <div className="basis-full md:basis-5/12 w-full pl-0 md:pl-8 overflow-hidden max-w-full flex justify-center">
              <Lanyard position={[0, 0, 15]} gravity={[0, -40, 0]} />
            </div>
          </div>
        </div>

        {/* Tools & Skills */}
        <div className="tools mt-20 sm:mt-32" id="skills">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 sm:mb-3" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
            Tools & Technologies
          </h1>
          <p className="max-w-2xl text-sm sm:text-base opacity-60" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" data-aos-once="true">
            My Production Tech Stack & Technical Skills
          </p>

          {/* Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 sm:gap-2.5 mt-6 sm:mt-8 mb-4" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true">
            {toolCategories.map((cat) => {
              const count = cat === "All" ? listTools.length : listTools.filter((t) => t.category === cat).length;
              const isActive = selectedToolCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedToolCategory(cat)}
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold transition-all duration-300 cursor-pointer ${
                    isActive
                      ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30 border border-violet-400/50 scale-105"
                      : "bg-zinc-900/80 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700/60"
                  }`}
                >
                  {cat} <span className={`text-[10px] sm:text-xs ml-1 ${isActive ? "text-violet-200 font-bold" : "text-zinc-500"}`}>({count})</span>
                </button>
              );
            })}
          </div>

          <div className="tools-box mt-6 sm:mt-10 grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-3 sm:gap-4">
            {filteredTools.map((tool) => (
              <div
                key={tool.id}
                className="flex items-center gap-3.5 p-3.5 sm:p-4 border border-zinc-700/80 rounded-xl bg-zinc-900/60 backdrop-blur-md hover:bg-zinc-800/80 hover:border-violet-500/50 hover:-translate-y-1 transition-all duration-300 group shadow-lg"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 bg-zinc-800/90 border border-zinc-700/60 p-2 sm:p-2.5 rounded-xl group-hover:bg-zinc-900 group-hover:border-violet-500/40 transition-all duration-300 shrink-0 flex items-center justify-center">
                  <img
                    src={tool.gambar}
                    alt={tool.nama}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col overflow-hidden min-w-0">
                  <div className="truncate">
                    <ShinyText
                      text={tool.nama}
                      disabled={false}
                      speed={3}
                      className="text-sm sm:text-base font-semibold block"
                    />
                  </div>
                  <p className="text-xs text-zinc-400 truncate mt-0.5">{tool.ket}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Proyek */}
        <div className="proyek mt-20 sm:mt-32 pt-4" id="project" data-aos="fade-up" data-aos-duration="1000" data-aos-once="true">
          <h1 className="text-center text-3xl sm:text-4xl font-bold mb-2">Projects</h1>
          <p className="text-sm sm:text-base text-center opacity-60 max-w-2xl mx-auto px-4" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200" data-aos-once="true">
            Showcasing a selection of projects that reflect my skills, creativity, and passion for building meaningful digital experiences.
          </p>
          <div className="proyek-box mt-8 sm:mt-12">
            <div style={{ height: 'auto', position: 'relative' }} data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true">
              <ChromaGrid
                items={listProyek}
                onItemClick={handleProjectClick}
                radius={500}
                damping={0.45}
                fadeOut={0.6}
                ease="power3.out"
              />
            </div>
          </div>
        </div>

        {/* Kontak & Chat */}
        <div className="kontak mt-20 sm:mt-32 p-0 sm:p-4 md:p-6" id="contact">
          <h1
            className="text-3xl sm:text-4xl mb-2 font-bold text-center"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-once="true"
          >
            Contact & Chat
          </h1>
          <p
            className="text-sm sm:text-base text-center mb-8 sm:mb-10 opacity-60 max-w-xl mx-auto"
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="200"
            data-aos-once="true"
          >
            Get in touch with me or chat in real-time
          </p>

          {/* Container dua kolom responsif */}
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 items-stretch">
            {/* Chat Room di kiri */}
            <div className="flex-1 w-full" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="300" data-aos-once="true">
              <ChatRoom />
            </div>

            {/* Contact Form di kanan */}
            <div className="flex-1 w-full" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400" data-aos-once="true">
              <ContactForm />
            </div>
          </div>
        </div>
      </main>

      <ProjectModal
        isOpen={!!selectedProject}
        onClose={handleCloseModal}
        project={selectedProject}
      />
    </>
  )
}

export default App

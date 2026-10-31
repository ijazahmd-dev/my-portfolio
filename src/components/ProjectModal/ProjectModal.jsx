import React, { useState, useEffect } from 'react';
import { FiX, FiGithub, FiExternalLink } from 'react-icons/fi';

const ProjectModal = ({ isOpen, onClose, project }) => {
  // State untuk mengontrol animasi penutupan
  const [isClosing, setIsClosing] = useState(false);

  // Fungsi untuk menangani penutupan dengan animasi
  const handleClose = () => {
    setIsClosing(true);
    // Tunggu animasi selesai (300ms) sebelum memanggil onClose dari props
    setTimeout(() => {
      onClose();
      setIsClosing(false); // Reset state untuk pembukaan berikutnya
    }, 300);
  };

  // Mencegah scroll di background saat modal terbuka
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    // Cleanup function
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen || !project) return null;

  const hasLiveLink = Boolean(project.liveUrl || project.live);
  const hasSourceLink = Boolean(project.githubUrl || project.url);

  return (
    // Overlay
    <div
      onClick={handleClose}
      className="fixed inset-0 bg-black/75 flex justify-center items-center z-50 p-4 transition-opacity duration-300 backdrop-blur-sm"
    >
      {/* Modal Content */}
      <div
        onClick={(e) => e.stopPropagation()} // Mencegah modal tertutup saat diklik di dalam
        className={`bg-zinc-900 border border-violet-500/50 rounded-2xl shadow-2xl shadow-violet-500/20 w-full max-w-lg max-h-[90vh] flex flex-col transform transition-transform duration-300 overflow-hidden ${isClosing ? 'animate-out' : 'animate-in'}`}
      >
        {/* --- GAMBAR PROYEK --- */}
        <div className="w-full h-44 sm:h-56 shrink-0 overflow-hidden bg-zinc-950">
          <img 
            src={project.image} 
            alt={project.title} 
            className="w-full h-full object-cover rounded-t-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="p-4 sm:p-6 flex flex-col gap-4 overflow-y-auto">
            <div className="flex justify-between items-start">
                <h2 className="text-xl sm:text-2xl font-bold text-white">{project.title}</h2>
                <button
                    onClick={handleClose}
                    className="text-zinc-400 hover:text-white transition-colors p-2 rounded-full hover:bg-zinc-700 -mt-2 -mr-2"
                >
                    <FiX size={24} />
                </button>
            </div>

            {/* --- DESKRIPSI LENGKAP --- */}
            <p className="text-zinc-300 text-base leading-relaxed">
                {project.fullDescription}
            </p>

            <div className="mt-4 flex flex-col sm:flex-row gap-3 w-full">
              {hasLiveLink && (
                <a
                  href={project.liveUrl || project.live}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 inline-flex items-center justify-center gap-2 font-semibold bg-violet-600 hover:bg-violet-700 text-white p-3 px-5 rounded-full cursor-pointer transition-all shadow-lg shadow-violet-600/30 hover:shadow-violet-600/50"
                >
                  <FiExternalLink size={18} />
                  <span>Live Preview</span>
                </a>
              )}

              {hasSourceLink && (
                <a
                  href={project.githubUrl || project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex-1 inline-flex items-center justify-center gap-2 font-semibold ${
                    hasLiveLink
                      ? 'bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700 hover:border-zinc-500'
                      : 'bg-violet-600 hover:bg-violet-700 text-white border border-transparent shadow-lg shadow-violet-600/30 hover:shadow-violet-600/50'
                  } p-3 px-5 rounded-full cursor-pointer transition-all`}
                >
                  <FiGithub size={18} />
                  <span>Source Code</span>
                </a>
              )}
            </div>
        </div>
      </div>
       {/* CSS untuk animasi */}
      <style>{`
        @keyframes scaleIn {
          from { transform: scale(0.95); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        .animate-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
        
        @keyframes scaleOut {
          from { transform: scale(1); opacity: 1; }
          to { transform: scale(0.95); opacity: 0; }
        }
        .animate-out {
          animation: scaleOut 0.3s ease-in forwards;
        }
      `}</style>
    </div>
  );
};

export default ProjectModal;

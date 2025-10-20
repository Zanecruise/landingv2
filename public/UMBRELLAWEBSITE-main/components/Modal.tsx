import React, { useEffect } from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [onClose]);
  
  const gridPatternSvg = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='1' stroke='rgba(255,255,255,0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`;
  const gridPatternSvgLight = `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke-width='1' stroke='rgba(0,0,0,0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`;


  return (
    <div
      className={`
        fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-[100] 
        transition-opacity duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
        ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}
      `}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-hidden={!isOpen}
    >
      <div
        className={`
          relative bg-[var(--background-secondary)] rounded-2xl p-8 w-[90%] max-w-3xl overflow-hidden
          transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4 pointer-events-none'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div 
          className="absolute inset-0 z-0 opacity-20"
          style={{ backgroundImage: document.documentElement.classList.contains('light') ? gridPatternSvgLight : gridPatternSvg }}
        ></div>
        <div className="absolute -inset-px rounded-2xl border border-transparent bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] bg-clip-border opacity-30"></div>

        <div className="relative z-10 flex flex-col">
            <div className="mb-4 pr-8">
              <h3 className="text-2xl font-bold gradient-text">{title}</h3>
            </div>
            <div className="max-h-[60vh] overflow-y-auto -mr-4 pr-4 custom-scrollbar">
                {children}
            </div>
            <button 
              onClick={onClose} 
              className="absolute top-0 right-0 p-2 rounded-full text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-white/10 transition-colors z-20"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
        </div>
      </div>
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: var(--glass-border);
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: var(--text-subtle);
        }
      `}</style>
    </div>
  );
};

export default Modal;
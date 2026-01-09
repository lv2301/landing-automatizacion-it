import React from 'react';
import { Terminal, Linkedin, Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-darkBg py-12 border-t border-white/5 px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center font-black tracking-tighter text-xl">
  {/* Símbolo de apertura en verde (accent) */}
  <span className="text-accent">{"<"}</span>
  
  {/* Tu nombre en blanco/main sin espacios */}
  <span className="text-white">
    LUCIANO<span className="text-accent">VALINOTI</span>
  </span>
  
  {/* Símbolo de cierre en blanco */}
  <span className="text-white">{">"}</span>
</div>
        
        <div className="flex gap-8 text-textDim text-sm font-medium">
          <a href="#home" className="hover:text-accent transition-colors">Inicio</a>
          <a href="#servicios" className="hover:text-accent transition-colors">Servicios</a>
          <a href="#blog" className="hover:text-accent transition-colors">Blog</a>
        </div>

        <div className="flex gap-4">
          <a href="https://linkedin.com/in/luciano-valinoti-43671a381" target="_blank" className="text-textDim hover:text-accent transition-all">
            <Linkedin size={22} />
          </a>
          <a href="https://github.com/lv2301" target="_blank" className="text-textDim hover:text-accent transition-all">
            <Github size={22} />
          </a>
        </div>
      </div>
      <div className="text-center mt-12 text-[10px] font-mono text-slate-600 uppercase tracking-widest">
        © 2025 | Basado en Córdoba, Argentina para el mundo.
      </div>
    </footer>
  );
};

export default Footer;
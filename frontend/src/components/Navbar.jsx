import React, { useState } from 'react';
import { Menu, X, Terminal } from 'lucide-react'; // Instala lucide-react si no lo tienes

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const menuItems = [
    { name: 'Inicio', href: '#home' },
    { name: 'Servicios', href: '#servicios' },
    { name: 'Casos de Éxito', href: '#casos' },
    { name: 'Blog', href: '#blog' },
    { name: 'Contacto', href: '#contacto' },
  ];

  return (
    <nav className="bg-darkBg/90 backdrop-blur-md border-b border-slate-800 fixed w-full z-[60]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
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
          
          {/* Desktop Menu */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {menuItems.map((item) => (
                <a key={item.name} href={item.href} className="text-textDim hover:text-accent transition-colors px-3 py-2 text-sm font-medium">
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-textMain p-2">
              {isOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-cardBg border-b border-slate-700">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {menuItems.map((item) => (
              <a key={item.name} href={item.href} onClick={() => setIsOpen(false)} className="text-textMain block px-3 py-2 rounded-md text-base font-medium">
                {item.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
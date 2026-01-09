import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Terminal, Zap } from 'lucide-react';

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center pt-20 px-6 overflow-hidden">
      {/* Elementos de Diseño de Fondo */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-accent/10 blur-[100px] rounded-full -z-10" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 blur-[120px] rounded-full -z-10" />
      
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            <span className="text-[10px] font-black text-white/70 uppercase tracking-[0.3em]">Automatización & IA</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-9xl font-black text-white tracking-tighter leading-[0.85] mb-8"
          >
            TECNOLOGÍA <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-green-400">QUE ESCALA</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-textDim text-lg md:text-2xl max-w-3xl mx-auto mb-12 leading-relaxed"
          >
            Especialista en "Python y Automatización". Diseño flujos de trabajo que eliminan las tareas manuales y repetitivas, transformando tu infraestructura en una ventaja competitiva.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center gap-6"
          >
            <a 
              href="#contacto" 
              className="group relative bg-accent text-darkBg px-10 py-5 rounded-2xl font-black text-lg flex items-center gap-3 hover:shadow-[0_0_40px_rgba(34,197,94,0.4)] transition-all overflow-hidden"
            >
              <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
              <span className="relative flex items-center gap-2">
                AUTOMATIZAR MI NEGOCIO <Zap size={20} fill="currentColor" />
              </span>
            </a>
            
            <a 
              href="#casos" 
              className="group flex items-center gap-3 text-white font-bold text-lg hover:text-accent transition-colors"
            >
              <Terminal size={20} className="text-accent" />
              VER CASOS DE ÉXITO
              <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Indicador de Scroll */}
      <motion.div 
        animate={{ y: [0, 10, 0] }} 
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 w-1 h-12 bg-gradient-to-b from-accent to-transparent rounded-full opacity-20"
      />
    </section>
  );
};

export default Hero;
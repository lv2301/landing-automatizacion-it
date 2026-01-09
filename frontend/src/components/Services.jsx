import React from 'react';
import { motion } from 'framer-motion';
import { Zap, Share2, Globe, Database, ArrowUpRight, Cpu } from 'lucide-react';

const services = [
  { 
    title: 'Automatización RPA', 
    desc: 'Desarrollo de bots personalizados en Python para ejecutar tareas administrativas de alto volumen sin errores humanos.', 
    icon: <Zap />, 
    size: 'md:col-span-2',
    tech: 'Python / Selenium / PyAutoGUI',
    gradient: 'from-accent/10 to-transparent'
  },
  { 
    title: 'Integración', 
    desc: 'Conexión total entre tus herramientas favoritas mediante n8n y desarrollo de APIs personalizadas.', 
    icon: <Share2 />, 
    size: 'md:col-span-1',
    tech: 'n8n / REST APIs',
    gradient: 'from-blue-500/10 to-transparent'
  },
  { 
    title: 'Web Scraping', 
    desc: 'Extracción masiva de datos públicos para análisis de mercado y monitoreo de competencia.', 
    icon: <Globe />, 
    size: 'md:col-span-1',
    tech: 'BeautifulSoup / Scrapy',
    gradient: 'from-purple-500/10 to-transparent'
  },
  { 
    title: 'Data Pipelines', 
    desc: 'Arquitectura de flujos ETL que limpian y transforman tus datos crudos en dashboards listos para decidir.', 
    icon: <Database />, 
    size: 'md:col-span-2',
    tech: 'Pandas / SQL / FastAPI',
    gradient: 'from-green-500/10 to-transparent'
  },
];

const Services = () => (
  <section id="servicios" className="py-24 px-6 relative overflow-hidden">
    {/* Decoración de fondo técnica */}
    <div className="absolute top-0 right-0 w-1/3 h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent -z-10" />

    <div className="max-w-7xl mx-auto">
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="mb-16 space-y-2"
      >
        <div className="flex items-center gap-2 text-accent font-mono text-[10px] tracking-[0.3em] uppercase">
          <Cpu size={14} /> Core Expertise
        </div>
        <h2 className="text-3xl md:text-5xl font-bold text-white uppercase tracking-tighter">
          MIS SERVICIOS y <span className="text-accent">SOLUCIONES</span>
        </h2>
      </motion.div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((s, i) => (
          <motion.a 
            href="#contacto"
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`${s.size} group relative bg-cardBg border border-white/5 rounded-[2.5rem] p-10 hover:border-accent/30 transition-all duration-500 flex flex-col justify-between overflow-hidden shadow-2xl`}
          >
            {/* Gradiente sutil de fondo según el servicio */}
            <div className={`absolute inset-0 bg-gradient-to-br ${s.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            <div className="relative z-10">
              <div className="flex justify-between items-start mb-8">
                <div className="text-accent bg-accent/5 w-14 h-14 flex items-center justify-center rounded-2xl border border-accent/10 group-hover:bg-accent group-hover:text-darkBg transition-all duration-300">
                  {React.cloneElement(s.icon, { size: 28 })}
                </div>
                <ArrowUpRight className="text-white/10 group-hover:text-accent group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" size={24} />
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4 tracking-tight">
                {s.title}
              </h3>
              <p className="text-textDim text-sm leading-relaxed max-w-xs group-hover:text-white/80 transition-colors">
                {s.desc}
              </p>
            </div>
            
            <div className="relative z-10 mt-12 flex items-center justify-between border-t border-white/5 pt-6">
              <div className="flex flex-col">
                <span className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">Stack</span>
                <span className="text-[10px] font-mono font-bold text-accent uppercase">
                  {s.tech}
                </span>
              </div>
              <span className="text-[10px] font-black text-white bg-white/5 px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                CONSULTAR
              </span>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
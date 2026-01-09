import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, Cpu, MessageSquare, Sparkles } from 'lucide-react';

const cases = [
  {
    company: "Mdtec",
    project: "Infraestructura Autogestionada",
    description: "Desarrollo de un ecosistema en Python que procesa logs críticos y gestiona backups inteligentes, reduciendo la intervención manual en un 85%.",
    tech: ["Python", "n8n", "Linux", "Bash"],
    impact: "Disponibilidad del 99.9%"
  },
  {
    company: "Fintech Sector",
    project: "Pipeline de Datos ETL",
    description: "Automatización de la extracción y validación de reportes financieros desde múltiples APIs hacia bases de datos centralizadas.",
    tech: ["Pandas", "FastAPI", "PostgreSQL"],
    impact: "Cero errores de carga"
  },
  {
    company: "Real Estate Tech",
    project: "Lead Automation Engine",
    description: "Integración de portales inmobiliarios con CRM y WhatsApp, automatizando la respuesta y calificación de prospectos mediante IA.",
    tech: ["n8n", "OpenAI", "WhatsApp API"],
    impact: "Respuesta en <1 min"
  }
];

const Experience = () => {
  // Función para abrir el chatbot desde el CTA
  const openAutomationChat = () => {
    window.dispatchEvent(new CustomEvent('openChat', { detail: 'ASESORIA_RAPIDA' }));
  };

  return (
    <section id="casos" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter mb-16">
          CASOS DE <span className="text-accent">ÉXITO</span>
         </h2>
        </motion.div>

        <div className="grid gap-8 mb-20">
          {cases.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative bg-cardBg border border-white/5 p-8 md:p-12 rounded-[3.5rem] hover:border-accent/30 transition-all duration-500 overflow-hidden"
            >
              <div className="absolute top-0 right-0 p-12 opacity-[0.02] group-hover:opacity-[0.05] transition-opacity">
                <Cpu size={150} />
              </div>
              
              <div className="relative z-10 flex flex-col md:flex-row justify-between gap-10">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-accent/10 text-accent text-[10px] font-bold px-3 py-1 rounded-full border border-accent/20 uppercase tracking-widest">{item.company}</span>
                    <span className="text-white/30 text-xs font-mono">{item.impact}</span>
                  </div>
                  <h3 className="text-2xl md:text-4xl font-bold text-white mb-6 group-hover:text-accent transition-colors tracking-tight">{item.project}</h3>
                  <p className="text-textDim text-lg leading-relaxed mb-8">{item.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {item.tech.map(t => (
                      <span key={t} className="bg-darkBg/50 border border-white/5 px-4 py-1.5 rounded-xl text-xs font-mono text-white/60 group-hover:border-accent/20">{t}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col justify-center border-l border-white/5 pl-8 md:min-w-[200px]">
                  <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-widest opacity-50">Logros</h4>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-2 text-textDim text-sm"><CheckCircle2 size={14} className="text-accent" /> Optimización</li>
                    <li className="flex items-center gap-2 text-textDim text-sm"><CheckCircle2 size={14} className="text-accent" /> Escalabilidad</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA MODERNO INTEGRADO CON CHATBOT */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative group bg-gradient-to-br from-accent/20 via-cardBg to-darkBg border border-accent/20 p-12 rounded-[4rem] text-center overflow-hidden shadow-2xl"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-accent/5 via-transparent to-transparent opacity-50" />
          <div className="relative z-10">
            <div className="bg-accent/10 w-16 h-16 rounded-3xl flex items-center justify-center mx-auto mb-8 border border-accent/20">
              <Sparkles className="text-accent" size={32} />
            </div>
            <h3 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tighter">¿LISTO PARA AUTOMATIZAR?</h3>
            <p className="text-textDim text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed">
              Haz clic abajo y mi <span className="text-white font-bold italic underline decoration-accent">Asistente de Automatización</span> te explicará en menos de 5 minutos cómo optimizar tu caso específico.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-6">
              <button 
                onClick={openAutomationChat}
                className="bg-accent text-darkBg px-10 py-5 rounded-[2rem] font-black text-lg flex items-center justify-center gap-3 hover:scale-105 active:scale-95 transition-all shadow-[0_10px_40px_rgba(34,197,94,0.3)]"
              >
                <MessageSquare size={24} /> INICIAR ASESORÍA YA
              </button>

            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Experience;
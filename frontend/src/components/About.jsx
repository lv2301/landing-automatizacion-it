import React from 'react';
import { motion } from 'framer-motion';
import { User, Target, Award } from 'lucide-react';

const About = () => {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-5xl font-bold mb-6 text-white">
              Trayectoria y <span className="text-accent">Expertise</span>
            </h2>
            <p className="text-textDim text-lg mb-6 leading-relaxed">
              Con más de 20 años en infraestructura IT, he vivido la evolución tecnológica desde las bases. Hace 4 años decidí especializarme en <strong>Python y Automatización</strong> para resolver el problema que veo en todas las empresas: el tiempo perdido en tareas repetitivas.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 p-2 rounded-lg text-accent"><Target size={20}/></div>
                <div>
                  <h4 className="text-white font-bold">Misión</h4>
                  <p className="text-textDim text-sm">Transformar flujos manuales en activos digitales autónomos.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-accent/10 p-2 rounded-lg text-accent"><Award size={20}/></div>
                <div>
                  <h4 className="text-white font-bold">Visión Técnica</h4>
                  <p className="text-textDim text-sm">Integrar IA y RPA para maximizar la eficiencia operativa.</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="aspect-square rounded-[3rem] bg-gradient-to-tr from-accent/20 to-cardBg border border-white/5 flex items-center justify-center">
              <User size={120} className="text-accent/40" />
              {/* Aquí puedes colocar una foto tuya en el futuro */}
            </div>
            <div className="absolute -bottom-6 -left-6 bg-accent p-6 rounded-2xl shadow-xl">
              <p className="text-darkBg font-black text-3xl">+20</p>
              <p className="text-darkBg text-xs font-bold uppercase">Años de Exp.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
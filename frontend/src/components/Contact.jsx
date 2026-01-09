import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Bot, Sparkles, Send, CheckCircle } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    phone: '', 
    message: '' 
  });
  const [status, setStatus] = useState('idle');

  const openChatbot = (e) => {
    e.preventDefault();
    window.dispatchEvent(new CustomEvent('openChat', { detail: 'ASESORIA_RAPIDA' }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    try {
      const response = await fetch('http://localhost:8001/api/v1/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', phone: '', message: '' });
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  return (
    <section id="contacto" className="py-24 px-6 bg-slate-900/10">
      <div className="max-w-6xl mx-auto">
        
        {/* Cabecera Principal */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-accent/20 bg-accent/5 text-accent text-[10px] font-black tracking-widest mb-4 uppercase"
          >
            <Sparkles size={12} /> Contacto Directo
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-bold mb-4 text-white uppercase tracking-tighter">
            ¿LISTO PARA <span className="text-accent">AUTOMATIZAR</span>?
          </h2>
        </div>

        {/* Contenedor Principal con Separación Vertical */}
        <div className="flex flex-col gap-16">
          
          {/* Fila de Accesos Rápidos (Prioridad Alta) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <motion.div 
              whileHover={{ y: -5 }}
              onClick={openChatbot} 
              className="cursor-pointer bg-accent/5 border border-accent/20 p-8 rounded-[2.5rem] hover:bg-accent/10 transition-all group flex flex-col items-start"
            >
              <div className="bg-accent/10 p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                <Bot className="text-accent" size={32} />
              </div>
              <h4 className="text-white text-xl font-bold mb-2 tracking-tight">Asistente IA</h4>
              <p className="text-textDim text-sm leading-relaxed">Obtén una respuesta técnica inmediata sobre servicios y costos de automatización.</p>
            </motion.div>
            
            <motion.a 
              whileHover={{ y: -5 }}
              href="https://wa.me/543516889414" 
              target="_blank" 
              className="block bg-cardBg border border-white/5 p-8 rounded-[2.5rem] hover:border-green-500/30 transition-all group flex flex-col items-start"
            >
              <div className="bg-green-500/10 p-4 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                <MessageCircle className="text-green-500" size={32} />
              </div>
              <h4 className="text-white text-xl font-bold mb-2 tracking-tight">WhatsApp Directo</h4>
              <p className="text-textDim text-sm leading-relaxed">Habla directamente con Luciano para consultas urgentes o proyectos personalizados.</p>
            </motion.a>
          </div>

          {/* Formulario de Contacto */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="bg-cardBg border border-white/5 p-8 md:p-12 rounded-[3rem] shadow-2xl max-w-4xl mx-auto w-full"
          >
            {status === 'success' ? (
              <div className="flex flex-col items-center justify-center text-center space-y-4 py-12">
                <CheckCircle size={60} className="text-accent animate-bounce" />
                <h3 className="text-2xl font-bold text-white uppercase tracking-tighter">¡Mensaje Enviado!</h3>
                <p className="text-textDim">Revisa tu casilla de correo, te enviamos una confirmación.</p>
                <button onClick={() => setStatus('idle')} className="text-accent underline text-sm font-bold uppercase tracking-widest mt-4">Enviar otro mensaje</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-white/40 text-[10px] font-black uppercase tracking-widest ml-2">Nombre</label>
                    <input 
                      required
                      type="text" 
                      value={formData.name}
                      onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full bg-darkBg border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-accent/50 transition-all placeholder:text-white/10"
                      placeholder="Tu nombre completo"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-white/40 text-[10px] font-black uppercase tracking-widest ml-2">WhatsApp / Tel</label>
                    <input 
                      required
                      type="tel" 
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      className="w-full bg-darkBg border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-accent/50 transition-all placeholder:text-white/10"
                      placeholder="+54 9 351..."
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-white/40 text-[10px] font-black uppercase tracking-widest ml-2">Email Profesional</label>
                  <input 
                    required
                    type="email" 
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    className="w-full bg-darkBg border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-accent/50 transition-all placeholder:text-white/10"
                    placeholder="email@empresa.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-white/40 text-[10px] font-black uppercase tracking-widest ml-2">Mensaje / Proyecto</label>
                  <textarea 
                    required
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full bg-darkBg border border-white/10 rounded-2xl py-4 px-6 text-white focus:outline-none focus:border-accent/50 transition-all resize-none placeholder:text-white/10"
                    placeholder="Describe brevemente el proceso que quieres automatizar..."
                  ></textarea>
                </div>

                <button 
                  disabled={status === 'loading'}
                  className="w-full bg-accent text-darkBg font-black py-5 rounded-2xl flex items-center justify-center gap-3 hover:shadow-[0_0_30px_rgba(0,242,255,0.3)] hover:scale-[1.01] active:scale-[0.99] transition-all disabled:opacity-50 uppercase tracking-widest text-sm"
                >
                  {status === 'loading' ? 'PROCESANDO...' : <><Send size={18} /> ENVIAR CONSULTA</>}
                </button>
                {status === 'error' && <p className="text-red-500 text-[10px] font-bold text-center uppercase tracking-widest">Error al enviar. Revisa los datos.</p>}
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
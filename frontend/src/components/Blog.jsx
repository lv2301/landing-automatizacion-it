import React from 'react';
import { motion } from 'framer-motion';
import { Linkedin, ArrowUpRight, Clock, Hash } from 'lucide-react';

const linkedinPosts = [
  {
    id: 1,
    title: "IA + n8n: El fin de las tareas repetitivas",
    excerpt: "Cómo los agentes autónomos están redefiniendo la productividad en empresas de servicios. La clave no es reemplazar humanos, sino potenciar su tiempo...",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    link: "https://www.linkedin.com/posts/tu-post-1", // Reemplaza con tu link real
    tag: "Automatización",
    date: "Reciente"
  },
  {
    id: 2,
    title: "Seguridad y Python en infraestructuras Linux",
    excerpt: "Scripts esenciales para el endurecimiento de servidores y automatización de defensas. Comparto mi checklist de seguridad para entornos críticos...",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=800",
    link: "https://www.linkedin.com/posts/tu-post-2", // Reemplaza con tu link real
    tag: "Seguridad IT",
    date: "Hace 1 semana"
  },
  {
    id: 3,
    title: "Web Scraping: De datos crudos a decisiones",
    excerpt: "Técnicas modernas para recolectar información de mercado sin comprometer la ética digital. Cómo convertir la web en tu base de datos...",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800",
    link: "https://www.linkedin.com/posts/tu-post-3", // Reemplaza con tu link real
    tag: "Data Science",
    date: "Hace 2 semanas"
  }
];

const Blog = () => {
  return (
    <section id="blog" className="py-24 px-6 bg-slate-900/10">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6 border-b border-white/5 pb-10"
        >
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter uppercase">
              Blog & <span className="text-accent">artículos</span>
            </h2>
            <p className="text-textDim mt-4 text-lg font-light max-w-xl">
              Artículos técnicos sobre automatización y el futuro de la eficiencia operativa.
            </p>
          </div>
          
          <motion.a 
            href="https://linkedin.com/in/luciano-valinoti-43671a381" 
            target="_blank"
            whileHover={{ x: 5 }}
            className="flex items-center gap-2 text-accent font-black text-xs uppercase tracking-[0.2em] group"
          >
            Ver todo en LinkedIn 
            <ArrowUpRight size={18} className="group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
          </motion.a>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {linkedinPosts.map((post, i) => (
            <motion.a
              key={post.id}
              href={post.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-cardBg border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-accent/40 transition-all flex flex-col h-full"
            >
              <div className="relative aspect-[16/10] overflow-hidden border-b border-white/5">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" 
                />
                <div className="absolute top-4 left-4 bg-darkBg/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/10 flex items-center gap-2">
                  <Hash size={12} className="text-accent" />
                  <span className="text-white text-[10px] font-black uppercase tracking-widest">{post.tag}</span>
                </div>
              </div>

              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-3 text-white/30 text-[10px] font-mono mb-4 uppercase tracking-widest">
                  <Clock size={12} /> {post.date}
                </div>
                
                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-accent transition-colors leading-tight">
                  {post.title}
                </h3>
                
                <p className="text-textDim text-sm leading-relaxed line-clamp-3 mb-6 flex-grow font-light">
                  {post.excerpt}
                </p>

                <div className="inline-flex items-center gap-2 text-white font-bold text-xs group-hover:gap-4 transition-all">
                  LEER NOTA EN LINKEDIN <Linkedin size={16} className="text-accent" />
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Blog;
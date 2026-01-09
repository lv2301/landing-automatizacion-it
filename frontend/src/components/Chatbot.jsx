import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, Send, Bot, Loader2, Sparkles } from 'lucide-react';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'bot', content: 'Hola, soy el asistente de Luciano. ¿En qué puedo ayudarte con tu automatización hoy?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleExternalOpen = () => setIsOpen(true);
    window.addEventListener('openChat', handleExternalOpen);
    return () => window.removeEventListener('openChat', handleExternalOpen);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMsg = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    const currentInput = input; // Guardamos el input para el fetch
    setInput('');
    setIsLoading(true);

    try {
      // Endpoint verificado: Puerto 8001 /api/chat
      const response = await fetch('http://localhost:8001/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: currentInput }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessages(prev => [...prev, { role: 'bot', content: data.response }]);
      } else {
        throw new Error(data.detail || 'Error en la respuesta');
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: 'bot', 
        content: "Lo siento, tengo problemas para conectarme al cerebro IA. ¿Está el backend encendido?" 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-accent p-4 rounded-full shadow-2xl text-darkBg"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            className="fixed bottom-24 right-6 z-50 w-[90vw] md:w-[400px] h-[500px] bg-cardBg border border-white/10 rounded-[2.5rem] shadow-2xl flex flex-col overflow-hidden backdrop-blur-xl"
          >
            <div className="p-6 border-b border-white/5 bg-white/5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="bg-accent/10 p-2 rounded-xl">
                  <Bot size={20} className="text-accent" />
                </div>
                <div>
                  <h4 className="text-white font-bold text-sm tracking-tight">Asistente IA</h4>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-[10px] text-white/40 uppercase font-black tracking-widest">En línea</span>
                  </div>
                </div>
              </div>
              <Sparkles size={16} className="text-accent/50" />
            </div>

            <div ref={scrollRef} className="flex-grow p-6 overflow-y-auto space-y-4 scrollbar-hide">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-3xl text-sm ${
                    msg.role === 'user' ? 'bg-accent text-darkBg font-medium rounded-tr-none' : 'bg-white/5 text-white/80 border border-white/5 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded-3xl rounded-tl-none border border-white/5">
                    <Loader2 size={18} className="text-accent animate-spin" />
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSendMessage} className="p-6 bg-white/5 border-t border-white/5">
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Escribe tu consulta..."
                  className="w-full bg-darkBg border border-white/10 rounded-2xl py-3 px-4 pr-12 text-white text-sm focus:outline-none focus:border-accent/50"
                />
                <button type="submit" disabled={isLoading} className="absolute right-2 p-2 text-accent disabled:opacity-50">
                  <Send size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Chatbot;
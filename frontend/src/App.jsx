import React from 'react';
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Experience from "./components/Experience";
import Blog from "./components/Blog"; // El componente que usa los posts de LinkedIn
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";

function App() {
  return (
    <div className="bg-darkBg text-textMain selection:bg-accent/30 selection:text-accent">
      <Navbar />
      <main>
        <Hero />
        <Services />
        <Experience />
        <Blog />
        <Contact />
      </main>
      <Footer />
      <Chatbot />
    </div>
  );
}

export default App;
import { useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Awards from './sections/Awards';
import Research from './sections/Research';
import Projects from './sections/Projects';
import Skills from './sections/Skills';
import Footer from './sections/Footer';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    // Initialize smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
    document.documentElement.lang = 'zh-CN';

    // Refresh ScrollTrigger on load
    ScrollTrigger.refresh();

    // Cleanup
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-dark-bg text-white">
      {/* Global background gradient */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-dark-bg via-dark-card to-dark-bg" />
        
        {/* Animated gradient orbs */}
        <div 
          className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(168,85,247,0.3) 0%, transparent 70%)',
            filter: 'blur(80px)',
            animation: 'float 10s ease-in-out infinite',
          }}
        />
        <div 
          className="absolute bottom-1/4 right-0 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 70%)',
            filter: 'blur(80px)',
            animation: 'float 12s ease-in-out infinite reverse',
          }}
        />
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full opacity-10"
          style={{
            background: 'radial-gradient(circle, rgba(209,226,157,0.2) 0%, transparent 70%)',
            filter: 'blur(100px)',
            animation: 'float 15s ease-in-out infinite',
          }}
        />
      </div>

      {/* Navigation */}
      <Navbar />

      {/* Main content */}
      <main className="relative z-10">
        <Hero language="zh" />
        <About language="zh" />
        <Awards language="zh" />
        <Research language="zh" />
        <Projects language="zh" />
        <Skills language="zh" />
        <Footer language="zh" />
      </main>

      {/* Noise overlay */}
      <div className="fixed inset-0 pointer-events-none z-50 noise-overlay opacity-50" />
    </div>
  );
}

export default App;

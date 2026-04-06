import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import ThreeScene from './ThreeScene';

export default function HeroSection({ isDark }) {
  const glowRef = useRef(null);
  const canvasRef = useRef(null);
  const [trail, setTrail] = useState([]);
  const mouse = useRef({ x: 0, y: 0 });

  // Mouse trail & glow effect logic (Tetap sama)
  useEffect(() => {
    const move = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + 'px';
        glowRef.current.style.top = e.clientY + 'px';
      }
      setTrail((prev) => [...prev.slice(-15), { x: e.clientX, y: e.clientY, id: Date.now() }]);
    };
    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  // Canvas Starfield Logic (Tetap sama)
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let stars = [];
    let animationId;
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);
    for (let i = 0; i < 150; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5,
        speed: Math.random() * 0.25
      });
    }
    const animate = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      if (isDark) {
        gradient.addColorStop(0, '#0f172a'); // Dipergelap sedikit (slate-950)
        gradient.addColorStop(0.5, '#1e1b4b');
        gradient.addColorStop(1, '#312e81');
      } else {
        gradient.addColorStop(0, '#fffbeb'); // Light mode lebih soft
        gradient.addColorStop(0.5, '#fef3c7');
        gradient.addColorStop(1, '#fde68a');
      }
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        star.y += star.speed;
        if (star.y > canvas.height) star.y = 0;
        ctx.fillStyle = isDark ? 'rgba(255,215,0,0.4)' : 'rgba(0,0,0,0.1)';
        ctx.fillRect(star.x, star.y, star.size, star.size);
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, [isDark]);

  const handleMagnet = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    el.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px) scale(1.05)`;
  };

  const resetMagnet = (e) => {
    const el = e.currentTarget;
    el.style.transform = "translate(0px, 0px) scale(1)";
  };

  const scrollToAbout = () => {
    const el = document.querySelector('#about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 -z-20" />

      {/* OVERLAY: Dipertebal agar teks lebih menonjol */}
      <div
        className={`absolute inset-0 backdrop-blur-[3px] -z-10 ${
          isDark ? 'bg-black/40' : 'bg-white/30'
        }`}
      />

      <div
        ref={glowRef}
        className="pointer-events-none fixed w-80 h-80 rounded-full 
        bg-gradient-to-br from-yellow-400/10 via-purple-400/10 to-blue-400/10
        blur-3xl -translate-x-1/2 -translate-y-1/2 z-10"
      />

      {trail.map((t) => (
        <motion.div
          key={t.id}
          className={`pointer-events-none fixed w-1.5 h-1.5 rounded-full blur-[1px] z-20 ${
            isDark ? 'bg-yellow-300/50' : 'bg-black/20'
          }`}
          style={{ left: t.x, top: t.y }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 2.5 }}
          transition={{ duration: 0.6 }}
        />
      ))}

      <ThreeScene />

      <div className="container mx-auto px-4 relative z-30">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          
          {/* Foto Section */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 rounded-3xl blur-2xl opacity-40"></div>
              <div className={`relative ${isDark ? 'bg-black/20' : 'bg-white/20'} backdrop-blur-xl border border-white/10 rounded-3xl p-2`}>
                <img
                  src="/ade.jpg"
                  alt="Aderun Nafis"
                  className="w-64 h-80 md:w-80 md:h-[420px] object-cover rounded-2xl grayscale-[20%] hover:grayscale-0 transition duration-500"
                />
              </div>
            </div>
          </motion.div>

          {/* Text Section */}
          <div className="text-center md:text-left">
            <span className="inline-block px-5 py-2 rounded-full 
            bg-gradient-to-r from-yellow-400 to-amber-500
            text-black text-[10px] font-black mb-6 tracking-[0.2em] uppercase shadow-lg shadow-yellow-500/20">
              GERBANG TERBUKA ✨
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-[1.1] tracking-tight">
              {/* SHADOW ditambahkan di sini supaya teks "keluar" */}
              <span className={`${isDark ? 'text-white' : 'text-slate-900'} drop-shadow-md`}>
                Akses Dimulai
              </span><br />
              <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 bg-clip-text text-transparent drop-shadow-sm">
                Aderun Nafis
              </span>
            </h1>

            <p className={`mt-6 max-w-xl text-lg leading-relaxed font-medium drop-shadow-sm ${
              isDark ? 'text-slate-200/90' : 'text-slate-700'
            }`}>
              ✨ Dalam setiap proyek kecil, terukir perjalanan menuju 
              <span className="text-amber-500 font-bold italic"> penguasaan teknologi </span> 
              dan masa depan di dunia digital.
            </p>

            <div className="flex gap-4 mt-10 justify-center md:justify-start">
              <button
                onClick={scrollToAbout}
                onMouseMove={handleMagnet}
                onMouseLeave={resetMagnet}
                className="px-8 py-4 rounded-full text-black font-black uppercase text-sm tracking-widest
                bg-gradient-to-r from-yellow-400 to-amber-500 hover:shadow-[0_0_20px_rgba(251,191,36,0.4)] transition-all duration-300"
              >
                🚀 Jelajahi
              </button>

              <a
                href="https://wa.me/your-number"
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={handleMagnet}
                onMouseLeave={resetMagnet}
                className={`px-8 py-4 rounded-full font-bold text-sm uppercase tracking-widest backdrop-blur-md transition-all duration-300 border ${
                  isDark
                    ? 'text-white bg-white/5 border-white/20 hover:bg-white/10'
                    : 'text-slate-900 bg-black/5 border-black/10 hover:bg-black/10'
                }`}
              >
                ✉️ Hubungi
              </a>
            </div>
          </div>
        </div>
      </div>

      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 p-3 rounded-full 
        bg-white/10 border border-white/20 backdrop-blur-md z-30 shadow-lg"
        whileHover={{ y: 5 }}
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowDown className="text-yellow-500 w-6 h-6" />
      </motion.button>
    </section>
  );
}
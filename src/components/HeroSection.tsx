import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import ThreeScene from './ThreeScene';

export default function HeroSection({ isDark }) {
  const glowRef = useRef(null);
  const canvasRef = useRef(null);
  const [trail, setTrail] = useState([]);
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;

      if (glowRef.current) {
        glowRef.current.style.left = e.clientX + 'px';
        glowRef.current.style.top = e.clientY + 'px';
      }

      setTrail((prev) => [
        ...prev.slice(-15),
        { x: e.clientX, y: e.clientY, id: Date.now() }
      ]);
    };

    window.addEventListener('mousemove', move);
    return () => window.removeEventListener('mousemove', move);
  }, []);

  // 🌅 BACKGROUND FIX
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
        // 🌅 DARK = SUNSET KONTRAS
        gradient.addColorStop(0, '#7c2d12');
        gradient.addColorStop(0.5, '#ea580c');
        gradient.addColorStop(1, '#fb923c');
      } else {
        // ☀️ LIGHT = KUNING CERAH + KONTRAS
        gradient.addColorStop(0, '#fff7b0');
        gradient.addColorStop(0.5, '#fde047');
        gradient.addColorStop(1, '#facc15');
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.y += star.speed;
        if (star.y > canvas.height) star.y = 0;

        ctx.fillStyle = isDark
          ? 'rgba(255,255,255,0.5)'
          : 'rgba(0,0,0,0.3)';

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

      {/* ❌ HAPUS HITAM → DIGANTI WARM */}
      <div
        className={`absolute inset-0 -z-10 ${
          isDark ? 'bg-orange-500/10' : 'bg-yellow-200/30'
        }`}
      />

      {/* GLOW */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed w-80 h-80 rounded-full 
        bg-gradient-to-br from-yellow-400/20 via-orange-400/20 to-pink-400/20
        blur-3xl -translate-x-1/2 -translate-y-1/2 z-10"
      />

      {/* TRAIL */}
      {trail.map((t) => (
        <motion.div
          key={t.id}
          className={`pointer-events-none fixed w-1.5 h-1.5 rounded-full blur-[1px] z-20 ${
            isDark ? 'bg-white/80' : 'bg-black/50'
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

          {/* IMAGE */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative group">
              <div className={`absolute -inset-2 rounded-3xl blur-2xl opacity-70 ${
                isDark
                  ? 'bg-gradient-to-r from-yellow-400 via-orange-500 to-amber-500'
                  : 'bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600'
              }`}></div>

              <div className="relative bg-white/30 backdrop-blur-xl border border-white/20 rounded-3xl p-2">
                <img
                  src="/ade.jpg"
                  alt="Aderun Nafis"
                  className="w-64 h-80 md:w-80 md:h-[420px] object-cover rounded-2xl"
                />
              </div>
            </div>
          </motion.div>

          {/* TEXT */}
          <div className="text-center md:text-left">
            <span className="inline-block px-5 py-2 rounded-full 
            bg-gradient-to-r from-yellow-400 to-amber-500
            text-black text-xs font-bold mb-6 tracking-wider">
              GERBANG TERBUKA ✨
            </span>

            <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
              {/* 🔥 KONTRAS FIX */}
              <span className={isDark ? 'text-white drop-shadow-lg' : 'text-gray-900 drop-shadow-md'}>
                Akses Dimulai
              </span><br />
              <span className="bg-gradient-to-r from-yellow-400 via-amber-500 to-orange-500 bg-clip-text text-transparent">
                Aderun Nafis
              </span>
            </h1>

            <p className={`mt-6 max-w-xl text-lg font-medium ${
              isDark ? 'text-white/95' : 'text-gray-900'
            }`}>
              ✨ Dalam setiap proyek kecil, terukir perjalanan menuju 
              <span className="text-amber-700 font-bold italic"> penguasaan teknologi </span> 
              dan masa depan di dunia digital.
            </p>

            <div className="flex gap-4 mt-10 justify-center md:justify-start">
              <button
                onClick={scrollToAbout}
                onMouseMove={handleMagnet}
                onMouseLeave={resetMagnet}
                className="px-8 py-3 rounded-full text-black font-bold 
                bg-gradient-to-r from-yellow-400 to-amber-500"
              >
                🚀 Jelajahi
              </button>

              <a
                href="#"
                className={`px-8 py-3 rounded-full font-semibold ${
                  isDark
                    ? 'text-white bg-white/10 border border-white/30'
                    : 'text-gray-900 bg-white/50 border border-gray-400'
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
        bg-white/30 border border-white/30 backdrop-blur-md z-30"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
      >
        <ArrowDown className="text-yellow-600 w-6 h-6" />
      </motion.button>
    </section>
  );
}
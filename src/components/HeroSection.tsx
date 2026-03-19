import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import ThreeScene from './ThreeScene';

export default function HeroSection() {
  const glowRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [trail, setTrail] = useState<any[]>([]);
  const mouse = useRef({ x: 0, y: 0 });

  // 🔥 MOUSE
  useEffect(() => {
    const move = (e: MouseEvent) => {
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

  // 🌌 BACKGROUND
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext('2d')!;

    let stars: any[] = [];
    let animationId: number;

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
        speed: Math.random() * 0.3
      });
    }

    const animate = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      gradient.addColorStop(0, '#a18cd1');
      gradient.addColorStop(0.5, '#8fd3f4');
      gradient.addColorStop(1, '#fbc2eb');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      stars.forEach((star) => {
        star.y += star.speed;
        if (star.y > canvas.height) star.y = 0;

        ctx.fillStyle = 'rgba(255,255,255,0.7)';
        ctx.fillRect(star.x, star.y, star.size, star.size);
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // 🧲 MAGNET SUPER GLOW
  const handleMagnet = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();

    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    el.style.transform = `
      translate(${x * 0.3}px, ${y * 0.3}px)
      scale(1.15)
    `;

    el.style.background = `
      linear-gradient(135deg, #22d3ee, #3b82f6, #a855f7, #ec4899)
    `;

    el.style.boxShadow = `
      0 0 25px #22d3ee,
      0 0 50px #3b82f6,
      0 0 80px #a855f7,
      0 0 120px #ec4899
    `;

    el.style.filter = "brightness(1.3)";
  };

  const resetMagnet = (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    const el = e.currentTarget;

    el.style.transform = "translate(0px, 0px) scale(1)";
    el.style.boxShadow = "none";
    el.style.filter = "none";
    el.style.background = "";
  };

  const scrollToAbout = () => {
    const el = document.querySelector('#about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      {/* 🌌 BACKGROUND */}
      <canvas ref={canvasRef} className="absolute inset-0 -z-20" />

      <div className="absolute inset-0 bg-white/20 dark:bg-black/40 backdrop-blur-[2px] -z-10"></div>

      {/* 🌈 CURSOR GLOW */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed w-80 h-80 rounded-full 
        bg-gradient-to-br from-cyan-400/40 via-blue-400/30 to-purple-400/40
        blur-3xl -translate-x-1/2 -translate-y-1/2 z-10"
      />

      {/* ✨ TRAIL */}
      {trail.map((t) => (
        <motion.div
          key={t.id}
          className="pointer-events-none fixed w-2 h-2 rounded-full bg-white/70 blur-sm z-20"
          style={{ left: t.x, top: t.y }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 2 }}
          transition={{ duration: 0.5 }}
        />
      ))}

      <ThreeScene />

      {/* CONTENT */}
      <div className="container mx-auto px-4 relative z-30">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">

          {/* FOTO */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-3xl blur-2xl opacity-80"></div>

              <div className="relative bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-2">
                <img
                  src="/carle.jpg"
                  alt="Rica Hardila"
                  className="w-64 h-80 md:w-80 md:h-[420px] object-cover rounded-2xl"
                />
              </div>
            </div>
          </motion.div>

          {/* TEXT */}
          <div className="text-center md:text-left">

            <span className="inline-block px-5 py-2.5 rounded-full 
            bg-gradient-to-r from-cyan-400 to-blue-500
            text-white text-sm font-semibold mb-6
            shadow-lg shadow-cyan-400/50
            border border-white/20
            hover:scale-105 transition">
              ✨ Let's Explore My Work!
            </span>

            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              <span className="text-gray-900 dark:text-white">Access granted!</span><br />
              <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Rica Hardila
              </span>
            </h1>

            <p className="text-gray-700 dark:text-white/80 mt-6 max-w-xl leading-relaxed">
              🔭 Setiap proyek kecil adalah bagian dari perjalanan saya memahami teknologi, 
              <span className="text-cyan-400"> while exploring creativity in the digital world.</span>
            </p>

            <div className="flex gap-4 mt-8 justify-center md:justify-start">

              {/* 🚀 EXPLORE */}
              <button
                onClick={scrollToAbout}
                onMouseMove={handleMagnet}
                onMouseLeave={resetMagnet}
                className="px-8 py-3 rounded-full text-white font-semibold 
                bg-gradient-to-r from-cyan-400 to-blue-500 
                transition-all duration-300"
              >
                🚀 Explore
              </button>

              {/* ✉️ CONTACT */}
              <a
                href="https://wa.me/your-number"
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={handleMagnet}
                onMouseLeave={resetMagnet}
                className="px-8 py-3 rounded-full text-white 
                bg-gray-800/40 border border-white/20 
                transition-all duration-300"
              >
                ✉️ Contact
              </a>

            </div>
          </div>
        </div>
      </div>

      {/* ⬇️ */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 p-3 rounded-full 
        bg-white/10 border border-white/10 z-30"
        whileHover={{ scale: 1.2 }}
      >
        <ArrowDown className="text-cyan-400" />
      </motion.button>
    </section>
  );
}
import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Instagram } from 'lucide-react';
import ThreeScene from './ThreeScene';

export default function HeroSection() {
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

    for (let i = 0; i < 200; i++) {
      stars.push({
        x: (Math.random() - 0.5) * canvas.width,
        y: (Math.random() - 0.5) * canvas.height,
        z: Math.random() * canvas.width
      });
    }

    const isDark = document.documentElement.classList.contains('dark');

    const animate = () => {
      const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);

      if (isDark) {
        gradient.addColorStop(0, '#020617');
        gradient.addColorStop(1, '#020617');
      } else {
        gradient.addColorStop(0, '#a18cd1');
        gradient.addColorStop(0.5, '#c2b5f5');
        gradient.addColorStop(1, '#e0e7ff');
      }

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const mx = (mouse.current.x - canvas.width / 2) * 0.0005;
      const my = (mouse.current.y - canvas.height / 2) * 0.0005;

      stars.forEach((star) => {
        star.z -= 2;
        if (star.z <= 0) star.z = canvas.width;

        const k = 128 / star.z;
        const x = star.x * k + canvas.width / 2 + mx * star.z * 2;
        const y = star.y * k + canvas.height / 2 + my * star.z * 2;

        const size = (1 - star.z / canvas.width) * 3;

        ctx.beginPath();
        ctx.fillStyle = isDark
          ? 'rgba(255,255,255,0.9)'
          : 'rgba(99,102,241,0.7)';

        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  const handleMagnet = (e) => {
    const el = e.currentTarget;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    el.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  };

  const resetMagnet = (e) => {
    e.currentTarget.style.transform = 'translate(0px, 0px)';
  };

  const scrollToAbout = () => {
    const el = document.querySelector('#about');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">

      <canvas ref={canvasRef} className="absolute inset-0 -z-10" />

      {/* overlay biar teks kebaca */}
      <div className="absolute inset-0 bg-white/40 dark:bg-black/40 -z-10"></div>

      {/* glow */}
      <div
        ref={glowRef}
        className="pointer-events-none fixed w-40 h-40 rounded-full 
        bg-cyan-400/20 blur-3xl -translate-x-1/2 -translate-y-1/2 z-50"
      />

      {/* trail */}
      {trail.map((t) => (
        <motion.div
          key={t.id}
          className="pointer-events-none fixed w-3 h-3 rounded-full bg-cyan-300/40 blur-sm z-40"
          style={{ left: t.x, top: t.y }}
          initial={{ opacity: 0.8, scale: 1 }}
          animate={{ opacity: 0, scale: 2 }}
          transition={{ duration: 0.6 }}
        />
      ))}

      <ThreeScene />

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">

          {/* FOTO */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex justify-center md:justify-end"
          >
            <div className="relative group">
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-3xl blur-2xl opacity-70"></div>

              <div className="relative bg-white/70 dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-3xl p-2">
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

            <span className="inline-block px-4 py-2 rounded-full 
            bg-white/80 dark:bg-white/10 
            text-gray-800 dark:text-cyan-300 
            text-sm mb-6 border border-gray-200 dark:border-white/10">
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
              <span className="text-cyan-500"> while exploring creativity in the digital world.</span>
            </p>

            {/* BUTTON */}
            <div className="flex gap-4 mt-8 justify-center md:justify-start">

              {/* SCROLL */}
              <button
                onClick={scrollToAbout}
                onMouseMove={handleMagnet}
                onMouseLeave={resetMagnet}
                className="px-8 py-3 rounded-full text-white font-semibold 
                bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-105 transition"
              >
                🚀 Explore
              </button>

              {/* LINK TAB BARU */}
              <a
                href="https://wa.me/your-number"
                target="_blank"
                rel="noopener noreferrer"
                onMouseMove={handleMagnet}
                onMouseLeave={resetMagnet}
                className="px-8 py-3 rounded-full 
                text-gray-800 dark:text-white 
                bg-white/80 dark:bg-white/10 
                border border-gray-200 dark:border-white/10 
                hover:scale-105 transition"
              >
                ✉️ Contact
              </a>

            </div>

            {/* SOCIAL */}
            <div className="flex gap-5 mt-8 justify-center md:justify-start">
              {[ 
                { icon: Github, href: 'https://github.com/Hardilarle269' },
                { icon: Instagram, href: 'https://www.instagram.com/rca_hrdl/' },
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseMove={handleMagnet}
                  onMouseLeave={resetMagnet}
                  className="p-3 rounded-full 
                  bg-white/80 dark:bg-white/10 
                  border border-gray-200 dark:border-white/10 
                  hover:scale-110 transition"
                >
                  <item.icon className="text-gray-800 dark:text-white w-5 h-5" />
                </a>
              ))}
            </div>

          </div>
        </div>
      </div>

      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 p-3 rounded-full 
        bg-white/80 dark:bg-white/10 
        border border-gray-200 dark:border-white/10"
        whileHover={{ scale: 1.2 }}
      >
        <ArrowDown className="text-cyan-500" />
      </motion.button>
    </section>
  );
}
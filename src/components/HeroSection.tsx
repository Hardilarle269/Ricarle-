import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThreeScene from './ThreeScene';

export default function HeroSection() {
  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) element.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">

      {/* 🌌 GOD LEVEL BACKGROUND */}
      <div className="absolute inset-0 -z-10">

        {/* AURORA GRADIENT */}
        <div className="absolute w-[700px] h-[700px] bg-cyan-500/20 blur-[140px] rounded-full animate-pulse top-[-150px] left-[-150px]" />
        <div className="absolute w-[600px] h-[600px] bg-purple-500/20 blur-[140px] rounded-full animate-pulse bottom-[-150px] right-[-150px]" />

        {/* COLOR OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-br from-black via-slate-900 to-black opacity-90" />

        {/* NOISE TEXTURE (BIAR GA FLAT) */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

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

              {/* GLOW */}
              <div className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 blur-xl opacity-50 group-hover:opacity-80 transition duration-700 rounded-3xl"></div>

              <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-2 shadow-[0_0_60px_rgba(0,255,255,0.2)]">
                <img
                  src="/carle.jpg"
                  alt="Rica Hardila"
                  className="w-64 h-80 md:w-80 md:h-[420px] object-cover rounded-2xl group-hover:scale-105 transition duration-700"
                />
              </div>

              <motion.div
                className="absolute -bottom-4 -right-4 backdrop-blur-md bg-white/10 px-4 py-2 rounded-xl border border-white/20 shadow-xl"
                animate={{ y: [0, -12, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                <span className="text-xs font-semibold text-cyan-300">
                  Web Developer
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* TEXT */}
          <div className="text-center md:text-left">

            <motion.span
              className="inline-block px-4 py-2 rounded-full backdrop-blur-md bg-white/10 text-sm text-cyan-300 mb-6 border border-white/10"
            >
              ✨ Glad you’re here. Explore my work!
            </motion.span>

            <motion.h1
              className="text-4xl md:text-6xl font-bold text-white leading-tight"
            >
              Access granted!
              <br />
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                Rica Hardila
              </span>
            </motion.h1>

            <p className="text-white/70 mt-6 max-w-xl">
              🔭 Setiap langkah kecil adalah bagian dari perjalanan saya memahami teknologi,
              while continuously exploring creativity and innovation in the digital world.
            </p>

            {/* 💎 BUTTON DEWA */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8">

              {/* PRIMARY */}
              <button
                onClick={() => {
                  const el = document.querySelector('#projects');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="relative px-8 py-3 rounded-full font-semibold text-black overflow-hidden group"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:scale-110 transition"></span>
                <span className="relative z-10">🚀 Explore Projects</span>
              </button>

              {/* SECONDARY */}
              <button
                onClick={() => {
                  const el = document.querySelector('#contact');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="px-8 py-3 rounded-full backdrop-blur-md bg-white/10 border border-white/20 text-white hover:bg-white/20 transition"
              >
                ✉️ Let’s Connect
              </button>

            </div>

            {/* SOCIAL */}
            <div className="flex gap-5 mt-8 justify-center md:justify-start">
              {[ 
                { icon: Github, href: 'https://github.com/Hardilarle269/Ricarle-.git' },
                { icon: Instagram, href: 'https://www.instagram.com/rca_hrdl/' },
              ].map((item, i) => (
                <motion.a
                  key={i}
                  href={item.href}
                  target="_blank"
                  className="p-3 rounded-full backdrop-blur-md bg-white/10 border border-white/10 hover:scale-110 hover:shadow-[0_0_20px_rgba(0,255,255,0.5)] transition"
                >
                  <item.icon className="text-white w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* SCROLL */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 p-3 rounded-full backdrop-blur-md bg-white/10 border border-white/10"
        whileHover={{ scale: 1.2 }}
      >
        <ArrowDown className="text-cyan-300" />
      </motion.button>
    </section>
  );
}
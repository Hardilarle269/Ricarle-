import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Github, Instagram } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ThreeScene from './ThreeScene';

export default function HeroSection() {
  const scrollToAbout = () => {
    const element = document.querySelector('#about');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-hero">
      {/* Background Animasi 3D */}
      <ThreeScene />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
          
          {/* KOLOM KIRI: FOTO PROFIL */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex justify-center md:justify-end order-1 md:order-1"
          >
            <div className="relative group">
              {/* Efek Glow di belakang foto */}
              <div className="absolute -inset-1.5 bg-gradient-to-r from-primary to-purple-600 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
              
              <div className="relative glass rounded-3xl p-2 border border-white/10 shadow-2xl overflow-hidden">
                <img 
                  src="/carle.jpg" // Ganti dengan file carle.jpg
                  alt="Rica Hardila"
                  className="w-64 h-80 md:w-80 md:h-[420px] object-cover rounded-2xl transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              
              {/* Badge Ornamen Floating */}
              <motion.div 
                className="absolute -bottom-4 -right-4 glass px-4 py-2 rounded-xl shadow-xl border border-white/20 hidden md:block"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              >
                <span className="text-xs font-bold text-primary">Web Developer</span>
              </motion.div>
            </div>
          </motion.div>

          {/* KOLOM KANAN: KONTEN TEKS */}
          <div className="text-center md:text-left order-2 md:order-2">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <motion.span 
                className="inline-block px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-6"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
              >
                ✨ Glad you’re here. Explore my work!
              </motion.span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-display text-4xl md:text-5xl lg:text-7xl font-bold mb-6 leading-tight"
            >
             Access granted!
              <br />
              <span className="text-gradient">Rica Hardila</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-xl mx-auto md:mx-0"
            >
               🔭 Setiap proyek kecil adalah bagian dari perjalanan saya memahami teknologi. 
               A curious mind exploring the endless landscape of the web.
               
              
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 mb-10"
            >
              <Button 
                size="lg" 
                className="rounded-full px-8 shadow-glow transition-all hover:scale-105"
                onClick={() => {
                  const element = document.querySelector('#projects');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Lihat Projects
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="rounded-full px-8 hover:bg-primary/10 transition-colors"
                onClick={() => {
                  const element = document.querySelector('#contact');
                  if (element) element.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Hubungi Saya
              </Button>
            </motion.div>

            {/* Social Media */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex items-center justify-center md:justify-start gap-6"
            >
              {[
                { icon: Github, href: 'https://github.com/Hardilarle269/Ricarle-.git', label: 'GitHub' },
                { icon: Instagram, href: 'https://www.instagram.com/rca_hrdl/', label: 'Instagram' },
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full glass hover:shadow-glow transition-all duration-300 border border-white/5"
                  whileHover={{ scale: 1.15, y: -4, rotate: 5 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={social.label}
                >
                  <social.icon className="h-5 w-5 text-foreground" />
                </motion.a>
              ))}
            </motion.div>
          </div>
        </div> 
      </div>

      {/* Button Scroll Down */}
      <motion.button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 p-3 rounded-full glass animate-float cursor-pointer z-20 border border-white/10"
        whileHover={{ scale: 1.1 }}
        aria-label="Scroll to About"
      >
        <ArrowDown className="h-5 w-5 text-primary" />
      </motion.button>
    </section>
  );
}
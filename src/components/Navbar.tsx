import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar({ isDark, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Beranda', href: '#home' },
    { label: 'Kenalan Lebih Dekat⚡', href: '#about' },
    { label: 'Skil Akademik🔥', href: '#skills' },
    { label: 'Soundtrack Hidup🎵', href: '#projects' },
    { label: 'Get in Touch', href: 'https://wa.me/6285373819128' },
  ];

  const scrollToSection = (href) => {
    if (href.startsWith('#')) {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.open(href, '_blank');
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? `backdrop-blur-xl 
               bg-gradient-to-r 
               from-[#1a0f07]/95 via-[#7c2d12]/90 to-[#ea580c]/90 
               border-b border-orange-400/30 
               shadow-[0_4px_30px_rgba(251,146,60,0.4)]`
            : `backdrop-blur-xl 
               bg-gradient-to-r 
               from-[#fef08a]/95 via-[#fde047]/95 to-[#facc15]/95 
               border-b border-yellow-500/30 
               shadow-[0_4px_20px_rgba(255,215,0,0.3)]`
          : isDark
          ? `bg-gradient-to-r 
             from-[#1a0f07]/80 via-[#7c2d12]/70 to-[#ea580c]/70`
          : `bg-gradient-to-r 
             from-[#fef08a]/80 via-[#fde047]/80 to-[#facc15]/80`
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">

          {/* LOGO */}
          <motion.a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('#home');
            }}
            className={`text-xl md:text-2xl font-bold cursor-pointer 
            ${
              isDark
                ? 'bg-gradient-to-r from-orange-300 via-amber-400 to-yellow-400 bg-clip-text text-transparent'
                : 'text-gray-900'
            }`}
            whileHover={{ scale: 1.1 }}
          >
            Ade's Portfolio
          </motion.a>

          {/* DESKTOP */}
          <div className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <motion.a
                key={item.label}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(item.href);
                }}
                className={`relative font-medium transition-all
                ${
                  isDark
                    ? 'text-white/90 hover:text-orange-300'
                    : 'text-gray-900 hover:text-amber-700'
                }`}
                whileHover={{ y: -2 }}
              >
                {item.label}

                {/* UNDERLINE */}
                <span
                  className={`absolute left-0 -bottom-1 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${
                    isDark ? 'bg-orange-400' : 'bg-yellow-600'
                  }`}
                ></span>
              </motion.a>
            ))}

            {/* THEME BUTTON */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className={`rounded-full ${
                isDark
                  ? 'text-white hover:bg-orange-400/20'
                  : 'text-gray-900 hover:bg-yellow-300/40'
              }`}
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <Sun className="h-5 w-5 text-orange-300" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Moon className="h-5 w-5 text-yellow-700" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>

          {/* MOBILE */}
          <div className="flex items-center gap-2 md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {isDark ? (
                <Sun className="h-5 w-5 text-orange-300" />
              ) : (
                <Moon className="h-5 w-5 text-yellow-700" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={isDark ? 'text-white' : 'text-gray-900'}
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden backdrop-blur-xl ${
              isDark
                ? 'bg-gradient-to-b from-[#1a0f07]/95 to-[#ea580c]/90 border-t border-orange-400/20'
                : 'bg-gradient-to-b from-[#fef08a]/95 to-[#facc15]/95 border-t border-yellow-400/20'
            }`}
          >
            <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
              {navItems.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.href);
                  }}
                  className={`${
                    isDark
                      ? 'text-white/90 hover:text-orange-300'
                      : 'text-gray-900 hover:text-amber-700'
                  } transition`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}
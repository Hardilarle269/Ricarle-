import { useState, useEffect } from 'react';
import { Moon, Sun, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';

interface NavbarProps {
  isDark: boolean;
  toggleTheme: () => void;
}

export default function Navbar({ isDark, toggleTheme }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? isDark
            ? // 🌙 DARK MODE (VERSI HIDUP + GLOW)
              `backdrop-blur-xl 
               bg-gradient-to-r 
               from-[#020617]/95 via-[#4c1d95]/90 to-[#7e22ce]/90 
               border-b border-purple-400/20 
               shadow-[0_4px_40px_rgba(124,58,237,0.4)]`
            : // ☀️ LIGHT MODE (tetap)
              'backdrop-blur-xl bg-gradient-to-r from-[#a18cd1]/90 via-[#fbc2eb]/90 to-[#8fd3f4]/90 border-b border-white/30 shadow-[0_4px_20px_rgba(168,85,247,0.25)]'
          : isDark
          ? // 🌙 DARK MODE (BELUM SCROLL)
            'bg-gradient-to-r from-[#020617]/80 via-[#4c1d95]/70 to-[#7e22ce]/70'
          : 'bg-gradient-to-r from-[#a18cd1]/70 via-[#fbc2eb]/70 to-[#8fd3f4]/70'
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
            ${isDark 
              ? 'bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-purple-500 bg-clip-text text-transparent drop-shadow-lg'
              : 'text-white drop-shadow-md'
            }`}
            whileHover={{ scale: 1.1 }}
          >
            Ricarle's Portfolio
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
                  ${isDark ? 'text-white/70 hover:text-purple-300' : 'text-white hover:text-white/90'}
                `}
                whileHover={{ y: -2 }}
              >
                {item.label}

                <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-gradient-to-r from-purple-400 to-pink-400 transition-all duration-300 group-hover:w-full"></span>
              </motion.a>
            ))}

            {/* THEME BUTTON */}
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full text-white hover:bg-purple-500/20"
            >
              <AnimatePresence mode="wait">
                {isDark ? (
                  <motion.div
                    key="sun"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                  >
                    <Sun className="h-5 w-5 text-yellow-300" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="moon"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                  >
                    <Moon className="h-5 w-5 text-purple-700" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>

          {/* MOBILE */}
          <div className="flex items-center gap-2 md:hidden">
            <Button variant="ghost" size="icon" onClick={toggleTheme}>
              {isDark ? (
                <Sun className="h-5 w-5 text-yellow-300" />
              ) : (
                <Moon className="h-5 w-5 text-purple-700" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white"
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
                ? 'bg-black/70 border-t border-purple-400/20' 
                : 'bg-white/60 border-t border-gray-300'
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
                    isDark ? 'text-white/70 hover:text-purple-300' : 'text-gray-800 hover:text-black'
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
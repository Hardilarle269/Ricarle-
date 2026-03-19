import { motion } from 'framer-motion';
import { Github, Instagram, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: Github, href: 'https://github.com/Hardilarle269/Ricarle-.git', label: 'GitHub' },
    { icon: Instagram, href: 'https://www.instagram.com/rca_hrdl/', label: 'Instagram' },
  ];

  return (
    <footer
      className="
      py-8 
      transition-all duration-300

      /* ☀️ LIGHT MODE */
      bg-gradient-to-r 
      from-[#a18cd1]/90 via-[#fbc2eb]/90 to-[#8fd3f4]/90
      border-t border-white/30

      /* 🌙 DARK MODE */
      dark:bg-gradient-to-r 
      dark:from-[#020617] dark:via-[#1e1b4b] dark:to-[#4c1d95]
      dark:border-purple-500/20
      dark:shadow-[0_-4px_30px_rgba(124,58,237,0.3)]
      "
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          {/* TEXT */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="
            flex items-center gap-2 text-sm font-medium tracking-wide

            /* ✨ LIGHT MODE (DI UPGRADE) */
            text-gray-700

            /* 🌙 DARK MODE (TETAP) */
            dark:text-white/70
            "
          >
            <span>© {currentYear} Crafted with</span>

            <Heart className="h-4 w-4 text-red-400 fill-red-400 animate-pulse" />

            <span className="
              bg-gradient-to-r 
              from-cyan-500 via-blue-500 to-purple-500 
              bg-clip-text text-transparent font-semibold
            ">
              by Rica Hardila
            </span>
          </motion.div>

          {/* SOCIAL */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4"
          >
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
                className="
                p-2 rounded-full transition-all duration-300

                /* LIGHT */
                text-white hover:bg-white/20 hover:scale-110

                /* DARK */
                dark:text-white/70 dark:hover:text-purple-300 dark:hover:bg-purple-500/20
                "
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </footer>
  );
}
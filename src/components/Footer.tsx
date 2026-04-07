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

      /* ☀️ LIGHT MODE (FIXED) */
      bg-gradient-to-r 
      from-yellow-200 via-amber-300 to-orange-300
      border-t border-orange-300/40
      shadow-[0_-10px_30px_rgba(251,191,36,0.2)]

      /* 🌙 DARK MODE (BIAR MATCH SUNSET) */
      dark:bg-gradient-to-r 
      dark:from-[#7c2d12] dark:via-[#ea580c] dark:to-[#fb923c]
      dark:border-orange-400/20
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

            /* ✨ LIGHT MODE (NYATU & KEBACA) */
            text-orange-900

            /* 🌙 DARK MODE */
            dark:text-white/80
            "
          >
            <span>© {currentYear} Crafted with</span>

            <Heart className="h-4 w-4 text-red-400 fill-red-400 animate-pulse" />

            <span className="
              bg-gradient-to-r 
              from-orange-600 via-amber-600 to-yellow-500 
              bg-clip-text text-transparent font-semibold
            ">
              by Aderun Nafis
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

                /* ☀️ LIGHT */
                text-orange-800 hover:bg-white/30 hover:scale-110

                /* 🌙 DARK */
                dark:text-white/70 dark:hover:text-yellow-300 dark:hover:bg-white/10
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
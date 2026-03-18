import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

const certificates = [
  {
    title: 'Kejurnas Kajati Aceh Cup II',
    date: '2021',
    image: '🥇',
    color: 'from-orange-400/20 to-yellow-300/20 border-orange-300/30',
    glow: 'from-orange-400 via-amber-400 to-yellow-300',
    link: '#',
  },
  {
    title: 'Mosa Olympiad Competition',
    date: '2023',
    image: '🎧',
    color: 'from-cyan-400/20 to-blue-500/20 border-cyan-300/30',
    glow: 'from-cyan-400 via-blue-500 to-indigo-500',
    link: '#',
  },
  {
    title: 'Rangking 1 Commet',
    date: '2023',
    image: '🌌',
    color: 'from-purple-500/20 to-indigo-500/20 border-purple-300/30',
    glow: 'from-purple-500 via-indigo-500 to-blue-500',
    link: '#',
  },
  {
    title: 'Kejuaraan Karate',
    date: '2023',
    image: '🥉',
    color: 'from-emerald-400/20 to-green-500/20 border-emerald-300/30',
    glow: 'from-emerald-400 via-green-500 to-teal-400',
    link: '#',
  },
  {
    title: 'Ranking 1 Saleum',
    date: '2025',
    image: '⚙️',
    color: 'from-red-500/20 to-pink-500/20 border-red-300/30',
    glow: 'from-red-500 via-pink-500 to-rose-400',
    link: '#',
  },
  {
    title: 'Kompetisi Bahasa Inggris',
    date: '2023',
    image: '📋',
    color: 'from-teal-400/20 to-cyan-400/20 border-teal-300/30',
    glow: 'from-teal-400 via-cyan-400 to-blue-400',
    link: '#',
  },
];

export default function CertificatesSection() {
  return (
    <section
      id="certificates"
      className="relative py-20 md:py-32 overflow-hidden bg-gradient-to-br from-[#020617] via-[#0f172a] to-[#020617]"
    >

      {/* 🌌 GLOW BACKGROUND */}
      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-transparent to-purple-500/10 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 font-medium mb-2 block">
            Creds ✨
          </span>

          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-white">
            Certs &amp; Achievements ⭐
          </h2>

          <div className="w-20 h-1 bg-cyan-400 mx-auto rounded-full" />
        </motion.div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {certificates.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative"
            >

              {/* 🔥 OUTER GLOW */}
              <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${cert.glow} blur-xl opacity-0 group-hover:opacity-70 transition duration-500`}></div>

              {/* CARD */}
              <div className={`relative h-full p-6 rounded-2xl backdrop-blur-md border bg-gradient-to-br ${cert.color} transition-all duration-300 hover:-translate-y-3 hover:scale-[1.03]`}>

                {/* ICON */}
                <div className={`w-16 h-16 rounded-xl mb-4 flex items-center justify-center bg-gradient-to-br ${cert.color}`}>
                  <span className="text-3xl">{cert.image}</span>
                </div>

                <div className="space-y-3">

                  <div className="flex items-start gap-2">
                    <Award className="h-5 w-5 text-cyan-300 mt-0.5 shrink-0" />
                    <h3 className="font-display text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                      {cert.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-white/60">
                    <Calendar className="h-4 w-4" />
                    <span>{cert.date}</span>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="rounded-full mt-2 border-white/20 text-white hover:bg-cyan-400 hover:text-black transition"
                    asChild
                  >
                    <a href={cert.link} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4 mr-1" />
                      Verifikasi
                    </a>
                  </Button>

                </div>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
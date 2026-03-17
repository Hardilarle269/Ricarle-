import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Video, Coffee, Rocket, ChevronDown, Sparkles, GraduationCap, Target } from 'lucide-react';

const STATS = [
  // { icon: Code2, value: '50+', label: 'Projects Selesai' },
  // { icon: Video, value: '5+', label: 'Video Konten' },
  { icon: Coffee, value: '100+', label: 'Cangkir Matcha' },
  { icon: Rocket, value: '3+', label: 'Tahun Pengalaman' },
];

const ACCORDION_DATA = [
  {
    id: 'edu',
    icon: <GraduationCap className="w-5 h-5" />,
    title: "Pendidikan & Kedinasan",
    content: "Sebagai pelajar di MAN 1 Banda Aceh kelas persiapan kedinasan, saya dilatih untuk memiliki disiplin tinggi, integritas, dan manajemen waktu yang ketat. Nilai-nilai ini menjadi pondasi saya dalam membangun proyek web yang terstruktur."
  },
  {
    id: 'vision',
    icon: <Target className="w-5 h-5" />,
    title: "Visi & Fokus Teknologi",
    content: "Saya berfokus pada Modern Web Development menggunakan React dan ekosistemnya. Ambisi saya adalah menciptakan solusi digital yang tidak hanya estetik, tetapi juga bermanfaat bagi masyarakat luas."
  }
];

export default function AboutSection() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="about" className="py-20 md:py-32 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="flex items-center justify-center gap-2 text-primary font-bold tracking-widest uppercase text-sm mb-3">
            <Sparkles size={16} />
            Who Am I? 🧠⚡
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Know Me Better 💫
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">
          
          {/* SISI KIRI: Visual & Stats */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative group"
            >
              <div className="aspect-square rounded-2xl overflow-hidden glass shadow-card bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                <span className="text-8xl group-hover:scale-110 transition-transform duration-500">👨‍💻</span>
              </div>
              <div className="absolute -bottom-6 -right-6 p-4 glass rounded-xl shadow-card">
                <p className="font-display font-bold text-2xl text-gradient">5+ Tahun</p>
                <p className="text-sm text-muted-foreground font-medium">Pengalaman</p>
              </div>
            </motion.div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 glass rounded-xl text-center hover:border-primary/50 border border-transparent transition-all group"
                >
                  <stat.icon className="h-6 w-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
                  <p className="font-display text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* SISI KANAN: Text & Accordion */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              <h3 className="font-display text-2xl md:text-3xl font-bold">
                Future Web Developer <span className="inline-block animate-bounce">🚀</span>
              </h3>
              <p className="text-muted-foreground leading-relaxed text-lg">
                Hi, I’m <strong className="text-foreground">Rica Hardila</strong> ✨ Seorang pelajar di 
                <span className="text-primary font-medium"> MAN 1 Banda Aceh</span> yang sedang menempuh pendidikan di kelas persiapan kedinasan. 
              </p>
            </motion.div>

            {/* Accordion List */}
            <div className="space-y-3 pt-4">
              {ACCORDION_DATA.map((item, idx) => (
                <motion.div 
                  key={item.id}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (idx * 0.1) }}
                  className="rounded-xl border border-white/10 overflow-hidden glass"
                >
                  <button
                    onClick={() => setExpanded(expanded === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-4 text-left transition-colors hover:bg-white/5"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${expanded === idx ? 'bg-primary text-white' : 'bg-primary/10 text-primary'}`}>
                        {item.icon}
                      </div>
                      <span className="font-bold">{item.title}</span>
                    </div>
                    <ChevronDown className={`w-5 h-5 transition-transform duration-300 ${expanded === idx ? 'rotate-180' : ''}`} />
                  </button>
                  
                  <AnimatePresence>
                    {expanded === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                      >
                        <div className="p-4 pt-0 text-muted-foreground leading-relaxed">
                          <div className="h-[1px] w-full bg-white/10 mb-4" />
                          {item.content}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
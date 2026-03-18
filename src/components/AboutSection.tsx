import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Coffee, Rocket, ChevronDown, Sparkles, GraduationCap, Target } from 'lucide-react';

const STATS = [
  { icon: Coffee, value: '100+', label: 'Cangkir Matcha' },
  { icon: Rocket, value: '3+', label: 'Tahun Pengalaman' },
];

const ACCORDION_DATA = [
  {
    id: 'edu',
    icon: <GraduationCap className="w-5 h-5" />,
    title: "Perkenalan & Pendidikan",
    content:
      "Nama saya Rica Hardila, lahir pada 15 Desember 2009 di Banda Aceh. I am the youngest of three siblings with two older brothers as my role models. Sejak kecil, saya dibesarkan dengan disiplin dan tanggung jawab. Currently, I study at MAN 1 Banda Aceh in a government class. Lingkungan ini membentuk saya menjadi pribadi yang terstruktur, berintegritas, dan siap menghadapi tantangan, termasuk di bidang teknologi."
  },
  {
    id: 'vision',
    icon: <Target className="w-5 h-5" />,
    title: "Visi & Cita-cita",
    content:
      "Saya ingin berkembang sebagai individu yang tidak hanya memahami teknologi, tetapi juga mampu menciptakan pengalaman digital yang bermakna. With a focus on modern web development using React, saya membangun digital solutions yang clean, aesthetic, dan impactful. Bagi saya, teknologi bukan hanya tentang sistem, tetapi tentang bagaimana sebuah produk bisa terasa hidup dan berguna bagi banyak orang. Sejalan dengan itu, saya bercita-cita menjadi Polwan yang profesional, berintegritas, dan humanis, yang siap serve the community, menjaga keamanan, serta membangun rasa percaya di tengah masyarakat."
  }
];

export default function AboutSection() {
  const [expanded, setExpanded] = useState(null);

  return (
    <section id="about" className="py-20 md:py-32 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">

        {/* HEADER */}
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

          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Know Me Better 💫
          </h2>

          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start max-w-6xl mx-auto">

          {/* KIRI */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative group"
            >

              {/* AMBER GLOW */}
              <div className="relative p-[3px] rounded-2xl bg-gradient-to-r from-orange-400 via-amber-400 to-yellow-300 shadow-[0_0_30px_rgba(251,146,60,0.6)] hover:shadow-[0_0_70px_rgba(251,146,60,0.9)] transition duration-500">

                {/* FOTO */}
                <div className="aspect-square rounded-2xl overflow-hidden bg-background border border-white/10 backdrop-blur-sm">
                  <img
                    src="/profile.jpg"
                    alt="profile"
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                  />
                </div>

              </div>

              {/* BADGE */}
              <div className="absolute -bottom-6 -right-6 p-4 rounded-xl bg-background shadow-lg">
                <p className="font-bold text-2xl text-primary">3+ Tahun</p>
                <p className="text-sm text-muted-foreground">Pengalaman</p>
              </div>
            </motion.div>

            {/* STATS */}
            <div className="grid grid-cols-2 gap-4">
              {STATS.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl text-center border hover:border-primary transition-all"
                >
                  <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* KANAN */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl md:text-3xl font-bold">
                Future Web Developer 🚀
              </h3>

              <p className="text-muted-foreground leading-relaxed text-lg mt-2">
                Hi, I’m <strong className="text-foreground">Rica Hardila</strong> ✨ 
                Seorang pelajar di 
                <span className="text-primary font-medium"> MAN 1 Banda Aceh</span>.
              </p>
            </motion.div>

            {/* ACCORDION */}
            <div className="space-y-3 pt-4">
              {ACCORDION_DATA.map((item, idx) => (
                <motion.div key={item.id} className="rounded-xl border overflow-hidden">

                  <button
                    onClick={() => setExpanded(expanded === idx ? null : idx)}
                    className="w-full flex items-center justify-between p-4 hover:bg-muted transition"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10 text-primary">
                        {item.icon}
                      </div>
                      <span className="font-bold">{item.title}</span>
                    </div>

                    <ChevronDown
                      className={`w-5 h-5 transition ${
                        expanded === idx ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {expanded === idx && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-4 text-muted-foreground leading-relaxed">
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
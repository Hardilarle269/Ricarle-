import { motion } from 'framer-motion';

const skills = {
  ipa: [
    { name: 'Matematika', level: 95 },
    { name: 'Fisika', level: 90 },
    { name: 'Biologi', level: 98 },
    { name: 'Kimia', level: 90 },
  ],
  ips: [
    { name: 'Sejarah', level: 95 },
    { name: 'Sosiologi', level: 98 },
    { name: 'Geografi', level: 92 },
    { name: 'Ekonomi', level: 90 },
  ],
  bahasa: [
    { name: 'Bahasa Inggris', level: 98 },
    { name: 'Bahasa Indonesia', level: 95 },
    { name: 'Bahasa Arab', level: 90 },
    { name: 'Bahasa Spanyol', level: 85 },
  ],
};

function SkillBar({
  name,
  level,
  delay,
  color,
}: {
  name: string;
  level: number;
  delay: number;
  color: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="space-y-2"
    >
      <div className="flex justify-between items-center text-white">
        <span className="font-medium">{name}</span>
        <span className="text-sm text-white/70">{level}%</span>
      </div>

      <div className="h-2 bg-white/10 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.2, ease: 'easeOut' }}
          className={`h-full rounded-full bg-gradient-to-r ${color} shadow-[0_0_10px_rgba(255,255,255,0.4)]`}
        />
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="py-20 md:py-32 bg-gradient-to-b from-slate-900 via-indigo-900 to-slate-900"
    >
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-cyan-400 font-medium mb-2 block">
            Expertise
          </span>

          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Academic Abilities 📚
          </h2>

          <div className="w-20 h-1 bg-cyan-400 mx-auto rounded-full" />
        </motion.div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/* IPA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-400/20 backdrop-blur-xl hover:scale-105 hover:shadow-[0_0_40px_rgba(34,197,94,0.4)] transition duration-500"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-green-400/10">
                <span className="text-2xl">⚗️</span>
              </div>
              <h3 className="text-xl font-bold text-white">IPA</h3>
            </div>

            <div className="space-y-4">
              {skills.ipa.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  {...skill}
                  delay={index * 0.1}
                  color="from-green-400 to-emerald-400"
                />
              ))}
            </div>
          </motion.div>

          {/* IPS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-400/20 backdrop-blur-xl hover:scale-105 hover:shadow-[0_0_40px_rgba(234,179,8,0.4)] transition duration-500"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-yellow-400/10">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold text-white">IPS</h3>
            </div>

            <div className="space-y-4">
              {skills.ips.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  {...skill}
                  delay={index * 0.1}
                  color="from-yellow-400 to-orange-400"
                />
              ))}
            </div>
          </motion.div>

          {/* BAHASA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-400/20 backdrop-blur-xl hover:scale-105 hover:shadow-[0_0_40px_rgba(59,130,246,0.4)] transition duration-500"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-blue-400/10">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-bold text-white">Bahasa</h3>
            </div>

            <div className="space-y-4">
              {skills.bahasa.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  {...skill}
                  delay={index * 0.1}
                  color="from-blue-400 to-cyan-400"
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
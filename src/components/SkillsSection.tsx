import { motion } from 'framer-motion';

const skills = {
  ipa: [
    { name: 'Matematika', level: 95 },
    { name: 'Fisika', level: 95 },
    { name: 'Biologi', level: 90 },
    { name: 'Kimia', level: 90 },
  ],
  ips: [
    { name: 'Sejarah', level: 95 },
    { name: 'Sosiologi', level: 90 },
    { name: 'Geografi', level: 93 },
    { name: 'Ekonomi', level: 90 },
  ],
  olahraga: [
    { name: 'Lari', level: 90 },
    { name: 'Badminton', level: 85 },
    { name: 'Bola', level: 80 },
    { name: 'Baket', level: 85 },
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
        <span className="text-sm text-white">{level}%</span>
      </div>

      <div className="h-2 bg-white/30 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: delay + 0.2, ease: 'easeOut' }}
          className={`h-full rounded-full ${color}`}
        />
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  return (
    <section
      id="skills"
      className="py-20 md:py-32 bg-yellow-200"
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
          <span className="text-yellow-700 font-medium mb-2 block">
            Expertise
          </span>

          <h2 className="text-3xl md:text-5xl font-bold text-yellow-900 mb-4">
            Skill Akademik🔥
          </h2>

          <div className="w-20 h-1 bg-yellow-700 mx-auto rounded-full" />
        </motion.div>

        {/* GRID */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">

          {/* IPA */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="p-6 rounded-2xl bg-yellow-400 border border-yellow-500 backdrop-blur-xl hover:scale-105 hover:shadow-lg transition duration-500"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-yellow-500">
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
                  color="bg-yellow-600"
                />
              ))}
            </div>
          </motion.div>

          {/* IPS */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-6 rounded-2xl bg-orange-400 border border-orange-500 backdrop-blur-xl hover:scale-105 hover:shadow-lg transition duration-500"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-orange-500">
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
                  color="bg-orange-600"
                />
              ))}
            </div>
          </motion.div>

          {/* Olahraga */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="p-6 rounded-2xl bg-amber-400 border border-amber-500 backdrop-blur-xl hover:scale-105 hover:shadow-lg transition duration-500"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-amber-500">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-bold text-white">Olahraga</h3>
            </div>

            <div className="space-y-4">
              {skills.olahraga.map((skill, index) => (
                <SkillBar
                  key={skill.name}
                  {...skill}
                  delay={index * 0.1}
                  color="bg-amber-600"
                />
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
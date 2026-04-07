import { motion } from "framer-motion";
import { Award, ExternalLink, Calendar } from "lucide-react";

type Certificate = {
  title: string;
  image: string;
  color: string;
  glow: string;
  link: string;
  date?: string;
};

const certificates: Certificate[] = [
  {
    title: "👑 United Kingdom",
    image: "/amerika.jpg",
    color: "from-yellow-200 to-yellow-100 border-yellow-300",
    glow: "from-yellow-300 via-yellow-200 to-yellow-400",
    link: "#",
  },
  {
    title: "⛰️ Switzerland",
    image: "/swiss.jpg",
    color: "from-yellow-100 to-yellow-200 border-yellow-300",
    glow: "from-yellow-200 via-yellow-300 to-yellow-400",
    link: "#",
  },
  {
    title: "🥢 China",
    image: "/china.jpg",
    color: "from-yellow-200 to-yellow-300 border-yellow-300",
    glow: "from-yellow-300 via-yellow-200 to-yellow-400",
    link: "#",
  },
  {
    title: "🕌 India",
    image: "/india.jpg",
    color: "from-yellow-100 to-yellow-200 border-yellow-300",
    glow: "from-yellow-300 via-yellow-200 to-yellow-400",
    link: "#",
  },
  {
    title: "☕ Turkey",
    image: "/turki.jpg",
    color: "from-yellow-200 to-yellow-100 border-yellow-300",
    glow: "from-yellow-300 via-yellow-200 to-yellow-400",
    link: "#",
  },
  {
    title: "🥐 France",
    image: "/france.jpg",
    color: "from-yellow-100 to-yellow-200 border-yellow-300",
    glow: "from-yellow-200 via-yellow-300 to-yellow-400",
    link: "#",
  },
];

export default function CertificatesSection() {
  return (
    <section
      id="certificates"
      className="relative py-20 overflow-hidden 
      bg-gradient-to-br from-[#fef9c3] via-[#fde68a] to-[#fcd34d]"
    >
      {/* 🌼 background glow */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-200/60 via-yellow-100/40 to-yellow-300/60 blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold text-yellow-800">
            Negara Impian 🌍
          </h2>
        </motion.div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certificates.map((cert, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              {/* glow */}
              <div
                className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${cert.glow} blur-xl opacity-0 group-hover:opacity-80 transition`}
              ></div>

              {/* card */}
              <div
                className={`relative p-5 rounded-2xl border bg-gradient-to-br ${cert.color} backdrop-blur-md hover:-translate-y-2 hover:scale-[1.02] transition`}
              >
                {/* image */}
                <div className="w-full h-40 mb-4 rounded-lg overflow-hidden">
                  <img
                    src={cert.image}
                    alt={cert.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition"
                  />
                </div>

                {/* content */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Award size={18} className="text-yellow-800" />
                    <h3 className="font-semibold text-yellow-900">
                      {cert.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-yellow-800">
                    <Calendar size={16} />
                    <span>{cert.date || "Coming Soon"}</span>
                  </div>

                  <a
                    href={cert.link}
                    className="inline-flex items-center gap-1 text-sm mt-2 text-yellow-900 hover:underline"
                  >
                    <ExternalLink size={16} />
                    Verifikasi
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
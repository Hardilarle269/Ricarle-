import { useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useEmblaCarousel from 'embla-carousel-react';

const projects = [
  {
    title: '🎬 All of Us Are Dead',
    description:
      'Wabah zombie menyerang sekolah dan memaksa siswa bertahan hidup. An intense survival story full of tension.',
    image: '/all-of-us-are-dead.jpg',
    color: 'from-lime-400 via-green-400 to-emerald-300',
  },
  {
    title: '🦁 Mufasa: The Lion King',
    description:
      'Perjalanan Mufasa dari awal hingga menjadi raja yang kuat. A powerful story of courage and destiny.',
    image: '/Mufasa.jpg',
    color: 'from-yellow-300 via-amber-300 to-orange-400',
  },
  {
    title: '👻 Annabelle',
    description:
      'Boneka misterius yang membawa teror ke dalam rumah. A chilling horror experience.',
    image: '/Annabelle.jpg',
    color: 'from-red-500 via-red-600 to-pink-500',
  },
  {
    title: '🧠 Inside Out 2',
    description:
      'Petualangan emosi baru dalam pikiran Riley. A colorful journey of feelings and growth.',
    image: '/inside-out.jpg',
    color: 'from-blue-300 via-pink-300 to-yellow-200',
  },
  {
    title: '🌊 Moana 2',
    description:
      'Moana kembali berlayar menjelajahi lautan. A brave adventure across the ocean.',
    image: '/moana.jpg',
    color: 'from-cyan-300 via-blue-400 to-indigo-400',
  },
  {
    title: '👹 Pengabdi Setan',
    description:
      'Teror keluarga dengan misteri kelam yang menghantui. One of Indonesia’s scariest horror films.',
    image: '/pengabdi-setan.jpg',
    color: 'from-red-500 via-pink-500 to-purple-500',
  },
];

export default function ProjectsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    dragFree: true,
  });

  const scrollPrev = useCallback(() => {
    emblaApi?.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    emblaApi?.scrollNext();
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);
    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section
      id="projects"
      className="py-20 bg-gradient-to-b from-slate-900 via-indigo-900 to-slate-900 overflow-hidden"
    >
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white">
            My Ultimate Watch 🍿
          </h2>
        </motion.div>

        {/* CAROUSEL */}
        <div className="relative max-w-6xl mx-auto">
          <div ref={emblaRef} className="overflow-hidden">
            <div className="flex gap-6">

              {projects.map((project, index) => (
                <div
                  key={index}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%]"
                >
                  <div className="p-5 rounded-2xl bg-white/5 backdrop-blur-xl hover:-translate-y-3 transition-all duration-500">

                    <div className="relative group">

                      {/* OUTER GLOW */}
                      <div
                        className={`absolute inset-0 rounded-xl bg-gradient-to-r ${project.color}
                        blur-3xl opacity-50 group-hover:opacity-100 
                        scale-90 group-hover:scale-110 
                        transition duration-500`}
                      />

                      {/* LIGHT BURST */}
                      <div
                        className={`absolute inset-0 rounded-xl bg-gradient-to-r ${project.color}
                        blur-2xl opacity-0 group-hover:opacity-80 
                        animate-pulse`}
                      />

                      {/* BORDER */}
                      <div
                        className={`relative p-[3px] rounded-xl bg-gradient-to-r ${project.color}
                        shadow-[0_0_40px_rgba(255,255,255,0.3)]
                        group-hover:shadow-[0_0_80px_rgba(255,255,255,0.9)]
                        transition duration-500`}
                      >

                        {/* IMAGE */}
                        <div className="aspect-[2/3] w-full rounded-xl overflow-hidden bg-black border border-white/10">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover object-top 
                            group-hover:scale-110 
                            group-hover:brightness-110 
                            group-hover:saturate-150 
                            transition duration-500"
                          />
                        </div>

                      </div>
                    </div>

                    {/* TITLE */}
                    <h3 className="font-bold text-lg mt-4 text-white">
                      {project.title}
                    </h3>

                    {/* DESC */}
                    <p className="text-sm text-white/70 mt-2">
                      {project.description}
                    </p>

                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* BUTTON LEFT */}
          <Button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
          >
            <ChevronLeft />
          </Button>

          {/* BUTTON RIGHT */}
          <Button
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
          >
            <ChevronRight />
          </Button>

        </div>
      </div>
    </section>
  );
}
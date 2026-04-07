import { useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useEmblaCarousel from 'embla-carousel-react';

const projects = [
  {
    title: '📷 Photograph – Ed Sheeran',
    description:
      'Lagu tentang kenangan dan cinta yang tetap hidup meski terpisah jarak.',
    image: '/ed.jpg',
    color: 'from-blue-300 via-indigo-400 to-purple-400',
  },
  {
    title: '🌙 Somebody’s Pleasure – Aziz Hedra',
    description:
      'Perasaan kosong dan kehilangan arah dalam hidup.',
    image: '/aziz.jpg',
    color: 'from-indigo-500 via-purple-500 to-slate-700',
  },
  {
    title: '🌇 Bersenja Gurau – Raim Laode',
    description:
      'Momen hangat dan sederhana bersama orang tersayang.',
    image: '/raim.jpg',
    color: 'from-orange-300 via-pink-400 to-rose-400',
  },
  {
    title: '🏙️ Kota Ini Tak Sama Tanpamu – Nadhif Basmalah',
    description:
      'Kehilangan yang membuat semuanya terasa berbeda.',
    image: '/nadhif.jpg',
    color: 'from-gray-400 via-slate-500 to-gray-700',
  },
  {
    title: '🎯 Risk It All – Bruno Mars',
    description:
      'Keberanian mengambil risiko demi cinta.',
    image: '/bruno.jpg',
    color: 'from-red-500 via-orange-500 to-yellow-400',
  },
  {
    title: '🌹 Cinta Luar Biasa – Andmesh Kamaleng',
    description:
      'Cinta tulus yang sederhana namun dalam.',
    image: '/andmesh.jpg',
    color: 'from-pink-400 via-rose-400 to-red-500',
  },
];

export default function ProjectsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'center',
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
      className="py-20 bg-yellow-300 overflow-hidden"
    >
      <div className="container mx-auto px-4">

        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-gray-900">
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
                  <div className="p-5 rounded-2xl bg-white/60 backdrop-blur-md hover:-translate-y-3 transition-all duration-500">

                    <div className="relative group">

                      {/* GLOW */}
                      <div
                        className={`absolute inset-0 rounded-xl bg-gradient-to-r ${project.color}
                        blur-3xl opacity-40 group-hover:opacity-100 
                        scale-90 group-hover:scale-110 transition duration-500`}
                      />

                      {/* BORDER */}
                      <div
                        className={`relative p-[3px] rounded-xl bg-gradient-to-r ${project.color}`}
                      >

                        {/* IMAGE */}
                        <div className="aspect-[2/3] w-full rounded-xl overflow-hidden bg-black flex items-center justify-center">
                          <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover object-center scale-105
                            group-hover:scale-110 transition duration-500"
                          />
                        </div>

                      </div>
                    </div>

                    {/* TITLE */}
                    <h3 className="font-bold text-lg mt-4 text-gray-900">
                      {project.title}
                    </h3>

                    {/* DESC */}
                    <p className="text-sm text-gray-800 mt-2">
                      {project.description}
                    </p>

                  </div>
                </div>
              ))}

            </div>
          </div>

          {/* BUTTON */}
          <Button
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
          >
            <ChevronLeft />
          </Button>

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
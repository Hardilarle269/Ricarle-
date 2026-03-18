import { useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github, Play, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import useEmblaCarousel from 'embla-carousel-react';

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Platform e-commerce modern dengan fitur lengkap termasuk payment gateway, inventory management, dan analytics dashboard.',
    tags: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
    image: '🛒',
    color: 'from-blue-500/20 to-cyan-500/20',
    github: '#',
    demo: '#',
  },
  {
    title: 'Learning Management System',
    description: 'Platform pembelajaran online dengan video streaming, quiz interaktif, dan progress tracking.',
    tags: ['Next.js', 'TypeScript', 'MongoDB', 'WebRTC'],
    image: '📚',
    color: 'from-purple-500/20 to-pink-500/20',
    github: '#',
    demo: '#',
  },
  {
    title: 'Social Media Dashboard',
    description: 'Dashboard analytics untuk social media dengan real-time data visualization dan reporting.',
    tags: ['React', 'D3.js', 'Firebase', 'Tailwind'],
    image: '📊',
    color: 'from-orange-500/20 to-red-500/20',
    github: '#',
    demo: '#',
  },
  {
    title: 'AI Content Generator',
    description: 'Tool untuk generate konten menggunakan AI dengan integrasi berbagai model language.',
    tags: ['Python', 'FastAPI', 'OpenAI', 'React'],
    image: '🤖',
    color: 'from-green-500/20 to-teal-500/20',
    github: '#',
    demo: '#',
  },
  {
    title: 'Video Editing Tutorial',
    description: 'Seri tutorial video editing dengan 100+ episode dan 10k+ subscribers.',
    tags: ['Premiere Pro', 'After Effects', 'YouTube'],
    image: '🎬',
    color: 'from-red-500/20 to-orange-500/20',
    isContent: true,
    youtube: '#',
  },
  {
    title: 'Coding Tips & Tricks',
    description: 'Konten tips programming dan best practices untuk developer Indonesia.',
    tags: ['Instagram', 'TikTok', 'YouTube Shorts'],
    image: '💡',
    color: 'from-cyan-500/20 to-blue-500/20',
    isContent: true,
    youtube: '#',
  },
];

export default function ProjectsSection() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    dragFree: true,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // 🔥 AUTOPLAY MANUAL
  useEffect(() => {
    if (!emblaApi) return;

    const interval = setInterval(() => {
      emblaApi.scrollNext();
    }, 3000);

    return () => clearInterval(interval);
  }, [emblaApi]);

  return (
    <section id="projects" className="py-20 md:py-32 bg-muted/30 overflow-hidden">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-primary font-medium mb-2 block">Portfolio</span>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4">
            Projects &amp; Karya
          </h2>
          <div className="w-20 h-1 bg-primary mx-auto rounded-full" />
        </motion.div>

        {/* Carousel */}
        <div className="relative max-w-7xl mx-auto">
          <div
            className="overflow-hidden cursor-grab active:cursor-grabbing"
            ref={emblaRef}
          >
            <div className="flex gap-6 py-4">
              {projects.map((project, index) => (
                <div
                  key={`${project.title}-${index}`}
                  className="flex-[0_0_100%] sm:flex-[0_0_50%] lg:flex-[0_0_33.33%]"
                >
                  <div className="h-full p-6 glass rounded-2xl shadow-card hover:shadow-card-hover hover:-translate-y-2 transition-all duration-300 bg-background/50 border border-border">
                    
                    <div className={`aspect-video rounded-xl mb-4 flex items-center justify-center bg-gradient-to-br ${project.color}`}>
                      <span className="text-6xl">{project.image}</span>
                    </div>
                    
                    <h3 className="font-display text-lg font-bold">
                      {project.title}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigasi */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute -left-4 top-1/2 -translate-y-1/2 rounded-full bg-background shadow-md hidden md:flex"
            onClick={scrollPrev}
          >
            <ChevronLeft />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="absolute -right-4 top-1/2 -translate-y-1/2 rounded-full bg-background shadow-md hidden md:flex"
            onClick={scrollNext}
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </section>
  );
}
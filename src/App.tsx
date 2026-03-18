import { useState, useEffect, useRef } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

/* 🌌 STAR BACKGROUND + SHOOTING STAR */
const Stars = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener("resize", resize);

    let stars = [];
    let shootingStars = [];

    for (let i = 0; i < 100; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.5,
        speed: Math.random() * 0.5,
      });
    }

    const createShootingStar = () => {
      shootingStars.push({
        x: Math.random() * canvas.width,
        y: 0,
        length: Math.random() * 120 + 50,
        speed: 7,
        opacity: 1,
      });
    };

    setInterval(createShootingStar, 1800);

    const animate = () => {
      ctx.fillStyle = "#020817";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ⭐ small stars
      stars.forEach((star) => {
        star.y += star.speed;
        if (star.y > canvas.height) star.y = 0;

        ctx.fillStyle = "rgba(255,255,255,0.6)";
        ctx.fillRect(star.x, star.y, star.size, star.size);
      });

      // 🌠 shooting stars
      shootingStars.forEach((s, i) => {
        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x - s.length, s.y + s.length);
        ctx.strokeStyle = `rgba(255,255,255,${s.opacity})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        s.x += s.speed;
        s.y += s.speed;
        s.opacity -= 0.015;

        if (s.opacity <= 0) {
          shootingStars.splice(i, 1);
        }
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => window.removeEventListener("resize", resize);
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 -z-10" />;
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 4000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loader"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden bg-[#020817]"
            >
              {/* 🌌 BACKGROUND */}
              <Stars />

              {/* ✨ TOP GLOW */}
              <div className="absolute top-0 w-full h-64 bg-gradient-to-b from-cyan-500/10 to-transparent blur-2xl" />

              {/* ✨ BOTTOM SHADE */}
              <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-black/60 to-transparent" />

              {/* 🍣 SUSHI FLOAT */}
              <motion.div
                animate={{ y: [0, -25, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="w-full max-w-[350px] aspect-square flex items-center justify-center z-10"
              >
                <iframe
                  src="https://lottie.host/embed/1c56abf6-7a01-4c76-a2f1-b968e70d7e19/503gBXB3hl.lottie"
                  style={{ width: "100%", height: "100%", border: "none" }}
                ></iframe>
              </motion.div>

              {/* TEXT */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center -mt-8 z-10"
              >
                <h2 className="text-white text-xl md:text-2xl font-bold tracking-[0.4em] uppercase drop-shadow-[0_0_10px_rgba(34,211,238,0.6)]">
                  Serving something fresh… 🍣
                </h2>

                {/* PROGRESS BAR */}
                <div className="w-32 h-1 bg-white/20 rounded-full overflow-hidden mt-4 mx-auto">
                  <div className="h-full bg-cyan-400 animate-[loading_1.5s_infinite]" />
                </div>

                {/* SUBTEXT */}
                <p className="text-white/50 text-xs mt-3 tracking-widest">
                  Crafting your experience...
                </p>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="main"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </motion.div>
          )}
        </AnimatePresence>
      </TooltipProvider>

      {/* 🔥 ANIMATION */}
      <style>
        {`
          @keyframes loading {
            0% { width: 0% }
            50% { width: 100% }
            100% { width: 0% }
          }
        `}
      </style>
    </QueryClientProvider>
  );
};

export default App;
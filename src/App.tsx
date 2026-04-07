import { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

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
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center overflow-hidden"
          >

            {/* 🌼 BACKGROUND GRADIENT */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#fef9c3] via-[#fde68a] to-[#facc15]" />

            {/* ✨ MOVING GLOW */}
            <motion.div
              animate={{ x: [-200, 200] }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
              className="absolute w-[500px] h-[500px] bg-yellow-300/40 blur-3xl rounded-full"
            />

            {/* ✨ OVERLAY GRAIN (biar gak flat) */}
            <div className="absolute inset-0 opacity-10 mix-blend-overlay pointer-events-none"
              style={{
                backgroundImage:
                  "url('https://grainy-gradients.vercel.app/noise.svg')",
              }}
            />

            {/* 🎬 LOTTIE */}
            <motion.div
              animate={{ y: [0, -25, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
              className="w-[260px] h-[260px] z-10"
            >
              <iframe
                src="https://lottie.host/embed/ecbf7e1b-1566-4afa-9c1b-596754c5fdd6/d4oDlBxgWU.lottie"
                style={{ width: "100%", height: "100%", border: "none" }}
              />
            </motion.div>

            {/* TEXT */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center mt-6 z-10"
            >
              <h2 className="text-yellow-900 text-xl md:text-2xl font-bold tracking-wide">
                You’re not ready for this…
              </h2>

              <p className="text-yellow-700 text-sm mt-2 italic">
                something beautiful is loading ✨
              </p>

              {/* PROGRESS BAR */}
              <div className="w-44 h-1 bg-yellow-300 rounded-full overflow-hidden mt-5 mx-auto">
                <div className="h-full bg-yellow-500 animate-[loading_1.6s_infinite]" />
              </div>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="main"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </motion.div>
        )}
      </AnimatePresence>

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
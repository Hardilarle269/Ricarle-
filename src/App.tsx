import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
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
    }, 4000); // 4 detik agar loading terasa mantap
    return () => clearTimeout(timer);
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loader-container"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6 }}
              className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#020817]"
            >
              {/* Menggunakan Iframe sebagai solusi paling aman jika library player error */}
              <div className="w-full max-w-[500px] aspect-square flex items-center justify-center">
                <iframe 
                  src="https://lottie.host/embed/1c56abf6-7a01-4c76-a2f1-b968e70d7e19/503gBXB3hl.lottie"
                  style={{ width: '100%', height: '100%', border: 'none' }}
                ></iframe>
              </div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center -mt-10"
              >
                <h2 className="text-white text-xl md:text-2xl font-bold tracking-[0.4em] uppercase">
                  LOADING
                </h2>
                <div className="w-16 h-1 bg-cyan-500 mx-auto mt-4 rounded-full animate-pulse" />
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="main-app-content"
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
    </QueryClientProvider>
  );
};

export default App;
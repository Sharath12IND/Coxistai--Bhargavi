import { motion } from "framer-motion";
import { useState, useEffect } from "react";

interface PageLoaderProps {
  isLoading?: boolean;
  loadingText?: string;
  className?: string;
}

export default function PageLoader({ 
  isLoading = true, 
  loadingText = "Loading...",
  className = ""
}: PageLoaderProps) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    if (!isLoading) return;
    
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? "" : prev + ".");
    }, 500);

    return () => clearInterval(interval);
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center glassmorphism-strong ${className}`}>
      <div className="text-center">
        {/* Animated Logo */}
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div 
            className="w-20 h-20 mx-auto bg-gradient-to-r from-blue-500 to-green-500 rounded-2xl shadow-2xl flex items-center justify-center"
            animate={{ 
              rotateY: [0, 180, 360],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span className="text-2xl font-bold text-white">C</span>
          </motion.div>
          
          {/* Orbiting particles */}
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-blue-400 rounded-full"
              style={{
                top: "50%",
                left: "50%",
                marginTop: "-4px",
                marginLeft: "-4px"
              }}
              animate={{
                x: [0, 40 * Math.cos(i * 2.09), 0, -40 * Math.cos(i * 2.09), 0],
                y: [0, 40 * Math.sin(i * 2.09), 0, -40 * Math.sin(i * 2.09), 0],
                opacity: [0.3, 1, 0.3, 1, 0.3]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: i * 0.5,
                ease: "easeInOut"
              }}
            />
          ))}
        </motion.div>

        {/* Loading Text */}
        <motion.div
          className="space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-green-400 bg-clip-text text-transparent">
            Coexist AI
          </h2>
          <p className="text-white text-lg">
            {loadingText}
            <span className="inline-block w-8 text-left">{dots}</span>
          </p>
        </motion.div>

        {/* Progress Bar */}
        <motion.div
          className="mt-8 w-64 h-1 bg-white/10 rounded-full overflow-hidden mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>

        {/* Floating elements */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-blue-400/30 rounded-full"
              style={{
                left: `${20 + (i * 10)}%`,
                top: `${30 + (i % 3) * 20}%`
              }}
              animate={{
                y: [-20, 20, -20],
                opacity: [0.3, 1, 0.3],
                scale: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 3 + (i * 0.2),
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Minimal loader for smaller components
export function MiniLoader({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center justify-center p-8 ${className}`}>
      <motion.div
        className="w-8 h-8 border-3 border-blue-500/30 border-t-blue-500 rounded-full"
        animate={{ rotate: 360 }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: "linear"
        }}
      />
    </div>
  );
}

// Skeleton loader for content
export function SkeletonLoader({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse space-y-4 ${className}`}>
      <div className="h-4 bg-white/10 rounded w-3/4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-white/10 rounded"></div>
        <div className="h-4 bg-white/10 rounded w-5/6"></div>
      </div>
      <div className="h-32 bg-white/10 rounded"></div>
    </div>
  );
}
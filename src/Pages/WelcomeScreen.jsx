import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Trophy,
  Crown,
  Medal,
  Star,
  Sparkles,
  Award,
  Diamond,
  Gift,
  Zap,
  Atom,
  Flame,
  Droplet,
  Factory,
  Cpu,
  Database,
  Layers,
  Building2,
  ArrowRight,
} from "lucide-react";

// Enhanced typewriter dengan smooth cursor dan sound-like effect
const LuxuriousTypewriter = ({ text, speed = 120, delay = 0 }) => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    let index = 0;
    const timer = setTimeout(() => {
      const typeTimer = setInterval(() => {
        if (index <= text.length) {
          setDisplayText(text.slice(0, index));
          index++;
        } else {
          clearInterval(typeTimer);
          // Hide cursor after typing is complete
          setTimeout(() => setShowCursor(false), 2000);
        }
      }, speed);
      return () => clearInterval(typeTimer);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, speed, delay]);

  return (
    <span className="inline-block">
      {displayText}
      {showCursor && (
        <motion.span
          className="text-cyan-300 ml-0.5"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          |
        </motion.span>
      )}
    </span>
  );
};

// Enhanced Industrial Background dengan lebih banyak efek visual
const IndustrialPetrochemicalBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Enhanced gradient background */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/90 to-gray-900" />
    <div className="absolute inset-0 bg-gradient-to-tl from-emerald-900/20 via-transparent to-cyan-900/30" />

    {/* Enhanced chemical reaction effects */}
    <div className="absolute top-0 left-0 w-full h-full">
      <motion.div
        className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-gradient-radial from-cyan-500/20 via-blue-600/10 to-transparent rounded-full blur-3xl"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-gradient-radial from-orange-500/15 via-red-500/8 to-transparent rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-36 h-36 sm:w-56 sm:h-56 lg:w-72 lg:h-72 bg-gradient-radial from-emerald-500/12 via-green-500/6 to-transparent rounded-full blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.15, 0.4, 0.15],
        }}
        transition={{ duration: 12, repeat: Infinity, delay: 4 }}
      />
    </div>

    {/* Enhanced industrial structures */}
    <div className="absolute inset-0 opacity-25">
      {/* Animated horizontal pipes */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`h-pipe-${i}`}
          className="absolute h-2 sm:h-3 lg:h-4 bg-gradient-to-r from-gray-500 via-gray-400 to-gray-500 opacity-50"
          style={{
            width: `${30 + Math.random() * 40}%`,
            top: `${15 + i * 10}%`,
            left: `${Math.random() * 50}%`,
            transform: `rotate(${-3 + Math.random() * 6}deg)`,
            boxShadow: "0 0 8px rgba(59, 130, 246, 0.4)",
          }}
          animate={{
            opacity: [0.3, 0.6, 0.3],
            boxShadow: [
              "0 0 8px rgba(59, 130, 246, 0.4)",
              "0 0 15px rgba(59, 130, 246, 0.6)",
              "0 0 8px rgba(59, 130, 246, 0.4)",
            ],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Animated vertical pipes */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`v-pipe-${i}`}
          className="absolute w-2 sm:w-3 lg:w-4 bg-gradient-to-b from-gray-500 via-gray-400 to-gray-500 opacity-40"
          style={{
            height: `${25 + Math.random() * 30}%`,
            left: `${20 + i * 15}%`,
            top: `${Math.random() * 40}%`,
            boxShadow: "0 0 8px rgba(34, 197, 94, 0.4)",
          }}
          animate={{
            opacity: [0.2, 0.5, 0.2],
            boxShadow: [
              "0 0 8px rgba(34, 197, 94, 0.4)",
              "0 0 15px rgba(34, 197, 94, 0.6)",
              "0 0 8px rgba(34, 197, 94, 0.4)",
            ],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
        />
      ))}
    </div>

    {/* Enhanced floating particles */}
    <div className="absolute inset-0">
      {[...Array(25)].map((_, i) => (
        <motion.div
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            backgroundColor:
              i % 5 === 0
                ? "#06b6d4"
                : i % 5 === 1
                ? "#10b981"
                : i % 5 === 2
                ? "#f59e0b"
                : i % 5 === 3
                ? "#ef4444"
                : "#8b5cf6",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            boxShadow: `0 0 8px currentColor`,
          }}
          animate={{
            y: [0, -20, 0],
            x: [0, Math.random() * 15 - 7, 0],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 6 + Math.random() * 8,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>

    {/* Enhanced industrial machinery */}
    <div className="absolute bottom-0 left-0 w-full h-24 sm:h-32 lg:h-40 opacity-20">
      <motion.div
        className="absolute bottom-0 left-4 sm:left-8 lg:left-10 w-12 h-20 sm:w-16 sm:h-24 lg:w-20 lg:h-32 bg-gradient-to-t from-gray-600 to-gray-700 transform skew-x-3"
        animate={{ opacity: [0.15, 0.3, 0.15] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 left-20 sm:left-28 lg:left-36 w-16 h-18 sm:w-20 sm:h-22 lg:w-24 lg:h-28 bg-gradient-to-t from-gray-600 to-gray-700 rounded-t-full"
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
      />
      <motion.div
        className="absolute bottom-0 right-16 sm:right-20 lg:right-24 w-10 h-22 sm:w-12 sm:h-28 lg:w-16 lg:h-36 bg-gradient-to-t from-gray-600 to-gray-700"
        animate={{ opacity: [0.1, 0.25, 0.1] }}
        transition={{ duration: 7, repeat: Infinity, delay: 2 }}
      />
      <motion.div
        className="absolute bottom-0 right-32 sm:right-40 lg:right-48 w-18 h-14 sm:w-22 sm:h-16 lg:w-28 lg:h-20 bg-gradient-to-t from-gray-600 to-gray-700 transform -skew-x-2"
        animate={{ opacity: [0.18, 0.35, 0.18] }}
        transition={{ duration: 9, repeat: Infinity, delay: 3 }}
      />
    </div>

    {/* Enhanced energy flow */}
    <div className="absolute inset-0 opacity-30">
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`energy-${i}`}
          className="absolute"
          style={{
            width: "2px",
            height: `${15 + Math.random() * 25}%`,
            background: `linear-gradient(to bottom, transparent, ${
              i % 4 === 0
                ? "#06b6d4"
                : i % 4 === 1
                ? "#10b981"
                : i % 4 === 2
                ? "#f59e0b"
                : "#ef4444"
            }, transparent)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 70}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scaleY: [1, 1.5, 1],
          }}
          transition={{
            duration: 2 + Math.random() * 3,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>

    {/* Tech grid overlay */}
    <div className="absolute inset-0 opacity-5">
      <div
        className="w-full h-full"
        style={{
          backgroundImage:
            "linear-gradient(rgba(6,182,212,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.4) 1px, transparent 1px)",
          backgroundSize: "30px 30px",
        }}
      />
    </div>
  </div>
);

// Enhanced icon button with better hover effects
const IndustrialIconButton = ({ Icon }) => (
  <motion.div
    className="relative group"
    whileHover={{ scale: 1.15 }}
    whileTap={{ scale: 0.95 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    <motion.div
      className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 rounded-full blur opacity-0 group-hover:opacity-100"
      animate={{
        rotate: [0, 360],
        scale: [1, 1.1, 1],
      }}
      transition={{
        rotate: { duration: 8, repeat: Infinity, ease: "linear" },
        scale: { duration: 2, repeat: Infinity },
      }}
    />
    <div className="relative p-1.5 sm:p-2 lg:p-3 bg-slate-900/90 backdrop-blur-md rounded-full border border-cyan-500/60 shadow-2xl shadow-cyan-500/30 group-hover:border-cyan-400/80 transition-all duration-300">
      <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-cyan-300 group-hover:text-cyan-200" />
    </div>
  </motion.div>
);

// Enhanced trophy with complex animations
const IndustrialTrophy = () => (
  <div className="relative flex justify-center w-full">
    <motion.div
      className="absolute w-24 h-24 sm:w-32 sm:h-32 lg:w-48 lg:h-48 bg-cyan-500/15 rounded-full blur-3xl"
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.3, 0.7, 0.3],
      }}
      transition={{ duration: 4, repeat: Infinity }}
    />
    <motion.div
      initial={{ scale: 0.5, opacity: 0, rotateY: -180 }}
      animate={{
        scale: 1,
        opacity: 1,
        rotateY: 0,
        y: [0, -8, 0],
      }}
      transition={{
        scale: { duration: 1.5, ease: "easeOut" },
        opacity: { duration: 1.5, ease: "easeOut" },
        rotateY: { duration: 1.5, ease: "easeOut" },
        y: {
          duration: 5,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      }}
      className="relative"
    >
      <motion.div
        className="absolute -inset-2 sm:-inset-3 lg:-inset-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-2xl opacity-40"
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 360],
        }}
        transition={{
          scale: { duration: 3, repeat: Infinity },
          rotate: { duration: 15, repeat: Infinity, ease: "linear" },
        }}
      />
      <Trophy className="w-12 h-12 sm:w-16 sm:h-16 lg:w-24 lg:h-24 text-cyan-300 drop-shadow-2xl filter drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]" />
    </motion.div>
  </div>
);

// Enhanced spinning atom
const SpinningAtom = () => (
  <motion.div
    initial={{ scale: 0, rotate: 0 }}
    animate={{
      scale: 1,
      rotate: [0, 360],
    }}
    transition={{
      scale: { duration: 1, delay: 0.5 },
      rotate: { duration: 15, repeat: Infinity, ease: "linear" },
    }}
    className="relative"
  >
    <motion.div
      className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-lg opacity-60"
      animate={{
        scale: [1, 1.3, 1],
        opacity: [0.4, 0.8, 0.4],
      }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <Atom className="w-8 h-8 sm:w-10 sm:h-10 lg:w-14 lg:h-14 text-emerald-300 drop-shadow-lg filter drop-shadow-[0_0_12px_rgba(16,185,129,0.8)]" />
  </motion.div>
);

const VictoryScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        onLoadingComplete?.();
      }, 1500);
    }, 10000); // Extended to 10 seconds for better experience

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.1,
      filter: "blur(10px)",
      transition: {
        duration: 1,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    exit: {
      y: -30,
      opacity: 0,
      transition: {
        duration: 0.6,
        ease: "easeInOut",
      },
    },
  };

  const industrialIcons = [
    Atom,
    Zap,
    Flame,
    Droplet,
    Factory,
    Cpu,
    Database,
    Layers,
    Building2,
  ];

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-slate-900 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit="exit"
          variants={containerVariants}
        >
          <IndustrialPetrochemicalBackground />

          <div className="relative min-h-screen flex items-center justify-center py-4 px-3 sm:py-8 sm:px-6 lg:py-16 lg:px-8">
            <div className="w-full max-w-6xl mx-auto text-center py-4 sm:py-6 lg:py-10">
              {/* Enhanced border frame with corner animations */}
              <motion.div
                className="absolute inset-2 sm:inset-4 lg:inset-12 border-2 sm:border-4 lg:border-6 border-cyan-500/40 rounded-2xl lg:rounded-3xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 2 }}
                style={{
                  boxShadow:
                    "0 0 60px rgba(6,182,212,0.4), inset 0 0 60px rgba(6,182,212,0.15)",
                }}
              />

              {/* Enhanced corner energy nodes */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-8 h-8 sm:w-12 sm:h-12 lg:w-20 lg:h-20"
                  style={{
                    top: i < 2 ? "0.5rem" : "auto",
                    bottom: i >= 2 ? "0.5rem" : "auto",
                    left: i % 2 === 0 ? "0.5rem" : "auto",
                    right: i % 2 === 1 ? "0.5rem" : "auto",
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0.6, 1, 0.6],
                    scale: [0.8, 1.2, 0.8],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    delay: 1 + i * 0.3,
                    duration: 4,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-xl animate-pulse" />
                  <div className="relative h-full w-full border-2 sm:border-3 border-cyan-300/80 rounded-full flex items-center justify-center bg-slate-900/60 backdrop-blur-sm">
                    <motion.div
                      className="w-2 h-2 sm:w-3 sm:h-3 lg:w-5 lg:h-5 bg-cyan-300 rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    />
                  </div>
                </motion.div>
              ))}

              {/* Enhanced Trophy */}
              <motion.div
                className="mb-3 sm:mb-4 lg:mb-8 pt-6 sm:pt-8 lg:pt-16 relative h-16 sm:h-20 lg:h-28"
                variants={childVariants}
              >
                <IndustrialTrophy />
              </motion.div>

              {/* Spinning Atom */}
              <motion.div
                className="flex justify-center mb-2 sm:mb-3 lg:mb-6"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
              >
                <SpinningAtom />
              </motion.div>

              {/* Enhanced Industrial Icons */}
              <motion.div
                className="flex flex-wrap justify-center gap-1.5 sm:gap-2 lg:gap-4 mb-4 sm:mb-6 lg:mb-10"
                variants={childVariants}
              >
                {industrialIcons.map((Icon, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: 1.2 + index * 0.1,
                      duration: 0.8,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <IndustrialIconButton Icon={Icon} />
                  </motion.div>
                ))}
              </motion.div>

              {/* Enhanced Main Title */}
              <motion.div
                className="text-center mb-3 sm:mb-4 lg:mb-8 px-2 sm:px-4"
                variants={childVariants}
              >
                <h1 className="text-xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold tracking-tight">
                  <motion.div
                    className="mb-1 sm:mb-2 lg:mb-3 flex flex-col justify-center items-center"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8, duration: 1 }}
                  >
                    <span className="inline-block px-1 sm:px-2 bg-gradient-to-r from-white via-cyan-100 to-blue-200 bg-clip-text text-transparent drop-shadow-lg filter drop-shadow-[0_0_20px_rgba(6,182,212,1)]">
                      PETROCHEMICAL PIONEERS
                    </span>
                  </motion.div>
                  <motion.div
                    className="flex justify-center items-center"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 1 }}
                  >
                    <span className="inline-block px-1 sm:px-2 bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-500 bg-clip-text text-transparent drop-shadow-lg filter drop-shadow-[0_0_20px_rgba(59,130,246,1)]">
                      OF INNOVATION
                    </span>
                  </motion.div>
                </h1>
              </motion.div>

              {/* Enhanced Subtitle */}
              <motion.div
                className="mb-4 sm:mb-6 lg:mb-10"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8, duration: 1 }}
              >
                <h2 className="text-sm sm:text-xl lg:text-3xl xl:text-4xl bg-gradient-to-r from-emerald-200 via-green-300 to-cyan-400 bg-clip-text text-transparent font-bold filter drop-shadow-[0_0_20px_rgba(16,185,129,0.8)] mb-2 sm:mb-3">
                  BIOETHANOL ENVIRONMENTALLY FRIENDLY FUEL
                </h2>
                <motion.p
                  className="text-xs sm:text-base lg:text-xl text-slate-200 opacity-90 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.9 }}
                  transition={{ delay: 2.2, duration: 1 }}
                >
                  Revolutionizing Sustainable Energy Solutions
                </motion.p>
              </motion.div>

              {/* New Company Visit Section */}
              <motion.div
                className="mb-4 sm:mb-6 lg:mb-10"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5, duration: 1 }}
              >
                <div className="inline-flex items-center gap-1 sm:gap-2 lg:gap-3 px-3 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-full bg-gradient-to-r from-emerald-600/20 via-green-600/30 to-cyan-600/20 border border-emerald-400/40 backdrop-blur-md">
                  <Building2 className="w-3 h-3 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-emerald-300 animate-pulse" />
                  <motion.span
                    className="text-xs sm:text-lg lg:text-2xl font-bold bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent"
                    animate={{
                      textShadow: [
                        "0 0 8px rgba(16,185,129,0.5)",
                        "0 0 15px rgba(16,185,129,0.8)",
                        "0 0 8px rgba(16,185,129,0.5)",
                      ],
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <LuxuriousTypewriter
                      text="BIOFOURTEAM GOES TO PT PUPUK KUJANG"
                      speed={80}
                      delay={3000}
                    />
                  </motion.span>
                  <ArrowRight className="w-3 h-3 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-cyan-300 animate-bounce" />
                </div>
              </motion.div>

              {/* Enhanced Team Name */}
              <motion.div
                className="text-center mt-3 sm:mt-4 lg:mt-8 mb-4 sm:mb-6 lg:mb-10"
                variants={childVariants}
                initial={{ opacity: 0, y: 30, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 2.8, duration: 1 }}
              >
                <motion.div
                  className="inline-flex items-center gap-1 sm:gap-2 lg:gap-3 px-4 py-2 sm:px-6 sm:py-3 lg:px-10 lg:py-5 rounded-full relative group"
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-slate-800/60 via-cyan-600/40 to-blue-800/60 rounded-full blur-lg"
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.6, 0.9, 0.6],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                  />
                  <div className="absolute inset-0 border-2 border-cyan-400/50 rounded-full group-hover:border-cyan-300/80 transition-all duration-500" />
                  <div className="relative flex items-center gap-1 sm:gap-2 lg:gap-3 text-sm sm:text-xl lg:text-3xl font-bold">
                    <motion.div
                      animate={{
                        rotate: [0, 360],
                        scale: [1, 1.2, 1],
                      }}
                      transition={{
                        rotate: {
                          duration: 8,
                          repeat: Infinity,
                          ease: "linear",
                        },
                        scale: { duration: 2, repeat: Infinity },
                      }}
                    >
                      <Flame className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-orange-400" />
                    </motion.div>
                    <span className="bg-gradient-to-r from-cyan-200 via-blue-300 to-cyan-400 bg-clip-text text-transparent filter drop-shadow-[0_0_15px_rgba(6,182,212,0.8)]">
                      <LuxuriousTypewriter
                        text="BIOFOUR CHAMPIONS"
                        speed={120}
                        delay={4000}
                      />
                    </span>
                    <motion.div
                      animate={{
                        y: [0, -8, 0],
                        rotate: [0, 10, -10, 0],
                      }}
                      transition={{
                        y: { duration: 2, repeat: Infinity },
                        rotate: { duration: 3, repeat: Infinity },
                      }}
                    >
                      <Zap className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 text-yellow-400" />
                    </motion.div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Enhanced achievement ring */}
              <motion.div
                className="absolute -bottom-4 sm:-bottom-2 md:bottom-0 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, scale: 0.5, rotate: 0 }}
                animate={{
                  opacity: 0.5,
                  scale: 1,
                  rotate: [0, 360],
                }}
                transition={{
                  opacity: { delay: 3, duration: 2 },
                  scale: { delay: 3, duration: 2 },
                  rotate: {
                    delay: 3.5,
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              >
                <div className="w-32 h-32 sm:w-36 sm:h-36 md:w-44 md:h-44 border-3 sm:border-4 md:border-5 border-cyan-400/70 rounded-full flex items-center justify-center relative">
                  <motion.div
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 border-2 sm:border-3 md:border-4 border-green-400/60 rounded-full"
                    animate={{
                      rotate: [0, -360],
                      borderColor: [
                        "rgba(34, 197, 94, 0.6)",
                        "rgba(6, 182, 212, 0.6)",
                        "rgba(34, 197, 94, 0.6)",
                      ],
                    }}
                    transition={{
                      rotate: {
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                      },
                      borderColor: { duration: 5, repeat: Infinity },
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full blur-2xl animate-pulse" />
                </div>
              </motion.div>
            </div>
          </div>

          <style jsx>{`
            @keyframes float {
              0%,
              100% {
                transform: translateY(0px);
              }
              50% {
                transform: translateY(-20px);
              }
            }
            .bg-gradient-radial {
              background: radial-gradient(circle, var(--tw-gradient-stops));
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VictoryScreen;

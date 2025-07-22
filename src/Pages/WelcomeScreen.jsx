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
          className="text-yellow-300 ml-0.5"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          |
        </motion.span>
      )}
    </span>
  );
};

// Luxurious Premium Background
const LuxuriousPremiumBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Enhanced gradient background with luxury colors */}
    <div className="absolute inset-0 bg-gradient-to-br from-purple-950 via-amber-900/90 to-rose-950" />
    <div className="absolute inset-0 bg-gradient-to-tl from-yellow-600/30 via-transparent to-purple-800/40" />
    <div className="absolute inset-0 bg-gradient-to-r from-rose-900/20 via-amber-800/30 to-purple-900/25" />

    {/* Luxury light rays */}
    <div className="absolute top-0 left-0 w-full h-full">
      <motion.div
        className="absolute top-1/4 left-1/4 w-48 h-48 sm:w-72 sm:h-72 lg:w-96 lg:h-96 bg-gradient-radial from-amber-400/30 via-yellow-500/20 to-transparent rounded-full blur-3xl"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.4, 0.8, 0.4],
        }}
        transition={{ duration: 8, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-40 h-40 sm:w-60 sm:h-60 lg:w-80 lg:h-80 bg-gradient-radial from-purple-500/25 via-rose-500/15 to-transparent rounded-full blur-3xl"
        animate={{
          scale: [1, 1.4, 1],
          opacity: [0.3, 0.7, 0.3],
        }}
        transition={{ duration: 10, repeat: Infinity, delay: 2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-36 h-36 sm:w-56 sm:h-56 lg:w-72 lg:h-72 bg-gradient-radial from-rose-400/20 via-pink-500/12 to-transparent rounded-full blur-3xl"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.2, 0.6, 0.2],
        }}
        transition={{ duration: 12, repeat: Infinity, delay: 4 }}
      />
    </div>

    {/* Luxury golden structures */}
    <div className="absolute inset-0 opacity-35">
      {/* Animated luxury bars */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`luxury-bar-${i}`}
          className="absolute h-2 sm:h-3 lg:h-4 bg-gradient-to-r from-amber-600 via-yellow-400 to-amber-600 opacity-60"
          style={{
            width: `${30 + Math.random() * 40}%`,
            top: `${15 + i * 10}%`,
            left: `${Math.random() * 50}%`,
            transform: `rotate(${-3 + Math.random() * 6}deg)`,
            boxShadow:
              "0 0 15px rgba(251, 191, 36, 0.8), 0 0 30px rgba(251, 191, 36, 0.4)",
          }}
          animate={{
            opacity: [0.4, 0.8, 0.4],
            boxShadow: [
              "0 0 15px rgba(251, 191, 36, 0.8), 0 0 30px rgba(251, 191, 36, 0.4)",
              "0 0 25px rgba(251, 191, 36, 1), 0 0 50px rgba(251, 191, 36, 0.6)",
              "0 0 15px rgba(251, 191, 36, 0.8), 0 0 30px rgba(251, 191, 36, 0.4)",
            ],
          }}
          transition={{
            duration: 6 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        />
      ))}

      {/* Luxury vertical elements */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={`luxury-pillar-${i}`}
          className="absolute w-2 sm:w-3 lg:w-4 bg-gradient-to-b from-purple-600 via-rose-500 to-purple-600 opacity-50"
          style={{
            height: `${25 + Math.random() * 30}%`,
            left: `${20 + i * 15}%`,
            top: `${Math.random() * 40}%`,
            boxShadow:
              "0 0 15px rgba(147, 51, 234, 0.6), 0 0 30px rgba(147, 51, 234, 0.3)",
          }}
          animate={{
            opacity: [0.3, 0.7, 0.3],
            boxShadow: [
              "0 0 15px rgba(147, 51, 234, 0.6), 0 0 30px rgba(147, 51, 234, 0.3)",
              "0 0 25px rgba(147, 51, 234, 0.8), 0 0 50px rgba(147, 51, 234, 0.5)",
              "0 0 15px rgba(147, 51, 234, 0.6), 0 0 30px rgba(147, 51, 234, 0.3)",
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

    {/* Luxury floating diamonds */}
    <div className="absolute inset-0">
      {[...Array(30)].map((_, i) => (
        <motion.div
          key={`diamond-${i}`}
          className="absolute"
          style={{
            width: `${Math.random() * 6 + 3}px`,
            height: `${Math.random() * 6 + 3}px`,
            background:
              i % 6 === 0
                ? "linear-gradient(45deg, #fbbf24, #f59e0b)"
                : i % 6 === 1
                ? "linear-gradient(45deg, #a855f7, #9333ea)"
                : i % 6 === 2
                ? "linear-gradient(45deg, #ec4899, #be185d)"
                : i % 6 === 3
                ? "linear-gradient(45deg, #f97316, #ea580c)"
                : i % 6 === 4
                ? "linear-gradient(45deg, #dc2626, #b91c1c)"
                : "linear-gradient(45deg, #0891b2, #0e7490)",
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            borderRadius: "50%",
            boxShadow: `0 0 15px currentColor, 0 0 30px currentColor`,
            transform: "rotate(45deg)",
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            opacity: [0.4, 1, 0.4],
            scale: [0.8, 1.4, 0.8],
            rotate: [45, 225, 405],
          }}
          transition={{
            duration: 8 + Math.random() * 12,
            repeat: Infinity,
            delay: Math.random() * 6,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>

    {/* Luxury architectural elements */}
    <div className="absolute bottom-0 left-0 w-full h-24 sm:h-32 lg:h-40 opacity-25">
      <motion.div
        className="absolute bottom-0 left-4 sm:left-8 lg:left-10 w-12 h-20 sm:w-16 sm:h-24 lg:w-20 lg:h-32 bg-gradient-to-t from-amber-700 to-yellow-500 transform skew-x-3"
        style={{ boxShadow: "0 0 20px rgba(251, 191, 36, 0.6)" }}
        animate={{ opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 6, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-0 left-20 sm:left-28 lg:left-36 w-16 h-18 sm:w-20 sm:h-22 lg:w-24 lg:h-28 bg-gradient-to-t from-purple-700 to-rose-500 rounded-t-full"
        style={{ boxShadow: "0 0 20px rgba(147, 51, 234, 0.6)" }}
        animate={{ opacity: [0.25, 0.5, 0.25] }}
        transition={{ duration: 8, repeat: Infinity, delay: 1 }}
      />
      <motion.div
        className="absolute bottom-0 right-16 sm:right-20 lg:right-24 w-10 h-22 sm:w-12 sm:h-28 lg:w-16 lg:h-36 bg-gradient-to-t from-rose-700 to-pink-500"
        style={{ boxShadow: "0 0 20px rgba(236, 72, 153, 0.6)" }}
        animate={{ opacity: [0.15, 0.35, 0.15] }}
        transition={{ duration: 7, repeat: Infinity, delay: 2 }}
      />
    </div>

    {/* Luxury energy streams */}
    <div className="absolute inset-0 opacity-40">
      {[...Array(10)].map((_, i) => (
        <motion.div
          key={`energy-${i}`}
          className="absolute"
          style={{
            width: "3px",
            height: `${20 + Math.random() * 35}%`,
            background: `linear-gradient(to bottom, transparent, ${
              i % 5 === 0
                ? "#fbbf24"
                : i % 5 === 1
                ? "#a855f7"
                : i % 5 === 2
                ? "#ec4899"
                : i % 5 === 3
                ? "#f97316"
                : "#dc2626"
            }, transparent)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 60}%`,
          }}
          animate={{
            opacity: [0, 1, 0],
            scaleY: [1, 1.8, 1],
            boxShadow: [
              "0 0 10px currentColor",
              "0 0 25px currentColor",
              "0 0 10px currentColor",
            ],
          }}
          transition={{
            duration: 3 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>

    {/* Luxury grid overlay */}
    <div className="absolute inset-0 opacity-8">
      <div
        className="w-full h-full"
        style={{
          backgroundImage:
            "linear-gradient(rgba(251,191,36,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.3) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />
    </div>
  </div>
);

// Enhanced luxury icon button
const LuxuryIconButton = ({ Icon }) => (
  <motion.div
    className="relative group"
    whileHover={{ scale: 1.2 }}
    whileTap={{ scale: 0.9 }}
    transition={{ type: "spring", stiffness: 400, damping: 17 }}
  >
    <motion.div
      className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-amber-400 via-yellow-500 to-orange-500 rounded-full blur opacity-0 group-hover:opacity-100"
      animate={{
        rotate: [0, 360],
        scale: [1, 1.15, 1],
      }}
      transition={{
        rotate: { duration: 6, repeat: Infinity, ease: "linear" },
        scale: { duration: 2, repeat: Infinity },
      }}
    />
    <div className="relative p-1.5 sm:p-2 lg:p-3 bg-gradient-to-br from-purple-900/95 to-rose-900/95 backdrop-blur-md rounded-full border-2 border-amber-400/70 shadow-2xl shadow-amber-500/40 group-hover:border-yellow-300/90 group-hover:shadow-yellow-400/60 transition-all duration-300">
      <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-amber-300 group-hover:text-yellow-200 drop-shadow-lg filter drop-shadow-[0_0_8px_rgba(251,191,36,0.8)]" />
    </div>
  </motion.div>
);

// Enhanced luxury trophy
const LuxuryTrophy = () => (
  <div className="relative flex justify-center w-full">
    <motion.div
      className="absolute w-32 h-32 sm:w-40 sm:h-40 lg:w-56 lg:h-56 bg-gradient-radial from-amber-400/25 via-yellow-500/15 to-transparent rounded-full blur-3xl"
      animate={{
        scale: [1, 1.4, 1],
        opacity: [0.4, 0.9, 0.4],
      }}
      transition={{ duration: 4, repeat: Infinity }}
    />
    <motion.div
      initial={{ scale: 0.3, opacity: 0, rotateY: -180 }}
      animate={{
        scale: 1,
        opacity: 1,
        rotateY: 0,
        y: [0, -12, 0],
      }}
      transition={{
        scale: { duration: 2, ease: "easeOut" },
        opacity: { duration: 2, ease: "easeOut" },
        rotateY: { duration: 2, ease: "easeOut" },
        y: {
          duration: 6,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      }}
      className="relative"
    >
      <motion.div
        className="absolute -inset-3 sm:-inset-4 lg:-inset-6 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 rounded-full blur-2xl opacity-50"
        animate={{
          scale: [1, 1.3, 1],
          rotate: [0, 360],
        }}
        transition={{
          scale: { duration: 3, repeat: Infinity },
          rotate: { duration: 12, repeat: Infinity, ease: "linear" },
        }}
      />
      <Trophy className="w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 text-amber-300 drop-shadow-2xl filter drop-shadow-[0_0_25px_rgba(251,191,36,1)]" />
      <motion.div
        className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.2, 1],
        }}
        transition={{
          rotate: { duration: 4, repeat: Infinity, ease: "linear" },
          scale: { duration: 2, repeat: Infinity },
        }}
      >
        <Crown className="w-6 h-6 sm:w-8 sm:h-8 lg:w-12 lg:h-12 text-yellow-400 filter drop-shadow-[0_0_15px_rgba(251,191,36,0.8)]" />
      </motion.div>
    </motion.div>
  </div>
);

// Enhanced luxury spinning element
const LuxurySpinningElement = () => (
  <motion.div
    initial={{ scale: 0, rotate: 0 }}
    animate={{
      scale: 1,
      rotate: [0, 360],
    }}
    transition={{
      scale: { duration: 1.5, delay: 0.5 },
      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
    }}
    className="relative"
  >
    <motion.div
      className="absolute -inset-2 sm:-inset-3 bg-gradient-to-r from-purple-400 via-pink-500 to-rose-400 rounded-full blur-lg opacity-70"
      animate={{
        scale: [1, 1.4, 1],
        opacity: [0.5, 0.9, 0.5],
      }}
      transition={{ duration: 3, repeat: Infinity }}
    />
    <Diamond className="w-10 h-10 sm:w-12 sm:h-12 lg:w-16 lg:h-16 text-pink-300 drop-shadow-lg filter drop-shadow-[0_0_20px_rgba(236,72,153,1)]" />
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
    }, 12000); // Extended to 12 seconds for luxury experience

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.1,
      filter: "blur(10px)",
      transition: {
        duration: 1.2,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1,
      },
    },
  };

  const childVariants = {
    exit: {
      y: -40,
      opacity: 0,
      transition: {
        duration: 0.8,
        ease: "easeInOut",
      },
    },
  };

  const luxuryIcons = [
    Diamond,
    Crown,
    Award,
    Sparkles,
    Star,
    Medal,
    Gift,
    Trophy,
    Atom,
  ];

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-gradient-to-br from-purple-950 via-rose-950 to-amber-950 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit="exit"
          variants={containerVariants}
        >
          <LuxuriousPremiumBackground />

          <div className="relative min-h-screen flex items-center justify-center py-4 px-3 sm:py-8 sm:px-6 lg:py-16 lg:px-8">
            <div className="w-full max-w-6xl mx-auto text-center py-4 sm:py-6 lg:py-10">
              {/* Enhanced luxury border frame */}
              <motion.div
                className="absolute inset-2 sm:inset-4 lg:inset-12 border-4 sm:border-6 lg:border-8 border-amber-400/60 rounded-3xl lg:rounded-4xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 2.5 }}
                style={{
                  boxShadow:
                    "0 0 80px rgba(251,191,36,0.6), inset 0 0 80px rgba(251,191,36,0.2), 0 0 120px rgba(147,51,234,0.3)",
                }}
              />

              {/* Enhanced luxury corner jewels */}
              {[0, 1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute w-10 h-10 sm:w-14 sm:h-14 lg:w-24 lg:h-24"
                  style={{
                    top: i < 2 ? "0.5rem" : "auto",
                    bottom: i >= 2 ? "0.5rem" : "auto",
                    left: i % 2 === 0 ? "0.5rem" : "auto",
                    right: i % 2 === 1 ? "0.5rem" : "auto",
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0.7, 1, 0.7],
                    scale: [0.8, 1.3, 0.8],
                    rotate: [0, 180, 360],
                  }}
                  transition={{
                    delay: 1 + i * 0.4,
                    duration: 5,
                    repeat: Infinity,
                    repeatType: "reverse",
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 rounded-full blur-xl animate-pulse" />
                  <div className="relative h-full w-full border-3 sm:border-4 border-amber-300/90 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-900/80 to-rose-900/80 backdrop-blur-sm">
                    <motion.div
                      className="w-3 h-3 sm:w-4 sm:h-4 lg:w-6 lg:h-6 bg-gradient-to-br from-yellow-300 to-amber-400 rounded-full"
                      animate={{
                        scale: [1, 1.8, 1],
                        boxShadow: [
                          "0 0 10px rgba(251,191,36,0.8)",
                          "0 0 25px rgba(251,191,36,1)",
                          "0 0 10px rgba(251,191,36,0.8)",
                        ],
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    />
                  </div>
                </motion.div>
              ))}

              {/* Enhanced Luxury Trophy */}
              <motion.div
                className="mb-4 sm:mb-6 lg:mb-10 pt-8 sm:pt-10 lg:pt-20 relative h-20 sm:h-24 lg:h-32"
                variants={childVariants}
              >
                <LuxuryTrophy />
              </motion.div>

              {/* Luxury Spinning Diamond */}
              <motion.div
                className="flex justify-center mb-3 sm:mb-4 lg:mb-8"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 1.2 }}
              >
                <LuxurySpinningElement />
              </motion.div>

              {/* Enhanced Luxury Icons */}
              <motion.div
                className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-5 mb-5 sm:mb-8 lg:mb-12"
                variants={childVariants}
              >
                {luxuryIcons.map((Icon, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40, scale: 0.5 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{
                      delay: 1.5 + index * 0.15,
                      duration: 1,
                      type: "spring",
                      stiffness: 200,
                    }}
                  >
                    <LuxuryIconButton Icon={Icon} />
                  </motion.div>
                ))}
              </motion.div>

              {/* Enhanced Luxury Main Title */}
              <motion.div
                className="text-center mb-4 sm:mb-6 lg:mb-10 px-2 sm:px-4"
                variants={childVariants}
              >
                <h1 className="text-xl sm:text-3xl lg:text-5xl xl:text-7xl font-bold tracking-tight">
                  <motion.div
                    className="mb-2 sm:mb-3 lg:mb-4 flex flex-col justify-center items-center"
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1, duration: 1.5 }}
                  >
                    <span className="inline-block px-2 sm:px-3 bg-gradient-to-r from-amber-200 via-yellow-300 to-orange-400 bg-clip-text text-transparent drop-shadow-2xl filter drop-shadow-[0_0_30px_rgba(251,191,36,1)]">
                      PETROCHEMICAL LEGENDS
                    </span>
                  </motion.div>
                  <motion.div
                    className="flex justify-center items-center"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.5, duration: 1.5 }}
                  >
                    <span className="inline-block px-2 sm:px-3 bg-gradient-to-r from-purple-300 via-pink-400 to-rose-500 bg-clip-text text-transparent drop-shadow-2xl filter drop-shadow-[0_0_30px_rgba(147,51,234,1)]">
                      OF EXCELLENCE
                    </span>
                  </motion.div>
                </h1>
              </motion.div>

              {/* Enhanced Luxury Subtitle */}
              <motion.div
                className="mb-5 sm:mb-8 lg:mb-12"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2.2, duration: 1.5 }}
              >
                <h2 className="text-sm sm:text-xl lg:text-3xl xl:text-4xl bg-gradient-to-r from-rose-300 via-pink-400 to-purple-500 bg-clip-text text-transparent font-bold filter drop-shadow-[0_0_25px_rgba(236,72,153,1)] mb-3 sm:mb-4">
                  BIOETHANOL PREMIUM INNOVATION
                </h2>
                <motion.p
                  className="text-xs sm:text-base lg:text-xl text-amber-200 opacity-95 font-semibold filter drop-shadow-[0_0_15px_rgba(251,191,36,0.6)]"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.95 }}
                  transition={{ delay: 2.8, duration: 1.5 }}
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
                      text="BIOFOURTEAM"
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

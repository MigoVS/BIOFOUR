
import React, { useState, useEffect, useMemo } from "react";
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
  Building2,
  ArrowRight,
  Gem,
} from "lucide-react";

// Enhanced typewriter with luxury cursor
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
          className="text-yellow-300 ml-0.5 inline-block"
          animate={{ 
            opacity: [0, 1, 0],
            scale: [0.8, 1.2, 0.8]
          }}
          transition={{ 
            duration: 1.2, 
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <Diamond className="w-3 h-3 sm:w-4 sm:h-4" />
        </motion.span>
      )}
    </span>
  );
};

// Premium particle system
const PremiumParticles = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      size: Math.random() * 6 + 4,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 4,
      color: i % 4 === 0 ? "from-amber-400 to-yellow-300" :
             i % 4 === 1 ? "from-purple-400 to-pink-300" :
             i % 4 === 2 ? "from-cyan-400 to-blue-300" :
             "from-rose-400 to-orange-300"
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full bg-gradient-to-br ${particle.color} blur-sm`}
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            boxShadow: "0 0 20px currentColor",
          }}
          animate={{
            y: [-20, -100, -20],
            x: [-10, 10, -10],
            opacity: [0, 1, 0.8, 0],
            scale: [0.5, 1.2, 0.8, 0.3],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Luxury light beams
const LuxuryLightBeams = () => {
  const beams = useMemo(() => {
    return Array.from({ length: 6 }, (_, i) => ({
      id: i,
      rotation: i * 60,
      delay: i * 0.3,
      opacity: 0.15 + Math.random() * 0.1
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {beams.map((beam) => (
        <motion.div
          key={beam.id}
          className="absolute top-1/2 left-1/2 origin-bottom"
          style={{
            width: "2px",
            height: "50vh",
            background: "linear-gradient(to top, rgba(251,191,36,0.8), rgba(251,191,36,0.1), transparent)",
            transform: `translate(-50%, -100%) rotate(${beam.rotation}deg)`,
          }}
          animate={{
            opacity: [0, beam.opacity, 0],
            scaleY: [0.5, 1.2, 0.8],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            delay: beam.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Enhanced background with premium effects
const EnhancedLuxuryBackground = () => {
  const backgroundElements = useMemo(() => {
    const elements = [];
    
    // Floating luxury gems
    for (let i = 0; i < 10; i++) {
      elements.push(
        <motion.div
          key={`gem-${i}`}
          className="absolute"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, Math.random() * 20 - 10, 0],
            rotate: [0, 360],
            opacity: [0.3, 0.8, 0.3],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 4,
            ease: "easeInOut",
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full blur-lg opacity-60" />
            <Gem className="w-4 h-4 text-amber-300 relative z-10" />
          </div>
        </motion.div>
      );
    }
    
    return elements;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Premium gradient layers */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-purple-950 via-amber-900/90 to-rose-950"
        animate={{
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div 
        className="absolute inset-0 bg-gradient-to-tl from-yellow-600/30 via-transparent to-purple-800/40"
        animate={{
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      {/* Luxury light beams */}
      <LuxuryLightBeams />

      {/* Premium aurora effects */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        animate={{
          background: [
            "radial-gradient(ellipse at 20% 30%, rgba(251,191,36,0.15) 0%, transparent 50%)",
            "radial-gradient(ellipse at 80% 70%, rgba(147,51,234,0.15) 0%, transparent 50%)",
            "radial-gradient(ellipse at 50% 20%, rgba(236,72,153,0.15) 0%, transparent 50%)",
            "radial-gradient(ellipse at 20% 30%, rgba(251,191,36,0.15) 0%, transparent 50%)",
          ],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating luxury elements */}
      <div className="absolute inset-0">
        {backgroundElements}
      </div>

      {/* Premium particle system */}
      <PremiumParticles />

      {/* Luxury grid with shimmer effect */}
      <motion.div 
        className="absolute inset-0 opacity-10"
        animate={{
          opacity: [0.05, 0.15, 0.05],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(251,191,36,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(251,191,36,0.3) 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </motion.div>
    </div>
  );
};

// Premium icon with luxury hover effects
const PremiumIconButton = ({ Icon, index }) => (
  <motion.div
    className="relative group cursor-pointer"
    initial={{ opacity: 0, scale: 0, rotate: -180 }}
    animate={{ opacity: 1, scale: 1, rotate: 0 }}
    transition={{
      delay: 1 + index * 0.1,
      duration: 0.8,
      type: "spring",
      stiffness: 200,
    }}
    whileHover={{ 
      scale: 1.2,
      rotate: [0, -5, 5, 0],
      transition: { duration: 0.3 }
    }}
    whileTap={{ scale: 0.95 }}
  >
    {/* Luxury glow effect */}
    <motion.div
      className="absolute -inset-2 bg-gradient-to-r from-amber-400/20 via-purple-500/20 to-pink-500/20 rounded-full blur-lg"
      animate={{
        opacity: [0.3, 0.7, 0.3],
        scale: [0.8, 1.2, 0.8],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        delay: index * 0.2,
      }}
    />
    
    <div className="relative p-2 sm:p-3 bg-gradient-to-br from-purple-900/95 to-rose-900/95 backdrop-blur-md rounded-full border-2 border-amber-400/70 shadow-2xl shadow-amber-500/40 group-hover:border-yellow-300/90 group-hover:shadow-yellow-400/50 transition-all duration-300">
      <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-amber-300 group-hover:text-yellow-200 transition-colors duration-300" />
      
      {/* Sparkle effects on hover */}
      <motion.div
        className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <Sparkles className="w-3 h-3 text-yellow-300" />
      </motion.div>
    </div>
  </motion.div>
);

// Premium trophy with enhanced animations
const PremiumTrophy = () => (
  <div className="relative flex justify-center w-full">
    {/* Multiple layered glows */}
    <motion.div
      className="absolute w-40 h-40 sm:w-48 sm:h-48 rounded-full blur-3xl"
      style={{
        background: "radial-gradient(circle, rgba(251,191,36,0.3) 0%, rgba(245,158,11,0.2) 50%, transparent 100%)"
      }}
      animate={{
        scale: [1, 1.4, 1],
        opacity: [0.3, 0.8, 0.3],
        rotate: [0, 180, 360],
      }}
      transition={{ duration: 6, repeat: Infinity }}
    />
    
    <motion.div
      className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full blur-2xl"
      style={{
        background: "radial-gradient(circle, rgba(147,51,234,0.2) 0%, rgba(236,72,153,0.1) 50%, transparent 100%)"
      }}
      animate={{
        scale: [1.2, 0.8, 1.2],
        opacity: [0.2, 0.6, 0.2],
        rotate: [360, 180, 0],
      }}
      transition={{ duration: 8, repeat: Infinity }}
    />

    <motion.div
      initial={{ scale: 0.3, opacity: 0, rotate: -180 }}
      animate={{
        scale: 1,
        opacity: 1,
        rotate: 0,
        y: [0, -12, 0],
      }}
      transition={{
        scale: { duration: 2, ease: "easeOut", type: "spring", stiffness: 100 },
        opacity: { duration: 2, ease: "easeOut" },
        rotate: { duration: 2, ease: "easeOut" },
        y: {
          duration: 4,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        },
      }}
      className="relative z-10"
      whileHover={{
        scale: 1.1,
        rotate: [0, -5, 5, 0],
        transition: { duration: 0.5 }
      }}
    >
      <Trophy className="w-16 h-16 sm:w-20 sm:h-20 lg:w-32 lg:h-32 text-amber-300 drop-shadow-2xl filter" />
      
      {/* Floating crown with enhanced animation */}
      <motion.div
        className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4"
        animate={{
          rotate: [0, 360],
          y: [0, -5, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          rotate: { duration: 10, repeat: Infinity, ease: "linear" },
          y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 3, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <Crown className="w-6 h-6 sm:w-8 sm:h-8 lg:w-14 lg:h-14 text-yellow-400 drop-shadow-lg" />
      </motion.div>

      {/* Orbiting stars */}
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: "50%",
            left: "50%",
          }}
          animate={{
            rotate: [0, 360],
            scale: [0.5, 1, 0.5],
          }}
          transition={{
            rotate: { duration: 4 + i, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, delay: i * 0.5 },
          }}
        >
          <div
            className="absolute"
            style={{
              transform: `translate(-50%, -50%) translateX(${40 + i * 15}px)`,
            }}
          >
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-300" />
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
);

// Enhanced spinning diamond with premium effects
const EnhancedSpinningElement = () => (
  <motion.div
    initial={{ scale: 0, rotate: 0, opacity: 0 }}
    animate={{
      scale: 1,
      rotate: [0, 360],
      opacity: 1,
    }}
    transition={{
      scale: { duration: 1.5, delay: 0.3, type: "spring", stiffness: 150 },
      opacity: { duration: 1.5, delay: 0.3 },
      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
    }}
    className="relative"
    whileHover={{
      scale: 1.2,
      transition: { duration: 0.3 }
    }}
  >
    {/* Multiple glow layers */}
    <motion.div
      className="absolute -inset-4 bg-gradient-to-r from-purple-400 via-pink-500 to-rose-400 rounded-full blur-xl opacity-60"
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.4, 0.9, 0.4],
      }}
      transition={{ duration: 4, repeat: Infinity }}
    />
    
    <motion.div
      className="absolute -inset-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-400 rounded-full blur-lg opacity-40"
      animate={{
        scale: [1.2, 0.8, 1.2],
        opacity: [0.2, 0.6, 0.2],
        rotate: [0, -360],
      }}
      transition={{ duration: 6, repeat: Infinity }}
    />

    <Diamond className="w-10 h-10 sm:w-12 sm:h-12 lg:w-18 lg:h-18 text-pink-300 relative z-10 drop-shadow-lg" />
    
    {/* Orbiting mini gems */}
    {[0, 1].map((i) => (
      <motion.div
        key={i}
        className="absolute top-1/2 left-1/2"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 3 + i,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div
          className="absolute"
          style={{
            transform: `translate(-50%, -50%) translateX(${25 + i * 10}px)`,
          }}
        >
          <Gem className="w-2 h-2 text-cyan-300" />
        </div>
      </motion.div>
    ))}
  </motion.div>
);

// Premium border frame with animated corners
const PremiumBorderFrame = () => (
  <>
    <motion.div
      className="absolute inset-4 sm:inset-8 lg:inset-16 border-4 sm:border-6 lg:border-8 border-amber-400/60 rounded-3xl lg:rounded-4xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        borderColor: [
          "rgba(251,191,36,0.6)",
          "rgba(147,51,234,0.6)", 
          "rgba(236,72,153,0.6)",
          "rgba(251,191,36,0.6)"
        ]
      }}
      transition={{ 
        scale: { delay: 0.3, duration: 2 },
        opacity: { delay: 0.3, duration: 2 },
        borderColor: { duration: 8, repeat: Infinity }
      }}
      style={{
        boxShadow: "0 0 80px rgba(251,191,36,0.5), inset 0 0 80px rgba(251,191,36,0.15)",
      }}
    />

    {/* Animated corner jewels */}
    {[
      { top: "1rem", left: "1rem" },
      { top: "1rem", right: "1rem" },
      { bottom: "1rem", left: "1rem" },
      { bottom: "1rem", right: "1rem" }
    ].map((position, i) => (
      <motion.div
        key={i}
        className="absolute w-10 h-10 sm:w-14 sm:h-14"
        style={position}
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={{
          opacity: [0.6, 1, 0.6],
          scale: [0.8, 1.3, 0.8],
          rotate: [0, 360],
        }}
        transition={{
          opacity: { delay: 0.5 + i * 0.2, duration: 4, repeat: Infinity },
          scale: { delay: 0.5 + i * 0.2, duration: 4, repeat: Infinity },
          rotate: { delay: 0.5 + i * 0.2, duration: 8, repeat: Infinity, ease: "linear" },
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-orange-400 rounded-full blur-xl" />
        <div className="relative h-full w-full border-3 border-amber-300/90 rounded-full flex items-center justify-center bg-gradient-to-br from-purple-900/80 to-rose-900/80 backdrop-blur-sm">
          <motion.div
            className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-yellow-300 to-amber-400 rounded-full"
            animate={{
              scale: [1, 1.5, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          />
        </div>
      </motion.div>
    ))}
  </>
);

const VictoryScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        onLoadingComplete?.();
      }, 1000);
    }, 10000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.05,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      },
    },
  };

  const luxuryIcons = useMemo(() => [
    Diamond, Crown, Award, Sparkles, Star, Medal, Gift, Trophy, Atom, Gem,
  ], []);

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
          <EnhancedLuxuryBackground />

          <div className="relative min-h-screen flex items-center justify-center py-4 px-3 sm:py-8 sm:px-6 lg:py-16 lg:px-8">
            <div className="w-full max-w-6xl mx-auto text-center py-4 sm:py-6 lg:py-10">
              
              <PremiumBorderFrame />

              {/* Premium Trophy Section */}
              <motion.div className="mb-6 sm:mb-8 lg:mb-12 pt-8 sm:pt-12 lg:pt-24 relative h-24 sm:h-28 lg:h-40">
                <PremiumTrophy />
              </motion.div>

              {/* Enhanced Spinning Diamond */}
              <motion.div
                className="flex justify-center mb-4 sm:mb-6 lg:mb-10"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1.5 }}
              >
                <EnhancedSpinningElement />
              </motion.div>

              {/* Premium Icons Grid */}
              <motion.div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-10 lg:mb-16">
                {luxuryIcons.map((Icon, index) => (
                  <PremiumIconButton key={index} Icon={Icon} index={index} />
                ))}
              </motion.div>

              {/* Enhanced Main Title */}
              <motion.div className="text-center mb-6 sm:mb-8 lg:mb-14 px-2 sm:px-4">
                <motion.h1 
                  className="text-xl sm:text-3xl lg:text-5xl xl:text-7xl font-bold tracking-tight"
                  whileHover={{
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  }}
                >
                  <motion.div
                    className="mb-3 sm:mb-4 lg:mb-6"
                    initial={{ opacity: 0, y: -30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.8, duration: 1.5, type: "spring", stiffness: 100 }}
                  >
                    <motion.span 
                      className="bg-gradient-to-r from-amber-200 via-yellow-300 to-orange-400 bg-clip-text text-transparent"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      PETROCHEMICAL LEGENDS
                    </motion.span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 1.2, duration: 1.5, type: "spring", stiffness: 100 }}
                  >
                    <motion.span 
                      className="bg-gradient-to-r from-purple-300 via-pink-400 to-rose-500 bg-clip-text text-transparent"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      OF EXCELLENCE
                    </motion.span>
                  </motion.div>
                </motion.h1>
              </motion.div>

              {/* Enhanced Subtitle */}
              <motion.div
                className="mb-6 sm:mb-10 lg:mb-16"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2, duration: 1.5 }}
              >
                <motion.h2 
                  className="text-sm sm:text-xl lg:text-3xl xl:text-4xl bg-gradient-to-r from-rose-300 via-pink-400 to-purple-500 bg-clip-text text-transparent font-bold mb-4 sm:mb-6"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  BIOETHANOL PREMIUM INNOVATION
                </motion.h2>
                <motion.p 
                  className="text-xs sm:text-base lg:text-xl text-amber-200 opacity-90 font-semibold"
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Revolutionizing Sustainable Energy Solutions
                </motion.p>
              </motion.div>

              {/* Company Visit Section */}
              <motion.div
                className="mb-4 sm:mb-6 lg:mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 1 }}
              >
                <div className="inline-flex items-center gap-1 sm:gap-2 lg:gap-3 px-3 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-full bg-gradient-to-r from-emerald-600/20 via-green-600/30 to-cyan-600/20 border border-emerald-400/40 backdrop-blur-sm">
                  <Building2 className="w-3 h-3 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-emerald-300" />
                  <span className="text-xs sm:text-lg lg:text-2xl font-bold bg-gradient-to-r from-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                    <LuxuriousTypewriter text="BIOFOURTEAM" speed={80} delay={2500} />
                  </span>
                  <ArrowRight className="w-3 h-3 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-cyan-300" />
                </div>
              </motion.div>

              {/* Team Name */}
              <motion.div
                className="text-center mt-3 sm:mt-4 lg:mt-8 mb-4 sm:mb-6 lg:mb-10"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 2.3, duration: 1 }}
              >
                <motion.div
                  className="inline-flex items-center gap-1 sm:gap-2 lg:gap-3 px-4 py-2 sm:px-6 sm:py-3 lg:px-10 lg:py-5 rounded-full relative"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-800/50 via-cyan-600/30 to-blue-800/50 rounded-full blur-lg" />
                  <div className="absolute inset-0 border-2 border-cyan-400/40 rounded-full" />
                  <div className="relative flex items-center gap-1 sm:gap-2 lg:gap-3 text-sm sm:text-xl lg:text-3xl font-bold">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <Flame className="w-5 h-5 sm:w-6 sm:h-6 text-orange-400" />
                    </motion.div>
                    <span className="bg-gradient-to-r from-cyan-200 via-blue-300 to-cyan-400 bg-clip-text text-transparent">
                      <LuxuriousTypewriter text="BIOFOUR CHAMPIONS" speed={120} delay={3200} />
                    </span>
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-yellow-400" />
                  </div>
                </motion.div>
              </motion.div>

              {/* Simplified achievement ring */}
              <motion.div
                className="absolute -bottom-4 sm:-bottom-2 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: 0.4,
                  scale: 1,
                  rotate: [0, 360],
                }}
                transition={{
                  opacity: { delay: 2.5, duration: 1.5 },
                  scale: { delay: 2.5, duration: 1.5 },
                  rotate: { delay: 3, duration: 20, repeat: Infinity, ease: "linear" },
                }}
              >
                <div className="w-28 h-28 sm:w-32 sm:h-32 border-2 sm:border-3 border-cyan-400/60 rounded-full flex items-center justify-center relative">
                  <div className="w-20 h-20 sm:w-24 sm:h-24 border-2 border-green-400/50 rounded-full" />
                </div>
              </motion.div>
            </div>
          </div>

          <style jsx>{`
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
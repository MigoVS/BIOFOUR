import React, { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
  Flame,
  Building2,
  ArrowRight,
  Gem,
  Flag,
  Heart,
} from "lucide-react";

// Optimized typewriter with reduced complexity
const IndonesianTypewriter = ({ text, speed = 100, delay = 0 }) => {
  const [displayText, setDisplayText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      setDisplayText(text);
      setShowCursor(false);
      return;
    }

    let index = 0;
    const timer = setTimeout(() => {
      const typeTimer = setInterval(() => {
        if (index <= text.length) {
          setDisplayText(text.slice(0, index));
          index++;
        } else {
          clearInterval(typeTimer);
          setTimeout(() => setShowCursor(false), 1500);
        }
      }, speed);
      return () => clearInterval(typeTimer);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, speed, delay, prefersReducedMotion]);

  return (
    <span className="inline-block">
      {displayText}
      {showCursor && !prefersReducedMotion && (
        <motion.span
          className="text-red-400 ml-0.5 inline-block"
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <Flag className="w-3 h-3 sm:w-4 sm:h-4" />
        </motion.span>
      )}
    </span>
  );
};

// Simplified particles with better performance
const IndonesianParticles = () => {
  const prefersReducedMotion = useReducedMotion();
  
  const particles = useMemo(() => {
    if (prefersReducedMotion) return [];
    
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      size: Math.random() * 6 + 4,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 2,
      duration: 6 + Math.random() * 2,
      color: i % 3 === 0 ? "bg-red-500/40" :
             i % 3 === 1 ? "bg-white/30" :
             "bg-yellow-400/40"
    }));
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className={`absolute rounded-full ${particle.color} blur-sm`}
          style={{
            width: particle.size,
            height: particle.size,
            left: `${particle.x}%`,
            top: `${particle.y}%`,
          }}
          animate={{
            y: [-20, -80, -20],
            opacity: [0, 0.8, 0],
            scale: [0.5, 1, 0.3],
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

// Simplified light beams
const IndonesianLightBeams = () => {
  const prefersReducedMotion = useReducedMotion();
  
  const beams = useMemo(() => {
    if (prefersReducedMotion) return [];
    
    return Array.from({ length: 4 }, (_, i) => ({
      id: i,
      rotation: i * 90,
      delay: i * 0.5,
      opacity: 0.15 + Math.random() * 0.1,
    }));
  }, [prefersReducedMotion]);

  if (prefersReducedMotion) return null;

  return (
    <div className="absolute inset-0 overflow-hidden">
      {beams.map((beam) => (
        <motion.div
          key={beam.id}
          className="absolute top-1/2 left-1/2 origin-bottom"
          style={{
            width: "2px",
            height: "50vh",
            background: `linear-gradient(to top, rgba(239,68,68,${beam.opacity}), transparent)`,
            transform: `translate(-50%, -100%) rotate(${beam.rotation}deg)`,
          }}
          animate={{
            opacity: [0, beam.opacity, 0],
            scaleY: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: beam.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Optimized background with reduced complexity
const IndonesianLuxuryBackground = () => {
  const prefersReducedMotion = useReducedMotion();
  
  const backgroundElements = useMemo(() => {
    if (prefersReducedMotion) return [];
    
    const elements = [];
    const symbols = [
      { icon: Flag, color: "text-red-500" },
      { icon: Star, color: "text-white" },
      { icon: Heart, color: "text-red-400" },
    ];
    
    for (let i = 0; i < 6; i++) {
      const symbol = symbols[i % symbols.length];
      elements.push(
        <motion.div
          key={`symbol-${i}`}
          className="absolute opacity-40"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 8 + Math.random() * 4,
            repeat: Infinity,
            delay: Math.random() * 3,
            ease: "easeInOut",
          }}
        >
          <symbol.icon className={`w-4 h-4 ${symbol.color}`} />
        </motion.div>
      );
    }
    
    return elements;
  }, [prefersReducedMotion]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Simplified gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-red-900 via-red-800 to-red-950" />
      
      <motion.div 
        className="absolute inset-0 bg-gradient-to-tl from-white/10 via-transparent to-red-600/20"
        animate={!prefersReducedMotion ? {
          opacity: [0.5, 0.8, 0.5],
        } : {}}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Light beams */}
      <IndonesianLightBeams />

      {/* Simplified aurora effect */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute top-0 left-0 w-full h-full opacity-40"
          animate={{
            background: [
              "radial-gradient(ellipse at 30% 20%, rgba(239,68,68,0.15) 0%, transparent 50%)",
              "radial-gradient(ellipse at 70% 80%, rgba(255,255,255,0.1) 0%, transparent 50%)",
              "radial-gradient(ellipse at 30% 20%, rgba(239,68,68,0.15) 0%, transparent 50%)",
            ],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      )}

      {/* Floating elements */}
      <div className="absolute inset-0">
        {backgroundElements}
      </div>

      {/* Particle system */}
      <IndonesianParticles />

      {/* Simplified grid pattern */}
      <div 
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage:
            "linear-gradient(rgba(239,68,68,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.2) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />
    </div>
  );
};

// Optimized icon button
const IndonesianIconButton = React.memo(({ Icon, index }) => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div
      className="relative group cursor-pointer"
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        delay: 0.8 + index * 0.05,
        duration: 0.6,
        type: "spring",
        stiffness: 150,
      }}
      whileHover={!prefersReducedMotion ? { 
        scale: 1.1,
        transition: { duration: 0.2 }
      } : {}}
      whileTap={{ scale: 0.95 }}
    >
      {/* Simplified glow effect */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute -inset-1 bg-gradient-to-r from-red-500/20 to-white/10 rounded-full blur-md"
          animate={{
            opacity: [0.3, 0.6, 0.3],
            scale: [0.9, 1.1, 0.9],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: index * 0.2,
          }}
        />
      )}
      
      <div className="relative p-2 sm:p-3 bg-gradient-to-br from-red-900/90 to-red-800/90 backdrop-blur-sm rounded-full border border-white/60 shadow-lg group-hover:border-yellow-300/80 transition-all duration-200">
        <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white group-hover:text-yellow-200 transition-colors duration-200" />
        
        {/* Simplified sparkle on hover */}
        <div className="absolute -top-1 -right-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Sparkles className="w-3 h-3 text-yellow-400" />
        </div>
      </div>
    </motion.div>
  );
});

// Optimized trophy
const IndonesianTrophy = () => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <div className="relative flex justify-center w-full">
      {/* Simplified glow effects */}
      {!prefersReducedMotion && (
        <>
          <motion.div
            className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full blur-2xl"
            style={{
              background: "radial-gradient(circle, rgba(239,68,68,0.3) 0%, transparent 70%)"
            }}
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.3, 0.7, 0.3],
            }}
            transition={{ duration: 6, repeat: Infinity }}
          />
          
          <motion.div
            className="absolute w-24 h-24 sm:w-32 sm:h-32 rounded-full blur-xl"
            style={{
              background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)"
            }}
            animate={{
              scale: [1.2, 0.8, 1.2],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{ duration: 8, repeat: Infinity }}
          />
        </>
      )}

      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          y: !prefersReducedMotion ? [0, -10, 0] : 0,
        }}
        transition={{
          scale: { duration: 2, ease: "easeOut", type: "spring", stiffness: 100 },
          opacity: { duration: 2, ease: "easeOut" },
          y: !prefersReducedMotion ? {
            duration: 4,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          } : {},
        }}
        className="relative z-10"
        whileHover={!prefersReducedMotion ? {
          scale: 1.05,
          transition: { duration: 0.3 }
        } : {}}
      >
        <Trophy className="w-16 h-16 sm:w-20 sm:h-20 lg:w-28 lg:h-28 text-yellow-400 drop-shadow-xl" />
        
        {/* Simplified crown */}
        {!prefersReducedMotion && (
          <motion.div
            className="absolute -top-2 -right-2 sm:-top-3 sm:-right-3"
            animate={{
              rotate: [0, 360],
              y: [0, -5, 0],
            }}
            transition={{
              rotate: { duration: 8, repeat: Infinity, ease: "linear" },
              y: { duration: 2, repeat: Infinity, ease: "easeInOut" },
            }}
          >
            <Crown className="w-5 h-5 sm:w-7 sm:h-7 text-red-500 drop-shadow-lg" />
          </motion.div>
        )}

        {/* Simplified orbiting stars */}
        {!prefersReducedMotion && [0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              rotate: { duration: 4 + i, repeat: Infinity, ease: "linear" },
            }}
          >
            <div
              className="absolute"
              style={{
                transform: `translate(-50%, -50%) translateX(${35 + i * 10}px)`,
              }}
            >
              <Star className="w-2 h-2 sm:w-3 sm:h-3 text-white drop-shadow-sm" />
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

// Simplified spinning element
const IndonesianSpinningElement = () => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{
        scale: 1,
        rotate: !prefersReducedMotion ? [0, 360] : 0,
        opacity: 1,
      }}
      transition={{
        scale: { duration: 1.5, delay: 0.3, type: "spring", stiffness: 120 },
        opacity: { duration: 1.5, delay: 0.3 },
        rotate: !prefersReducedMotion ? { duration: 20, repeat: Infinity, ease: "linear" } : {},
      }}
      className="relative"
      whileHover={!prefersReducedMotion ? {
        scale: 1.2,
        transition: { duration: 0.3 }
      } : {}}
    >
      {/* Simplified glow */}
      {!prefersReducedMotion && (
        <motion.div
          className="absolute -inset-3 bg-gradient-to-r from-red-500/30 to-white/20 rounded-full blur-lg"
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.4, 0.8, 0.4],
          }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      )}

      <Diamond className="w-8 h-8 sm:w-10 sm:h-10 text-red-500 relative z-10 drop-shadow-lg" />
      
      {/* Simplified orbiting elements */}
      {!prefersReducedMotion && [0, 1].map((i) => (
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
              transform: `translate(-50%, -50%) translateX(${25 + i * 6}px)`,
            }}
          >
            {i === 0 && <Flag className="w-2 h-2 text-red-500" />}
            {i === 1 && <Star className="w-2 h-2 text-white" />}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

// Simplified border frame
const IndonesianBorderFrame = () => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <>
      <motion.div
        className="absolute inset-4 sm:inset-8 lg:inset-12 border-2 sm:border-4 border-red-500/60 rounded-2xl lg:rounded-3xl"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ 
          opacity: 1, 
          scale: 1,
          borderColor: !prefersReducedMotion ? [
            "rgba(239,68,68,0.6)",
            "rgba(255,255,255,0.5)", 
            "rgba(239,68,68,0.6)"
          ] : "rgba(239,68,68,0.6)"
        }}
        transition={{ 
          scale: { delay: 0.2, duration: 1.5 },
          opacity: { delay: 0.2, duration: 1.5 },
          borderColor: !prefersReducedMotion ? { duration: 8, repeat: Infinity } : {}
        }}
        style={{
          boxShadow: "0 0 50px rgba(239,68,68,0.4)",
        }}
      />

      {/* Simplified corner emblems */}
      {[
        { top: "1rem", left: "1rem" },
        { top: "1rem", right: "1rem" },
        { bottom: "1rem", left: "1rem" },
        { bottom: "1rem", right: "1rem" }
      ].map((position, i) => (
        <motion.div
          key={i}
          className="absolute w-8 h-8 sm:w-12 sm:h-12"
          style={position}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0.6, 1, 0.6],
            scale: !prefersReducedMotion ? [0.9, 1.2, 0.9] : 1,
          }}
          transition={{
            opacity: { delay: 0.5 + i * 0.2, duration: 4, repeat: Infinity },
            scale: !prefersReducedMotion ? { delay: 0.5 + i * 0.2, duration: 4, repeat: Infinity } : { delay: 0.5 + i * 0.2, duration: 1 },
          }}
        >
          <div className="relative h-full w-full border-2 border-white/80 rounded-full flex items-center justify-center bg-gradient-to-br from-red-800/80 to-red-900/80 backdrop-blur-sm">
            <motion.div
              className="w-3 h-3 sm:w-4 sm:h-4 bg-gradient-to-br from-white to-red-200 rounded-full"
              animate={!prefersReducedMotion ? {
                scale: [1, 1.3, 1],
              } : {}}
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
};

const IndonesianVictoryScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        onLoadingComplete?.();
      }, 800);
    }, prefersReducedMotion ? 8000 : 10000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete, prefersReducedMotion]);

  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.02,
      transition: {
        duration: 1,
        ease: "easeInOut",
      },
    },
  };

  const indonesianIcons = useMemo(() => [
    Flag, Crown, Award, Sparkles, Star, Medal, Gift, Trophy, Heart, Gem,
  ], []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-gradient-to-br from-red-950 via-red-900 to-red-800 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit="exit"
          variants={containerVariants}
        >
          <IndonesianLuxuryBackground />

          <div className="relative min-h-screen flex items-center justify-center py-4 px-3 sm:py-6 sm:px-4 lg:py-8 lg:px-6">
            <div className="w-full max-w-5xl mx-auto text-center py-4 sm:py-6 lg:py-8">
              
              <IndonesianBorderFrame />

              {/* Trophy Section */}
              <motion.div className="mb-6 sm:mb-8 lg:mb-10 pt-6 sm:pt-8 lg:pt-16 relative h-20 sm:h-24 lg:h-32">
                <IndonesianTrophy />
              </motion.div>

              {/* Spinning Element */}
              <motion.div
                className="flex justify-center mb-4 sm:mb-6 lg:mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 1 }}
              >
                <IndonesianSpinningElement />
              </motion.div>

              {/* Icons Grid */}
              <motion.div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 mb-6 sm:mb-8 lg:mb-12">
                {indonesianIcons.map((Icon, index) => (
                  <IndonesianIconButton key={index} Icon={Icon} index={index} />
                ))}
              </motion.div>

              {/* Main Title */}
              <motion.div className="text-center mb-6 sm:mb-8 lg:mb-12 px-2 sm:px-4">
                <motion.h1 
                  className="text-xl sm:text-3xl lg:text-5xl xl:text-6xl font-bold tracking-tight"
                  whileHover={!prefersReducedMotion ? {
                    scale: 1.02,
                    transition: { duration: 0.3 }
                  } : {}}
                >
                  <motion.div
                    className="mb-2 sm:mb-3 lg:mb-4"
                    initial={{ opacity: 0, y: -20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 0.6, duration: 1.2, type: "spring", stiffness: 80 }}
                  >
                    <motion.span 
                      className="bg-gradient-to-r from-red-300 via-white to-red-400 bg-clip-text text-transparent"
                      animate={!prefersReducedMotion ? {
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      } : {}}
                      transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      HUT REPUBLIK INDONESIA
                    </motion.span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 1, duration: 1.2, type: "spring", stiffness: 80 }}
                  >
                    <motion.span 
                      className="bg-gradient-to-r from-yellow-300 via-red-400 to-white bg-clip-text text-transparent"
                      animate={!prefersReducedMotion ? {
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      } : {}}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      KE-80 TAHUN
                    </motion.span>
                  </motion.div>
                </motion.h1>
              </motion.div>

              {/* Subtitle */}
              <motion.div
                className="mb-6 sm:mb-8 lg:mb-12"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8, duration: 1.2 }}
              >
                <motion.h2 
                  className="text-sm sm:text-xl lg:text-3xl bg-gradient-to-r from-white via-red-300 to-yellow-400 bg-clip-text text-transparent font-bold mb-3 sm:mb-4"
                  animate={!prefersReducedMotion ? {
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  } : {}}
                  transition={{
                    duration: 10,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  MERDEKA! INDONESIA JAYA!
                </motion.h2>
                <motion.p 
                  className="text-xs sm:text-base lg:text-xl text-white/90 font-semibold"
                  animate={!prefersReducedMotion ? {
                    opacity: [0.7, 1, 0.7],
                  } : {}}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Bhineka Tunggal Ika - Unity in Diversity
                </motion.p>
              </motion.div>

              {/* Company Visit Section */}
              <motion.div
                className="mb-4 sm:mb-6 lg:mb-8"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2, duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-1 sm:gap-2 lg:gap-3 px-3 py-2 sm:px-5 sm:py-3 lg:px-6 lg:py-3 rounded-full bg-gradient-to-r from-red-600/25 via-white/15 to-red-600/25 border border-white/40 backdrop-blur-sm">
                  <Building2 className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-white" />
                  <span className="text-xs sm:text-lg lg:text-xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
                    <IndonesianTypewriter text="BIOFOURTEAM INDONESIA" speed={60} delay={2500} />
                  </span>
                  <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5 text-yellow-400" />
                </div>
              </motion.div>

              {/* Team Name */}
              <motion.div
                className="text-center mt-3 sm:mt-4 lg:mt-6 mb-4 sm:mb-6 lg:mb-8"
                initial={{ opacity: 0, y: 15, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 2.3, duration: 0.8 }}
              >
                <motion.div
                  className="inline-flex items-center gap-1 sm:gap-2 lg:gap-3 px-4 py-2 sm:px-5 sm:py-3 lg:px-8 lg:py-4 rounded-full relative"
                  whileHover={!prefersReducedMotion ? { scale: 1.02 } : {}}
                  transition={{ type: "spring", stiffness: 200 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-800/50 via-white/25 to-red-800/50 rounded-full blur-lg" />
                  <div className="absolute inset-0 border-2 border-white/40 rounded-full" />
                  <div className="relative flex items-center gap-1 sm:gap-2 lg:gap-3 text-sm sm:text-xl lg:text-2xl font-bold">
                    <motion.div
                      animate={!prefersReducedMotion ? { rotate: [0, 360] } : {}}
                      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    >
                      <Flag className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                    </motion.div>
                    <span className="bg-gradient-to-r from-white via-red-200 to-yellow-300 bg-clip-text text-transparent">
                      <IndonesianTypewriter text="GARUDA BIOETHANOL" speed={80} delay={3200} />
                    </span>
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                </motion.div>
              </motion.div>

              {/* Independence Date */}
              <motion.div
                className="text-center mb-6 sm:mb-8 lg:mb-10"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.6, duration: 0.8 }}
              >
                <motion.div
                  className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3 rounded-full bg-gradient-to-r from-red-900/70 via-white/15 to-red-900/70 border-2 border-yellow-400/50 backdrop-blur-md"
                  animate={!prefersReducedMotion ? {
                    borderColor: [
                      "rgba(251,191,36,0.5)",
                      "rgba(255,255,255,0.7)",
                      "rgba(239,68,68,0.5)",
                      "rgba(251,191,36,0.5)"
                    ],
                    boxShadow: [
                      "0 0 20px rgba(251,191,36,0.2)",
                      "0 0 30px rgba(255,255,255,0.3)",
                      "0 0 20px rgba(239,68,68,0.2)",
                      "0 0 20px rgba(251,191,36,0.2)"
                    ]
                  } : {}}
                  transition={{ duration: 5, repeat: Infinity }}
                >
                  <motion.div
                    animate={!prefersReducedMotion ? {
                      scale: [1, 1.15, 1],
                    } : {}}
                    transition={{
                      duration: 2.5,
                      repeat: Infinity,
                    }}
                  >
                    <Heart className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                  </motion.div>
                  <span className="text-sm sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-red-300 via-white to-yellow-400 bg-clip-text text-transparent">
                    <IndonesianTypewriter text="17 AGUSTUS 1945 - 2025" speed={70} delay={3800} />
                  </span>
                  <motion.div
                    animate={!prefersReducedMotion ? {
                      scale: [1, 1.05, 1],
                      opacity: [0.8, 1, 0.8]
                    } : {}}
                    transition={{ duration: 1.8, repeat: Infinity }}
                  >
                    <Star className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Patriotic Quote */}
              <motion.div
                className="text-center mb-8 sm:mb-10 lg:mb-12"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3, duration: 1.2 }}
              >
                <motion.blockquote 
                  className="text-xs sm:text-lg lg:text-xl italic text-white/90 font-medium max-w-4xl mx-auto leading-relaxed"
                  animate={!prefersReducedMotion ? {
                    opacity: [0.8, 1, 0.8],
                  } : {}}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <IndonesianTypewriter 
                    text='"Sekali Merdeka, Tetap Merdeka!"' 
                    speed={120} 
                    delay={4500} 
                  />
                  <motion.div 
                    className="text-xs sm:text-base lg:text-lg text-red-300 mt-2 sm:mt-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: prefersReducedMotion ? 5 : 6.5, duration: 1 }}
                  >
                    - Ir. Soekarno, Proklamator Kemerdekaan RI
                  </motion.div>
                </motion.blockquote>
              </motion.div>

              {/* Achievement ring */}
              <motion.div
                className="absolute -bottom-2 sm:bottom-0 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{
                  opacity: 0.4,
                  scale: 1,
                  rotate: !prefersReducedMotion ? [0, 360] : 0,
                }}
                transition={{
                  opacity: { delay: 2.5, duration: 1.2 },
                  scale: { delay: 2.5, duration: 1.2 },
                  rotate: !prefersReducedMotion ? { delay: 3, duration: 20, repeat: Infinity, ease: "linear" } : {},
                }}
              >
                <div className="w-24 h-24 sm:w-32 sm:h-32 border-2 sm:border-3 border-red-500/60 rounded-full flex items-center justify-center relative">
                  <div className="w-18 h-18 sm:w-24 sm:h-24 border border-white/50 rounded-full flex items-center justify-center">
                    <motion.div
                      className="text-lg sm:text-xl font-bold text-yellow-400"
                      animate={!prefersReducedMotion ? {
                        scale: [1, 1.08, 1],
                        opacity: [0.8, 1, 0.8]
                      } : {}}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity
                      }}
                    >
                      80
                    </motion.div>
                  </div>
                  {/* Mini flags around the ring */}
                  {[0, 1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute w-4 h-4 sm:w-6 sm:h-6"
                      style={{
                        top: i === 0 ? "0%" : i === 1 ? "100%" : "50%",
                        left: i === 2 ? "0%" : i === 3 ? "100%" : "50%",
                        transform: `translate(-50%, -50%)`
                      }}
                      animate={!prefersReducedMotion ? {
                        scale: [0.8, 1.1, 0.8],
                      } : {}}
                      transition={{
                        duration: 1.8,
                        repeat: Infinity,
                        delay: i * 0.3
                      }}
                    >
                      <div className="w-full h-full bg-gradient-to-b from-red-500 to-white rounded-sm border border-yellow-400/40" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Floating celebration elements */}
              {!prefersReducedMotion && (
                <div className="absolute inset-0 pointer-events-none">
                  {[0, 1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={`celebration-${i}`}
                      className="absolute"
                      style={{
                        top: `${20 + Math.random() * 60}%`,
                        left: `${10 + Math.random() * 80}%`,
                      }}
                      animate={{
                        y: [0, -40, 0],
                        x: [0, Math.random() * 20 - 10, 0],
                        opacity: [0, 0.7, 0],
                        scale: [0.5, 1.2, 0.5],
                        rotate: [0, 360],
                      }}
                      transition={{
                        duration: 6 + Math.random() * 4,
                        repeat: Infinity,
                        delay: Math.random() * 3,
                        ease: "easeInOut",
                      }}
                    >
                      {i % 3 === 0 && <Flag className="w-3 h-3 text-red-500" />}
                      {i % 3 === 1 && <Star className="w-3 h-3 text-white" />}
                      {i % 3 === 2 && <Heart className="w-3 h-3 text-red-400" />}
                    </motion.div>
                  ))}
                </div>
              )}


            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Add performance optimization wrapper
const OptimizedIndonesianVictoryScreen = React.memo(IndonesianVictoryScreen);

export default OptimizedIndonesianVictoryScreen; 
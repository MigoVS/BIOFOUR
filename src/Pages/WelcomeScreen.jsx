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
  Flag,
  Heart,
} from "lucide-react";

// Enhanced typewriter with Indonesian flag cursor
const IndonesianTypewriter = ({ text, speed = 120, delay = 0 }) => {
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
          className="text-red-400 ml-0.5 inline-block"
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
          <Flag className="w-3 h-3 sm:w-4 sm:h-4" />
        </motion.span>
      )}
    </span>
  );
};

// Indonesian themed particles
const IndonesianParticles = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: Math.random() * 8 + 6,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 3,
      duration: 4 + Math.random() * 4,
      color: i % 3 === 0 ? "from-red-500 to-red-600" :
             i % 3 === 1 ? "from-white to-gray-100" :
             "from-yellow-400 to-amber-500"
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
            boxShadow: "0 0 25px currentColor",
          }}
          animate={{
            y: [-30, -120, -30],
            x: [-15, 15, -15],
            opacity: [0, 1, 0.8, 0],
            scale: [0.3, 1.4, 0.9, 0.2],
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

// Indonesian flag light beams
const IndonesianLightBeams = () => {
  const beams = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      rotation: i * 45,
      delay: i * 0.2,
      opacity: 0.2 + Math.random() * 0.15,
      color: i % 2 === 0 ? "from-red-500/80 to-red-600/20" : "from-white/60 to-gray-200/10"
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {beams.map((beam) => (
        <motion.div
          key={beam.id}
          className="absolute top-1/2 left-1/2 origin-bottom"
          style={{
            width: "3px",
            height: "60vh",
            background: `linear-gradient(to top, ${beam.color.includes('red') ? 'rgba(239,68,68,0.9)' : 'rgba(255,255,255,0.7)'}, transparent)`,
            transform: `translate(-50%, -100%) rotate(${beam.rotation}deg)`,
          }}
          animate={{
            opacity: [0, beam.opacity, 0],
            scaleY: [0.6, 1.3, 0.9],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            delay: beam.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
};

// Indonesian themed background
const IndonesianLuxuryBackground = () => {
  const backgroundElements = useMemo(() => {
    const elements = [];
    
    // Floating Indonesian symbols
    const symbols = [
      { icon: Flag, color: "text-red-500" },
      { icon: Crown, color: "text-yellow-500" },
      { icon: Star, color: "text-white" },
      { icon: Heart, color: "text-red-400" },
    ];
    
    for (let i = 0; i < 12; i++) {
      const symbol = symbols[i % symbols.length];
      elements.push(
        <motion.div
          key={`symbol-${i}`}
          className="absolute"
          style={{
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, -40, 0],
            x: [0, Math.random() * 30 - 15, 0],
            rotate: [0, 360],
            opacity: [0.4, 0.9, 0.4],
            scale: [0.9, 1.4, 0.9],
          }}
          transition={{
            duration: 10 + Math.random() * 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-white rounded-full blur-xl opacity-50" />
            <symbol.icon className={`w-5 h-5 ${symbol.color} relative z-10`} />
          </div>
        </motion.div>
      );
    }
    
    return elements;
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Indonesian flag gradient layers */}
      <motion.div 
        className="absolute inset-0 bg-gradient-to-br from-red-900 via-red-800/90 to-red-950"
        animate={{
          opacity: [0.9, 1, 0.9],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div 
        className="absolute inset-0 bg-gradient-to-tl from-white/20 via-transparent to-red-600/30"
        animate={{
          opacity: [0.6, 0.9, 0.6],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 3,
        }}
      />

      {/* Indonesian light beams */}
      <IndonesianLightBeams />

      {/* Merdeka aurora effects */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        animate={{
          background: [
            "radial-gradient(ellipse at 30% 20%, rgba(239,68,68,0.2) 0%, transparent 60%)",
            "radial-gradient(ellipse at 70% 80%, rgba(255,255,255,0.15) 0%, transparent 60%)",
            "radial-gradient(ellipse at 50% 50%, rgba(251,191,36,0.1) 0%, transparent 60%)",
            "radial-gradient(ellipse at 30% 20%, rgba(239,68,68,0.2) 0%, transparent 60%)",
          ],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Floating Indonesian elements */}
      <div className="absolute inset-0">
        {backgroundElements}
      </div>

      {/* Indonesian particle system */}
      <IndonesianParticles />

      {/* Batik-inspired grid pattern */}
      <motion.div 
        className="absolute inset-0 opacity-8"
        animate={{
          opacity: [0.03, 0.08, 0.03],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div
          className="w-full h-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(239,68,68,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </motion.div>
    </div>
  );
};

// Indonesian themed icon button
const IndonesianIconButton = ({ Icon, index }) => (
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
    {/* Indonesian flag glow effect */}
    <motion.div
      className="absolute -inset-2 bg-gradient-to-r from-red-500/30 via-white/20 to-red-600/30 rounded-full blur-lg"
      animate={{
        opacity: [0.4, 0.8, 0.4],
        scale: [0.9, 1.3, 0.9],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        delay: index * 0.3,
      }}
    />
    
    <div className="relative p-2 sm:p-3 bg-gradient-to-br from-red-900/95 to-red-800/95 backdrop-blur-md rounded-full border-2 border-white/70 shadow-2xl shadow-red-500/40 group-hover:border-yellow-300/90 group-hover:shadow-yellow-400/50 transition-all duration-300">
      <Icon className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white group-hover:text-yellow-200 transition-colors duration-300" />
      
      {/* Indonesian sparkle effects on hover */}
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
        <Sparkles className="w-3 h-3 text-yellow-400" />
      </motion.div>
    </div>
  </motion.div>
);

// Indonesian themed trophy
const IndonesianTrophy = () => (
  <div className="relative flex justify-center w-full">
    {/* Multiple layered Indonesian glows */}
    <motion.div
      className="absolute w-40 h-40 sm:w-48 sm:h-48 rounded-full blur-3xl"
      style={{
        background: "radial-gradient(circle, rgba(239,68,68,0.4) 0%, rgba(220,38,38,0.3) 50%, transparent 100%)"
      }}
      animate={{
        scale: [1, 1.5, 1],
        opacity: [0.4, 0.9, 0.4],
        rotate: [0, 180, 360],
      }}
      transition={{ duration: 8, repeat: Infinity }}
    />
    
    <motion.div
      className="absolute w-32 h-32 sm:w-40 sm:h-40 rounded-full blur-2xl"
      style={{
        background: "radial-gradient(circle, rgba(255,255,255,0.3) 0%, rgba(248,250,252,0.2) 50%, transparent 100%)"
      }}
      animate={{
        scale: [1.3, 0.9, 1.3],
        opacity: [0.3, 0.7, 0.3],
        rotate: [360, 180, 0],
      }}
      transition={{ duration: 10, repeat: Infinity }}
    />

    <motion.div
      initial={{ scale: 0.3, opacity: 0, rotate: -180 }}
      animate={{
        scale: 1,
        opacity: 1,
        rotate: 0,
        y: [0, -15, 0],
      }}
      transition={{
        scale: { duration: 2.5, ease: "easeOut", type: "spring", stiffness: 120 },
        opacity: { duration: 2.5, ease: "easeOut" },
        rotate: { duration: 2.5, ease: "easeOut" },
        y: {
          duration: 5,
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
      <Trophy className="w-16 h-16 sm:w-20 sm:h-20 lg:w-32 lg:h-32 text-yellow-400 drop-shadow-2xl filter" />
      
      {/* Indonesian flag crown */}
      <motion.div
        className="absolute -top-3 -right-3 sm:-top-4 sm:-right-4"
        animate={{
          rotate: [0, 360],
          y: [0, -8, 0],
          scale: [1, 1.2, 1],
        }}
        transition={{
          rotate: { duration: 12, repeat: Infinity, ease: "linear" },
          y: { duration: 3, repeat: Infinity, ease: "easeInOut" },
          scale: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
      >
        <div className="relative">
          <Crown className="w-6 h-6 sm:w-8 sm:h-8 lg:w-14 lg:h-14 text-red-500 drop-shadow-lg" />
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-white rounded-full blur-md opacity-50" />
        </div>
      </motion.div>

      {/* Orbiting Indonesian stars */}
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            top: "50%",
            left: "50%",
          }}
          animate={{
            rotate: [0, 360],
            scale: [0.6, 1.1, 0.6],
          }}
          transition={{
            rotate: { duration: 5 + i, repeat: Infinity, ease: "linear" },
            scale: { duration: 3, repeat: Infinity, delay: i * 0.4 },
          }}
        >
          <div
            className="absolute"
            style={{
              transform: `translate(-50%, -50%) translateX(${45 + i * 12}px)`,
            }}
          >
            <Star className="w-3 h-3 sm:w-4 sm:h-4 text-white drop-shadow-md" />
          </div>
        </motion.div>
      ))}
    </motion.div>
  </div>
);

// Indonesian spinning Garuda symbol
const IndonesianSpinningElement = () => (
  <motion.div
    initial={{ scale: 0, rotate: 0, opacity: 0 }}
    animate={{
      scale: 1,
      rotate: [0, 360],
      opacity: 1,
    }}
    transition={{
      scale: { duration: 2, delay: 0.5, type: "spring", stiffness: 150 },
      opacity: { duration: 2, delay: 0.5 },
      rotate: { duration: 25, repeat: Infinity, ease: "linear" },
    }}
    className="relative"
    whileHover={{
      scale: 1.3,
      transition: { duration: 0.4 }
    }}
  >
    {/* Indonesian glow layers */}
    <motion.div
      className="absolute -inset-4 bg-gradient-to-r from-red-500 via-white to-red-600 rounded-full blur-xl opacity-70"
      animate={{
        scale: [1, 1.6, 1],
        opacity: [0.5, 1, 0.5],
      }}
      transition={{ duration: 5, repeat: Infinity }}
    />
    
    <motion.div
      className="absolute -inset-2 bg-gradient-to-r from-yellow-400 via-red-500 to-white rounded-full blur-lg opacity-50"
      animate={{
        scale: [1.3, 0.9, 1.3],
        opacity: [0.3, 0.7, 0.3],
        rotate: [0, -360],
      }}
      transition={{ duration: 8, repeat: Infinity }}
    />

    <Diamond className="w-10 h-10 sm:w-12 sm:h-12 lg:w-18 lg:h-18 text-red-500 relative z-10 drop-shadow-lg" />
    
    {/* Orbiting Indonesian mini symbols */}
    {[0, 1, 2].map((i) => (
      <motion.div
        key={i}
        className="absolute top-1/2 left-1/2"
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 4 + i,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        <div
          className="absolute"
          style={{
            transform: `translate(-50%, -50%) translateX(${30 + i * 8}px)`,
          }}
        >
          {i === 0 && <Flag className="w-2 h-2 text-red-500" />}
          {i === 1 && <Star className="w-2 h-2 text-white" />}
          {i === 2 && <Heart className="w-2 h-2 text-red-400" />}
        </div>
      </motion.div>
    ))}
  </motion.div>
);

// Indonesian border frame
const IndonesianBorderFrame = () => (
  <>
    <motion.div
      className="absolute inset-4 sm:inset-8 lg:inset-16 border-4 sm:border-6 lg:border-8 border-red-500/70 rounded-3xl lg:rounded-4xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ 
        opacity: 1, 
        scale: 1,
        borderColor: [
          "rgba(239,68,68,0.7)",
          "rgba(255,255,255,0.6)", 
          "rgba(251,191,36,0.6)",
          "rgba(239,68,68,0.7)"
        ]
      }}
      transition={{ 
        scale: { delay: 0.3, duration: 2 },
        opacity: { delay: 0.3, duration: 2 },
        borderColor: { duration: 10, repeat: Infinity }
      }}
      style={{
        boxShadow: "0 0 100px rgba(239,68,68,0.6), inset 0 0 100px rgba(239,68,68,0.2)",
      }}
    />

    {/* Indonesian corner emblems */}
    {[
      { top: "1rem", left: "1rem" },
      { top: "1rem", right: "1rem" },
      { bottom: "1rem", left: "1rem" },
      { bottom: "1rem", right: "1rem" }
    ].map((position, i) => (
      <motion.div
        key={i}
        className="absolute w-12 h-12 sm:w-16 sm:h-16"
        style={position}
        initial={{ opacity: 0, scale: 0, rotate: -180 }}
        animate={{
          opacity: [0.7, 1, 0.7],
          scale: [0.9, 1.4, 0.9],
          rotate: [0, 360],
        }}
        transition={{
          opacity: { delay: 0.7 + i * 0.3, duration: 5, repeat: Infinity },
          scale: { delay: 0.7 + i * 0.3, duration: 5, repeat: Infinity },
          rotate: { delay: 0.7 + i * 0.3, duration: 10, repeat: Infinity, ease: "linear" },
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-white rounded-full blur-xl" />
        <div className="relative h-full w-full border-3 border-white/90 rounded-full flex items-center justify-center bg-gradient-to-br from-red-800/90 to-red-900/90 backdrop-blur-sm">
          <motion.div
            className="w-4 h-4 sm:w-5 sm:h-5 bg-gradient-to-br from-white to-red-200 rounded-full"
            animate={{
              scale: [1, 1.6, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.4,
            }}
          />
        </div>
      </motion.div>
    ))}
  </>
);

const IndonesianVictoryScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        onLoadingComplete?.();
      }, 1000);
    }, 12000);

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

          <div className="relative min-h-screen flex items-center justify-center py-4 px-3 sm:py-8 sm:px-6 lg:py-16 lg:px-8">
            <div className="w-full max-w-6xl mx-auto text-center py-4 sm:py-6 lg:py-10">
              
              <IndonesianBorderFrame />

              {/* Indonesian Trophy Section */}
              <motion.div className="mb-6 sm:mb-8 lg:mb-12 pt-8 sm:pt-12 lg:pt-24 relative h-24 sm:h-28 lg:h-40">
                <IndonesianTrophy />
              </motion.div>

              {/* Indonesian Spinning Element */}
              <motion.div
                className="flex justify-center mb-4 sm:mb-6 lg:mb-10"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8, duration: 1.5 }}
              >
                <IndonesianSpinningElement />
              </motion.div>

              {/* Indonesian Icons Grid */}
              <motion.div className="flex flex-wrap justify-center gap-3 sm:gap-4 lg:gap-6 mb-6 sm:mb-10 lg:mb-16">
                {indonesianIcons.map((Icon, index) => (
                  <IndonesianIconButton key={index} Icon={Icon} index={index} />
                ))}
              </motion.div>

              {/* Main Title - 80th Independence */}
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
                      className="bg-gradient-to-r from-red-300 via-white to-red-400 bg-clip-text text-transparent"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      HUT REPUBLIK INDONESIA
                    </motion.span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 30, scale: 0.9 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ delay: 1.2, duration: 1.5, type: "spring", stiffness: 100 }}
                  >
                    <motion.span 
                      className="bg-gradient-to-r from-yellow-300 via-red-400 to-white bg-clip-text text-transparent"
                      animate={{
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      }}
                      transition={{
                        duration: 10,
                        repeat: Infinity,
                        ease: "easeInOut"
                      }}
                    >
                      KE-80 TAHUN
                    </motion.span>
                  </motion.div>
                </motion.h1>
              </motion.div>

              {/* Indonesian Subtitle */}
              <motion.div
                className="mb-6 sm:mb-10 lg:mb-16"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 2, duration: 1.5 }}
              >
                <motion.h2 
                  className="text-sm sm:text-xl lg:text-3xl xl:text-4xl bg-gradient-to-r from-white via-red-300 to-yellow-400 bg-clip-text text-transparent font-bold mb-4 sm:mb-6"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 12,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  MERDEKA! INDONESIA JAYA!
                </motion.h2>
                <motion.p 
                  className="text-xs sm:text-base lg:text-xl text-white opacity-90 font-semibold"
                  animate={{
                    opacity: [0.7, 1, 0.7],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  Bhineka Tunggal Ika - Unity in Diversity
                </motion.p>
              </motion.div>

              {/* Indonesian Company Visit Section */}
              <motion.div
                className="mb-4 sm:mb-6 lg:mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.2, duration: 1 }}
              >
                <div className="inline-flex items-center gap-1 sm:gap-2 lg:gap-3 px-3 py-2 sm:px-6 sm:py-3 lg:px-8 lg:py-4 rounded-full bg-gradient-to-r from-red-600/30 via-white/20 to-red-600/30 border border-white/50 backdrop-blur-sm">
                  <Building2 className="w-3 h-3 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-white" />
                  <span className="text-xs sm:text-lg lg:text-2xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">
                    <IndonesianTypewriter text="BIOFOURTEAM INDONESIA" speed={80} delay={2800} />
                  </span>
                  <ArrowRight className="w-3 h-3 sm:w-5 sm:h-5 lg:w-6 lg:h-6 text-yellow-400" />
                </div>
              </motion.div>

              {/* Indonesian Team Name */}
              <motion.div
                className="text-center mt-3 sm:mt-4 lg:mt-8 mb-4 sm:mb-6 lg:mb-10"
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ delay: 2.5, duration: 1 }}
              >
                <motion.div
                  className="inline-flex items-center gap-1 sm:gap-2 lg:gap-3 px-4 py-2 sm:px-6 sm:py-3 lg:px-10 lg:py-5 rounded-full relative"
                  whileHover={{ scale: 1.03 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-red-800/60 via-white/30 to-red-800/60 rounded-full blur-lg" />
                  <div className="absolute inset-0 border-2 border-white/50 rounded-full" />
                  <div className="relative flex items-center gap-1 sm:gap-2 lg:gap-3 text-sm sm:text-xl lg:text-3xl font-bold">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                    >
                      <Flag className="w-5 h-5 sm:w-6 sm:h-6 text-red-500" />
                    </motion.div>
                    <span className="bg-gradient-to-r from-white via-red-200 to-yellow-300 bg-clip-text text-transparent">
                      <IndonesianTypewriter text="GARUDA BIOETHANOL" speed={120} delay={3500} />
                    </span>
                    <Star className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                </motion.div>
              </motion.div>

              {/* Indonesian Independence Date */}
              <motion.div
                className="text-center mb-6 sm:mb-8 lg:mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.8, duration: 1 }}
              >
                <motion.div
                  className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-8 sm:py-4 rounded-full bg-gradient-to-r from-red-900/80 via-white/20 to-red-900/80 border-2 border-yellow-400/60 backdrop-blur-md"
                  animate={{
                    borderColor: [
                      "rgba(251,191,36,0.6)",
                      "rgba(255,255,255,0.8)",
                      "rgba(239,68,68,0.6)",
                      "rgba(251,191,36,0.6)"
                    ],
                    boxShadow: [
                      "0 0 30px rgba(251,191,36,0.3)",
                      "0 0 50px rgba(255,255,255,0.4)",
                      "0 0 30px rgba(239,68,68,0.3)",
                      "0 0 30px rgba(251,191,36,0.3)"
                    ]
                  }}
                  transition={{ duration: 6, repeat: Infinity }}
                >
                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      rotate: [0, 360]
                    }}
                    transition={{
                      scale: { duration: 3, repeat: Infinity },
                      rotate: { duration: 8, repeat: Infinity, ease: "linear" }
                    }}
                  >
                    <Heart className="w-4 h-4 sm:w-6 sm:h-6 text-red-500" />
                  </motion.div>
                  <span className="text-sm sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-red-300 via-white to-yellow-400 bg-clip-text text-transparent">
                    <IndonesianTypewriter text="17 AGUSTUS 1945 - 2025" speed={100} delay={4200} />
                  </span>
                  <motion.div
                    animate={{
                      scale: [1, 1.1, 1],
                      opacity: [0.7, 1, 0.7]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Star className="w-4 h-4 sm:w-6 sm:h-6 text-white" />
                  </motion.div>
                </motion.div>
              </motion.div>

              {/* Indonesian Patriotic Quote */}
              <motion.div
                className="text-center mb-8 sm:mb-12 lg:mb-16"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 3.2, duration: 1.5 }}
              >
                <motion.blockquote 
                  className="text-xs sm:text-lg lg:text-2xl italic text-white/90 font-medium max-w-4xl mx-auto leading-relaxed"
                  animate={{
                    opacity: [0.8, 1, 0.8],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <IndonesianTypewriter 
                    text='"Sekali Merdeka, Tetap Merdeka!"' 
                    speed={150} 
                    delay={5000} 
                  />
                  <motion.div 
                    className="text-xs sm:text-base lg:text-lg text-red-300 mt-2 sm:mt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 7, duration: 1 }}
                  >
                    - Ir. Soekarno, Proklamator Kemerdekaan RI
                  </motion.div>
                </motion.blockquote>
              </motion.div>

              {/* Indonesian achievement ring */}
              <motion.div
                className="absolute -bottom-4 sm:-bottom-2 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                  opacity: 0.5,
                  scale: 1,
                  rotate: [0, 360],
                }}
                transition={{
                  opacity: { delay: 3, duration: 1.5 },
                  scale: { delay: 3, duration: 1.5 },
                  rotate: { delay: 3.5, duration: 25, repeat: Infinity, ease: "linear" },
                }}
              >
                <div className="w-32 h-32 sm:w-40 sm:h-40 border-3 sm:border-4 border-red-500/70 rounded-full flex items-center justify-center relative">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 border-2 border-white/60 rounded-full flex items-center justify-center">
                    <motion.div
                      className="text-lg sm:text-2xl font-bold text-yellow-400"
                      animate={{
                        scale: [1, 1.1, 1],
                        opacity: [0.8, 1, 0.8]
                      }}
                      transition={{
                        duration: 3,
                        repeat: Infinity
                      }}
                    >
                      80
                    </motion.div>
                  </div>
                  {/* Mini Indonesian flags around the ring */}
                  {[0, 1, 2, 3].map((i) => (
                    <motion.div
                      key={i}
                      className="absolute w-6 h-6 sm:w-8 sm:h-8"
                      style={{
                        top: i === 0 ? "0%" : i === 1 ? "100%" : "50%",
                        left: i === 2 ? "0%" : i === 3 ? "100%" : "50%",
                        transform: `translate(-50%, -50%)`
                      }}
                      animate={{
                        scale: [0.8, 1.2, 0.8],
                        rotate: [0, 360]
                      }}
                      transition={{
                        scale: { duration: 2, repeat: Infinity, delay: i * 0.5 },
                        rotate: { duration: 6, repeat: Infinity, ease: "linear", delay: i * 0.3 }
                      }}
                    >
                      <div className="w-full h-full bg-gradient-to-b from-red-500 to-white rounded-sm border border-yellow-400/50" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IndonesianVictoryScreen; 
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Crown, Medal, Star, Sparkles, Award, Diamond, Gift, Zap, Atom, Flame, Droplet, Factory, Cpu, Database, Layers } from 'lucide-react';

// Efek typewriter yang lebih mewah dengan kecepatan yang disesuaikan
const LuxuriousTypewriter = ({ text, speed = 150 }) => {
  const [displayText, setDisplayText] = useState('');
  
  useEffect(() => {
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayText(text.slice(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, speed);
    
    return () => clearInterval(timer);
  }, [text, speed]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse text-cyan-300">|</span>
    </span>
  );
};

// Industrial Petrochemical Background dengan animasi kompleks
const IndustrialPetrochemicalBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    {/* Base industrial gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-900/80 to-gray-900 opacity-95" />
    
    {/* Chemical reaction glow effects - Simplified */}
    <div className="absolute top-0 left-0 w-full h-full">
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-gradient-radial from-cyan-500/15 via-blue-600/8 to-transparent rounded-full blur-3xl animate-pulse opacity-50" />
      <div className="absolute bottom-1/3 right-1/4 w-64 h-64 bg-gradient-radial from-orange-500/12 via-red-500/6 to-transparent rounded-full blur-3xl opacity-30" 
           style={{ animationDuration: '6s', animation: 'pulse 6s infinite' }} />
    </div>

    {/* Industrial pipes and structures */}
    <div className="absolute inset-0 opacity-20">
      {/* Horizontal pipes */}
      {[...Array(8)].map((_, i) => (
        <div 
          key={`h-pipe-${i}`}
          className="absolute h-2 bg-gradient-to-r from-gray-500 via-gray-400 to-gray-500 opacity-40"
          style={{
            width: `${60 + Math.random() * 40}%`,
            top: `${15 + i * 12}%`,
            left: `${Math.random() * 30}%`,
            transform: `rotate(${-5 + Math.random() * 10}deg)`,
            boxShadow: '0 0 10px rgba(59, 130, 246, 0.3)',
          }}
        />
      ))}
      
      {/* Vertical pipes */}
      {[...Array(6)].map((_, i) => (
        <div 
          key={`v-pipe-${i}`}
          className="absolute w-2 bg-gradient-to-b from-gray-500 via-gray-400 to-gray-500 opacity-30"
          style={{
            height: `${40 + Math.random() * 30}%`,
            left: `${20 + i * 15}%`,
            top: `${Math.random() * 30}%`,
            boxShadow: '0 0 8px rgba(34, 197, 94, 0.3)',
          }}
        />
      ))}
    </div>

    {/* Chemical particles and molecules - Reduced for performance */}
    <div className="absolute inset-0">
      {[...Array(20)].map((_, i) => (
        <div 
          key={`particle-${i}`}
          className="absolute rounded-full"
          style={{
            width: `${Math.random() * 4 + 3}px`,
            height: `${Math.random() * 4 + 3}px`,
            backgroundColor: i % 4 === 0 ? '#06b6d4' : i % 4 === 1 ? '#10b981' : i % 4 === 2 ? '#f59e0b' : '#ef4444',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: 0.5,
            animationDelay: `${Math.random() * 4}s`,
            animation: `float ${10 + Math.random() * 8}s infinite ease-in-out`,
            boxShadow: `0 0 8px currentColor`,
          }}
        />
      ))}
    </div>

    {/* Industrial machinery silhouettes */}
    <div className="absolute bottom-0 left-0 w-full h-32 opacity-15">
      <div className="absolute bottom-0 left-10 w-16 h-24 bg-gradient-to-t from-gray-600 to-gray-700 transform skew-x-3" />
      <div className="absolute bottom-0 left-32 w-20 h-20 bg-gradient-to-t from-gray-600 to-gray-700 rounded-t-full" />
      <div className="absolute bottom-0 right-20 w-12 h-28 bg-gradient-to-t from-gray-600 to-gray-700" />
      <div className="absolute bottom-0 right-40 w-24 h-16 bg-gradient-to-t from-gray-600 to-gray-700 transform -skew-x-2" />
    </div>

    {/* Energy flow lines - Reduced for performance */}
    <div className="absolute inset-0 opacity-20">
      {[...Array(6)].map((_, i) => (
        <div 
          key={`energy-${i}`}
          className="absolute"
          style={{
            width: '2px',
            height: `${25 + Math.random() * 30}%`,
            background: `linear-gradient(to bottom, transparent, ${i % 3 === 0 ? '#06b6d4' : i % 3 === 1 ? '#10b981' : '#f59e0b'}, transparent)`,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 60}%`,
            animation: `pulse ${3 + Math.random() * 2}s infinite ease-in-out`,
            animationDelay: `${Math.random() * 2}s`,
          }}
        />
      ))}
    </div>
  </div>
);

// Industrial icon button dengan tema petrokimia
const IndustrialIconButton = ({ Icon }) => (
  <div className="relative group hover:scale-110 transition-transform duration-500">
    <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 rounded-full blur opacity-40 group-hover:opacity-90 transition duration-300" />
    <div className="relative p-1 sm:p-2 md:p-3 bg-slate-900/80 backdrop-blur-md rounded-full border border-cyan-500/50 shadow-xl shadow-cyan-500/20">
      <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-cyan-300" />
    </div>
  </div>
);

// Trofi industrial dengan efek energi
const IndustrialTrophy = () => (
  <div className="relative flex justify-center w-full">
    <div className="absolute w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-cyan-500/10 rounded-full blur-3xl animate-pulse" />
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: 1,
        opacity: 1,
        y: [0, -8, 0]
      }}
      transition={{ 
        scale: { duration: 1 },
        opacity: { duration: 1 },
        y: { duration: 4, repeat: Infinity, repeatType: "reverse" }
      }}
      className="relative"
    >
      <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-xl opacity-30 animate-pulse" />
      <Trophy className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-cyan-300 drop-shadow-2xl" />
    </motion.div>
  </div>
);

// Atom berputar sebagai simbol petrokimia
const SpinningAtom = () => (
  <motion.div
    initial={{ rotate: 0 }}
    animate={{ 
      rotate: 360,
    }}
    transition={{ 
      rotate: { duration: 12, repeat: Infinity, ease: "linear" },
    }}
    className="relative"
  >
    <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full blur-md opacity-50 animate-pulse" />
    <Atom className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-emerald-300 drop-shadow-lg" />
  </motion.div>
);

const VictoryScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        onLoadingComplete?.();
      }, 1000);
    }, 7000);
    
    return () => clearTimeout(timer);
  }, [onLoadingComplete]);

  const containerVariants = {
    exit: {
      opacity: 0,
      scale: 1.1,
      filter: "blur(10px)",
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    exit: {
      y: -20,
      opacity: 0,
      transition: {
        duration: 0.4,
        ease: "easeInOut"
      }
    }
  };

  // Industrial petrochemical icons
  const industrialIcons = [Atom, Zap, Flame, Droplet, Factory, Cpu, Database, Layers];

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
          
          {/* Industrial grid overlay */}
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" 
                 style={{
                   backgroundImage: 'linear-gradient(rgba(6,182,212,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(6,182,212,0.3) 1px, transparent 1px)',
                   backgroundSize: '30px 30px'
                 }} />
          </div>
          
          <div className="relative min-h-screen flex items-center justify-center py-8 px-3 sm:py-12 sm:px-4 md:py-16">
            <div className="w-full max-w-4xl mx-auto text-center py-4 sm:py-6 md:py-8">
              
              {/* High-tech border frame */}
              <motion.div 
                className="absolute inset-2 sm:inset-4 md:inset-8 border-2 sm:border-4 md:border-6 border-cyan-500/30 rounded-2xl sm:rounded-3xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 1.5 }}
                style={{
                  boxShadow: '0 0 50px rgba(6,182,212,0.3), inset 0 0 50px rgba(6,182,212,0.1)',
                }}
              />
              
              {/* Corner energy nodes */}
              {[0, 1, 2, 3].map(i => (
                <motion.div 
                  key={i}
                  className="absolute w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10"
                  style={{
                    top: i < 2 ? '0.5rem' : 'auto',
                    bottom: i >= 2 ? '0.5rem' : 'auto',
                    left: i % 2 === 0 ? '0.5rem' : 'auto',
                    right: i % 2 === 1 ? '0.5rem' : 'auto',
                    transform: 'scale(0.8)',
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: [0.5, 1, 0.5], 
                    scale: [0.8, 1, 0.8], 
                    rotate: [0, 90, 180, 270, 360] 
                  }}
                  transition={{ 
                    delay: 0.5 + i * 0.2, 
                    duration: 3,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full blur-lg animate-pulse" />
                  <div className="relative h-full w-full border-2 border-cyan-400/60 rounded-full flex items-center justify-center bg-slate-900/50">
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-cyan-300 rounded-full animate-ping" />
                  </div>
                </motion.div>
              ))}
              
              {/* Industrial Trophy */}
              <motion.div 
                className="mb-2 sm:mb-4 md:mb-6 pt-6 sm:pt-8 md:pt-10 relative h-16 sm:h-20 md:h-24"
                variants={childVariants}
              >
                <IndustrialTrophy />
              </motion.div>
              
              {/* Spinning Atom Symbol */}
              <motion.div
                className="flex justify-center mb-1 sm:mb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <SpinningAtom />
              </motion.div>
              
              {/* Industrial Icons */}
              <motion.div 
                className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-3 mb-3 sm:mb-4 md:mb-6"
                variants={childVariants}
              >
                {industrialIcons.map((Icon, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.15 }}
                  >
                    <IndustrialIconButton Icon={Icon} />
                  </motion.div>
                ))}
              </motion.div>

              {/* Enhanced Title */}
              <motion.div 
                className="text-center mb-2 sm:mb-3 md:mb-4 px-1 sm:px-2"
                variants={childVariants}
              >
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight">
                  <motion.div 
                    className="mb-0.5 sm:mb-1 flex flex-col justify-center items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="inline-block px-1 bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent drop-shadow-lg filter drop-shadow-[0_0_20px_rgba(6,182,212,0.8)]">
                      PETROCHEMICAL PIONEERS
                    </span>
                  </motion.div>
                  <motion.div 
                    className="flex justify-center items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <span className="inline-block px-1 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 bg-clip-text text-transparent drop-shadow-lg filter drop-shadow-[0_0_20px_rgba(59,130,246,0.8)]">
                      OF INNOVATION
                    </span>
                  </motion.div>
                </h1>
              </motion.div>

              {/* Industrial Subtitle - Now Bold */}
              <motion.div
                className="mb-3 sm:mb-4 md:mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl bg-gradient-to-r from-emerald-300 via-green-400 to-cyan-500 bg-clip-text text-transparent font-bold filter drop-shadow-[0_0_15px_rgba(16,185,129,0.6)]">
                  BIOETHANOL ENVIRONMENTALLY FRIENDLY FUEL
                </h2>
                <motion.p 
                  className="text-sm sm:text-base md:text-lg text-slate-300 mt-2 opacity-80"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 0.8 }}
                  transition={{ delay: 1.5 }}
                >
                  Revolutionizing Sustainable Energy Solutions
                </motion.p>
              </motion.div>

              {/* Enhanced Team Name */}
              <motion.div 
                className="text-center mt-2 sm:mt-4 md:mt-6 mb-4 sm:mb-6 md:mb-8"
                variants={childVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.8 }}
              >
                <a
                  href="#"
                  className="inline-flex items-center gap-1 sm:gap-2 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 rounded-full relative group hover:scale-105 transition-transform duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-slate-800/50 via-cyan-600/30 to-blue-800/50 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
                  <div className="absolute inset-0 border border-cyan-400/30 rounded-full group-hover:border-cyan-400/60 transition-all duration-300" />
                  <div className="relative flex items-center gap-1 sm:gap-2 text-base sm:text-lg md:text-xl font-bold">
                    <Flame className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-orange-400 animate-pulse" />
                    <span className="bg-gradient-to-r from-cyan-300 via-blue-400 to-cyan-500 bg-clip-text text-transparent">
                      <LuxuriousTypewriter text="BIOFOUR CHAMPIONS" speed={100} />
                    </span>
                    <Zap className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-400 animate-bounce" />
                  </div>
                </a>
              </motion.div>
              
              {/* Industrial achievement ring */}
              <motion.div 
                className="absolute -bottom-2 sm:-bottom-1 md:bottom-0 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, scale: 0.8, rotate: 0 }}
                animate={{ 
                  opacity: 0.4, 
                  scale: 1,
                  rotate: [0, 360]
                }}
                transition={{ 
                  opacity: { delay: 2, duration: 1.5 },
                  scale: { delay: 2, duration: 1.5 },
                  rotate: { delay: 2.5, duration: 20, repeat: Infinity, ease: "linear" }
                }}
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 border-2 sm:border-3 md:border-4 border-cyan-400/60 rounded-full flex items-center justify-center relative">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 border-1 sm:border-2 md:border-3 border-green-400/50 rounded-full" />
                  <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-xl animate-pulse" />
                </div>
              </motion.div>
            </div>
          </div>

          <style jsx>{`
            @keyframes float {
              0%, 100% { transform: translateY(0px); }
              50% { transform: translateY(-15px); }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VictoryScreen;
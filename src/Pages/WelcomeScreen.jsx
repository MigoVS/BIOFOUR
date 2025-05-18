import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Crown, Medal, Star, Sparkles, Award, Diamond, Gift } from 'lucide-react';

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
      <span className="animate-pulse text-yellow-300">|</span>
    </span>
  );
};

// Latar belakang yang lebih mewah dengan efek gradien yang lebih kaya
const LuxuriousBackground = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-purple-900/30 via-yellow-800/30 to-red-900/30 blur-3xl animate-pulse" />
    <div className="absolute inset-0 bg-gradient-to-tr from-yellow-600/20 via-red-600/10 to-purple-800/20 blur-2xl animate-float" />
    
    {/* Partikel emas berkilauan */}
    <div className="absolute inset-0">
      {[...Array(40)].map((_, i) => (
        <div 
          key={i}
          className="absolute rounded-full opacity-70"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            backgroundColor: i % 3 === 0 ? '#FFD700' : i % 3 === 1 ? '#FFA500' : '#FFFFFF',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 5}s`,
            animation: `float ${5 + Math.random() * 10}s infinite ease-in-out, 
                        twinkle ${3 + Math.random() * 4}s infinite ease-in-out`
          }}
        />
      ))}
    </div>
  </div>
);

// Tombol ikon yang lebih mewah dengan efek hover yang lebih dramatis
const LuxuriousIconButton = ({ Icon }) => (
  <div className="relative group hover:scale-110 transition-transform duration-500">
    <div className="absolute -inset-1 sm:-inset-2 bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600 rounded-full blur opacity-40 group-hover:opacity-90 transition duration-300" />
    <div className="relative p-1 sm:p-2 md:p-3 bg-black/60 backdrop-blur-md rounded-full border border-yellow-500/50 shadow-xl shadow-yellow-500/20">
      <Icon className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-yellow-300" />
    </div>
  </div>
);

// Trofi animasi yang lebih dramatis dengan efek cahaya
const LuxuriousTrophy = () => (
  <div className="relative flex justify-center w-full">
    <div className="absolute w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 bg-yellow-500/10 rounded-full blur-3xl animate-pulse" />
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: [0.9, 1.1, 1],
        opacity: 1,
        y: [0, -15, 0]
      }}
      transition={{ 
        duration: 3,
        repeat: Infinity,
        repeatType: "reverse"
      }}
      className="relative"
    >
      <div className="absolute -inset-2 sm:-inset-3 md:-inset-4 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full blur-xl opacity-30 animate-pulse" />
      <Trophy className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-yellow-300 drop-shadow-2xl" />
    </motion.div>
  </div>
);

// Efek mahkota yang berkilau
const ShiningCrown = () => (
  <motion.div
    initial={{ rotate: -5, y: 0 }}
    animate={{ 
      rotate: [0, -5, 0, 5, 0],
      y: [0, -5, 0]
    }}
    transition={{ 
      duration: 4,
      repeat: Infinity,
      repeatType: "reverse"
    }}
    className="relative"
  >
    <div className="absolute -inset-1 sm:-inset-2 bg-yellow-500/30 rounded-full blur-md animate-pulse" />
    <Crown className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-yellow-300 drop-shadow-lg" />
  </motion.div>
);

const VictoryScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize fade-in animations
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        onLoadingComplete?.();
      }, 1000);
    }, 6000); // Longer display time for visual impact
    
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

  // Array of luxury icons - reduced number for mobile
  const luxuryIcons = [Crown, Award, Medal, Diamond, Star];

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-[#0a0014] overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit="exit"
          variants={containerVariants}
        >
          <LuxuriousBackground />
          
          {/* Container with better responsive padding */}
          <div className="relative min-h-screen flex items-center justify-center py-8 px-3 sm:py-12 sm:px-4 md:py-16">
            <div className="w-full max-w-4xl mx-auto text-center py-4 sm:py-6 md:py-8">
              {/* Royal border frame - adjusted insets for better mobile view */}
              <motion.div 
                className="absolute inset-2 sm:inset-4 md:inset-8 border-2 sm:border-4 md:border-6 border-yellow-600/20 rounded-2xl sm:rounded-3xl"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 1.5 }}
              />
              
              {/* Glowing corner ornaments - smaller and better positioned for mobile */}
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
                  animate={{ opacity: 1, scale: 0.8, rotate: [0, 90, 180, 270, 360] }}
                  transition={{ delay: 0.5 + i * 0.2, duration: 2 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-red-500 rounded-full blur-lg animate-pulse" />
                  <div className="relative h-full w-full border-2 border-yellow-500/50 rounded-full flex items-center justify-center">
                    <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 md:w-2 md:h-2 bg-yellow-300 rounded-full" />
                  </div>
                </motion.div>
              ))}
              
              {/* Trophy animation - reduced height for better fit */}
              <motion.div 
                className="mb-2 sm:mb-4 md:mb-6 pt-6 sm:pt-8 md:pt-10 relative h-16 sm:h-20 md:h-24"
                variants={childVariants}
              >
                <LuxuriousTrophy />
              </motion.div>
              
              {/* Crown at the top of text */}
              <motion.div
                className="flex justify-center mb-1 sm:mb-2"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.0 }}
              >
                <ShiningCrown />
              </motion.div>
              
              {/* Luxury Icons Circle - better spacing and smaller for mobile */}
              <motion.div 
                className="flex flex-wrap justify-center gap-1.5 sm:gap-2 md:gap-3 mb-3 sm:mb-4 md:mb-6"
                variants={childVariants}
              >
                {luxuryIcons.map((Icon, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.15 }}
                  >
                    <LuxuriousIconButton Icon={Icon} />
                  </motion.div>
                ))}
              </motion.div>

              {/* Glamorous Title Text - responsive font sizes */}
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
                    <span className="inline-block px-1 bg-gradient-to-r from-white via-yellow-200 to-orange-300 bg-clip-text text-transparent drop-shadow-lg">
                      GRAND CHAMPIONS
                    </span>
                  </motion.div>
                  <motion.div 
                    className="flex justify-center items-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <span className="inline-block px-1 bg-gradient-to-r from-yellow-400 via-amber-500 to-red-600 bg-clip-text text-transparent drop-shadow-lg">
                      OF EXCELLENCE
                    </span>
                  </motion.div>
                </h1>
              </motion.div>

              {/* Subtitle - better sized for mobile */}
              <motion.div
                className="mb-3 sm:mb-4 md:mb-6"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2 }}
              >
                <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-600 bg-clip-text text-transparent font-semibold">
                  BIOETHANOL ENVIRONMENTALLY FRIENDLY FUEL
                </h2>
              </motion.div>

              {/* Team Name - adjusted padding and sizing */}
              <motion.div 
                className="text-center mt-2 sm:mt-4 md:mt-6 mb-4 sm:mb-6 md:mb-8"
                variants={childVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5 }}
              >
                <a
                  href="#"
                  className="inline-flex items-center gap-1 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 md:px-5 md:py-2.5 rounded-full relative group hover:scale-105 transition-transform duration-500"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-700/30 via-yellow-600/30 to-red-700/30 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
                  <div className="relative flex items-center gap-1 sm:gap-2 text-base sm:text-lg md:text-xl font-bold">
                    <Trophy className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-300" />
                    <span className="bg-gradient-to-r from-yellow-300 via-amber-400 to-yellow-500 bg-clip-text text-transparent">
                      <LuxuriousTypewriter text="BIOFOUR CHAMPIONS" speed={120} />
                    </span>
                    <Trophy className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 text-yellow-300" />
                  </div>
                </a>
              </motion.div>
              
              {/* Victory laurel frame - better positioned for mobile */}
              <motion.div 
                className="absolute -bottom-2 sm:-bottom-1 md:bottom-0 left-1/2 transform -translate-x-1/2"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 0.3, scale: 1 }}
                transition={{ delay: 2, duration: 1.5 }}
              >
                <div className="w-24 h-24 sm:w-28 sm:h-28 md:w-36 md:h-36 border-2 sm:border-3 md:border-4 border-yellow-400 rounded-full flex items-center justify-center">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 md:w-28 md:h-28 border-1 sm:border-2 md:border-3 border-yellow-600 rounded-full" />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default VictoryScreen;
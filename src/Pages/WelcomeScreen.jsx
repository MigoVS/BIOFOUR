import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Crown, Medal, Star, Sparkles } from 'lucide-react';

const TypewriterEffect = ({ text }) => {
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
    }, 260);
    
    return () => clearInterval(timer);
  }, [text]);

  return (
    <span className="inline-block">
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

const BackgroundEffect = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 to-red-600/20 blur-3xl animate-pulse" />
    <div className="absolute inset-0 bg-gradient-to-tr from-yellow-600/10 via-transparent to-red-600/10 blur-2xl animate-float" />
    
    {/* Champion particles/confetti effect */}
    <div className="absolute inset-0">
      {[...Array(20)].map((_, i) => (
        <div 
          key={i}
          className="absolute w-2 h-2 md:w-3 md:h-3 bg-yellow-500 rounded-full opacity-70"
          style={{
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

const IconButton = ({ Icon }) => (
  <div className="relative group hover:scale-110 transition-transform duration-300">
    <div className="absolute -inset-2 bg-gradient-to-r from-yellow-600 to-red-600 rounded-full blur opacity-30 group-hover:opacity-75 transition duration-300" />
    <div className="relative p-2 sm:p-3 bg-black/50 backdrop-blur-sm rounded-full border border-yellow-500/30">
      <Icon className="w-5 h-5 sm:w-6 sm:h-6 md:w-8 md:h-8 text-yellow-400" />
    </div>
  </div>
);

// Animated trophy component - centered and positioned properly
const AnimatedTrophy = () => (
  <div className="relative flex justify-center w-full">
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ 
        scale: [0.8, 1.1, 1],
        opacity: 1,
        y: [0, -10, 0]
      }}
      transition={{ 
        duration: 2,
        repeat: Infinity,
        repeatType: "reverse"
      }}
      className="absolute top-0"
    >
      <Trophy className="w-16 h-16 md:w-24 md:h-24 text-yellow-400 drop-shadow-lg" />
    </motion.div>
  </div>
);

const WelcomeScreen = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize fade-in animations
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        onLoadingComplete?.();
      }, 1000);
    }, 4000);
    
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

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-[#0a0014]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit="exit"
          variants={containerVariants}
        >
          <BackgroundEffect />
          
          <div className="relative min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-4xl mx-auto text-center">
              {/* Trophy at the top - centered */}
              <motion.div 
                className="mb-8 md:mb-12 pt-16 md:pt-20 relative h-24"
                variants={childVariants}
              >
                <AnimatedTrophy />
              </motion.div>
              
              {/* Champion Icons */}
              <motion.div 
                className="flex justify-center gap-3 sm:gap-4 md:gap-8 mb-6 sm:mb-8 md:mb-12"
                variants={childVariants}
              >
                {[Crown, Medal, Star, Sparkles].map((Icon, index) => (
                  <motion.div 
                    key={index} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <IconButton Icon={Icon} />
                  </motion.div>
                ))}
              </motion.div>

              {/* Champion Text - made straight and responsive */}
              <motion.div 
                className="text-center mb-6 sm:mb-8 md:mb-12 px-2"
                variants={childVariants}
              >
                <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold">
                  <motion.div 
                    className="mb-2 sm:mb-4 flex flex-col sm:flex-row justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <span className="inline-block px-2 bg-gradient-to-r from-white via-yellow-100 to-orange-200 bg-clip-text text-transparent">
                      Champions
                    </span>{' '}
                    <span className="inline-block px-2 bg-gradient-to-r from-white via-yellow-100 to-orange-200 bg-clip-text text-transparent">
                      Of
                    </span>{' '}
                    <span className="inline-block px-2 bg-gradient-to-r from-white via-yellow-100 to-orange-200 bg-clip-text text-transparent">
                      Excellence
                    </span>
                  </motion.div>
                  <motion.div 
                    className="flex flex-col sm:flex-row justify-center"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <span className="inline-block px-2 bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text text-transparent">
                      Bioethanol
                    </span>{' '}
                    <span className="inline-block px-2 bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text text-transparent">
                      Champions
                    </span>
                  </motion.div>
                </h1>
              </motion.div>

              {/* Team Name */}
              <motion.div 
                className="text-center mt-8"
                variants={childVariants}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
              >
                <a
                  href="#"
                  className="inline-flex items-center gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full relative group hover:scale-105 transition-transform duration-300"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-yellow-600/20 to-red-600/20 rounded-full blur-md group-hover:blur-lg transition-all duration-300" />
                  <div className="relative flex items-center gap-2 text-lg sm:text-xl md:text-2xl">
                    <Trophy className="w-4 h-4 sm:w-5 sm:h-5 text-yellow-500" />
                    <span className="bg-gradient-to-r from-yellow-500 to-red-500 bg-clip-text text-transparent">
                      <TypewriterEffect text="BIOFOUR TEAM" />
                    </span>
                  </div>
                </a>
              </motion.div>
              
              {/* Victory laurel frame */}
              <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 opacity-20">
                <div className="w-32 h-32 md:w-48 md:h-48 border-8 border-yellow-500 rounded-full"></div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default WelcomeScreen;
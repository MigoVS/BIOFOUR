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
  Factory,
  Fuel,
  Activity,
  Atom,
  Battery,
  Beaker,
  CircuitBoard,
  Cpu,
  Gauge,
  GitBranch,
  Layers,
  Network,
  Power,
  Radio,
  Shield,
  Workflow,
  Leaf
} from "lucide-react";

// Enhanced Molecular structure animation component
const MolecularStructure = ({ className = "" }) => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <div className={`relative ${className}`}>
      <motion.div
        className="absolute inset-0"
        animate={!prefersReducedMotion ? {
          rotate: [0, 360],
        } : {}}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Central atom */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-full shadow-lg shadow-cyan-500/50" />
        
        {/* Orbital atoms */}
        {[0, 60, 120, 180, 240, 300].map((angle, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2"
            style={{
              transform: `translate(-50%, -50%) rotate(${angle}deg) translateX(40px)`,
            }}
            animate={!prefersReducedMotion ? {
              scale: [1, 1.2, 1],
            } : {}}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          >
            <div className="w-4 h-4 bg-gradient-to-br from-emerald-400 to-teal-600 rounded-full shadow-md" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40px] h-[1px] bg-gradient-to-r from-transparent to-cyan-400/50 origin-right -rotate-90" />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

// Enhanced Refinery tower component with more details
const RefineryTower = ({ height = 100, delay = 0, isMobile = false }) => {
  const prefersReducedMotion = useReducedMotion();
  const towerWidth = isMobile ? "40px" : "60px";
  const towerHeight = isMobile ? `${height * 0.7}px` : `${height}px`;
  
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 1 }}
    >
      {/* Tower structure */}
      <div 
        className="relative bg-gradient-to-b from-gray-700 via-gray-800 to-gray-900 rounded-t-lg shadow-2xl"
        style={{ width: towerWidth, height: towerHeight }}
      >
        {/* Metallic shine effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent rounded-t-lg" />
        
        {/* Tower segments */}
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            className="absolute left-0 right-0 h-[2px] bg-gray-600"
            style={{ top: `${25 + i * 30}%` }}
          />
        ))}
        
        {/* Flare stack */}
        <motion.div
          className="absolute -top-8 left-1/2 -translate-x-1/2"
          animate={!prefersReducedMotion ? {
            scale: [1, 1.2, 1],
          } : {}}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
        >
          <Flame className={`${isMobile ? "w-6 h-6" : "w-8 h-8"} text-orange-500 drop-shadow-[0_0_10px_rgba(251,146,60,0.8)]`} />
        </motion.div>
        
        {/* Status lights */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute right-2 rounded-full"
            style={{
              top: `${20 + i * 25}%`,
              width: isMobile ? "4px" : "8px",
              height: isMobile ? "4px" : "8px",
              backgroundColor: i === 0 ? "#10b981" : i === 1 ? "#f59e0b" : "#ef4444",
            }}
            animate={!prefersReducedMotion ? {
              opacity: [0.3, 1, 0.3],
            } : {}}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
        
        {/* Additional details for mobile */}
        {isMobile && (
          <div className="absolute inset-0 bg-gradient-to-t from-blue-900/30 to-transparent rounded-t-lg" />
        )}
      </div>
      
      {/* Base platform */}
      <div 
        className="absolute -bottom-2 left-1/2 -translate-x-1/2 bg-gradient-to-b from-gray-700 to-gray-900 rounded-sm shadow-lg"
        style={{ 
          width: isMobile ? "60px" : "80px", 
          height: isMobile ? "3px" : "4px" 
        }}
      />
    </motion.div>
  );
};

// Enhanced Pipeline system component
const PipelineSystem = ({ isMobile = false }) => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 800 600">
      <defs>
        <linearGradient id="pipeGradient" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#1e40af" />
          <stop offset="50%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#1e40af" />
        </linearGradient>
        
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Main pipeline paths - simplified for mobile */}
      <motion.path
        d={isMobile ? 
          "M 100 300 Q 200 250 300 300 T 500 300 Q 600 350 700 300" : 
          "M 100 300 Q 200 250 300 300 T 500 300 Q 600 350 700 300"
        }
        fill="none"
        stroke="url(#pipeGradient)"
        strokeWidth={isMobile ? "4" : "8"}
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      />
      
      <motion.path
        d={isMobile ? 
          "M 150 400 L 350 400 Q 400 400 400 350 L 400 250" : 
          "M 150 400 L 350 400 Q 400 400 400 350 L 400 250"
        }
        fill="none"
        stroke="url(#pipeGradient)"
        strokeWidth={isMobile ? "3" : "6"}
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.5, delay: 0.5 }}
      />
      
      {/* Flow indicators - reduced for mobile */}
      {!prefersReducedMotion && [...Array(isMobile ? 2 : 4)].map((_, i) => (
        <motion.circle
          key={i}
          r={isMobile ? "2" : "4"}
          fill="#60a5fa"
          filter="url(#glow)"
          initial={{ offsetDistance: "0%" }}
          animate={{
            offsetDistance: "100%",
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            delay: i * 1,
            ease: "linear",
          }}
          style={{
            offsetPath: "path('M 100 300 Q 200 250 300 300 T 500 300 Q 600 350 700 300')",
          }}
        />
      ))}
    </svg>
  );
};

// Energy flow visualization
const EnergyFlow = ({ isMobile = false }) => {
  const prefersReducedMotion = useReducedMotion();
  const particleCount = isMobile ? 3 : 6;
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.6, 0],
            scale: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 3,
          }}
        >
          <div className="relative">
            <div className={`${isMobile ? "w-1 h-1" : "w-2 h-2"} bg-cyan-400 rounded-full blur-sm`} />
            <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Industrial background
const PetrochemicalBackground = ({ isMobile = false }) => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950" />
      
      {/* Industrial grid overlay - adjusted for mobile */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(cyan 1px, transparent 1px),
            linear-gradient(90deg, cyan 1px, transparent 1px)
          `,
          backgroundSize: isMobile ? "30px 30px" : "50px 50px",
        }}
      />
      
      {/* Tech circuit pattern - simplified for mobile */}
      <svg className="absolute inset-0 w-full h-full opacity-5">
        <pattern id="circuit" x="0" y="0" width={isMobile ? "60" : "100"} height={isMobile ? "60" : "100"} patternUnits="userSpaceOnUse">
          <path d={`M ${isMobile ? "6" : "10"} ${isMobile ? "6" : "10"} L ${isMobile ? "18" : "30"} ${isMobile ? "6" : "10"} L ${isMobile ? "18" : "30"} ${isMobile ? "18" : "30"} M ${isMobile ? "30" : "50"} ${isMobile ? "6" : "10"} L ${isMobile ? "42" : "70"} ${isMobile ? "6" : "10"} L ${isMobile ? "42" : "70"} ${isMobile ? "18" : "30"} L ${isMobile ? "54" : "90"} ${isMobile ? "18" : "30"}`} stroke="cyan" fill="none" strokeWidth="1"/>
          <circle cx={isMobile ? "6" : "10"} cy={isMobile ? "6" : "10"} r={isMobile ? "2" : "3"} fill="cyan" />
          <circle cx={isMobile ? "18" : "30"} cy={isMobile ? "18" : "30"} r={isMobile ? "2" : "3"} fill="cyan" />
          <circle cx={isMobile ? "42" : "70"} cy={isMobile ? "18" : "30"} r={isMobile ? "2" : "3"} fill="cyan" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>
      
      {/* Pipeline system */}
      <PipelineSystem isMobile={isMobile} />
      
      {/* Energy flow particles */}
      <EnergyFlow isMobile={isMobile} />
      
      {/* Holographic overlay */}
      <motion.div
        className="absolute inset-0"
        animate={!prefersReducedMotion ? {
          background: [
            "radial-gradient(circle at 20% 50%, rgba(6,182,212,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 80% 50%, rgba(59,130,246,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 50% 20%, rgba(168,85,247,0.1) 0%, transparent 50%)",
            "radial-gradient(circle at 20% 50%, rgba(6,182,212,0.1) 0%, transparent 50%)",
          ],
        } : {}}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
    </div>
  );
};

// Premium industrial frame
const IndustrialFrame = ({ isMobile = false }) => {
  const prefersReducedMotion = useReducedMotion();
  const frameInset = isMobile ? "inset-2" : "inset-4 sm:inset-8 lg:inset-12";
  
  return (
    <>
      {/* Main frame */}
      <motion.div
        className={`absolute ${frameInset} rounded-2xl`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{
          background: "linear-gradient(to bottom, rgba(6,182,212,0.3), transparent, rgba(59,130,246,0.3))",
          boxShadow: `
            inset 0 0 ${isMobile ? "20px" : "50px"} rgba(6,182,212,0.2),
            0 0 ${isMobile ? "40px" : "100px"} rgba(59,130,246,0.1)
          `,
        }}
      >
        {/* Tech corners */}
        {[
          { top: 0, left: 0, rotate: 0 },
          { top: 0, right: 0, rotate: 90 },
          { bottom: 0, right: 0, rotate: 180 },
          { bottom: 0, left: 0, rotate: 270 },
        ].map((pos, i) => (
          <motion.div
            key={i}
            className="absolute"
            style={{
              ...pos,
              width: isMobile ? "40px" : "80px",
              height: isMobile ? "40px" : "80px",
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
          >
            <svg width={isMobile ? "40" : "80"} height={isMobile ? "40" : "80"} viewBox="0 0 80 80">
              <path
                d="M 0 20 L 0 0 L 20 0"
                stroke="url(#techGradient)"
                strokeWidth="3"
                fill="none"
              />
              <path
                d="M 0 10 L 10 10 L 10 0"
                stroke="rgba(6,182,212,0.5)"
                strokeWidth="1"
                fill="none"
              />
              <defs>
                <linearGradient id="techGradient">
                  <stop offset="0%" stopColor="#0891b2" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
            </svg>
            
            {/* Corner indicator */}
            <motion.div
              className="absolute top-0 left-0 rounded-full bg-cyan-400"
              style={{
                width: isMobile ? "6px" : "12px",
                height: isMobile ? "6px" : "12px",
              }}
              animate={!prefersReducedMotion ? {
                opacity: [0.5, 1, 0.5],
                scale: [0.8, 1.2, 0.8],
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          </motion.div>
        ))}
      </motion.div>
      
      {/* Tech border lines */}
      <motion.div
        className={`absolute ${frameInset}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {/* Top line */}
        <motion.div
          className={`absolute top-0 ${isMobile ? "left-10 right-10" : "left-20 right-20"} h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent`}
          animate={!prefersReducedMotion ? {
            opacity: [0.3, 0.8, 0.3],
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />
        {/* Bottom line */}
        <motion.div
          className={`absolute bottom-0 ${isMobile ? "left-10 right-10" : "left-20 right-20"} h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent`}
          animate={!prefersReducedMotion ? {
            opacity: [0.3, 0.8, 0.3],
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: 1.5,
          }}
        />
      </motion.div>
    </>
  );
};

// Industrial icon grid - optimized for mobile
const IndustrialIconGrid = ({ isMobile = false }) => {
  const icons = [
    Factory, Fuel, Atom, Battery, Beaker, CircuitBoard, 
    Power, Network, Gauge, Shield
  ];
  
  // Show fewer icons on mobile
  const displayIcons = isMobile ? icons.slice(0, 6) : icons;
  
  return (
    <motion.div className={`flex flex-wrap justify-center gap-${isMobile ? "2" : "3 sm:gap-4"} mb-${isMobile ? "4" : "8"}`}>
      {displayIcons.map((Icon, index) => (
        <motion.div
          key={index}
          className="relative group cursor-pointer"
          initial={{ opacity: 0, scale: 0, rotate: -180 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{
            delay: 0.8 + index * 0.1,
            duration: 0.8,
            type: "spring",
            stiffness: 200,
          }}
          whileHover={{ scale: 1.15, rotate: 5 }}
        >
          {/* Hexagonal container */}
          <div className="relative" style={{ width: isMobile ? "48px" : "56px", height: isMobile ? "48px" : "56px" }}>
            <svg className="absolute inset-0" viewBox="0 0 60 60">
              <defs>
                <linearGradient id={`hexGrad${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#0891b2" />
                  <stop offset="100%" stopColor="#3b82f6" />
                </linearGradient>
              </defs>
              <path
                d="M 30 5 L 50 17.5 L 50 42.5 L 30 55 L 10 42.5 L 10 17.5 Z"
                fill={`url(#hexGrad${index})`}
                fillOpacity="0.1"
                stroke={`url(#hexGrad${index})`}
                strokeWidth="2"
              />
            </svg>
            
            {/* Icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <Icon className={`${isMobile ? "w-5 h-5" : "w-6 h-6 sm:w-7 sm:h-7"} text-cyan-400 group-hover:text-white transition-colors`} />
            </div>
            
            {/* Glow effect on hover */}
            <motion.div
              className="absolute inset-0 rounded-full bg-cyan-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
              animate={{
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

// Enhanced petrochemical victory trophy with more towers
const PetrochemicalTrophy = ({ isMobile = false }) => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <div className={`relative flex justify-center items-center ${isMobile ? "h-24" : "h-32 sm:h-40 lg:h-48"}`}>
      {/* Refinery towers arrangement - more towers and better layout */}
      <div className="absolute inset-0 flex justify-center items-end gap-2 sm:gap-4">
        <RefineryTower height={isMobile ? 60 : 80} delay={0.5} isMobile={isMobile} />
        <RefineryTower height={isMobile ? 90 : 120} delay={0.7} isMobile={isMobile} />
        <RefineryTower height={isMobile ? 70 : 100} delay={0.9} isMobile={isMobile} />
        <RefineryTower height={isMobile ? 50 : 70} delay={1.1} isMobile={isMobile} />
        <RefineryTower height={isMobile ? 80 : 110} delay={1.3} isMobile={isMobile} />
      </div>
      
      {/* Central molecular structure */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 1, type: "spring" }}
      >
        <MolecularStructure className={`${isMobile ? "w-20 h-20" : "w-32 h-32"}`} />
        
        {/* Trophy overlay */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={!prefersReducedMotion ? {
            scale: [1, 1.1, 1],
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        >
          <Trophy className={`${isMobile ? "w-8 h-8" : "w-12 h-12"} text-yellow-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.8)]`} />
        </motion.div>
      </motion.div>
      
      {/* Energy rings - adjusted for mobile */}
      {!prefersReducedMotion && [...Array(isMobile ? 2 : 3)].map((i) => (
        <motion.div
          key={i}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [1, 2 + i * 0.5, 1],
            opacity: [0, 0.3, 0],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            delay: i * 1,
          }}
        >
          <div 
            className="rounded-full border-2 border-cyan-400"
            style={{
              width: `${isMobile ? 60 + i * 20 : 100 + i * 30}px`,
              height: `${isMobile ? 60 + i * 20 : 100 + i * 30}px`,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

// HUD-style display component - optimized for mobile
const HUDDisplay = ({ label, value, icon: Icon, delay = 0, isMobile = false }) => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.8 }}
    >
      <div className={`relative bg-gradient-to-r from-cyan-900/20 to-blue-900/20 backdrop-blur-md border border-cyan-400/30 rounded-lg ${isMobile ? "p-2" : "p-3 sm:p-4"}`}>
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />
        
        <div className="flex items-center gap-2 sm:gap-3">
          <div className="relative">
            <motion.div
              className="absolute inset-0 bg-cyan-400/20 rounded-full blur-xl"
              animate={!prefersReducedMotion ? {
                scale: [1, 1.5, 1],
                opacity: [0.5, 0.8, 0.5],
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
            <Icon className={`relative ${isMobile ? "w-4 h-4" : "w-6 h-6"} text-cyan-400`} />
          </div>
          
          <div>
            <div className={`text-xs ${isMobile ? "text-[10px]" : ""} text-cyan-400/70 uppercase tracking-wider`}>{label}</div>
            <div className={`${isMobile ? "text-sm" : "text-lg sm:text-xl"} font-bold text-white`}>{value}</div>
          </div>
        </div>
        
        {/* Scanning line effect */}
        <motion.div
          className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          initial={{ top: 0 }}
          animate={!prefersReducedMotion ? {
            top: ["0%", "100%", "0%"],
          } : {}}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>
    </motion.div>
  );
};

const IndonesianPetrochemicalVictory = ({ onLoadingComplete }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        onLoadingComplete?.();
      }, 800);
    }, prefersReducedMotion ? 8000 : 10000);

    return () => clearTimeout(timer);
  }, [onLoadingComplete, prefersReducedMotion]);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-slate-950 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <PetrochemicalBackground isMobile={isMobile} />
          
          <div className={`relative min-h-screen flex items-center justify-center ${isMobile ? "py-2 px-2" : "py-4 px-3 sm:py-6 sm:px-4 lg:py-8 lg:px-6"}`}>
            <div className="w-full max-w-6xl mx-auto">
              
              <IndustrialFrame isMobile={isMobile} />
              
              {/* Main trophy section */}
              <div className={`relative z-10 text-center ${isMobile ? "pt-4" : "pt-8 sm:pt-12"}`}>
                <PetrochemicalTrophy isMobile={isMobile} />
                
                {/* Company badges - stacked on mobile */}
                <motion.div
                  className={`flex ${isMobile ? "flex-col items-center gap-2" : "justify-center gap-4"} mt-4 mb-4`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  <HUDDisplay
                    label="Industry Leader"
                    value="BIOFOURTEAM"
                    icon={Factory}
                    delay={1.6}
                    isMobile={isMobile}
                  />
                  <HUDDisplay
                    label="Excellence"
                    value="GARUDA BIOETHANOL"
                    icon={Fuel}
                    delay={1.8}
                    isMobile={isMobile}
                  />
                </motion.div>
                
                {/* Main title with tech styling - adjusted for mobile */}
                <motion.div
                  className="mb-4 sm:mb-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2, duration: 1 }}
                >
                  <h1 className={`${isMobile ? "text-xl" : "text-3xl sm:text-5xl lg:text-7xl"} font-bold mb-2 sm:mb-4`}>
                    <motion.span 
                      className="block bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 bg-clip-text text-transparent"
                      animate={!prefersReducedMotion ? {
                        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                      } : {}}
                      transition={{
                        duration: 5,
                        repeat: Infinity,
                      }}
                    >
                      {isMobile ? "PETROCHEMICAL" : "PETROCHEMICAL EXCELLENCE"}
                    </motion.span>
                    <motion.span 
                      className={`block ${isMobile ? "text-lg" : "text-2xl sm:text-4xl lg:text-5xl"} mt-2 bg-gradient-to-r from-red-400 via-white to-red-400 bg-clip-text text-transparent`}
                      animate={!prefersReducedMotion ? {
                        opacity: [0.8, 1, 0.8],
                      } : {}}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      {isMobile ? "Eco-Friendly Fuel" : "Environmentally Friendly Fuel"}
                    </motion.span>
                  </h1>
                  
                  {/* HUT RI Badge - adjusted for mobile */}
                  <motion.div
                    className={`inline-flex items-center ${isMobile ? "gap-1 px-3 py-2" : "gap-3 px-6 py-3"} rounded-full`}
                    style={{
                      background: "linear-gradient(135deg, rgba(239,68,68,0.2), rgba(255,255,255,0.1), rgba(239,68,68,0.2))",
                      border: "2px solid rgba(239,68,68,0.5)",
                      boxShadow: "0 0 30px rgba(239,68,68,0.3)",
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Flag className={`${isMobile ? "w-4 h-4" : "w-6 h-6"} text-red-500`} />
                    <span className={`${isMobile ? "text-sm" : "text-xl"} font-bold text-white`}>BIOFOUR TEAM</span>
                    {!isMobile && (
                      <span className="text-lg text-red-300">Politeknik Industri Petrokimia Banten</span>
                    )}
                  </motion.div>
                </motion.div>
                
                {/* Industrial icon grid */}
                <IndustrialIconGrid isMobile={isMobile} />
                
                {/* Stats display - adjusted for mobile */}
                <motion.div
                  className={`grid ${isMobile ? "grid-cols-2 gap-2" : "grid-cols-2 sm:grid-cols-4 gap-4"} max-w-4xl mx-auto mt-4 sm:mt-8`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 2.5, stagger: 0.1 }}
                >
                  {[
                    { label: "Production", value: "100%", icon: Gauge },
                    { label: "Efficiency", value: "98.5%", icon: Activity },
                    { label: "Innovation", value: "A+", icon: Atom },
                    { label: "Sustainability", value: "★★★★★", icon: Leaf },
                  ].map((stat, i) => (
                    <motion.div
                      key={i}
                      className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-sm border border-cyan-400/20 rounded-lg p-2 sm:p-3"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 2.5 + i * 0.1, type: "spring" }}
                    >
                      <stat.icon className={`${isMobile ? "w-5 h-5" : "w-8 h-8"} mx-auto mb-1 sm:mb-2 text-cyan-400`} />
                      <div className={`text-xs ${isMobile ? "text-[10px]" : ""} text-cyan-300/70 uppercase`}>{stat.label}</div>
                      <div className={`${isMobile ? "text-sm" : "text-xl"} font-bold text-white mt-1`}>{stat.value}</div>
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Victory message - adjusted for mobile */}
                <motion.div
                  className="mt-6 sm:mt-12 space-y-2 sm:space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3 }}
                >
                  <motion.p
                    className={`${isMobile ? "text-xs" : "text-base sm:text-lg"} text-cyan-100/80 max-w-3xl mx-auto leading-relaxed`}
                    animate={!prefersReducedMotion ? {
                      opacity: [0.8, 1, 0.8],
                    } : {}}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  >
                    {isMobile ? "Pioneering sustainable petrochemical innovation" : "Pioneering the future of sustainable petrochemical innovation"}
                    <br />
                    <span className="text-cyan-400 font-semibold">
                      {isMobile ? "Powering Indonesia's Future" : "Powering Indonesia's Industrial Renaissance"}
                    </span>
                  </motion.p>
                  
                  {/* Tagline */}
                  <motion.div
                    className="flex items-center justify-center gap-2 text-yellow-400"
                    animate={!prefersReducedMotion ? {
                      scale: [1, 1.05, 1],
                    } : {}}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <Sparkles className={`${isMobile ? "w-3 h-3" : "w-5 h-5"}`} />
                    <span className={`${isMobile ? "text-xs" : "text-lg"} font-bold tracking-wider`}>
                      {isMobile ? "EXCELLENCE" : "EXCELLENCE IN EVERY MOLECULE"}
                    </span>
                    <Sparkles className={`${isMobile ? "w-3 h-3" : "w-5 h-5"}`} />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* Loading progress bar - adjusted for mobile */}
          <motion.div
            className={`absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 ${isMobile ? "w-48" : "w-64 sm:w-96"}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="relative h-2 bg-slate-800/50 rounded-full overflow-hidden backdrop-blur-sm border border-cyan-400/20">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-cyan-500 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ 
                  duration: prefersReducedMotion ? 8 : 10, 
                  ease: "easeInOut" 
                }}
              />
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={!prefersReducedMotion ? {
                  x: ["-100%", "200%"],
                } : {}}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            </div>
            <motion.p
              className={`text-center mt-2 sm:mt-3 text-cyan-400 ${isMobile ? "text-[10px]" : "text-sm"} tracking-wider`}
              animate={!prefersReducedMotion ? {
                opacity: [0.5, 1, 0.5],
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            >
              INITIALIZING VICTORY SEQUENCE...
            </motion.p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IndonesianPetrochemicalVictory;
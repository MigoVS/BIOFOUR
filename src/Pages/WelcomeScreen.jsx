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

// Molecular structure animation component
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

// Refinery tower component
const RefineryTower = ({ height = 100, delay = 0 }) => {
  const prefersReducedMotion = useReducedMotion();
  
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
        style={{ width: "60px", height: `${height}px` }}
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
          <Flame className="w-8 h-8 text-orange-500 drop-shadow-[0_0_10px_rgba(251,146,60,0.8)]" />
        </motion.div>
        
        {/* Status lights */}
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="absolute right-2 w-2 h-2 rounded-full"
            style={{
              top: `${20 + i * 25}%`,
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
      </div>
      
      {/* Base platform */}
      <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-gradient-to-b from-gray-700 to-gray-900 rounded-sm shadow-lg" />
    </motion.div>
  );
};

// Pipeline system component
const PipelineSystem = () => {
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
      
      {/* Main pipeline paths */}
      <motion.path
        d="M 100 300 Q 200 250 300 300 T 500 300 Q 600 350 700 300"
        fill="none"
        stroke="url(#pipeGradient)"
        strokeWidth="8"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 3, ease: "easeInOut" }}
      />
      
      <motion.path
        d="M 150 400 L 350 400 Q 400 400 400 350 L 400 250"
        fill="none"
        stroke="url(#pipeGradient)"
        strokeWidth="6"
        filter="url(#glow)"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2.5, delay: 0.5 }}
      />
      
      {/* Flow indicators */}
      {!prefersReducedMotion && [0, 1, 2, 3].map((i) => (
        <motion.circle
          key={i}
          r="4"
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
const EnergyFlow = () => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(6)].map((_, i) => (
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
            <div className="w-2 h-2 bg-cyan-400 rounded-full blur-sm" />
            <div className="absolute inset-0 bg-cyan-400 rounded-full animate-ping" />
          </div>
        </motion.div>
      ))}
    </div>
  );
};

// Industrial background
const PetrochemicalBackground = () => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950" />
      
      {/* Industrial grid overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(cyan 1px, transparent 1px),
            linear-gradient(90deg, cyan 1px, transparent 1px)
          `,
          backgroundSize: "50px 50px",
        }}
      />
      
      {/* Tech circuit pattern */}
      <svg className="absolute inset-0 w-full h-full opacity-5">
        <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
          <path d="M 10 10 L 30 10 L 30 30 M 50 10 L 70 10 L 70 30 L 90 30" stroke="cyan" fill="none" strokeWidth="1"/>
          <circle cx="10" cy="10" r="3" fill="cyan" />
          <circle cx="30" cy="30" r="3" fill="cyan" />
          <circle cx="70" cy="30" r="3" fill="cyan" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#circuit)" />
      </svg>
      
      {/* Pipeline system */}
      <PipelineSystem />
      
      {/* Energy flow particles */}
      <EnergyFlow />
      
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
const IndustrialFrame = () => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <>
      {/* Main frame */}
      <motion.div
        className="absolute inset-4 sm:inset-8 lg:inset-12 rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        style={{
          background: "linear-gradient(to bottom, rgba(6,182,212,0.3), transparent, rgba(59,130,246,0.3))",
          boxShadow: `
            inset 0 0 50px rgba(6,182,212,0.2),
            0 0 100px rgba(59,130,246,0.1)
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
            className="absolute w-20 h-20"
            style={pos}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
          >
            <svg width="80" height="80" viewBox="0 0 80 80">
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
              className="absolute top-0 left-0 w-3 h-3 bg-cyan-400 rounded-full"
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
        className="absolute inset-4 sm:inset-8 lg:inset-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        {/* Top line */}
        <motion.div
          className="absolute top-0 left-20 right-20 h-[1px] bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
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
          className="absolute bottom-0 left-20 right-20 h-[1px] bg-gradient-to-r from-transparent via-blue-400 to-transparent"
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

// Industrial icon grid
const IndustrialIconGrid = () => {
  const icons = [
    Factory, Fuel, Atom, Battery, Beaker, CircuitBoard, 
    Power, Network, Gauge, Shield
  ];
  
  return (
    <motion.div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8">
      {icons.map((Icon, index) => (
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
          <div className="relative w-14 h-14 sm:w-16 sm:h-16">
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
              <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-cyan-400 group-hover:text-white transition-colors" />
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

// Main petrochemical victory trophy
const PetrochemicalTrophy = () => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <div className="relative flex justify-center items-center h-32 sm:h-40 lg:h-48">
      {/* Refinery towers arrangement */}
      <div className="absolute inset-0 flex justify-center items-end gap-4">
        <RefineryTower height={80} delay={0.5} />
        <RefineryTower height={120} delay={0.7} />
        <RefineryTower height={100} delay={0.9} />
      </div>
      
      {/* Central molecular structure */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.2, duration: 1, type: "spring" }}
      >
        <MolecularStructure className="w-32 h-32" />
        
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
          <Trophy className="w-12 h-12 text-yellow-400 drop-shadow-[0_0_20px_rgba(251,191,36,0.8)]" />
        </motion.div>
      </motion.div>
      
      {/* Energy rings */}
      {!prefersReducedMotion && [0, 1, 2].map((i) => (
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
              width: `${100 + i * 30}px`,
              height: `${100 + i * 30}px`,
            }}
          />
        </motion.div>
      ))}
    </div>
  );
};

// HUD-style display component
const HUDDisplay = ({ label, value, icon: Icon, delay = 0 }) => {
  const prefersReducedMotion = useReducedMotion();
  
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay, duration: 0.8 }}
    >
      <div className="relative bg-gradient-to-r from-cyan-900/20 to-blue-900/20 backdrop-blur-md border border-cyan-400/30 rounded-lg p-3 sm:p-4">
        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400" />
        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400" />
        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400" />
        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400" />
        
        <div className="flex items-center gap-3">
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
            <Icon className="relative w-6 h-6 text-cyan-400" />
          </div>
          
          <div>
            <div className="text-xs text-cyan-400/70 uppercase tracking-wider">{label}</div>
            <div className="text-lg sm:text-xl font-bold text-white">{value}</div>
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

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          className="fixed inset-0 bg-slate-950 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <PetrochemicalBackground />
          
          <div className="relative min-h-screen flex items-center justify-center py-4 px-3 sm:py-6 sm:px-4 lg:py-8 lg:px-6">
            <div className="w-full max-w-6xl mx-auto">
              
              <IndustrialFrame />
              
              {/* Main trophy section */}
              <div className="relative z-10 text-center pt-8 sm:pt-12">
                <PetrochemicalTrophy />
                
                {/* Company badges */}
                <motion.div
                  className="flex justify-center gap-4 mt-8 mb-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.5 }}
                >
                  <HUDDisplay
                    label="Industry Leader"
                    value="BIOFOURTEAM"
                    icon={Factory}
                    delay={1.6}
                  />
                  <HUDDisplay
                    label="Excellence"
                    value="GARUDA BIOETHANOL"
                    icon={Fuel}
                    delay={1.8}
                  />
                </motion.div>
                
                {/* Main title with tech styling */}
                <motion.div
                  className="mb-8"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 2, duration: 1 }}
                >
                  <h1 className="text-3xl sm:text-5xl lg:text-7xl font-bold mb-4">
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
                      PETROCHEMICAL EXCELLENCE
                    </motion.span>
                    <motion.span 
                      className="block text-2xl sm:text-4xl lg:text-5xl mt-2 bg-gradient-to-r from-red-400 via-white to-red-400 bg-clip-text text-transparent"
                      animate={!prefersReducedMotion ? {
                        opacity: [0.8, 1, 0.8],
                      } : {}}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    >
                      Environmentally Friendly Fuel
                    </motion.span>
                  </h1>
                  
                  {/* HUT RI Badge */}
                  <motion.div
                    className="inline-flex items-center gap-3 mt-6 px-6 py-3 rounded-full"
                    style={{
                      background: "linear-gradient(135deg, rgba(239,68,68,0.2), rgba(255,255,255,0.1), rgba(239,68,68,0.2))",
                      border: "2px solid rgba(239,68,68,0.5)",
                      boxShadow: "0 0 30px rgba(239,68,68,0.3)",
                    }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <Flag className="w-6 h-6 text-red-500" />
                    <span className="text-xl font-bold text-white">BIOFOUR TEAM</span>
                    <span className="text-lg text-red-300">Politeknik Industri Petrokimia Banten</span>
                  </motion.div>
                </motion.div>
                
                {/* Industrial icon grid */}
                <IndustrialIconGrid />
                
                {/* Stats display */}
                <motion.div
                  className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-4xl mx-auto mt-8"
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
                      className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 backdrop-blur-sm border border-cyan-400/20 rounded-lg p-3"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 2.5 + i * 0.1, type: "spring" }}
                    >
                      <stat.icon className="w-8 h-8 mx-auto mb-2 text-cyan-400" />
                      <div className="text-xs text-cyan-300/70 uppercase">{stat.label}</div>
                      <div className="text-xl font-bold text-white mt-1">{stat.value}</div>
                    </motion.div>
                  ))}
                </motion.div>
                
                {/* Victory message */}
                <motion.div
                  className="mt-12 space-y-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 3 }}
                >
                  <motion.p
                    className="text-base sm:text-lg text-cyan-100/80 max-w-3xl mx-auto leading-relaxed"
                    animate={!prefersReducedMotion ? {
                      opacity: [0.8, 1, 0.8],
                    } : {}}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                    }}
                  >
                    Pioneering the future of sustainable petrochemical innovation
                    <br />
                    <span className="text-cyan-400 font-semibold">
                      Powering Indonesia's Industrial Renaissance
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
                    <Sparkles className="w-5 h-5" />
                    <span className="text-lg font-bold tracking-wider">
                      EXCELLENCE IN EVERY MOLECULE
                    </span>
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
          
          {/* Loading progress bar */}
          <motion.div
            className="absolute bottom-8 left-1/2 -translate-x-1/2 w-64 sm:w-96"
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
              className="text-center mt-3 text-cyan-400 text-sm tracking-wider"
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
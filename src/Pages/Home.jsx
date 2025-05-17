import React, { useState, useEffect, useCallback, memo } from "react"
import { Github, Linkedin, Mail, ExternalLink, Instagram, Sparkles, Wind } from "lucide-react"
import { DotLottieReact } from '@lottiefiles/dotlottie-react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { Google, Photo } from "@mui/icons-material"

// Memoized Components
const StatusBadge = memo(() => (
  <div className="inline-block animate-float lg:mx-0" data-aos="zoom-in" data-aos-delay="400">
    <div className="relative group">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full blur opacity-30 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative px-3 sm:px-4 py-2 rounded-full bg-black/40 backdrop-blur-xl border border-white/10">
        <span className="bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-transparent bg-clip-text sm:text-sm text-[0.7rem] font-medium flex items-center">
          <Sparkles className="sm:w-4 sm:h-4 w-3 h-3 mr-2 text-blue-400" />
          Ready to Innovate
        </span>
      </div>
    </div>
  </div>
));

const MainTitle = memo(() => (
  <div className="space-y-2" data-aos="fade-up" data-aos-delay="600">
    <h1 className="text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight">
      <span className="relative inline-block">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-white via-blue-100 to-purple-200 bg-clip-text text-transparent">
          BIOFOUR
        </span>
      </span>
      <br />
      <span className="relative inline-block mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#6366f1] to-[#a855f7] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-[#6366f1] to-[#a855f7] bg-clip-text text-transparent">
          TEAM
        </span>
      </span>
    </h1>
  </div>
));

const TechStack = memo(({ tech }) => (
  <div className="px-4 py-2 block rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-sm text-gray-300 hover:bg-white/10 transition-colors">
    {tech}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a href={href}>
    <button className="group relative w-[160px]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#4f52c9] to-[#8644c5] rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"></div>
      <div className="relative h-11 bg-[#030014] backdrop-blur-xl rounded-lg border border-white/10 leading-none overflow-hidden">
        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#4f52c9]/20 to-[#8644c5]/20"></div>
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
          <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium z-10">
            {text}
          </span>
          <Icon className={`w-4 h-4 text-gray-200 ${text === 'Contact' ? 'group-hover:translate-x-1' : 'group-hover:rotate-45'} transform transition-all duration-300 z-10`} />
        </span>
      </div>
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <button className="group relative p-3">
      <div className="absolute inset-0 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative rounded-xl bg-black/50 backdrop-blur-xl p-2 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
        <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
      </div>
    </button>
  </a>
));

// Air Quality Component
const AirQualityCard = memo(() => {
  const [aqiLevel, setAqiLevel] = useState("Moderate");
  const [aqiValue, setAqiValue] = useState(85);
  const [pm25Value, setPm25Value] = useState(21);
  const [no2Value, setNo2Value] = useState(15);
  const [so2Value, setSo2Value] = useState(8);
  const [selectedPollutant, setSelectedPollutant] = useState("pm25");
  
  // Simulate AQI data fetching or updates
  useEffect(() => {
    // In a real app, you would fetch this data from an API
    const interval = setInterval(() => {
      // Random slight fluctuation in AQI for visual effect
      const newAqi = Math.max(80, Math.min(95, aqiValue + (Math.random() * 6 - 3)));
      const newPm25 = Math.max(18, Math.min(25, pm25Value + (Math.random() * 2 - 1)));
      const newNo2 = Math.max(12, Math.min(18, no2Value + (Math.random() * 2 - 1)));
      const newSo2 = Math.max(6, Math.min(10, so2Value + (Math.random() * 2 - 1)));
      
      setAqiValue(Math.round(newAqi));
      setPm25Value(Math.round(newPm25 * 10) / 10);
      setNo2Value(Math.round(newNo2 * 10) / 10);
      setSo2Value(Math.round(newSo2 * 10) / 10);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [aqiValue, pm25Value, no2Value, so2Value]);
  
  // Determine AQI color
  const getAqiColor = () => {
    if (aqiValue < 50) return "from-green-400 to-green-600";
    if (aqiValue < 100) return "from-yellow-400 to-yellow-600";
    if (aqiValue < 150) return "from-orange-400 to-orange-600";
    return "from-red-400 to-red-600";
  };

  // Get pollutant value based on selection
  const getPollutantValue = () => {
    switch(selectedPollutant) {
      case "pm25": return pm25Value;
      case "no2": return no2Value;
      case "so2": return so2Value;
      default: return pm25Value;
    }
  };

  // Get unit based on selected pollutant
  const getPollutantUnit = () => {
    return "μg/m³";
  };

  // Get pollutant name
  const getPollutantName = () => {
    switch(selectedPollutant) {
      case "pm25": return "PM2.5";
      case "no2": return "NO₂";
      case "so2": return "SO₂";
      default: return "PM2.5";
    }
  };

  // Handle pollutant selection
  const handlePollutantChange = (pollutant) => {
    setSelectedPollutant(pollutant);
  };
  
  return (
    <div className="relative group" data-aos="fade-up" data-aos-delay="1300">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-700"></div>
      <div className="relative px-4 py-4 rounded-xl bg-black/40 backdrop-blur-xl border border-white/10 group-hover:border-white/20 transition-all duration-300">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Wind className="w-5 h-5 text-blue-400" />
            <h3 className="text-sm font-medium text-gray-200">Kualitas Udara Cilegon</h3>
          </div>
          <div className="flex items-center">
            <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${getAqiColor()} animate-pulse mr-2`}></div>
            <span className="text-xs text-gray-400">Live</span>
          </div>
        </div>
        
        {/* Primary AQI Display */}
        <div className="mt-4 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-3xl font-bold bg-gradient-to-r from-gray-200 to-gray-100 bg-clip-text text-transparent">
              {aqiValue}
            </span>
            <span className="text-xs text-gray-400">AQI (Air Quality Index)</span>
          </div>
          
          <div className="flex flex-col items-end">
            <span className={`text-lg font-medium bg-gradient-to-r ${getAqiColor()} bg-clip-text text-transparent`}>
              {aqiLevel}
            </span>
            <span className="text-xs text-gray-400">Air Quality Level</span>
          </div>
        </div>
        
        {/* Primary AQI Progress Bar */}
        <div className="mt-2 w-full bg-gray-700/30 rounded-full h-2">
          <div 
            className={`h-2 rounded-full bg-gradient-to-r ${getAqiColor()}`}
            style={{ width: `${Math.min(100, aqiValue)}%` }}
          ></div>
        </div>

        {/* Air Quality Details */}
        <div className="mt-4 pt-3 border-t border-gray-700/30">
          <p className="text-xs text-gray-400 mb-3">
            Kualitas udara di Cilegon saat ini <span className={`font-medium bg-gradient-to-r ${getAqiColor()} bg-clip-text text-transparent`}>{aqiLevel}</span>. 
            Tingkat polusi udara dipengaruhi oleh aktivitas industri di kawasan Cilegon, termasuk pabrik baja, petrokimia, dan pembangkit listrik.
          </p>
          
          {/* Pollutant Selector */}
          <div className="flex space-x-2 mb-3">
            <button 
              onClick={() => handlePollutantChange("pm25")}
              className={`px-2 py-1 text-xs rounded-md transition-colors ${
                selectedPollutant === "pm25" 
                  ? "bg-blue-500/20 text-blue-300" 
                  : "bg-gray-700/20 text-gray-400 hover:bg-gray-700/30"
              }`}
            >
              PM2.5
            </button>
            <button 
              onClick={() => handlePollutantChange("no2")}
              className={`px-2 py-1 text-xs rounded-md transition-colors ${
                selectedPollutant === "no2" 
                  ? "bg-blue-500/20 text-blue-300" 
                  : "bg-gray-700/20 text-gray-400 hover:bg-gray-700/30"
              }`}
            >
              NO₂
            </button>
            <button 
              onClick={() => handlePollutantChange("so2")}
              className={`px-2 py-1 text-xs rounded-md transition-colors ${
                selectedPollutant === "so2" 
                  ? "bg-blue-500/20 text-blue-300" 
                  : "bg-gray-700/20 text-gray-400 hover:bg-gray-700/30"
              }`}
            >
              SO₂
            </button>
          </div>
          
          {/* Selected Pollutant Details */}
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-lg font-bold bg-gradient-to-r from-gray-200 to-gray-100 bg-clip-text text-transparent">
                {getPollutantValue()}
              </span>
              <span className="text-xs text-gray-400">{getPollutantUnit()}</span>
            </div>
            
            <div className="flex flex-col items-end">
              <span className="text-sm text-gray-200 font-medium">
                {getPollutantName()}
              </span>
              <span className="text-xs text-gray-400">
                {selectedPollutant === "pm25" ? "Particulate Matter" : 
                 selectedPollutant === "no2" ? "Nitrogen Dioxide" : "Sulfur Dioxide"}
              </span>
            </div>
          </div>
          
          {/* Impact Info */}
          <div className="mt-3 text-xs text-gray-400">
            <p>Penggunaan bioetanol sebagai bahan bakar alternatif dapat membantu mengurangi emisi gas berbahaya dan meningkatkan kualitas udara di Cilegon.</p>
          </div>
        </div>
      </div>
    </div>
  );
});

// Constants
const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = ["Politeknik Petrokimia", "#SobatPetro"];
const TECH_STACK = ["Fahmi Nabeel", "Arvin Rudolf K.S", "Pandu Aryo D", "Chalista Balqis A"];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/MigoVS" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/fahmi-nabeel-367341278/" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/arvin-situmorang/" },
  { icon: Linkedin, link: "https://www.linkedin.com/in/pandu-aryo-darpito-886949321/" },
  { icon: Photo, link: "https://drive.google.com/drive/folders/1xzHBxC0ZoKMd-3ZSvGS2fMm3XGAnnY2y?usp=sharing" },
];

const Home = () => {
  const [text, setText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [wordIndex, setWordIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovering, setIsHovering] = useState(false)

  // Optimize AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        offset: 10,
       
      });
    };

    initAOS();
    window.addEventListener('resize', initAOS);
    return () => window.removeEventListener('resize', initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  // Optimize typing effect
  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText(prev => prev + WORDS[wordIndex][charIndex]);
        setCharIndex(prev => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText(prev => prev.slice(0, -1));
        setCharIndex(prev => prev - 1);
      } else {
        setWordIndex(prev => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  // Lottie configuration
  const lottieOptions = {
    src: "https://lottie.host/888bf2fa-7fdf-4d00-9599-a7c19bc2642e/1N4UvZQm6W.lottie",
    loop: true,
    autoplay: true,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid meet', // Using 'meet' to ensure the entire animation is visible
      progressiveLoad: true,
    },
    style: { width: "100%", height: "100%" },
    className: `w-full h-full transition-all duration-500 ${
      isHovering 
        ? "scale-125 sm:scale-125 md:scale-125 lg:scale-125" 
        : "scale-120 sm:scale-120 md:scale-120 lg:scale-120"
    }`
  };

  return (
    <div className="min-h-screen bg-[#030014] overflow-hidden" id="Home">
      <div className={`relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}>
        <div className="container mx-auto px-[5%] sm:px-6 lg:px-[0%] min-h-screen">
          <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen py-16 md:justify-between gap-0 sm:gap-12 lg:gap-20">
            {/* Left Column */}
            <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-left lg:text-left order-1 lg:order-1 lg:mt-0"
              data-aos="fade-right"
              data-aos-delay="200">
              <div className="space-y-4 sm:space-y-6">
                <StatusBadge />
                <MainTitle />

                {/* Typing Effect */}
                <div className="h-8 flex items-center" data-aos="fade-up" data-aos-delay="800">
                  <span className="text-xl md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light">
                    {text}
                  </span>
                  <span className="w-[3px] h-6 bg-gradient-to-t from-[#6366f1] to-[#a855f7] ml-1 animate-blink"></span>
                </div>

                {/* Description */}
                <p className="text-base md:text-lg text-gray-400 max-w-xl leading-relaxed font-light text-justify"
                  data-aos="fade-up"
                  data-aos-delay="1000">
                  Selamat datang di Website Kami! Kami adalah tim peneliti yang berfokus pada pengembangan bioetanol berkualitas tinggi. Tujuan penelitian kami adalah menciptakan bioetanol sebagai alternatif bahan bakar kendaraan yang ramah lingkungan untuk masa depan yang lebih berkelanjutan.
                </p>

                {/* Air Quality Card - Added here */}
                <AirQualityCard />

                {/* Tech Stack - REDUCED DELAY FROM 1200 to 600 */}
                <div className="flex flex-wrap gap-3 justify-start" data-aos="fade-up" data-aos-delay="600">
                  {TECH_STACK.map((tech, index) => (
                    <TechStack key={index} tech={tech} />
                  ))}
                </div>

                {/* CTA Buttons */}
                <div className="flex flex-row gap-3 w-full justify-start" data-aos="fade-up" data-aos-delay="800">
                  <CTAButton href="#Portofolio" text="Projects" icon={ExternalLink} />
                  <CTAButton href="#Contact" text="Contact" icon={Mail} />
                </div>

                {/* Social Links - REDUCED DELAY FROM 1600 to 700 */}
                <div className="flex gap-4 justify-start" data-aos="fade-up" data-aos-delay="700">
                  {SOCIAL_LINKS.map((social, index) => (
                    <SocialLink key={index} {...social} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Optimized Lottie Animation */}
            <div className="w-full py-[5%] sm:py-0 lg:w-1/2 h-auto lg:h-[650px] xl:h-[800px] relative flex items-center justify-center order-2 lg:order-2 mt-4 lg:mt-0"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              data-aos="fade-left"
              data-aos-delay="600">
              <div className="relative w-full max-w-3xl mx-auto opacity-90">
                {/* Background glow effect */}
                <div className={`absolute inset-0 bg-gradient-to-r from-[#6366f1]/10 to-[#a855f7]/10 rounded-3xl blur-3xl transition-all duration-700 ease-in-out ${
                  isHovering ? "opacity-50 scale-105" : "opacity-20 scale-100"
                }`}>
                </div>

                {/* Lottie container with adjusted positioning */}
                <div className="relative z-10 w-full h-full flex items-center justify-center opacity-90">
                  <div className="w-full h-full max-h-[600px] flex items-center justify-center">
                    <DotLottieReact {...lottieOptions} />
                  </div>
                </div>

                {/* Additional glow effect */}
                <div className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
                  isHovering ? "opacity-50" : "opacity-20"
                }`}>
                  <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite] transition-all duration-700 ${
                    isHovering ? "scale-110" : "scale-100"
                  }`}>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(Home);
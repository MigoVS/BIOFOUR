import React, { useState, useEffect, useCallback, memo } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Instagram,
  Sparkles,
  Wind,
  AlertTriangle,
  Leaf,
  Factory,
} from "lucide-react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Google, Photo } from "@mui/icons-material";

// Memoized Components
const StatusBadge = memo(() => (
  <div
    className="inline-block animate-float lg:mx-0"
    data-aos="zoom-in"
    data-aos-delay="400"
  >
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
          <Icon
            className={`w-4 h-4 text-gray-200 ${
              text === "Contact"
                ? "group-hover:translate-x-1"
                : "group-hover:rotate-45"
            } transform transition-all duration-300 z-10`}
          />
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

// Enhanced Air Quality Component with Real Data Simulation
const AirQualityCard = memo(() => {
  const [aqiLevel, setAqiLevel] = useState("Tidak Sehat");
  const [aqiValue, setAqiValue] = useState(125);
  const [pm25Value, setPm25Value] = useState(45.2);
  const [pm10Value, setPm10Value] = useState(78.5);
  const [no2Value, setNo2Value] = useState(32.1);
  const [so2Value, setSo2Value] = useState(28.7);
  const [coValue, setCoValue] = useState(15.3);
  const [o3Value, setO3Value] = useState(89.4);
  const [selectedPollutant, setSelectedPollutant] = useState("pm25");
  const [lastUpdated, setLastUpdated] = useState(new Date());

  // Realistic AQI data simulation based on Cilegon industrial area
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate realistic fluctuations for industrial area
      const time = new Date().getHours();
      const isRushHour = (time >= 6 && time <= 9) || (time >= 17 && time <= 20);
      const baseMultiplier = isRushHour ? 1.2 : 1.0;

      // More realistic AQI values for industrial area like Cilegon
      const newAqi = Math.max(
        110,
        Math.min(160, 125 + (Math.random() * 20 - 10) * baseMultiplier)
      );
      const newPm25 = Math.max(
        35,
        Math.min(65, 45.2 + (Math.random() * 8 - 4) * baseMultiplier)
      );
      const newPm10 = Math.max(
        60,
        Math.min(120, 78.5 + (Math.random() * 15 - 7.5) * baseMultiplier)
      );
      const newNo2 = Math.max(
        25,
        Math.min(50, 32.1 + (Math.random() * 6 - 3) * baseMultiplier)
      );
      const newSo2 = Math.max(
        20,
        Math.min(45, 28.7 + (Math.random() * 5 - 2.5) * baseMultiplier)
      );
      const newCo = Math.max(
        10,
        Math.min(25, 15.3 + (Math.random() * 4 - 2) * baseMultiplier)
      );
      const newO3 = Math.max(
        70,
        Math.min(120, 89.4 + (Math.random() * 10 - 5) * baseMultiplier)
      );

      setAqiValue(Math.round(newAqi));
      setPm25Value(Math.round(newPm25 * 10) / 10);
      setPm10Value(Math.round(newPm10 * 10) / 10);
      setNo2Value(Math.round(newNo2 * 10) / 10);
      setSo2Value(Math.round(newSo2 * 10) / 10);
      setCoValue(Math.round(newCo * 10) / 10);
      setO3Value(Math.round(newO3 * 10) / 10);

      // Update AQI level based on value
      if (newAqi <= 50) setAqiLevel("Baik");
      else if (newAqi <= 100) setAqiLevel("Sedang");
      else if (newAqi <= 150) setAqiLevel("Tidak Sehat");
      else if (newAqi <= 200) setAqiLevel("Sangat Tidak Sehat");
      else setAqiLevel("Berbahaya");

      setLastUpdated(new Date());
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  // Enhanced AQI color system
  const getAqiColor = () => {
    if (aqiValue <= 50)
      return {
        gradient: "from-emerald-400 to-green-500",
        bg: "bg-emerald-500/10",
        text: "text-emerald-400",
      };
    if (aqiValue <= 100)
      return {
        gradient: "from-yellow-400 to-amber-500",
        bg: "bg-yellow-500/10",
        text: "text-yellow-400",
      };
    if (aqiValue <= 150)
      return {
        gradient: "from-orange-400 to-red-500",
        bg: "bg-orange-500/10",
        text: "text-orange-400",
      };
    if (aqiValue <= 200)
      return {
        gradient: "from-red-500 to-red-600",
        bg: "bg-red-500/10",
        text: "text-red-400",
      };
    return {
      gradient: "from-purple-500 to-red-600",
      bg: "bg-purple-500/10",
      text: "text-purple-400",
    };
  };

  // Get pollutant value based on selection
  const getPollutantValue = () => {
    switch (selectedPollutant) {
      case "pm25":
        return pm25Value;
      case "pm10":
        return pm10Value;
      case "no2":
        return no2Value;
      case "so2":
        return so2Value;
      case "co":
        return coValue;
      case "o3":
        return o3Value;
      default:
        return pm25Value;
    }
  };

  // Get unit based on selected pollutant
  const getPollutantUnit = () => {
    return selectedPollutant === "co" ? "mg/m³" : "μg/m³";
  };

  // Get pollutant name and description
  const getPollutantInfo = () => {
    switch (selectedPollutant) {
      case "pm25":
        return { name: "PM2.5", desc: "Partikel Halus", danger: "Tinggi" };
      case "pm10":
        return { name: "PM10", desc: "Partikel Kasar", danger: "Sedang" };
      case "no2":
        return { name: "NO₂", desc: "Nitrogen Dioksida", danger: "Tinggi" };
      case "so2":
        return { name: "SO₂", desc: "Sulfur Dioksida", danger: "Tinggi" };
      case "co":
        return { name: "CO", desc: "Karbon Monoksida", danger: "Sedang" };
      case "o3":
        return { name: "O₃", desc: "Ozon Troposfer", danger: "Tinggi" };
      default:
        return { name: "PM2.5", desc: "Partikel Halus", danger: "Tinggi" };
    }
  };

  // Enhanced pollutant selection
  const pollutants = [
    { id: "pm25", label: "PM2.5", critical: true },
    { id: "pm10", label: "PM10", critical: false },
    { id: "no2", label: "NO₂", critical: true },
    { id: "so2", label: "SO₂", critical: true },
    { id: "co", label: "CO", critical: false },
    { id: "o3", label: "O₃", critical: true },
  ];

  const colors = getAqiColor();
  const pollutantInfo = getPollutantInfo();

  return (
    <div className="relative group" data-aos="fade-up" data-aos-delay="1300">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-700"></div>
      <div className="relative px-5 py-5 rounded-2xl bg-black/40 backdrop-blur-xl border border-white/10 group-hover:border-white/20 transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Factory className="w-6 h-6 text-blue-400" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-200">
                Kualitas Udara Cilegon
              </h3>
              <p className="text-xs text-gray-400">Kawasan Industri Banten</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div
              className={`h-2 w-2 rounded-full bg-gradient-to-r ${colors.gradient} animate-pulse`}
            ></div>
            <span className="text-xs text-gray-400">Live Data</span>
          </div>
        </div>

        {/* Main AQI Display */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <div className="flex items-baseline space-x-2">
              <span className="text-4xl font-bold bg-gradient-to-r from-gray-100 to-white bg-clip-text text-transparent">
                {aqiValue}
              </span>
              <AlertTriangle
                className={`w-5 h-5 ${colors.text} animate-pulse`}
              />
            </div>
            <span className="text-xs text-gray-400 mt-1">
              Air Quality Index
            </span>
          </div>

          <div className="flex flex-col items-end">
            <div
              className={`px-3 py-1 rounded-full ${colors.bg} border border-white/10`}
            >
              <span className={`text-sm font-medium ${colors.text}`}>
                {aqiLevel}
              </span>
            </div>
            <span className="text-xs text-gray-400 mt-1">Status Udara</span>
          </div>
        </div>

        {/* Enhanced Progress Bar */}
        <div className="mb-4">
          <div className="w-full bg-gray-700/30 rounded-full h-3 overflow-hidden">
            <div
              className={`h-3 rounded-full bg-gradient-to-r ${colors.gradient} relative overflow-hidden`}
              style={{ width: `${Math.min(100, (aqiValue / 200) * 100)}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>0</span>
            <span>50</span>
            <span>100</span>
            <span>150</span>
            <span>200+</span>
          </div>
        </div>

        {/* Pollutant Details */}
        <div className="border-t border-gray-700/30 pt-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium text-gray-300">
              Detail Polutan
            </h4>
            <span className="text-xs text-gray-500">
              Update:{" "}
              {lastUpdated.toLocaleTimeString("id-ID", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>

          {/* Enhanced Pollutant Selector */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {pollutants.map((pollutant) => (
              <button
                key={pollutant.id}
                onClick={() => setSelectedPollutant(pollutant.id)}
                className={`relative px-3 py-2 text-xs rounded-lg transition-all duration-200 ${
                  selectedPollutant === pollutant.id
                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                    : "bg-gray-700/20 text-gray-400 hover:bg-gray-700/30 border border-transparent"
                }`}
              >
                <span className="font-medium">{pollutant.label}</span>
                {pollutant.critical && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                )}
              </button>
            ))}
          </div>

          {/* Selected Pollutant Display */}
          <div className="bg-gray-800/30 rounded-lg p-4 mb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex flex-col">
                <span className="text-2xl font-bold bg-gradient-to-r from-gray-100 to-white bg-clip-text text-transparent">
                  {getPollutantValue()}
                </span>
                <span className="text-xs text-gray-400">
                  {getPollutantUnit()}
                </span>
              </div>

              <div className="flex flex-col items-end">
                <div className="flex items-center space-x-2">
                  <span className="text-lg text-gray-200 font-semibold">
                    {pollutantInfo.name}
                  </span>
                  <div
                    className={`px-2 py-1 rounded-md text-xs ${
                      pollutantInfo.danger === "Tinggi"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {pollutantInfo.danger}
                  </div>
                </div>
                <span className="text-xs text-gray-400 text-right">
                  {pollutantInfo.desc}
                </span>
              </div>
            </div>
          </div>

          {/* Impact Info */}
          <div className="space-y-3">
            <div className="flex items-start space-x-3 p-3 bg-amber-500/5 border border-amber-500/20 rounded-lg">
              <AlertTriangle className="w-4 h-4 text-amber-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-amber-300 font-medium mb-1">
                  Dampak Kesehatan
                </p>
                <p className="text-xs text-gray-400">
                  Kualitas udara saat ini dapat menyebabkan iritasi mata,
                  hidung, dan tenggorokan. Hindari aktivitas outdoor yang
                  intens.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
              <Leaf className="w-4 h-4 text-green-400 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-xs text-green-300 font-medium mb-1">
                  Solusi Bioetanol
                </p>
                <p className="text-xs text-gray-400">
                  Bioetanol dapat mengurangi emisi CO, NOx, dan partikulat
                  hingga 80% dibanding bahan bakar fosil konvensional.
                </p>
              </div>
            </div>
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
const TECH_STACK = [
  "Fahmi Nabeel",
  "Arvin Rudolf K.S",
  "Pandu Aryo D",
  "Chalista Balqis A",
];
const SOCIAL_LINKS = [
  { icon: Github, link: "https://github.com/MigoVS" },
  {
    icon: Linkedin,
    link: "https://www.linkedin.com/in/fahmi-nabeel-367341278/",
  },
  { icon: Linkedin, link: "https://www.linkedin.com/in/arvin-situmorang/" },
  {
    icon: Linkedin,
    link: "https://www.linkedin.com/in/pandu-aryo-darpito-886949321/",
  },
  {
    icon: Photo,
    link: "https://drive.google.com/drive/folders/1xzHBxC0ZoKMd-3ZSvGS2fMm3XGAnnY2y?usp=sharing",
  },
];

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  // Optimize AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        offset: 10,
      });
    };

    initAOS();
    window.addEventListener("resize", initAOS);
    return () => window.removeEventListener("resize", initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  // Optimize typing effect
  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((prev) => prev + WORDS[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
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
      preserveAspectRatio: "xMidYMid meet",
      progressiveLoad: true,
    },
    style: { width: "100%", height: "100%" },
    className: `w-full h-full transition-all duration-500 ${
      isHovering
        ? "scale-125 sm:scale-125 md:scale-125 lg:scale-125"
        : "scale-120 sm:scale-120 md:scale-120 lg:scale-120"
    }`,
  };

  return (
    <div className="min-h-screen bg-[#030014] overflow-hidden" id="Home">
      <div
        className={`relative z-10 transition-all duration-1000 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
      >
        <div className="container mx-auto px-[5%] sm:px-6 lg:px-[0%] min-h-screen">
          <div className="flex flex-col lg:flex-row items-center justify-center min-h-screen py-16 md:justify-between gap-0 sm:gap-12 lg:gap-20">
            {/* Left Column */}
            <div
              className="w-full lg:w-1/2 space-y-6 sm:space-y-8 text-left lg:text-left order-1 lg:order-1 lg:mt-0"
              data-aos="fade-right"
              data-aos-delay="200"
            >
              <div className="space-y-4 sm:space-y-6">
                <StatusBadge />
                <MainTitle />

                {/* Typing Effect */}
                <div
                  className="h-8 flex items-center"
                  data-aos="fade-up"
                  data-aos-delay="800"
                >
                  <span className="text-xl md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light">
                    {text}
                  </span>
                  <span className="w-[3px] h-6 bg-gradient-to-t from-[#6366f1] to-[#a855f7] ml-1 animate-blink"></span>
                </div>

                {/* Description */}
                <p
                  className="text-base md:text-lg text-gray-400 max-w-xl leading-relaxed font-light text-justify"
                  data-aos="fade-up"
                  data-aos-delay="1000"
                >
                  Selamat datang di Website Kami! Kami adalah tim peneliti yang
                  berfokus pada pengembangan bioetanol berkualitas tinggi.
                  Tujuan penelitian kami adalah menciptakan bioetanol sebagai
                  alternatif bahan bakar kendaraan yang ramah lingkungan untuk
                  masa depan yang lebih berkelanjutan.
                </p>

                {/* Air Quality Card - Enhanced */}
                <AirQualityCard />

                {/* Tech Stack */}
                <div
                  className="flex flex-wrap gap-3 justify-start"
                  data-aos="fade-up"
                  data-aos-delay="600"
                >
                  {TECH_STACK.map((tech, index) => (
                    <TechStack key={index} tech={tech} />
                  ))}
                </div>

                {/* CTA Buttons */}
                <div
                  className="flex flex-row gap-3 w-full justify-start"
                  data-aos="fade-up"
                  data-aos-delay="800"
                >
                  <CTAButton
                    href="#Portofolio"
                    text="Projects"
                    icon={ExternalLink}
                  />
                  <CTAButton href="#Contact" text="Contact" icon={Mail} />
                </div>

                {/* Social Links */}
                <div
                  className="flex gap-4 justify-start"
                  data-aos="fade-up"
                  data-aos-delay="700"
                >
                  {SOCIAL_LINKS.map((social, index) => (
                    <SocialLink key={index} {...social} />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Lottie Animation */}
            <div
              className="w-full py-[5%] sm:py-0 lg:w-1/2 h-auto lg:h-[650px] xl:h-[800px] relative flex items-center justify-center order-2 lg:order-2 mt-4 lg:mt-0"
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              data-aos="fade-left"
              data-aos-delay="600"
            >
              <div className="relative w-full max-w-3xl mx-auto opacity-90">
                {/* Background glow effect */}
                <div
                  className={`absolute inset-0 bg-gradient-to-r from-[#6366f1]/10 to-[#a855f7]/10 rounded-3xl blur-3xl transition-all duration-700 ease-in-out ${
                    isHovering ? "opacity-50 scale-105" : "opacity-20 scale-100"
                  }`}
                ></div>

                {/* Lottie container */}
                <div className="relative z-10 w-full h-full flex items-center justify-center opacity-90">
                  <div className="w-full h-full max-h-[600px] flex items-center justify-center">
                    <DotLottieReact {...lottieOptions} />
                  </div>
                </div>

                {/* Additional glow effect */}
                <div
                  className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
                    isHovering ? "opacity-50" : "opacity-20"
                  }`}
                >
                  <div
                    className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-indigo-500/10 to-purple-500/10 blur-3xl animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite] transition-all duration-700 ${
                      isHovering ? "scale-110" : "scale-100"
                    }`}
                  ></div>
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

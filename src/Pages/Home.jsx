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
  Eye,
  Thermometer,
  Droplets,
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

// Enhanced Air Quality Component with Realistic Animations
const AirQualityCard = memo(() => {
  const [aqiLevel, setAqiLevel] = useState("Tidak Sehat untuk Kelompok Sensitif");
  const [aqiValue, setAqiValue] = useState(138);
  const [pm25Value, setPm25Value] = useState(52.3);
  const [pm10Value, setPm10Value] = useState(89.7);
  const [no2Value, setNo2Value] = useState(38.4);
  const [so2Value, setSo2Value] = useState(45.1);
  const [coValue, setCoValue] = useState(18.7);
  const [o3Value, setO3Value] = useState(94.2);
  const [visibility, setVisibility] = useState(4.2);
  const [temperature, setTemperature] = useState(32);
  const [humidity, setHumidity] = useState(78);
  const [selectedPollutant, setSelectedPollutant] = useState("pm25");
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isAnimating, setIsAnimating] = useState(false);
  const [trendDirection, setTrendDirection] = useState("up");
  const [alertLevel, setAlertLevel] = useState(2);

  // Real-time data simulation with more realistic patterns for Cilegon
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const hour = now.getHours();
      const day = now.getDay();
      
      // Realistic patterns for industrial area
      const isWorkDay = day >= 1 && day <= 5;
      const isRushHour = (hour >= 6 && hour <= 9) || (hour >= 17 && hour <= 20);
      const isIndustrialPeak = hour >= 8 && hour <= 17 && isWorkDay;
      const isNighttime = hour >= 22 || hour <= 5;
      
      // Base multipliers for different conditions
      let baseMultiplier = 1.0;
      if (isIndustrialPeak) baseMultiplier = 1.4;
      else if (isRushHour) baseMultiplier = 1.2;
      else if (isNighttime) baseMultiplier = 0.8;
      
      // Weather impact (simulated)
      const weatherImpact = Math.sin(hour * 0.1) * 0.3 + 1;
      const finalMultiplier = baseMultiplier * weatherImpact;

      setIsAnimating(true);
      
      // More realistic AQI fluctuations for Cilegon industrial area
      const newAqi = Math.max(120, Math.min(180, 138 + (Math.random() * 30 - 15) * finalMultiplier));
      const newPm25 = Math.max(35, Math.min(75, 52.3 + (Math.random() * 12 - 6) * finalMultiplier));
      const newPm10 = Math.max(70, Math.min(150, 89.7 + (Math.random() * 25 - 12.5) * finalMultiplier));
      const newNo2 = Math.max(25, Math.min(65, 38.4 + (Math.random() * 8 - 4) * finalMultiplier));
      const newSo2 = Math.max(30, Math.min(80, 45.1 + (Math.random() * 10 - 5) * finalMultiplier));
      const newCo = Math.max(12, Math.min(35, 18.7 + (Math.random() * 6 - 3) * finalMultiplier));
      const newO3 = Math.max(70, Math.min(140, 94.2 + (Math.random() * 15 - 7.5) * finalMultiplier));
      
      // Environmental factors
      const newVisibility = Math.max(2.0, Math.min(8.0, 4.2 + (Math.random() * 2 - 1)));
      const newTemp = Math.max(28, Math.min(38, 32 + (Math.random() * 4 - 2)));
      const newHumidity = Math.max(60, Math.min(95, 78 + (Math.random() * 10 - 5)));

      // Determine trend direction
      if (newAqi > aqiValue + 5) setTrendDirection("up");
      else if (newAqi < aqiValue - 5) setTrendDirection("down");
      else setTrendDirection("stable");

      // Update values with smooth animation
      setTimeout(() => {
        setAqiValue(Math.round(newAqi));
        setPm25Value(Math.round(newPm25 * 10) / 10);
        setPm10Value(Math.round(newPm10 * 10) / 10);
        setNo2Value(Math.round(newNo2 * 10) / 10);
        setSo2Value(Math.round(newSo2 * 10) / 10);
        setCoValue(Math.round(newCo * 10) / 10);
        setO3Value(Math.round(newO3 * 10) / 10);
        setVisibility(Math.round(newVisibility * 10) / 10);
        setTemperature(Math.round(newTemp));
        setHumidity(Math.round(newHumidity));

        // Update AQI level and alert
        if (newAqi <= 50) {
          setAqiLevel("Baik");
          setAlertLevel(0);
        } else if (newAqi <= 100) {
          setAqiLevel("Sedang");
          setAlertLevel(1);
        } else if (newAqi <= 150) {
          setAqiLevel("Tidak Sehat untuk Kelompok Sensitif");
          setAlertLevel(2);
        } else if (newAqi <= 200) {
          setAqiLevel("Tidak Sehat");
          setAlertLevel(3);
        } else {
          setAqiLevel("Sangat Tidak Sehat");
          setAlertLevel(4);
        }

        setLastUpdated(new Date());
        setIsAnimating(false);
      }, 300);
    }, 6000);

    return () => clearInterval(interval);
  }, [aqiValue]);

  // Enhanced AQI color system with more vibrant colors
  const getAqiColor = () => {
    if (aqiValue <= 50)
      return {
        gradient: "from-emerald-400 via-green-400 to-green-500",
        bg: "bg-emerald-500/20",
        text: "text-emerald-300",
        glow: "shadow-emerald-500/25",
      };
    if (aqiValue <= 100)
      return {
        gradient: "from-yellow-300 via-amber-400 to-orange-400",
        bg: "bg-yellow-500/20",
        text: "text-yellow-300",
        glow: "shadow-yellow-500/25",
      };
    if (aqiValue <= 150)
      return {
        gradient: "from-orange-400 via-orange-500 to-red-500",
        bg: "bg-orange-500/20",
        text: "text-orange-300",
        glow: "shadow-orange-500/25",
      };
    if (aqiValue <= 200)
      return {
        gradient: "from-red-500 via-red-600 to-red-700",
        bg: "bg-red-500/20",
        text: "text-red-300",
        glow: "shadow-red-500/25",
      };
    return {
      gradient: "from-purple-500 via-red-600 to-pink-600",
      bg: "bg-purple-500/20",
      text: "text-purple-300",
      glow: "shadow-purple-500/25",
    };
  };

  // Get pollutant value based on selection
  const getPollutantValue = () => {
    switch (selectedPollutant) {
      case "pm25": return pm25Value;
      case "pm10": return pm10Value;
      case "no2": return no2Value;
      case "so2": return so2Value;
      case "co": return coValue;
      case "o3": return o3Value;
      default: return pm25Value;
    }
  };

  // Get unit based on selected pollutant
  const getPollutantUnit = () => {
    return selectedPollutant === "co" ? "mg/m³" : "μg/m³";
  };

  // Get pollutant info with health impact
  const getPollutantInfo = () => {
    switch (selectedPollutant) {
      case "pm25":
        return { 
          name: "PM2.5", 
          desc: "Partikel Halus", 
          danger: "Sangat Tinggi",
          health: "Penetrasi ke paru-paru dalam"
        };
      case "pm10":
        return { 
          name: "PM10", 
          desc: "Partikel Kasar", 
          danger: "Tinggi",
          health: "Iritasi saluran pernapasan"
        };
      case "no2":
        return { 
          name: "NO₂", 
          desc: "Nitrogen Dioksida", 
          danger: "Tinggi",
          health: "Gangguan fungsi paru"
        };
      case "so2":
        return { 
          name: "SO₂", 
          desc: "Sulfur Dioksida", 
          danger: "Sangat Tinggi",
          health: "Iritasi mata dan tenggorokan"
        };
      case "co":
        return { 
          name: "CO", 
          desc: "Karbon Monoksida", 
          danger: "Sedang",
          health: "Mengganggu transport oksigen"
        };
      case "o3":
        return { 
          name: "O₃", 
          desc: "Ozon Troposfer", 
          danger: "Tinggi",
          health: "Kerusakan jaringan paru"
        };
      default:
        return { 
          name: "PM2.5", 
          desc: "Partikel Halus", 
          danger: "Sangat Tinggi",
          health: "Penetrasi ke paru-paru dalam"
        };
    }
  };

  // Enhanced pollutant selection with health impact indicators
  const pollutants = [
    { id: "pm25", label: "PM2.5", critical: true, value: pm25Value, unit: "μg/m³" },
    { id: "pm10", label: "PM10", critical: false, value: pm10Value, unit: "μg/m³" },
    { id: "no2", label: "NO₂", critical: true, value: no2Value, unit: "μg/m³" },
    { id: "so2", label: "SO₂", critical: true, value: so2Value, unit: "μg/m³" },
    { id: "co", label: "CO", critical: false, value: coValue, unit: "mg/m³" },
    { id: "o3", label: "O₃", critical: true, value: o3Value, unit: "μg/m³" },
  ];

  // Get trend icon
  const getTrendIcon = () => {
    if (trendDirection === "up") return "↗";
    if (trendDirection === "down") return "↘";
    return "→";
  };

  const colors = getAqiColor();
  const pollutantInfo = getPollutantInfo();

  return (
    <div className="relative group" data-aos="fade-up" data-aos-delay="1300">
      {/* Enhanced glow effect */}
      <div className={`absolute -inset-1 bg-gradient-to-r ${colors.gradient} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-all duration-700 ${colors.glow} shadow-2xl`}></div>
      
      <div className={`relative px-5 py-5 rounded-2xl bg-gradient-to-br from-black/60 to-black/40 backdrop-blur-2xl border border-white/10 group-hover:border-white/20 transition-all duration-500 ${isAnimating ? 'scale-[1.02]' : 'scale-100'}`}>
        
        {/* Animated Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Factory className={`w-6 h-6 text-blue-400 transition-transform duration-300 ${isAnimating ? 'scale-110' : 'scale-100'}`} />
              <div className={`absolute -top-1 -right-1 w-3 h-3 rounded-full animate-pulse ${alertLevel >= 3 ? 'bg-red-500' : alertLevel >= 2 ? 'bg-orange-500' : 'bg-yellow-500'}`}></div>
              {/* Breathing pollution effect */}
              <div className="absolute -inset-2 bg-gray-500/10 rounded-full animate-ping opacity-20"></div>
            </div>
            <div>
              <h3 className="text-base font-semibold text-gray-200 flex items-center gap-2">
                Kualitas Udara Cilegon
                <span className={`text-lg transform transition-transform duration-500 ${isAnimating ? 'scale-125' : 'scale-100'}`}>
                  {getTrendIcon()}
                </span>
              </h3>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Wind className="w-3 h-3 animate-pulse" />
                Kawasan Industri Banten
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${colors.gradient} animate-pulse`}></div>
            <span className="text-xs text-gray-400">Live Data</span>
          </div>
        </div>

        {/* Enhanced Main AQI Display */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex flex-col">
            <div className="flex items-baseline space-x-3">
              <span className={`text-5xl font-bold bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent transition-all duration-500 ${isAnimating ? 'scale-105' : 'scale-100'}`}>
                {aqiValue}
              </span>
              <div className="flex flex-col items-center">
                <AlertTriangle className={`w-6 h-6 ${colors.text} animate-pulse`} />
                <div className={`text-xs ${colors.text} font-medium`}>
                  Level {alertLevel}
                </div>
              </div>
            </div>
            <span className="text-xs text-gray-400 mt-1 flex items-center gap-1">
              <span>Air Quality Index</span>
              <div className={`w-1 h-1 rounded-full ${colors.text} animate-pulse`}></div>
            </span>
          </div>

          <div className="flex flex-col items-end">
            <div className={`px-4 py-2 rounded-xl ${colors.bg} border border-white/20 backdrop-blur-sm transition-all duration-300 hover:scale-105`}>
              <span className={`text-sm font-semibold ${colors.text}`}>
                {aqiLevel}
              </span>
            </div>
            <span className="text-xs text-gray-400 mt-1">Status Udara</span>
          </div>
        </div>

        {/* Enhanced Animated Progress Bar */}
        <div className="mb-5">
          <div className="w-full bg-gray-700/30 rounded-full h-4 overflow-hidden backdrop-blur-sm border border-white/5">
            <div
              className={`h-4 rounded-full bg-gradient-to-r ${colors.gradient} relative overflow-hidden transition-all duration-1000 ease-out ${isAnimating ? 'animate-pulse' : ''}`}
              style={{ width: `${Math.min(100, (aqiValue / 200) * 100)}%` }}
            >
              {/* Animated shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shine"></div>
              {/* Pulsing overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
            </div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2 px-1">
            <span className="flex flex-col items-center">
              <span>0</span>
              <span className="text-xs text-emerald-400">Baik</span>
            </span>
            <span className="flex flex-col items-center">
              <span>50</span>
              <span className="text-xs text-yellow-400">Sedang</span>
            </span>
            <span className="flex flex-col items-center">
              <span>100</span>
              <span className="text-xs text-orange-400">T. Sehat</span>
            </span>
            <span className="flex flex-col items-center">
              <span>150</span>
              <span className="text-xs text-red-400">Bahaya</span>
            </span>
            <span className="flex flex-col items-center">
              <span>200+</span>
              <span className="text-xs text-purple-400">Kritis</span>
            </span>
          </div>
        </div>

        {/* Environmental Conditions */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 rounded-lg p-3 border border-blue-500/20 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-1">
              <Eye className="w-4 h-4 text-blue-400" />
              <span className="text-xs text-blue-300 font-medium">Visibilitas</span>
            </div>
            <span className="text-lg font-bold text-white">{visibility}</span>
            <span className="text-xs text-gray-400 ml-1">km</span>
          </div>
          
          <div className="bg-gradient-to-br from-orange-500/10 to-red-600/5 rounded-lg p-3 border border-orange-500/20 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-1">
              <Thermometer className="w-4 h-4 text-orange-400" />
              <span className="text-xs text-orange-300 font-medium">Suhu</span>
            </div>
            <span className="text-lg font-bold text-white">{temperature}</span>
            <span className="text-xs text-gray-400 ml-1">°C</span>
          </div>
          
          <div className="bg-gradient-to-br from-cyan-500/10 to-blue-600/5 rounded-lg p-3 border border-cyan-500/20 backdrop-blur-sm">
            <div className="flex items-center space-x-2 mb-1">
              <Droplets className="w-4 h-4 text-cyan-400" />
              <span className="text-xs text-cyan-300 font-medium">Kelembapan</span>
            </div>
            <span className="text-lg font-bold text-white">{humidity}</span>
            <span className="text-xs text-gray-400 ml-1">%</span>
          </div>
        </div>

        {/* Enhanced Pollutant Details */}
        <div className="border-t border-gray-700/30 pt-4">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-semibold text-gray-200 flex items-center gap-2">
              Detail Polutan
              <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
            </h4>
            <span className="text-xs text-gray-400 flex items-center gap-1">
              <div className={`w-1 h-1 rounded-full ${colors.text} animate-pulse`}></div>
              Update: {lastUpdated.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
            </span>
          </div>

          {/* Enhanced Pollutant Selector Grid */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            {pollutants.map((pollutant) => (
              <button
                key={pollutant.id}
                onClick={() => setSelectedPollutant(pollutant.id)}
                className={`relative px-3 py-3 text-xs rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  selectedPollutant === pollutant.id
                    ? `bg-gradient-to-r ${colors.gradient}/20 text-white border border-white/30 shadow-lg ${colors.glow}`
                    : "bg-gray-700/20 text-gray-400 hover:bg-gray-600/30 border border-gray-600/30"
                }`}
              >
                <div className="flex flex-col items-center space-y-1">
                  <span className="font-semibold">{pollutant.label}</span>
                  <span className="text-xs opacity-80">{pollutant.value}</span>
                  <span className="text-xs opacity-60">{pollutant.unit}</span>
                </div>
                {pollutant.critical && (
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                )}
              </button>
            ))}
          </div>

          {/* Enhanced Selected Pollutant Display */}
          <div className={`bg-gradient-to-br from-gray-800/50 to-gray-900/30 rounded-xl p-4 mb-4 backdrop-blur-sm border border-white/10 transition-all duration-500 ${isAnimating ? 'scale-[1.02]' : 'scale-100'}`}>
            <div className="flex items-center justify-between mb-3">
              <div className="flex flex-col">
                <div className="flex items-baseline space-x-2">
                  <span className={`text-3xl font-bold bg-gradient-to-r ${colors.gradient} bg-clip-text text-transparent transition-all duration-500`}>
                    {getPollutantValue()}
                  </span>
                  <span className="text-sm text-gray-400 font-medium">
                    {getPollutantUnit()}
                  </span>
                </div>
                <span className="text-xs text-gray-500 mt-1">
                  Konsentrasi saat ini
                </span>
              </div>

              <div className="flex flex-col items-end space-y-2">
                <div className="flex items-center space-x-3">
                  <span className="text-xl text-gray-200 font-bold">
                    {pollutantInfo.name}
                  </span>
                  <div className={`px-3 py-1 rounded-lg text-xs font-medium ${
                    pollutantInfo.danger === "Sangat Tinggi"
                      ? "bg-red-500/20 text-red-300 border border-red-500/30"
                      : pollutantInfo.danger === "Tinggi"
                      ? "bg-orange-500/20 text-orange-300 border border-orange-500/30"
                      : "bg-yellow-500/20 text-yellow-300 border border-yellow-500/30"
                  }`}>
                    {pollutantInfo.danger}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-400 font-medium">
                    {pollutantInfo.desc}
                  </p>
                  <p className="text-xs text-gray-500">
                    {pollutantInfo.health}
                  </p>
                </div>
              </div>
            </div>

            {/* Pollutant concentration bar */}
            <div className="w-full bg-gray-700/30 rounded-full h-2 overflow-hidden">
              <div
                className={`h-2 rounded-full bg-gradient-to-r ${colors.gradient} relative overflow-hidden transition-all duration-1000`}
                style={{ width: `${Math.min(100, (getPollutantValue() / 100) * 100)}%` }}
              >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/25 to-transparent animate-shine"></div>
              </div>
            </div>
          </div>

          {/* Enhanced Impact & Health Information */}
          <div className="space-y-3">
            {/* Current Health Impact */}
            <div className={`flex items-start space-x-3 p-4 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] ${
              alertLevel >= 3 
                ? "bg-red-500/10 border-red-500/30" 
                : alertLevel >= 2 
                ? "bg-orange-500/10 border-orange-500/30" 
                : "bg-yellow-500/10 border-yellow-500/30"
            }`}>
              <AlertTriangle className={`w-5 h-5 mt-0.5 flex-shrink-0 animate-pulse ${
                alertLevel >= 3 ? "text-red-400" : alertLevel >= 2 ? "text-orange-400" : "text-yellow-400"
              }`} />
              <div>
                <p className={`text-sm font-semibold mb-2 ${
                  alertLevel >= 3 ? "text-red-300" : alertLevel >= 2 ? "text-orange-300" : "text-yellow-300"
                }`}>
                  {alertLevel >= 3 ? "⚠️ Peringatan Kesehatan Serius" : alertLevel >= 2 ? "⚠️ Perhatian Kesehatan" : "⚠️ Waspada Kesehatan"}
                </p>
                <p className="text-xs text-gray-400 mb-2">
                  {alertLevel >= 3 
                    ? "Berbahaya bagi semua orang. Hindari aktivitas outdoor dan gunakan masker N95 jika harus keluar."
                    : alertLevel >= 2 
                    ? "Kelompok sensitif harus membatasi aktivitas outdoor. Gunakan masker saat beraktivitas di luar ruangan."
                    : "Kelompok sensitif mungkin mengalami gejala ringan. Pertimbangkan mengurangi aktivitas outdoor yang intens."
                  }
                </p>
                
                {/* Health recommendations */}
                <div className="flex flex-wrap gap-2 mt-2">
                  <span className="px-2 py-1 bg-black/30 rounded-md text-xs text-gray-300 border border-gray-600/30">
                    {alertLevel >= 3 ? "🏠 Tetap di dalam" : "😷 Gunakan masker"}
                  </span>
                  <span className="px-2 py-1 bg-black/30 rounded-md text-xs text-gray-300 border border-gray-600/30">
                    {alertLevel >= 3 ? "🚫 Hindari olahraga" : "🚶‍♂️ Kurangi aktivitas"}
                  </span>
                  <span className="px-2 py-1 bg-black/30 rounded-md text-xs text-gray-300 border border-gray-600/30">
                    💨 Purifier udara
                  </span>
                </div>
              </div>
            </div>

            {/* Bioethanol Solution */}
            <div className="flex items-start space-x-3 p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-500/30 rounded-xl backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:shadow-green-500/20 hover:shadow-lg">
              <Leaf className="w-5 h-5 text-green-400 mt-0.5 flex-shrink-0 animate-bounce" />
              <div>
                <p className="text-sm text-green-300 font-semibold mb-2 flex items-center gap-2">
                  🌱 Solusi Bioetanol BIOFOUR
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-ping"></div>
                </p>
                <p className="text-xs text-gray-400 mb-3">
                  Bioetanol dapat mengurangi emisi berbahaya secara signifikan dibanding bahan bakar fosil:
                </p>
                
                {/* Emission reduction stats */}
                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div className="bg-black/20 rounded-lg p-2 border border-green-500/20">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">CO₂</span>
                      <span className="text-sm font-bold text-green-300">-75%</span>
                    </div>
                  </div>
                  <div className="bg-black/20 rounded-lg p-2 border border-green-500/20">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">NOx</span>
                      <span className="text-sm font-bold text-green-300">-85%</span>
                    </div>
                  </div>
                  <div className="bg-black/20 rounded-lg p-2 border border-green-500/20">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">PM</span>
                      <span className="text-sm font-bold text-green-300">-90%</span>
                    </div>
                  </div>
                  <div className="bg-black/20 rounded-lg p-2 border border-green-500/20">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-400">SO₂</span>
                      <span className="text-sm font-bold text-green-300">-95%</span>
                    </div>
                  </div>
                </div>
                
                <p className="text-xs text-green-400 font-medium">
                  💡 Dengan bioetanol, kita bisa menciptakan udara yang lebih bersih untuk generasi mendatang!
                </p>
              </div>
            </div>

            {/* Data Source Info */}
            <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-700/30">
              <span className="flex items-center gap-2">
                <div className="w-1 h-1 bg-blue-400 rounded-full animate-pulse"></div>
                Data simulasi berdasarkan kondisi industri Cilegon
              </span>
              <span className="flex items-center gap-1">
                <Factory className="w-3 h-3" />
                Kawasan Industri
              </span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Additional floating particles animation */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-2xl">
        <div className="absolute top-4 left-4 w-1 h-1 bg-gray-400/30 rounded-full animate-float-slow"></div>
        <div className="absolute top-8 right-6 w-1 h-1 bg-gray-400/20 rounded-full animate-float-delayed"></div>
        <div className="absolute bottom-6 left-8 w-1 h-1 bg-gray-400/40 rounded-full animate-float-reverse"></div>
        <div className="absolute bottom-4 right-4 w-1 h-1 bg-gray-400/25 rounded-full animate-float-slow"></div>
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
      
      {/* Custom CSS for additional animations */}
      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(200%); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-8px); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }
        
        @keyframes float-reverse {
          0%, 100% { transform: translateY(-4px); }
          50% { transform: translateY(4px); }
        }
        
        .animate-shine {
          animation: shine 3s infinite;
        }
        
        .animate-float-slow {
          animation: float-slow 4s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: float-delayed 5s ease-in-out infinite 1s;
        }
        
        .animate-float-reverse {
          animation: float-reverse 3.5s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default memo(Home);
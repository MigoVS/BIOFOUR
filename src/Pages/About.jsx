import React, { useEffect, memo, useMemo } from "react"
import { FileText, Code, Award, Globe, ArrowUpRight, Sparkles, UserCheck, TrendingUp, Beaker, Activity } from "lucide-react"
import AOS from 'aos'
import 'aos/dist/aos.css'

// Memoized Components
const Header = memo(() => (
  <div className="text-center mb-8 px-4 sm:px-[5%]">
    <div className="inline-block relative group">
      <h2 
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]" 
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        Bioetanol
      </h2>
    </div>
    <p 
      className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-5 h-5 text-purple-400" />
      Bioetanol Bahan Bakar Ramah Lingkungan
      <Sparkles className="w-5 h-5 text-purple-400" />
    </p>
  </div>
));

const ProfileImage = memo(() => (
  <div className="flex justify-center sm:justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
    <div 
      className="relative group" 
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      {/* Optimized gradient backgrounds with reduced complexity for mobile */}
      <div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-indigo-500 to-purple-600 rounded-full blur-2xl animate-spin-slower" />
        <div className="absolute inset-0 bg-gradient-to-l from-fuchsia-500 via-rose-500 to-pink-600 rounded-full blur-2xl animate-pulse-slow opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600 via-cyan-500 to-teal-400 rounded-full blur-2xl animate-float opacity-50" />
      </div>

      <div className="relative">
        <div className="w-72 h-72 sm:w-80 sm:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(120,119,198,0.3)] transform transition-all duration-700 group-hover:scale-105">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full z-20 transition-all duration-700 group-hover:border-white/40 group-hover:scale-105" />
          
          {/* Optimized overlay effects - disabled on mobile */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10 transition-opacity duration-700 group-hover:opacity-0 hidden sm:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 via-transparent to-blue-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:block" />
          
          <img
            src="/Photo.png"
            alt="Profile"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-2"
            loading="lazy"
          />

          {/* Advanced hover effects - desktop only */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 hidden sm:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/10 to-transparent transform translate-y-full group-hover:-translate-y-full transition-transform duration-1000 delay-100" />
            <div className="absolute inset-0 rounded-full border-8 border-white/10 scale-0 group-hover:scale-100 transition-transform duration-700 animate-pulse-slow" />
          </div>
        </div>
      </div>
    </div>
  </div>
));

const DensityCard = memo(({ day, value, index, isHighest, isLowest }) => {
  const cardColor = isHighest 
    ? "from-emerald-500/20 via-green-500/10 to-teal-500/20" 
    : isLowest 
    ? "from-amber-500/20 via-orange-500/10 to-red-500/20"
    : "from-purple-500/20 via-indigo-500/10 to-blue-500/20";

  const glowColor = isHighest 
    ? "shadow-[0_0_30px_rgba(16,185,129,0.3)]" 
    : isLowest 
    ? "shadow-[0_0_30px_rgba(245,158,11,0.3)]"
    : "shadow-[0_0_30px_rgba(139,92,246,0.3)]";

  const iconColor = isHighest 
    ? "text-emerald-400" 
    : isLowest 
    ? "text-amber-400"
    : "text-purple-400";

  return (
    <div 
      data-aos="fade-up" 
      data-aos-duration={800 + index * 100}
      data-aos-delay={index * 50}
      className="relative group"
    >
      {/* Luxury background effects */}
      <div className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-all duration-700">
        <div className={`absolute inset-0 bg-gradient-to-r ${cardColor} rounded-3xl blur-xl`} />
        <div className="absolute inset-0 bg-gradient-to-l from-white/5 to-transparent rounded-3xl" />
      </div>

      <div className={`relative z-10 bg-gray-900/60 backdrop-blur-xl rounded-3xl p-4 lg:p-6 xl:p-8 border border-white/10 overflow-hidden transition-all duration-500 hover:scale-105 hover:border-white/20 ${glowColor} hover:shadow-2xl group-hover:bg-gray-800/60`}>
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-white/20 to-transparent rounded-full transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-700" />
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-white/10 to-transparent rounded-full transform -translate-x-12 translate-y-12 group-hover:scale-125 transition-transform duration-700" />
        </div>

        {/* Header with day indicator */}
        <div className="flex flex-col gap-3 mb-4 lg:mb-6">
          <div className="flex items-center gap-2 lg:gap-3">
            <div className={`w-8 h-8 lg:w-10 lg:h-10 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center group-hover:rotate-6 transition-transform duration-300 flex-shrink-0`}>
              <Beaker className={`w-4 h-4 lg:w-5 lg:h-5 ${iconColor}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs lg:text-sm font-medium text-gray-300 uppercase tracking-wider truncate">Hari Ke-{day}</p>
              <p className="text-xs text-gray-500 hidden lg:block">Pengukuran Densitas</p>
            </div>
          </div>
          
          {(isHighest || isLowest) && (
            <div className="flex justify-center">
              {isHighest && (
                <div className="flex items-center gap-1 px-3 py-1 bg-emerald-500/20 rounded-full border border-emerald-500/30">
                  <TrendingUp className="w-3 h-3 text-emerald-400 flex-shrink-0" />
                  <span className="text-xs font-medium text-emerald-400">Tertinggi</span>
                </div>
              )}
              
              {isLowest && (
                <div className="flex items-center gap-1 px-3 py-1 bg-amber-500/20 rounded-full border border-amber-500/30">
                  <Activity className="w-3 h-3 text-amber-400 flex-shrink-0" />
                  <span className="text-xs font-medium text-amber-400">Terendah</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Main value display */}
        <div className="text-center mb-4 lg:mb-6">
          <div className="relative px-2">
            <span className="text-xl sm:text-2xl lg:text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 group-hover:from-purple-200 group-hover:to-purple-400 transition-all duration-300 leading-tight block">
              {value}
            </span>
            <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg" />
          </div>
          <p className="text-xs lg:text-sm text-gray-400 mt-1 lg:mt-2 font-medium">gr/cm³</p>
        </div>

        {/* Progress bar indicator */}
        <div className="mb-3 lg:mb-4">
          <div className="w-full bg-gray-800/50 rounded-full h-1.5 lg:h-2 overflow-hidden">
            <div 
              className={`h-full bg-gradient-to-r ${isHighest ? 'from-emerald-400 to-green-500' : isLowest ? 'from-amber-400 to-orange-500' : 'from-purple-400 to-indigo-500'} rounded-full transition-all duration-1000 group-hover:animate-pulse`}
              style={{ width: `${((parseFloat(value) - 1.1) / 0.2) * 100}%` }}
            />
          </div>
        </div>

        {/* Footer description */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="text-xs lg:text-sm">Massa per volume</span>
          <ArrowUpRight className="w-3 h-3 lg:w-4 lg:h-4 opacity-50 group-hover:opacity-100 group-hover:text-purple-400 transition-all duration-300 transform group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>

        {/* Luxury shine effect */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </div>
    </div>
  );
});

const DensitySection = memo(() => {
  const densityData = [
    { day: 3, value: "1,23302" },
    { day: 4, value: "1,17309" },
    { day: 5, value: "1,12903" },
    { day: 6, value: "1,23102" },
    { day: 7, value: "1,27302" }
  ];

  // Find highest and lowest values
  const values = densityData.map(d => parseFloat(d.value.replace(',', '.')));
  const maxValue = Math.max(...values);
  const minValue = Math.min(...values);

  return (
    <div className="mt-20 mb-10 relative">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/5 to-indigo-500/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-l from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl animate-float-delayed" />
      </div>

              <div className="text-center mb-10 px-4 sm:px-[5%]">
        <div className="inline-block relative group">
          {/* Title with enhanced styling */}
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 via-transparent to-indigo-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <h2 
            className="relative text-5xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a855f7]" 
            data-aos="zoom-in-up"
            data-aos-duration="600"
          >
            Analisis Densitas
          </h2>
        </div>
        
        <div className="mt-6 space-y-2">
          <p 
            className="text-gray-400 max-w-3xl mx-auto text-lg sm:text-xl flex items-center justify-center gap-3"
            data-aos="zoom-in-up"
            data-aos-duration="800"
          >
            <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
            Pengukuran Densitas Ampas Tebu Selama 5 Hari Berturut-turut
            <Sparkles className="w-6 h-6 text-purple-400 animate-pulse" />
          </p>
          <p 
            className="text-gray-500 text-sm max-w-2xl mx-auto"
            data-aos="fade-up"
            data-aos-duration="1000"
          >
            Monitoring perubahan massa jenis material dalam proses fermentasi bioetanol
          </p>
        </div>

        {/* Summary stats */}
        <div 
          className="mt-8 flex flex-wrap justify-center gap-6"
          data-aos="fade-up"
          data-aos-duration="1200"
        >
          <div className="bg-gray-900/40 backdrop-blur-sm rounded-2xl px-6 py-3 border border-gray-700/50">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Rata-rata</p>
            <p className="text-lg font-bold text-purple-300">{(values.reduce((a, b) => a + b, 0) / values.length).toFixed(5).replace('.', ',')} gr/cm³</p>
          </div>
          <div className="bg-gray-900/40 backdrop-blur-sm rounded-2xl px-6 py-3 border border-gray-700/50">
            <p className="text-xs text-gray-400 uppercase tracking-wider">Range</p>
            <p className="text-lg font-bold text-indigo-300">{(maxValue - minValue).toFixed(5).replace('.', ',')} gr/cm³</p>
          </div>
        </div>
      </div>

      {/* Enhanced density cards grid */}
      <div className="w-full mx-auto relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {densityData.map((data, index) => {
            const currentValue = parseFloat(data.value.replace(',', '.'));
            return (
              <DensityCard
                key={index}
                day={data.day}
                value={data.value}
                index={index}
                isHighest={currentValue === maxValue}
                isLowest={currentValue === minValue}
              />
            );
          })}
        </div>
      </div>

      {/* Optional: Trend visualization hint */}
      <div 
        className="mt-12 text-center"
        data-aos="fade-up"
        data-aos-duration="1000"
      >
        <div className="inline-flex items-center gap-2 bg-gray-900/30 backdrop-blur-sm rounded-full px-6 py-3 border border-gray-700/30">
          <Activity className="w-5 h-5 text-purple-400" />
          <span className="text-sm text-gray-400">Tren densitas menunjukkan variasi selama proses fermentasi</span>
        </div>
      </div>
    </div>
  );
});

const AboutPage = () => {
  // Memoized calculations
  const { totalProjects, totalCertificates, YearExperience } = useMemo(() => {
    // Using placeholder data instead of localStorage for demo
    const storedProjects = [1, 2, 3]; // Simulated data
    const storedCertificates = [1, 2]; // Simulated data
    
    const startDate = new Date("2021-11-06");
    const today = new Date();
    const experience = today.getFullYear() - startDate.getFullYear() -
      (today < new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate()) ? 1 : 0);

    return {
      totalProjects: storedProjects.length,
      totalCertificates: storedCertificates.length,
      YearExperience: experience
    };
  }, []);

  // Optimized AOS initialization
  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: false, 
      });
    };

    initAOS();
    
    // Debounced resize handler
    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initAOS, 250);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  return (
    <div
      className="h-auto pb-[10%] text-white overflow-hidden px-4 sm:px-[5%] lg:px-[10%] mt-10 sm:mt-0" 
      id="About"
    >
      <Header />

      <div className="w-full mx-auto pt-8 sm:pt-12 relative">
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="space-y-6 text-center lg:text-left">
            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                Apa itu
              </span>
              <span 
                className="block mt-2 text-gray-200"
                data-aos="fade-right"
                data-aos-duration="1300"
              >
                Bioetanol?
              </span>
            </h2>
            
            <p 
              className="text-base sm:text-lg lg:text-xl text-gray-400 leading-relaxed text-justify pb-4 sm:pb-0"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              Bioetanol adalah jenis bahan bakar alternatif yang terbuat dari bahan-bahan organik, terutama tanaman yang mengandung karbohidrat atau gula. Proses pembuatannya melibatkan fermentasi biomassa dengan bantuan mikroorganisme untuk mengubah gula menjadi etanol (etil alkohol atau C2H5OH).
            </p>

            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-4 lg:gap-4 lg:px-0 w-full">
              <a href="https://www.accuweather.com/id/id/cilegon/202266/air-quality-index/202266" className="w-full">
                <button 
                  data-aos="fade-up"
                  data-aos-duration="800"
                  className="w-full sm:w-auto sm:px-6 py-2 sm:py-3 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 shadow-lg hover:shadow-xl animate-bounce-slow"
                >
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" /> Kualitas Udara Kota Cilegon
                </button>
              </a>
              <a href="#Portofolio" className="w-full">
                <button 
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  className="w-full sm:w-auto sm:px-6 py-2 sm:py-3 rounded-lg border border-[#a855f7]/50 text-[#a855f7] font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center lg:justify-start gap-2 hover:bg-[#a855f7]/10 animate-bounce-slow delay-200"
                >
                  <Code className="w-4 h-4 sm:w-5 sm:h-5" /> View Projects
                </button>
              </a>
            </div>
          </div>

          <ProfileImage />
        </div>

        {/* Enhanced Density Section */}
        <DensitySection />
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(2deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(-2deg); }
        }
        @keyframes spin-slower {
          to { transform: rotate(360deg); }
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 8s linear infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 8s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default memo(AboutPage);
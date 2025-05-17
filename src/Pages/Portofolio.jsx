import React, { useEffect, useState, useCallback } from "react";
import { db, collection } from "../firebase";
import { getDocs } from "firebase/firestore";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CardProject from "../components/CardProject";
import TechStackIcon from "../components/TechStackIcon";
import AOS from "aos";
import "aos/dist/aos.css";
import Certificate from "../components/Certificate";
// Import Lucide React icons
import { Code, Award, Boxes, Atom, Fuel, Trophy, Medal, Image, Cpu } from "lucide-react";

// Missing component definitions
const Champion = ({ ImgSertif }) => (
  <div className="rounded-xl overflow-hidden border border-white/10 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20">
    <img src={ImgSertif} alt="Champion" className="w-full h-auto" />
  </div>
);

const Certif = ({ ImgSertif }) => (
  <div className="rounded-xl overflow-hidden border border-white/10 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20">
    <img src={ImgSertif} alt="Certificate" className="w-full h-auto" />
  </div>
);

const Photo = ({ ImgSertif }) => (
  <div className="rounded-xl overflow-hidden border border-white/10 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20">
    <img src={ImgSertif} alt="Photo" className="w-full h-auto" />
  </div>
);

// Add PropTypes for the new components
Champion.propTypes = {
  ImgSertif: PropTypes.string.isRequired,
};

Certif.propTypes = {
  ImgSertif: PropTypes.string.isRequired,
};

Photo.propTypes = {
  ImgSertif: PropTypes.string.isRequired,
};

// Separate ShowMore/ShowLess button component
const ToggleButton = ({ onClick, isShowingMore }) => (
  <button
    onClick={onClick}
    className="
      px-3 py-1.5
      text-slate-300 
      hover:text-white 
      text-sm 
      font-medium 
      transition-all 
      duration-300 
      ease-in-out
      flex 
      items-center 
      gap-2
      bg-white/5 
      hover:bg-white/10
      rounded-md
      border 
      border-white/10
      hover:border-white/20
      backdrop-blur-sm
      group
      relative
      overflow-hidden
    "
  >
    <span className="relative z-10 flex items-center gap-2">
      {isShowingMore ? "See Less" : "See More"}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`
          transition-transform 
          duration-300 
          ${isShowingMore ? "group-hover:-translate-y-0.5" : "group-hover:translate-y-0.5"}
        `}
      >
        <polyline points={isShowingMore ? "18 15 12 9 6 15" : "6 9 12 15 18 9"}></polyline>
      </svg>
    </span>
    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500/50 transition-all duration-300 group-hover:w-full"></span>
  </button>
);

// Add PropTypes for ToggleButton
ToggleButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  isShowingMore: PropTypes.bool.isRequired,
};

function TabPanel({ children, value, index, ...other }) {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: { xs: 1, sm: 3 } }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

const techStacks = [
  { icon: "html.svg", language: "HTML" },
  { icon: "css.svg", language: "CSS" },
  { icon: "javascript.svg", language: "JavaScript" },
  { icon: "tailwind.svg", language: "Tailwind CSS" },
  { icon: "reactjs.svg", language: "ReactJS" },
  { icon: "vite.svg", language: "Vite" },
  { icon: "nodejs.svg", language: "Node JS" },
  { icon: "bootstrap.svg", language: "Bootstrap" },
  { icon: "firebase.svg", language: "Firebase" },
  { icon: "MUI.svg", language: "Material UI" },
  { icon: "vercel.svg", language: "Vercel" },
  { icon: "SweetAlert.svg", language: "SweetAlert2" },
];

export default function FullWidthTabs() {
  const theme = useTheme();
  const [value, setValue] = useState(0);
  const [projects, setProjects] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [emisi, setEmisi] = useState([]);
  const [champion, setChampion] = useState([]);
  const [certif, setCertif] = useState([]);
  const [photo, setPhoto] = useState([]);
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [showAllCertificates, setShowAllCertificates] = useState(false);
  const [showAllEmisi, setShowAllEmisi] = useState(false);
  const [showAllChampion, setShowAllChampion] = useState(false);
  const [showAllCertif, setShowAllCertif] = useState(false); // Fixed typo here
  const [showAllPhoto, setShowAllPhoto] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const initialItems = isMobile ? 4 : 6;

  // Check if it's mobile on mount and when window resizes
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkIfMobile();
    
    // Add event listener for window resize
    window.addEventListener('resize', checkIfMobile);
    
    // Clean up
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    // Initialize AOS once
    AOS.init({
      once: false, // This will make animations occur only once
    });
  }, []);

  const fetchData = useCallback(async () => {
    try {
      // Check if we have cached data in localStorage
      const cachedProjects = localStorage.getItem("projects");
      const cachedCertificates = localStorage.getItem("certificates");
      const cachedEmisi = localStorage.getItem("emisi");
      const cachedChampion = localStorage.getItem("champion");
      const cachedCertif = localStorage.getItem("certif");
      const cachedPhoto = localStorage.getItem("photo");
      
      if (cachedProjects) {
        setProjects(JSON.parse(cachedProjects));
        setCertificates(JSON.parse(cachedCertificates || '[]'));
        setEmisi(JSON.parse(cachedEmisi || '[]'));
        setChampion(JSON.parse(cachedChampion || '[]'));
        setCertif(JSON.parse(cachedCertif || '[]'));
        setPhoto(JSON.parse(cachedPhoto || '[]'));
        return;
      }

      const projectCollection = collection(db, "projects");
      const certificateCollection = collection(db, "certificates");
      const emisiCollection = collection(db, "emisi");
      const championCollection = collection(db, "champion");
      const certifCollection = collection(db, "certif");
      const photoCollection = collection(db, "photo");

      const [projectSnapshot, certificateSnapshot, emisiSnapshot, championSnapshot, certifSnapshot, photoSnapshot] = await Promise.all([
        getDocs(projectCollection),
        getDocs(certificateCollection),
        getDocs(emisiCollection),
        getDocs(championCollection),
        getDocs(certifCollection),
        getDocs(photoCollection),
      ]);

      const projectData = projectSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        TechStack: doc.data().TechStack || [],
      }));

      const certificateData = certificateSnapshot.docs.map((doc) => doc.data());

      const emisiData = emisiSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        TechStack: doc.data().TechStack || [],
      }));

      const championData = championSnapshot.docs.map((doc) => doc.data());

      const certifData = certifSnapshot.docs.map((doc) => doc.data());

      const photoData = photoSnapshot.docs.map((doc) => doc.data());

      setProjects(projectData);
      setCertificates(certificateData);
      setEmisi(emisiData);
      setChampion(championData);
      setCertif(certifData);
      setPhoto(photoData);

      // Store in localStorage
      localStorage.setItem("projects", JSON.stringify(projectData));
      localStorage.setItem("certificates", JSON.stringify(certificateData));
      localStorage.setItem("emisi", JSON.stringify(emisiData));
      localStorage.setItem("champion", JSON.stringify(championData));
      localStorage.setItem("certif", JSON.stringify(certifData));
      localStorage.setItem("photo", JSON.stringify(photoData));
    } catch (error) {
      console.error("Error fetching data:", error);
      // Use empty arrays if fetching fails
      setProjects([]);
      setCertificates([]);
      setEmisi([]);
      setChampion([]);
      setCertif([]);
      setPhoto([]);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const toggleShowMore = useCallback((type) => {
    if (type === 'projects') {
      setShowAllProjects(prev => !prev);
    } else if (type === 'certificates') {
      setShowAllCertificates(prev => !prev);
    } else if (type === 'emisi') {
      setShowAllEmisi(prev => !prev);
    } else if (type === 'champion') {
      setShowAllChampion(prev => !prev);
    } else if (type === 'certif') {
      setShowAllCertif(prev => !prev); // Fixed typo here
    } else if (type === 'photo') {
      setShowAllPhoto(prev => !prev);
    }
  }, []);

  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);
  const displayedEmisi = showAllEmisi ? emisi : emisi.slice(0, initialItems);
  const displayedChampion = showAllChampion ? champion : champion.slice(0, initialItems);
  const displayedCertif = showAllCertif ? certif : certif.slice(0, initialItems);
  const displayedPhoto = showAllPhoto ? photo : photo.slice(0, initialItems);
  

  return (
    <div className="md:px-[10%] px-[5%] w-full sm:mt-0 mt-[3rem] bg-[#030014] overflow-hidden" id="Portofolio">
      {/* Header section - unchanged */}
      <div className="text-center pb-10" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
          <span style={{
            color: '#6366f1',
            backgroundImage: 'linear-gradient(45deg, #6366f1 10%, #a855f7 93%)',
            WebkitBackgroundClip: 'text',
            backgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Kandungan Bioetanol
          </span>
        </h2>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm md:text-base mt-2">
        Jelajahi kandungan proyek kami melalui Kadar Glukosa, Kadar Etanol, dan Hasil uji emisi gas buang kendaraan bermotor. 
        Setiap bagian mewakili tonggak sejarah dalam jalur pembelajaran berkelanjutan kami.
        </p>
      </div>

      <Box sx={{ width: "100%" }}>
        {/* AppBar and Tabs section - updated icons */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: "20px",
            position: "relative",
            overflow: "hidden",
            "&::before": {
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              background: "linear-gradient(180deg, rgba(139, 92, 246, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)",
              backdropFilter: "blur(10px)",
              zIndex: 0,
            },
          }}
          className="md:px-4"
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
            aria-label="scrollable tabs"
            sx={{
              minHeight: "70px",
              "& .MuiTab-root": {
                fontSize: { xs: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: "20px 10px",
                zIndex: 1,
                margin: "8px",
                borderRadius: "12px",
                minWidth: "max-content",
                "&:hover": {
                  color: "#ffffff",
                  backgroundColor: "rgba(139, 92, 246, 0.1)",
                  transform: "translateY(-2px)",
                  "& .lucide": {
                    transform: "scale(1.1) rotate(5deg)",
                  },
                },
                "&.Mui-selected": {
                  color: "#fff",
                  background: "linear-gradient(135deg, rgba(139, 92, 246, 0.2), rgba(59, 130, 246, 0.2))",
                  boxShadow: "0 4px 15px -3px rgba(139, 92, 246, 0.2)",
                  "& .lucide": {
                    color: "#a78bfa",
                  },
                },
              },
              "& .MuiTabs-indicator": {
                height: 0,
              },
              "& .MuiTabs-scrollButtons": {
                color: "#94a3b8",
                "&.Mui-disabled": {
                  opacity: 0.3,
                },
              },
            }}
          >
            <Tab
              icon={<Code className="mb-2 w-5 h-5 transition-all duration-300" />}
              label={isMobile ? "Glukosa" : "Glukosa"}
              {...a11yProps(0)}
            />
            <Tab
              icon={<Atom className="mb-2 w-5 h-5 transition-all duration-300" />}
              label={isMobile ? "Etanol" : "Kadar Etanol"}
              {...a11yProps(1)}
            />
            <Tab
              icon={<Fuel className="mb-2 w-5 h-5 transition-all duration-300" />}
              label={isMobile ? "Emisi" : "Hasil Uji Emisi Gas Buang"}
              {...a11yProps(2)}
            />
            <Tab
              icon={<Trophy className="mb-2 w-5 h-5 transition-all duration-300" style={{ transform: "rotate(0deg)" }} />}
              label={isMobile ? "Champ" : "Biofour Champion"}
              {...a11yProps(3)}
            />
            <Tab
              icon={<Medal className="mb-2 w-5 h-5 transition-all duration-300" />}
              label={isMobile ? "Certif" : "Certificate"}
              {...a11yProps(4)}
            />
            <Tab
              icon={<Image className="mb-2 w-5 h-5 transition-all duration-300" />}
              label={isMobile ? "Photo" : "Photo"}
              {...a11yProps(5)}
            />
            <Tab
              icon={<Cpu className="mb-2 w-5 h-5 transition-all duration-300" />}
              label={isMobile ? "Tech" : "Teknologi dalam Website"}
              {...a11yProps(6)}
            />
          </Tabs>
        </AppBar>

        {isMobile && (
          <div className="text-xs text-slate-400 text-center mt-2 mb-3">
            <span>← Geser untuk melihat tab lainnya →</span>
          </div>
        )}

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={setValue}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                {displayedProjects.map((project, index) => (
                  <div
                    key={project.id || index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <CardProject
                      Img={project.Img}
                      Title={project.Title}
                      Description={project.Description}
                      Link={project.Link}
                      id={project.id}
                    />
                  </div>
                ))}
              </div>
            </div>
            {projects.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('projects')}
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
                {displayedCertificates.map((certificate, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <Certificate ImgSertif={certificate.Img} />
                  </div>
                ))}
              </div>
            </div>
            {certificates.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('certificates')}
                  isShowingMore={showAllCertificates}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-5">
                {displayedEmisi.map((emisi, index) => (
                  <div
                    key={emisi.id || index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <CardProject
                      Img={emisi.Img}
                      Title={emisi.Title}
                      Description={emisi.Description}
                      Link={emisi.Link}
                      id={emisi.id}
                    />
                  </div>
                ))}
              </div>
            </div>
            {emisi.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('emisi')}
                  isShowingMore={showAllEmisi}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={3} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
                {displayedChampion.map((champion, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <Champion ImgSertif={champion.Img} />
                  </div>
                ))}
              </div>
            </div>
            {champion.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('champion')}
                  isShowingMore={showAllChampion}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={4} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
                {displayedCertif.map((certif, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <Certif ImgSertif={certif.Img} />
                  </div>
                ))}
              </div>
            </div>
            {certif.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('certif')}
                  isShowingMore={showAllCertif}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={5} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-3 md:gap-5 gap-4">
                {displayedPhoto.map((photo, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <Photo ImgSertif={photo.Img} />
                  </div>
                ))}
              </div>
            </div>
            {photo.length > initialItems && (
              <div className="mt-6 w-full flex justify-start">
                <ToggleButton
                  onClick={() => toggleShowMore('photo')}
                  isShowingMore={showAllPhoto}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={6} dir={theme.direction}>
            <div className="container mx-auto flex justify-center items-center overflow-hidden pb-[5%]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 lg:gap-8 gap-5">
                {techStacks.map((stack, index) => (
                  <div
                    key={index}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                  >
                    <TechStackIcon TechStackIcon={stack.icon} Language={stack.language} />
                  </div>
                ))}
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>
      </Box>
    </div>
  );
}
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
// Import Lucide React icons
import { Code, Award, Boxes, Atom, Fuel, Trophy, Medal, Image, Cpu } from "lucide-react";

// Standardized certificate component that works for all certificate types
const CertificateDisplay = ({ ImgSertif, id, alt }) => (
  <div className="rounded-xl overflow-hidden border border-white/10 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20 group relative">
    <img src={ImgSertif} alt={alt || `Certificate-${id}`} className="w-full h-auto" />
    
    {/* View Overlay - appears on hover */}
    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
      <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg flex items-center space-x-2">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
          <circle cx="12" cy="12" r="2"></circle>
          <path d="M2 12s3.5-5 10-5 10 5 10 5-3.5 5-10 5-10-5-10-5z"></path>
        </svg>
        <span className="text-white font-medium text-sm">View</span>
      </div>
    </div>
  </div>
);

// Add PropTypes for the standardized component
CertificateDisplay.propTypes = {
  ImgSertif: PropTypes.string.isRequired,
  id: PropTypes.string,
  alt: PropTypes.string
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
        <Box sx={{ p: { xs: 0, sm: 3 } }}>
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
  const [showAllCertif, setShowAllCertif] = useState(false);
  const [showAllPhoto, setShowAllPhoto] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const initialItems = isMobile ? 4 : 6;

  // Modal state for image viewing
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

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
      once: false, // This will make animations occur each time
    });
  }, []);

  // Helper function to check if cache is valid (not older than 1 hour)
  const isCacheValid = (timestamp) => {
    if (!timestamp) return false;
    const now = new Date().getTime();
    const cacheTime = parseInt(timestamp);
    // Cache valid for 1 hour (3600000 milliseconds)
    return (now - cacheTime) < 3600000;
  };

  const fetchData = useCallback(async () => {
    try {
      // Check if we have valid cached data in localStorage
      const cacheTimestamp = localStorage.getItem("bioetanolCacheTimestamp");
      const isValid = isCacheValid(cacheTimestamp);
      
      if (isValid) {
        const cachedProjects = localStorage.getItem("projects");
        const cachedCertificates = localStorage.getItem("certificates");
        const cachedEmisi = localStorage.getItem("emisi");
        const cachedChampion = localStorage.getItem("champion");
        const cachedCertif = localStorage.getItem("certif");
        const cachedPhoto = localStorage.getItem("photo");
        
        if (cachedProjects && cachedCertificates && cachedEmisi && 
            cachedChampion && cachedCertif && cachedPhoto) {
          setProjects(JSON.parse(cachedProjects));
          setCertificates(JSON.parse(cachedCertificates));
          setEmisi(JSON.parse(cachedEmisi));
          setChampion(JSON.parse(cachedChampion));
          setCertif(JSON.parse(cachedCertif));
          setPhoto(JSON.parse(cachedPhoto));
          return;
        }
      }

      // Cache is invalid or doesn't exist, fetch fresh data
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

      // Process the data with unique IDs to ensure proper image references
      const projectData = projectSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        Img: doc.data().Img || '',
        TechStack: doc.data().TechStack || [],
      }));

      const certificateData = certificateSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        Img: doc.data().Img || '',
      }));

      const emisiData = emisiSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        Img: doc.data().Img || '',
        TechStack: doc.data().TechStack || [],
      }));

      const championData = championSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        Img: doc.data().Img || '',
      }));

      const certifData = certifSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        Img: doc.data().Img || '',
      }));

      const photoData = photoSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        Img: doc.data().Img || '',
      }));

      // Set state with the fresh data
      setProjects(projectData);
      setCertificates(certificateData);
      setEmisi(emisiData);
      setChampion(championData);
      setCertif(certifData);
      setPhoto(photoData);

      // Store fresh data in localStorage with timestamp
      localStorage.setItem("projects", JSON.stringify(projectData));
      localStorage.setItem("certificates", JSON.stringify(certificateData));
      localStorage.setItem("emisi", JSON.stringify(emisiData));
      localStorage.setItem("champion", JSON.stringify(championData));
      localStorage.setItem("certif", JSON.stringify(certifData));
      localStorage.setItem("photo", JSON.stringify(photoData));
      localStorage.setItem("bioetanolCacheTimestamp", new Date().getTime().toString());
      
      // Output data to console for debugging
      console.log("Fetched fresh data from Firebase");
      console.log("Sample champion data:", championData.slice(0, 2));
      console.log("Sample certif data:", certifData.slice(0, 2));
      console.log("Sample photo data:", photoData.slice(0, 2));
      
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

  const handleChangeIndex = (index) => {
    setValue(index);
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
      setShowAllCertif(prev => !prev);
    } else if (type === 'photo') {
      setShowAllPhoto(prev => !prev);
    }
  }, []);

  // Function to open image in modal
  const openImageModal = (imageUrl) => {
    setSelectedImage(imageUrl);
    setModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setModalOpen(false);
    setSelectedImage("");
  };

  // Make sure we're displaying the correct number of items
  const displayedProjects = showAllProjects ? projects : projects.slice(0, initialItems);
  const displayedCertificates = showAllCertificates ? certificates : certificates.slice(0, initialItems);
  const displayedEmisi = showAllEmisi ? emisi : emisi.slice(0, initialItems);
  const displayedChampion = showAllChampion ? champion : champion.slice(0, initialItems);
  const displayedCertif = showAllCertif ? certif : certif.slice(0, initialItems);
  const displayedPhoto = showAllPhoto ? photo : photo.slice(0, initialItems);

  return (
    <div className="w-full max-w-full px-3 sm:px-4 md:px-[5%] lg:px-[10%] sm:mt-0 mt-[3rem] bg-[#030014] overflow-x-hidden" id="Portofolio">
      {/* Header section - responsive padding */}
      <div className="text-center pb-6 sm:pb-10 px-2 sm:px-0" data-aos="fade-up" data-aos-duration="1000">
        <h2 className="inline-block text-2xl sm:text-3xl md:text-5xl font-bold text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
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
        <p className="text-slate-400 max-w-2xl mx-auto text-xs sm:text-sm md:text-base mt-2 px-2 sm:px-0">
        Jelajahi kandungan proyek kami melalui Kadar Glukosa, Kadar Etanol, dan Hasil uji emisi gas buang kendaraan bermotor. 
        Setiap bagian mewakili tonggak sejarah dalam jalur pembelajaran berkelanjutan kami.
        </p>
      </div>

      {/* Image Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-2 sm:p-4" onClick={closeModal}>
          <div className="max-w-full sm:max-w-4xl max-h-[90vh] overflow-auto relative" onClick={(e) => e.stopPropagation()}>
            <button 
              className="absolute top-2 right-2 sm:top-4 sm:right-4 z-10 bg-black/50 text-white rounded-full w-8 h-8 flex items-center justify-center"
              onClick={closeModal}
            >
              ✕
            </button>
            <img 
              src={selectedImage} 
              alt="Enlarged view" 
              className="max-w-full max-h-[85vh] object-contain rounded-lg"
            />
          </div>
        </div>
      )}

      <Box sx={{ width: "100%", maxWidth: "100%", overflow: "hidden" }}>
        {/* AppBar and Tabs section - responsive design */}
        <AppBar
          position="static"
          elevation={0}
          sx={{
            bgcolor: "transparent",
            border: "1px solid rgba(255, 255, 255, 0.1)",
            borderRadius: { xs: "16px", sm: "20px" },
            position: "relative",
            overflow: "hidden",
            mx: { xs: 0, sm: 0 },
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
              minHeight: { xs: "60px", sm: "70px" },
              px: { xs: 1, sm: 2, md: 4 },
              "& .MuiTab-root": {
                fontSize: { xs: "0.75rem", sm: "0.9rem", md: "1rem" },
                fontWeight: "600",
                color: "#94a3b8",
                textTransform: "none",
                transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                padding: { xs: "16px 8px", sm: "20px 10px" },
                zIndex: 1,
                margin: { xs: "4px", sm: "8px" },
                borderRadius: { xs: "8px", sm: "12px" },
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
              icon={<Code className="mb-1 sm:mb-2 w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300" />}
              label={isMobile ? "Glukosa" : "Glukosa"}
              {...a11yProps(0)}
            />
            <Tab
              icon={<Atom className="mb-1 sm:mb-2 w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300" />}
              label={isMobile ? "Etanol" : "Kadar Etanol"}
              {...a11yProps(1)}
            />
            <Tab
              icon={<Fuel className="mb-1 sm:mb-2 w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300" />}
              label={isMobile ? "Emisi" : "Hasil Uji Emisi Gas Buang"}
              {...a11yProps(2)}
            />
            <Tab
              icon={<Trophy className="mb-1 sm:mb-2 w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300" style={{ transform: "rotate(0deg)" }} />}
              label={isMobile ? "Champ" : "Biofour Champion"}
              {...a11yProps(3)}
            />
            <Tab
              icon={<Medal className="mb-1 sm:mb-2 w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300" />}
              label={isMobile ? "Certif" : "Certificate"}
              {...a11yProps(4)}
            />
            <Tab
              icon={<Image className="mb-1 sm:mb-2 w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300" />}
              label={isMobile ? "Photo" : "Photo"}
              {...a11yProps(5)}
            />
            <Tab
              icon={<Cpu className="mb-1 sm:mb-2 w-4 h-4 sm:w-5 sm:h-5 transition-all duration-300" />}
              label={isMobile ? "Tech" : "Teknologi dalam Website"}
              {...a11yProps(6)}
            />
          </Tabs>
        </AppBar>

        {isMobile && (
          <div className="text-xs text-slate-400 text-center mt-2 mb-3 px-2">
            <span>← Geser untuk melihat tab lainnya →</span>
          </div>
        )}

        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={value}
          onChangeIndex={handleChangeIndex}
          containerStyle={{ 
            width: '100%', 
            maxWidth: '100%',
            overflow: 'hidden'
          }}
          slideStyle={{ 
            overflow: 'hidden',
            width: '100%',
            maxWidth: '100%'
          }}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div className="w-full max-w-full flex justify-center items-center overflow-x-hidden px-1 sm:px-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-3 sm:gap-5 w-full max-w-full">
                {displayedProjects.map((project, index) => (
                  <div
                    key={project.id || `project-${index}`}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                    className="w-full max-w-full"
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
              <div className="mt-4 sm:mt-6 w-full flex justify-start px-1 sm:px-0">
                <ToggleButton
                  onClick={() => toggleShowMore('projects')}
                  isShowingMore={showAllProjects}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={1} dir={theme.direction}>
            <div className="w-full max-w-full flex justify-center items-center overflow-x-hidden px-1 sm:px-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 w-full max-w-full">
                {displayedCertificates.map((certificate, index) => (
                  <div
                    key={certificate.id || `certificate-${index}`}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                    onClick={() => openImageModal(certificate.Img)}
                    className="cursor-pointer w-full max-w-full"
                  >
                    <CertificateDisplay 
                      ImgSertif={certificate.Img} 
                      id={certificate.id || `certificate-${index}`}
                      alt={`Certificate-${certificate.id || index}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            {certificates.length > initialItems && (
              <div className="mt-4 sm:mt-6 w-full flex justify-start px-1 sm:px-0">
                <ToggleButton
                  onClick={() => toggleShowMore('certificates')}
                  isShowingMore={showAllCertificates}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={2} dir={theme.direction}>
            <div className="w-full max-w-full flex justify-center items-center overflow-x-hidden px-1 sm:px-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-3 sm:gap-5 w-full max-w-full">
                {displayedEmisi.map((emisiItem, index) => (
                  <div
                    key={emisiItem.id || `emisi-${index}`}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                    className="w-full max-w-full"
                  >
                    <CardProject
                      Img={emisiItem.Img}
                      Title={emisiItem.Title}
                      Description={emisiItem.Description}
                      Link={emisiItem.Link}
                      id={emisiItem.id}
                    />
                  </div>
                ))}
              </div>
            </div>
            {emisi.length > initialItems && (
              <div className="mt-4 sm:mt-6 w-full flex justify-start px-1 sm:px-0">
                <ToggleButton
                  onClick={() => toggleShowMore('emisi')}
                  isShowingMore={showAllEmisi}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={3} dir={theme.direction}>
            <div className="w-full max-w-full flex justify-center items-center overflow-x-hidden px-1 sm:px-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 w-full max-w-full">
                {displayedChampion.map((champItem, index) => (
                  <div
                    key={champItem.id || `champion-${index}`}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                    onClick={() => openImageModal(champItem.Img)}
                    className="cursor-pointer w-full max-w-full"
                  >
                    <CertificateDisplay 
                      ImgSertif={champItem.Img} 
                      id={champItem.id || `champion-${index}`}
                      alt={`Champion-${champItem.id || index}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            {champion.length > initialItems && (
              <div className="mt-4 sm:mt-6 w-full flex justify-start px-1 sm:px-0">
                <ToggleButton
                  onClick={() => toggleShowMore('champion')}
                  isShowingMore={showAllChampion}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={4} dir={theme.direction}>
            <div className="w-full max-w-full flex justify-center items-center overflow-x-hidden px-1 sm:px-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 w-full max-w-full">
                {displayedCertif.map((certifItem, index) => (
                  <div
                    key={certifItem.id || `certif-${index}`}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                    onClick={() => openImageModal(certifItem.Img)}
                    className="cursor-pointer w-full max-w-full"
                  >
                    <CertificateDisplay 
                      ImgSertif={certifItem.Img} 
                      id={certifItem.id || `certif-${index}`}
                      alt={`Certificate-${certifItem.id || index}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            {certif.length > initialItems && (
              <div className="mt-4 sm:mt-6 w-full flex justify-start px-1 sm:px-0">
                <ToggleButton
                  onClick={() => toggleShowMore('certif')}
                  isShowingMore={showAllCertif}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={5} dir={theme.direction}>
            <div className="w-full max-w-full flex justify-center items-center overflow-x-hidden px-1 sm:px-0">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-5 w-full max-w-full">
                {displayedPhoto.map((photoItem, index) => (
                  <div
                    key={photoItem.id || `photo-${index}`}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                    onClick={() => openImageModal(photoItem.Img)}
                    className="cursor-pointer w-full max-w-full"
                  >
                    <CertificateDisplay 
                      ImgSertif={photoItem.Img} 
                      id={photoItem.id || `photo-${index}`}
                      alt={`Photo-${photoItem.id || index}`}
                    />
                  </div>
                ))}
              </div>
            </div>
            {photo.length > initialItems && (
              <div className="mt-4 sm:mt-6 w-full flex justify-start px-1 sm:px-0">
                <ToggleButton
                  onClick={() => toggleShowMore('photo')}
                  isShowingMore={showAllPhoto}
                />
              </div>
            )}
          </TabPanel>

          <TabPanel value={value} index={6} dir={theme.direction}>
            <div className="w-full max-w-full flex justify-center items-center overflow-x-hidden px-1 sm:px-0 pb-[3%] sm:pb-[5%]">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-5 lg:gap-8 w-full max-w-full">
                {techStacks.map((stack, index) => (
                  <div
                    key={`tech-${index}`}
                    data-aos={index % 3 === 0 ? "fade-up-right" : index % 3 === 1 ? "fade-up" : "fade-up-left"}
                    data-aos-duration={index % 3 === 0 ? "1000" : index % 3 === 1 ? "1200" : "1000"}
                    className="w-full max-w-full"
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
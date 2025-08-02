import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [activeSection, setActiveSection] = useState("Home");
    
    const navItems = [
        { href: "#Home", label: "Home" },
        { href: "#About", label: "Bioetanol" },
        { href: "#About", label: "Densitas" },
        { href: "#Portofolio", label: "Glukosa" },
        { href: "#Portofolio", label: "Kadar Etanol" },
        { href: "#Portofolio", label: "Emisi Gas Buang" },
        { href: "#Contact", label: "Kontak" },
    ];

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
            
            // Get all sections with proper error handling
            const sections = navItems.map(item => {
                const section = document.querySelector(item.href);
                if (section) {
                    const rect = section.getBoundingClientRect();
                    return {
                        id: item.href.replace("#", ""),
                        top: rect.top + window.scrollY,
                        bottom: rect.bottom + window.scrollY,
                        height: rect.height
                    };
                }
                return null;
            }).filter(Boolean);

            // Find active section based on scroll position
            const currentPosition = window.scrollY + 150;
            let active = sections[0]?.id || "Home";
            
            for (const section of sections) {
                if (currentPosition >= section.top && currentPosition < section.bottom) {
                    active = section.id;
                    break;
                }
            }
            
            setActiveSection(active);
        };

        window.addEventListener("scroll", handleScroll, { passive: true });
        handleScroll();
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        // Handle body scroll lock for mobile menu
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        
        // Cleanup on unmount
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    const scrollToSection = (e, href) => {
        e.preventDefault();
        const section = document.querySelector(href);
        if (section) {
            const offsetTop = section.getBoundingClientRect().top + window.scrollY - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: "smooth"
            });
        }
        setIsOpen(false);
    };

    const handleKeyDown = (e, href) => {
        if (e.key === 'Enter' || e.key === ' ') {
            scrollToSection(e, href);
        }
    };

    return (
        <nav
            className={`fixed w-full top-0 z-50 transition-all duration-500 ease-out ${
                isOpen
                    ? "bg-gradient-to-b from-[#030014] via-[#0a0a23] to-[#030014] shadow-2xl"
                    : scrolled
                    ? "bg-[#030014]/80 backdrop-blur-xl border-b border-white/5 shadow-lg"
                    : "bg-transparent"
            }`}
        >
            <div className="mx-auto px-4 sm:px-6 lg:px-[8%] xl:px-[10%]">
                <div className="flex items-center justify-between h-16 lg:h-20">
                    {/* Logo with enhanced styling */}
                    <div className="flex-shrink-0 group">
                        <a
                            href="#Home"
                            onClick={(e) => scrollToSection(e, "#Home")}
                            className="relative text-xl lg:text-2xl font-bold transition-transform duration-300 group-hover:scale-105"
                            onKeyDown={(e) => handleKeyDown(e, "#Home")}
                            tabIndex={0}
                        >
                            <span className="bg-gradient-to-r from-[#a855f7] via-[#6366f1] to-[#8b5cf6] bg-clip-text text-transparent animate-pulse">
                                BIOFOUR
                            </span>
                            <div className="absolute -inset-1 bg-gradient-to-r from-[#a855f7] to-[#6366f1] rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
                        </a>
                    </div>

                    {/* Desktop Navigation with enhanced effects */}
                    <div className="hidden md:block">
                        <div className="ml-8 flex items-center space-x-1 lg:space-x-2">
                            {navItems.map((item, index) => (
                                <a
                                    key={item.label}
                                    href={item.href}
                                    onClick={(e) => scrollToSection(e, item.href)}
                                    onKeyDown={(e) => handleKeyDown(e, item.href)}
                                    tabIndex={0}
                                    className="group relative px-3 lg:px-4 py-2 text-sm lg:text-base font-medium rounded-xl transition-all duration-300 hover:bg-white/5"
                                    style={{
                                        transitionDelay: `${index * 50}ms`
                                    }}
                                >
                                    <span
                                        className={`relative z-10 transition-all duration-300 ${
                                            activeSection === item.href.substring(1)
                                                ? "bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a855f7] bg-clip-text text-transparent font-semibold"
                                                : "text-[#e2d3fd] group-hover:text-white group-hover:scale-105"
                                        }`}
                                    >
                                        {item.label}
                                    </span>
                                    
                                    {/* Active indicator */}
                                    <span
                                        className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full transition-all duration-300 ${
                                            activeSection === item.href.substring(1)
                                                ? "w-full opacity-100"
                                                : "w-0 opacity-0 group-hover:w-full group-hover:opacity-100"
                                        }`}
                                    />
                                    
                                    {/* Hover glow effect */}
                                    <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Enhanced Mobile Menu Button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`relative p-3 text-[#e2d3fd] hover:text-white transition-all duration-300 ease-out transform rounded-xl hover:bg-white/10 ${
                                isOpen ? "rotate-90 scale-110 bg-white/5" : "rotate-0 scale-100"
                            }`}
                            aria-label={isOpen ? "Close menu" : "Open menu"}
                            aria-expanded={isOpen}
                        >
                            <div className="relative z-10">
                                {isOpen ? (
                                    <X className="w-6 h-6 transition-transform duration-300" />
                                ) : (
                                    <Menu className="w-6 h-6 transition-transform duration-300" />
                                )}
                            </div>
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-[#6366f1]/30 to-[#a855f7]/30 opacity-0 hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Enhanced Mobile Menu Overlay */}
            <div
                className={`md:hidden fixed inset-x-0 top-16 bg-gradient-to-b from-[#030014] via-[#0a0a23] to-[#030014] border-t border-white/10 shadow-2xl transition-all duration-500 ease-out transform ${
                    isOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-4 pointer-events-none"
                }`}
                style={{ 
                    height: 'calc(100vh - 4rem)',
                    backdropFilter: 'blur(20px)'
                }}
            >
                <div className="flex flex-col h-full overflow-y-auto">
                    <div className="px-6 py-8 space-y-2 flex-1">
                        {navItems.map((item, index) => (
                            <a
                                key={item.label}
                                href={item.href}
                                onClick={(e) => scrollToSection(e, item.href)}
                                onKeyDown={(e) => handleKeyDown(e, item.href)}
                                tabIndex={isOpen ? 0 : -1}
                                className={`group block px-6 py-4 text-lg font-medium rounded-2xl transition-all duration-500 ease-out hover:bg-white/5 border border-transparent hover:border-white/10 ${
                                    activeSection === item.href.substring(1)
                                        ? "bg-gradient-to-r from-[#6366f1]/20 to-[#a855f7]/20 border-white/20"
                                        : ""
                                }`}
                                style={{
                                    transitionDelay: isOpen ? `${index * 100}ms` : '0ms',
                                    transform: isOpen ? "translateX(0) scale(1)" : "translateX(30px) scale(0.95)",
                                    opacity: isOpen ? 1 : 0,
                                }}
                            >
                                <span
                                    className={`transition-all duration-300 ${
                                        activeSection === item.href.substring(1)
                                            ? "bg-gradient-to-r from-[#6366f1] via-[#8b5cf6] to-[#a855f7] bg-clip-text text-transparent font-semibold"
                                            : "text-[#e2d3fd] group-hover:text-white group-hover:translate-x-2"
                                    }`}
                                >
                                    {item.label}
                                </span>
                                
                                {/* Mobile active indicator */}
                                <div
                                    className={`mt-2 h-0.5 bg-gradient-to-r from-[#6366f1] to-[#a855f7] rounded-full transition-all duration-300 ${
                                        activeSection === item.href.substring(1)
                                            ? "w-full opacity-100"
                                            : "w-0 opacity-0 group-hover:w-1/4 group-hover:opacity-60"
                                    }`}
                                />
                            </a>
                        ))}
                    </div>
                    
                    {/* Mobile menu footer */}
                    <div className="px-6 py-6 border-t border-white/10">
                        <div className="text-center text-sm text-[#e2d3fd]/60">
                            <span className="bg-gradient-to-r from-[#a855f7] to-[#6366f1] bg-clip-text text-transparent font-semibold">
                                BIOFOUR
                            </span>
                            {" "}Research Platform
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
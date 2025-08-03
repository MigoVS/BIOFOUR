import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import { Share2, User, Mail, MessageSquare, Send, Phone, MapPin, Clock, Star, Sparkles, Diamond, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import SocialLinks from "../components/SocialLinks";
import Komentar from "../components/Commentar";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

// Memoized components for better performance
const StatsCard = memo(({ icon, text, bgColor, borderColor, delay }) => (
  <div 
    data-aos="fade-up"
    data-aos-duration="800"
    data-aos-delay={delay}
    className={`${bgColor} backdrop-blur-xl rounded-2xl p-4 ${borderColor} transform transition-all duration-300 hover:scale-105 will-change-transform`}
  >
    <div className="flex items-center gap-2 text-white">
      {icon}
      <span className="font-bold">{text}</span>
    </div>
  </div>
));

const ContactInfoCard = memo(({ info, index }) => (
  <div
    data-aos="fade-up"
    data-aos-duration="600"
    data-aos-delay={index * 100}
    className="group p-6 bg-slate-800/30 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:transform hover:scale-105 will-change-transform"
  >
    <div className="flex items-center gap-4">
      <div className={`p-3 rounded-xl bg-gradient-to-r ${info.color} text-white`}>
        {info.icon}
      </div>
      <div>
        <h3 className="font-semibold text-white text-lg">{info.label}</h3>
        <p className="text-gray-300">{info.value}</p>
      </div>
    </div>
  </div>
));

const FormField = memo(({ icon, type, name, placeholder, value, onChange, disabled, required, delay, isTextarea = false }) => (
  <div
    data-aos="fade-up"
    data-aos-duration="600"
    data-aos-delay={delay}
    className="relative group"
  >
    {React.cloneElement(icon, {
      className: "absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors z-10"
    })}
    {isTextarea ? (
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className="w-full resize-none p-4 pl-12 bg-slate-800/50 rounded-xl border border-purple-500/30 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:border-purple-400/50 h-32 disabled:opacity-50 will-change-auto"
      />
    ) : (
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className="w-full p-4 pl-12 bg-slate-800/50 rounded-xl border border-purple-500/30 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:border-purple-400/50 disabled:opacity-50 will-change-auto"
      />
    )}
    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10 pointer-events-none"></div>
  </div>
));

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    priority: "normal"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState("form");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  // Optimized mouse tracking with throttling
  const handleMouseMove = useCallback((e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    AOS.init({
      once: false,
      duration: 800,
      easing: 'ease-out-cubic'
    });

    // Throttled mouse tracking
    let ticking = false;
    const throttledMouseMove = (e) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleMouseMove(e);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('mousemove', throttledMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', throttledMouseMove);
  }, [handleMouseMove]);

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Enhanced SweetAlert with luxury theme
    Swal.fire({
      title: '<span style="color: #6366f1;">✨ Sending Message...</span>',
      html: '<div style="color: #a855f7;">Please wait while we process your premium message</div>',
      background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
      color: '#ffffff',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
      customClass: {
        popup: 'backdrop-blur-xl border border-purple-500/20'
      }
    });

    try {
      // Create enhanced form data for email
      const emailData = new FormData();
      
      // Add all form fields
      emailData.append('name', formData.name);
      emailData.append('email', formData.email);
      emailData.append('phone', formData.phone || 'Not provided');
      emailData.append('subject', formData.subject || 'Contact Form Submission');
      emailData.append('message', formData.message);
      emailData.append('priority', formData.priority);
      
      // Add metadata for better email formatting
      emailData.append('_subject', `${formData.priority.toUpperCase()} Priority: ${formData.subject || 'Contact Form Submission'} - From ${formData.name}`);
      emailData.append('_template', 'box');
      emailData.append('_captcha', 'false');
      emailData.append('_next', window.location.href);
      
      // Enhanced email content with formatting
      const enhancedMessage = `
=== CONTACT FORM SUBMISSION ===

📋 SUBMISSION DETAILS:
━━━━━━━━━━━━━━━━━━━━━━━━━━

🔸 Name: ${formData.name}
🔸 Email: ${formData.email}
🔸 Phone: ${formData.phone || 'Not provided'}
🔸 Subject: ${formData.subject || 'Contact Form Submission'}
🔸 Priority: ${formData.priority.toUpperCase()}
🔸 Submitted: ${new Date().toLocaleString('id-ID', { 
        timeZone: 'Asia/Jakarta',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
      })} WIB

💬 MESSAGE CONTENT:
━━━━━━━━━━━━━━━━━━━━━━━━━━

${formData.message}

━━━━━━━━━━━━━━━━━━━━━━━━━━
Sent from Portfolio Contact Form
Website: ${window.location.origin}
      `;
      
      emailData.append('Enhanced_Message_Content', enhancedMessage);

      // Submit to FormSubmit
      const response = await fetch('https://formsubmit.co/fahmi.nabeel21@gmail.com', {
        method: 'POST',
        body: emailData
      });

      if (response.ok) {
        // Success message
        Swal.fire({
          title: '<span style="color: #6366f1;">🎉 Success!</span>',
          html: `
            <div style="color: #a855f7; line-height: 1.6;">
              Your premium message has been delivered successfully!<br/>
              <strong>Priority:</strong> ${formData.priority.toUpperCase()}<br/>
              <strong>Expected Response:</strong> Within 24 hours<br/>
              <small style="color: #64748b;">Reference: ${Date.now()}</small>
            </div>
          `,
          icon: 'success',
          background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
          color: '#ffffff',
          confirmButtonColor: '#6366f1',
          confirmButtonText: 'Perfect! 🚀',
          timer: 4000,
          timerProgressBar: true,
          customClass: {
            popup: 'backdrop-blur-xl border border-green-500/20'
          }
        });

        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
          priority: "normal"
        });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Submit error:', error);
      Swal.fire({
        title: '<span style="color: #ef4444;">❌ Error!</span>',
        html: '<div style="color: #f87171;">Something went wrong. Please try again later or contact directly via email.</div>',
        icon: 'error',
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        color: '#ffffff',
        confirmButtonColor: '#ef4444',
        customClass: {
          popup: 'backdrop-blur-xl border border-red-500/20'
        }
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData]);

  // Memoized contact info to prevent re-renders
  const contactInfo = useMemo(() => [
    {
      icon: <Mail className="w-6 h-6" />,
      label: "Email",
      value: "fahmi.nabeel21@gmail.com",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Phone className="w-6 h-6" />,
      label: "Phone",
      value: "+62 xxxx xxxx xxx",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      label: "Location",
      value: "Cilegon Banten, Indonesia",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      label: "Response Time",
      value: "Within 24 hours",
      color: "from-yellow-500 to-orange-500"
    }
  ], []);

  // Memoized stats cards
  const statsCards = useMemo(() => [
    {
      icon: <Star className="w-5 h-5 text-yellow-500" />,
      text: "5.0 Rating",
      bgColor: "bg-gradient-to-r from-purple-600/20 to-blue-600/20",
      borderColor: "border border-purple-500/30",
      delay: 0
    },
    {
      icon: <Sparkles className="w-5 h-5 text-green-500" />,
      text: "500+ Projects",
      bgColor: "bg-gradient-to-r from-green-600/20 to-emerald-600/20",
      borderColor: "border border-green-500/30",
      delay: 100
    },
    {
      icon: <Clock className="w-5 h-5 text-pink-500" />,
      text: "24h Response",
      bgColor: "bg-gradient-to-r from-pink-600/20 to-red-600/20",
      borderColor: "border border-pink-500/30",
      delay: 200
    }
  ], []);

  return (
    <>
      {/* Optimized Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-3xl will-change-transform"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transform: `translate3d(${mousePosition.x - 192}px, ${mousePosition.y - 192}px, 0)`,
            transition: 'transform 0.3s ease-out'
          }}
        ></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-pink-600/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
      </div>

      <div className="text-center lg:mt-[5%] mt-10 mb-2 sm:px-0 px-[5%] relative">
        <div 
          data-aos="fade-down"
          data-aos-duration="800"
          className="inline-flex items-center gap-3 mb-4"
        >
          <Crown className="w-8 h-8 text-yellow-500 animate-bounce" />
          <h2 className="text-3xl md:text-6xl font-black text-center mx-auto text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] via-[#a855f7] to-[#ec4899] relative">
            <span className="relative">
              Contact Me
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg blur opacity-25 animate-pulse"></div>
            </span>
          </h2>
          <Diamond className="w-8 h-8 text-blue-500 animate-spin-slow" />
        </div>
        
        <p
          data-aos="fade-up"
          data-aos-duration="900"
          className="text-slate-300 max-w-3xl mx-auto text-lg md:text-xl mt-4 font-medium"
        >
          🌟 Ada pertanyaan? Kirimi saya pesan, dan saya akan segera menghubungi Anda kembali. Terimakasih
        </p>

        {/* Optimized Stats Cards */}
        <div 
          data-aos="fade-up"
          data-aos-duration="1000"
          className="flex justify-center gap-6 mt-8 flex-wrap"
        >
          {statsCards.map((card, index) => (
            <StatsCard key={index} {...card} />
          ))}
        </div>
      </div>

      <div
        className="h-auto py-10 flex items-center justify-center px-[5%] md:px-0"
        id="Contact"
      >
        <div className="container px-[1%] grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-[45%_55%] 2xl:grid-cols-[35%_65%] gap-12">
          {/* Enhanced Contact Form */}
          <div
            data-aos="fade-right"
            data-aos-duration="1000"
            className="relative group"
          >
            {/* Optimized Glowing Border Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500 will-change-auto"></div>
            
            <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-2xl rounded-3xl shadow-2xl p-5 py-10 sm:p-10 border border-purple-500/20">
              
              {/* Header with Tabs */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl">
                      <Share2 className="w-6 h-6 text-white" />
                    </div>
                    <h2 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                      Get in Touch
                    </h2>
                  </div>
                  <p className="text-gray-300 text-lg">
                    Have something exclusive to discuss? Send me a premium message.
                  </p>
                </div>
                <Sparkles className="w-10 h-10 text-yellow-500 animate-pulse" />
              </div>

              {/* Optimized Tab Navigation */}
              <div className="flex mb-8 bg-slate-800/50 rounded-2xl p-1">
                <button
                  onClick={() => setActiveTab("form")}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 will-change-auto ${
                    activeTab === "form"
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Contact Form
                </button>
                <button
                  onClick={() => setActiveTab("info")}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 will-change-auto ${
                    activeTab === "info"
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Contact Info
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === "form" ? (
                <form 
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* Priority Selector */}
                  <div
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay="50"
                    className="relative"
                  >
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Message Priority</label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="w-full p-4 bg-slate-800/50 rounded-xl border border-purple-500/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 will-change-auto"
                    >
                      <option value="normal">🔵 Normal Priority</option>
                      <option value="urgent">🟠 Urgent Priority</option>
                      <option value="vip">🔴 VIP Priority</option>
                    </select>
                  </div>

                  {/* Enhanced Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      icon={<User />}
                      type="text"
                      name="name"
                      placeholder="Your Full Name *"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      required
                      delay={100}
                    />

                    <FormField
                      icon={<Phone />}
                      type="tel"
                      name="phone"
                      placeholder="Phone Number"
                      value={formData.phone}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      delay={150}
                    />
                  </div>

                  <FormField
                    icon={<Mail />}
                    type="email"
                    name="email"
                    placeholder="Your Email Address *"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                    delay={200}
                  />

                  <FormField
                    icon={<MessageSquare />}
                    type="text"
                    name="subject"
                    placeholder="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    delay={250}
                  />

                  <FormField
                    icon={<MessageSquare />}
                    name="message"
                    placeholder="Your Premium Message *"
                    value={formData.message}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    required
                    delay={300}
                    isTextarea
                  />

                  <button
                    data-aos="fade-up"
                    data-aos-duration="600"
                    data-aos-delay="400"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative group bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/25 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden will-change-transform"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <Send className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">
                      {isSubmitting ? '✨ Sending Premium Message...' : '🚀 Send Premium Message'}
                    </span>
                  </button>
                </form>
              ) : (
                /* Contact Info Tab */
                <div className="space-y-6">
                  {contactInfo.map((info, index) => (
                    <ContactInfoCard key={index} info={info} index={index} />
                  ))}
                </div>
              )}

              {/* Enhanced Social Links */}
              <div className="mt-10 pt-8 border-t border-purple-500/20">
                <h3 className="text-center text-gray-300 mb-6 text-lg font-semibold">Connect with me on social media</h3>
                <div className="flex justify-center">
                  <div className="p-4 bg-slate-800/30 rounded-2xl border border-purple-500/20">
                    <SocialLinks />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Comments Section */}
          <div 
            data-aos="fade-left"
            data-aos-duration="1000"
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500 will-change-auto"></div>
            <div className="relative bg-gradient-to-br from-slate-900/90 to-slate-800/90 backdrop-blur-2xl rounded-3xl p-3 py-3 md:p-10 md:py-8 shadow-2xl border border-blue-500/20">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl">
                  <MessageSquare className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                  Client Reviews
                </h3>
                <Star className="w-6 h-6 text-yellow-500 animate-pulse" />
              </div>
              <Komentar />
            </div>
          </div>
        </div>
      </div>

      {/* Optimized CSS for better performance */}
      <style jsx>{`
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-spin-slow {
          animation: spin-slow 3s linear infinite;
        }
        
        /* Performance optimizations */
        .will-change-transform {
          will-change: transform;
        }
        
        .will-change-auto {
          will-change: auto;
        }
        
        /* Reduce motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          *, *::before, *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: 0.01ms !important;
          }
        }
        
        /* GPU acceleration for smooth animations */
        .animate-pulse,
        .animate-bounce,
        .group:hover .absolute {
          transform: translateZ(0);
        }
        
        /* Optimize scroll performance */
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `}</style>
    </>
  );
};

export default ContactPage;
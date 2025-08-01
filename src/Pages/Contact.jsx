import React, { useState, useEffect } from "react";
import { Share2, User, Mail, MessageSquare, Send, Phone, MapPin, Clock, Star, Sparkles, Diamond, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import SocialLinks from "../components/SocialLinks";
import Komentar from "../components/Commentar";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

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

  useEffect(() => {
    AOS.init({
      once: false,
    });

    // Mouse tracking for interactive effects
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
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
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Get form data
      const form = e.target;
      const formData = new FormData(form);

      // Submit form
      await form.submit();

      // Enhanced success message
      Swal.fire({
        title: '<span style="color: #6366f1;">🎉 Success!</span>',
        html: '<div style="color: #a855f7;">Your premium message has been delivered successfully!<br/>We\'ll get back to you within 24 hours.</div>',
        icon: 'success',
        background: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)',
        color: '#ffffff',
        confirmButtonColor: '#6366f1',
        confirmButtonText: 'Perfect!',
        timer: 3000,
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
    } catch (error) {
      Swal.fire({
        title: '<span style="color: #ef4444;">❌ Error!</span>',
        html: '<div style="color: #f87171;">Something went wrong. Please try again later.</div>',
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
  };

  const contactInfo = [
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
  ];

  return (
    <>
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900"></div>
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-3xl"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
            transition: 'all 0.3s ease-out'
          }}
        ></div>
        <div className="absolute top-1/4 right-1/4 w-64 h-64 bg-gradient-to-r from-pink-600/10 to-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="text-center lg:mt-[5%] mt-10 mb-2 sm:px-0 px-[5%] relative">
        <div 
          data-aos="fade-down"
          data-aos-duration="1000"
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
          data-aos-duration="1100"
          className="text-slate-300 max-w-3xl mx-auto text-lg md:text-xl mt-4 font-medium"
        >
          🌟 Ada pertanyaan? Kirimi saya pesan, dan saya akan segera menghubungi Anda kembali. Terimakasih
        </p>

        {/* Stats Cards */}
        <div 
          data-aos="fade-up"
          data-aos-duration="1200"
          className="flex justify-center gap-6 mt-8 flex-wrap"
        >
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 backdrop-blur-xl rounded-2xl p-4 border border-purple-500/30">
            <div className="flex items-center gap-2 text-white">
              <Star className="w-5 h-5 text-yellow-500" />
              <span className="font-bold">5.0 Rating</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-green-600/20 to-emerald-600/20 backdrop-blur-xl rounded-2xl p-4 border border-green-500/30">
            <div className="flex items-center gap-2 text-white">
              <Sparkles className="w-5 h-5 text-green-500" />
              <span className="font-bold">500+ Projects</span>
            </div>
          </div>
          <div className="bg-gradient-to-r from-pink-600/20 to-red-600/20 backdrop-blur-xl rounded-2xl p-4 border border-pink-500/30">
            <div className="flex items-center gap-2 text-white">
              <Clock className="w-5 h-5 text-pink-500" />
              <span className="font-bold">24h Response</span>
            </div>
          </div>
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
            data-aos-duration="1200"
            className="relative group"
          >
            {/* Glowing Border Effect */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
            
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

              {/* Tab Navigation */}
              <div className="flex mb-8 bg-slate-800/50 rounded-2xl p-1">
                <button
                  onClick={() => setActiveTab("form")}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
                    activeTab === "form"
                      ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  Contact Form
                </button>
                <button
                  onClick={() => setActiveTab("info")}
                  className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all duration-300 ${
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
                  action="https://formsubmit.co/fahmi.nabeel21@gmail.com"
                  method="POST"
                  onSubmit={handleSubmit}
                  className="space-y-6"
                >
                  {/* FormSubmit Configuration */}
                  <input type="hidden" name="_template" value="table" />
                  <input type="hidden" name="_captcha" value="false" />

                  {/* Priority Selector */}
                  <div
                    data-aos="fade-up"
                    data-aos-delay="50"
                    className="relative"
                  >
                    <label className="block text-sm font-semibold text-gray-300 mb-2">Message Priority</label>
                    <select
                      name="priority"
                      value={formData.priority}
                      onChange={handleChange}
                      className="w-full p-4 bg-slate-800/50 rounded-xl border border-purple-500/30 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300"
                    >
                      <option value="normal">🔵 Normal</option>
                      <option value="urgent">🟠 Urgent</option>
                      <option value="vip">🔴 VIP Priority</option>
                    </select>
                  </div>

                  {/* Enhanced Form Fields */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div
                      data-aos="fade-up"
                      data-aos-delay="100"
                      className="relative group"
                    >
                      <User className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors z-10" />
                      <input
                        type="text"
                        name="name"
                        placeholder="Your Full Name *"
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full p-4 pl-12 bg-slate-800/50 rounded-xl border border-purple-500/30 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:border-purple-400/50 disabled:opacity-50"
                        required
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                    </div>

                    <div
                      data-aos="fade-up"
                      data-aos-delay="150"
                      className="relative group"
                    >
                      <Phone className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors z-10" />
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={isSubmitting}
                        className="w-full p-4 pl-12 bg-slate-800/50 rounded-xl border border-purple-500/30 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:border-purple-400/50 disabled:opacity-50"
                      />
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                    </div>
                  </div>

                  <div
                    data-aos="fade-up"
                    data-aos-delay="200"
                    className="relative group"
                  >
                    <Mail className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors z-10" />
                    <input
                      type="email"
                      name="email"
                      placeholder="Your Email Address *"
                      value={formData.email}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full p-4 pl-12 bg-slate-800/50 rounded-xl border border-purple-500/30 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:border-purple-400/50 disabled:opacity-50"
                      required
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  </div>

                  <div
                    data-aos="fade-up"
                    data-aos-delay="250"
                    className="relative group"
                  >
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors z-10" />
                    <input
                      type="text"
                      name="subject"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full p-4 pl-12 bg-slate-800/50 rounded-xl border border-purple-500/30 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:border-purple-400/50 disabled:opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  </div>

                  <div
                    data-aos="fade-up"
                    data-aos-delay="300"
                    className="relative group"
                  >
                    <MessageSquare className="absolute left-4 top-4 w-5 h-5 text-gray-400 group-focus-within:text-purple-400 transition-colors z-10" />
                    <textarea
                      name="message"
                      placeholder="Your Premium Message *"
                      value={formData.message}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="w-full resize-none p-4 pl-12 bg-slate-800/50 rounded-xl border border-purple-500/30 placeholder-gray-400 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500/50 transition-all duration-300 hover:border-purple-400/50 h-32 disabled:opacity-50"
                      required
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
                  </div>

                  <button
                    data-aos="fade-up"
                    data-aos-delay="400"
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full relative group bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/25 active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 overflow-hidden"
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
                    <div
                      key={index}
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                      className="group p-6 bg-slate-800/30 rounded-2xl border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:transform hover:scale-105"
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
            data-aos-duration="1200"
            className="relative group"
          >
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-1000 group-hover:duration-200"></div>
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

      {/* Custom CSS for animations */}
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
      `}</style>
    </>
  );
};

export default ContactPage;
import React, { useState, useEffect } from "react";
import { CheckCircle, Sparkles, ArrowLeft, Mail } from "lucide-react";

const ThankYouPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Animated Background */}
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-20 left-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Main Content */}
      <div className="min-h-screen flex items-center justify-center px-4 relative z-10">
        <div className={`text-center transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Success Icon */}
          <div className="relative flex justify-center mb-8">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20"></div>
              <div className="relative bg-gradient-to-r from-green-400 to-emerald-500 rounded-full p-6 shadow-2xl">
                <CheckCircle className="w-16 h-16 text-white" />
              </div>
            </div>
            
            {/* Sparkles */}
            <div className="absolute -top-2 -right-2">
              <Sparkles className="w-8 h-8 text-yellow-400 animate-bounce" />
            </div>
            <div className="absolute -bottom-2 -left-2">
              <Sparkles className="w-6 h-6 text-pink-400 animate-bounce" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>

          {/* Title */}
          <h1 className="text-6xl md:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            Thank You!
          </h1>

          {/* Subtitle */}
          <div className="mb-10 space-y-4">
            <p className="text-gray-300 text-xl md:text-2xl font-light">
              Your message has been received successfully
            </p>
            <div className="flex items-center justify-center gap-2 text-gray-400">
              <Mail className="w-5 h-5" />
              <p className="text-lg">I'll get back to you as soon as possible</p>
            </div>
          </div>

          {/* Success Card */}
          <div className="bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg border border-white border-opacity-20 rounded-3xl p-8 mb-10 max-w-lg mx-auto shadow-2xl">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-4 h-4 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-green-300 font-semibold text-lg">Message Delivered Successfully</span>
            </div>
            <p className="text-gray-300 text-base leading-relaxed">
              Your inquiry is now in my inbox and will be reviewed shortly. 
              Thank you for taking the time to reach out!
            </p>
            <div className="mt-4 pt-4 border-t border-white border-opacity-10">
              <p className="text-gray-400 text-sm">Expected response time: 24-48 hours</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white rounded-2xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 min-w-[220px]">
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </button>
            
            <button className="group inline-flex items-center justify-center gap-3 px-10 py-4 bg-white bg-opacity-10 hover:bg-opacity-20 backdrop-filter backdrop-blur-sm border border-white border-opacity-30 text-white rounded-2xl font-semibold transition-all duration-300 hover:scale-105 active:scale-95 min-w-[220px]">
              <Sparkles className="w-5 h-5 transition-transform group-hover:rotate-12" />
              Send Another Message
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ThankYouPage;
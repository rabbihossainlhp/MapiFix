import React from "react";
import { 
  Wrench, 
  Users, 
  Clock, 
  CheckCircle, 
  ArrowRight,
  MapPin,
  Camera,
  Zap,
  Shield,
  BarChart3
} from "lucide-react";
import Navbar from "../components/Navbar";

export default function Homepage({ onLogin, onSignup }) {
  const features = [
    {
      icon: MapPin,
      title: "Location Based",
      description: "Report issues with precise location mapping for quick identification"
    },
    {
      icon: Camera,
      title: "Photo Evidence",
      description: "Attach photos to reports for clear problem documentation"
    },
    {
      icon: Clock,
      title: "Real-time Tracking",
      description: "Track your report status from submission to resolution"
    },
    {
      icon: Zap,
      title: "Quick Resolution",
      description: "Streamlined workflow ensures faster problem resolution"
    },
    {
      icon: Shield,
      title: "Transparent Process",
      description: "Full visibility into maintenance processes and accountability"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Data-driven insights for better campus facility management"
    }
  ];

  const stats = [
    { number: "500+", label: "Issues Resolved", icon: CheckCircle },
    { number: "1200+", label: "Active Users", icon: Users },
    { number: "24hr", label: "Avg Response Time", icon: Clock },
    { number: "95%", label: "Resolution Rate", icon: Wrench }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Navbar 
        isAuthenticated={false}
        onLogin={onLogin}
        onSignup={onSignup}
        onHome={() => {}} // Already on home
      />

      {/* Hero Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-4 sm:mb-6">
            Smart Campus Maintenance
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-3 sm:mb-4 max-w-3xl mx-auto px-4">
            A smart and digital way to report, track, and resolve campus maintenance issues.
          </p>
          <p className="text-base sm:text-lg text-gray-500 mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
            No more lost complaints or ignored issues. MapiFix brings transparency, efficiency, and accountability to campus facility management.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 sm:mb-16 px-4">
            <button 
              onClick={onSignup}
              className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:shadow-xl transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <span className="text-base sm:text-lg font-semibold">Report an Issue</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            <button 
              onClick={onLogin}
              className="border-2 border-gray-300 text-gray-700 px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:border-blue-500 hover:text-blue-600 transition-all duration-300"
            >
              Sign In to Dashboard
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mb-12 sm:mb-16 px-4">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white/60 backdrop-blur-md rounded-xl sm:rounded-2xl p-4 sm:p-6 shadow-lg border border-white/50">
                <div className="flex flex-col items-center">
                  <stat.icon className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600 mb-2 sm:mb-3" />
                  <div className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-800 mb-1">{stat.number}</div>
                  <div className="text-xs sm:text-sm text-gray-600 text-center">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-white/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">Why Choose MapiFix?</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4">
              Built specifically for educational institutions to bridge the gap between students and administration
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white/80 backdrop-blur-md rounded-xl sm:rounded-2xl p-6 sm:p-8 shadow-lg border border-white/50 hover:shadow-xl transition-shadow">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 sm:mb-6">
                  <feature.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">{feature.title}</h3>
                <p className="text-sm sm:text-base text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-800 mb-3 sm:mb-4">How It Works</h2>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 px-4">Simple steps to get your campus issues resolved</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12">
            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-lg sm:text-2xl font-bold text-white">1</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">Report Issue</h3>
              <p className="text-sm sm:text-base text-gray-600 px-4">Students and teachers submit maintenance issues with photos and location details</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-yellow-500 to-yellow-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-lg sm:text-2xl font-bold text-white">2</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">Track Progress</h3>
              <p className="text-sm sm:text-base text-gray-600 px-4">Admin team receives notifications and updates status in real-time</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6">
                <span className="text-lg sm:text-2xl font-bold text-white">3</span>
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-3">Issue Resolved</h3>
              <p className="text-sm sm:text-base text-gray-600 px-4">Maintenance team resolves the issue and updates the system for full transparency</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 to-purple-700">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 sm:mb-6">Ready to Transform Your Campus?</h2>
          <p className="text-base sm:text-lg lg:text-xl text-blue-100 mb-6 sm:mb-8 px-4">
            Join hundreds of educational institutions using MapiFix for efficient facility management
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center px-4">
            <button 
              onClick={onSignup}
              className="bg-white text-blue-600 px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:shadow-xl transition-all duration-300 font-semibold"
            >
              Start Free Trial
            </button>
            <button className="border-2 border-white text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl hover:bg-white hover:text-blue-600 transition-all duration-300">
              Contact Sales
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center">
                <Wrench className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <span className="text-xl sm:text-2xl font-bold">MapiFix</span>
            </div>
            <div className="text-sm sm:text-base text-gray-400 text-center">
              © 2025 MapiFix. Making campus maintenance smarter.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
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
  BarChart3,
  Star,
  Award,
  Smartphone,
  Globe,
  TrendingUp,
  FileText,
  Bell,
  Eye,
  MessageCircle,
  Calendar,
  AlertTriangle
} from "lucide-react";
import Navbar from "../components/Navbar";

export default function Homepage({ onLogin, onSignup }) {
  const features = [
    {
      icon: Camera,
      title: "Photo Upload",
      description: "Upload clear photos of maintenance issues for better understanding and faster resolution",
      color: "from-purple-500 to-indigo-600"
    },
    {
      icon: MapPin,
      title: "Location Reporting",
      description: "Specify exact locations on campus where maintenance issues need attention",
      color: "from-red-500 to-pink-600"
    },
    {
      icon: Clock,
      title: "Status Tracking",
      description: "Monitor your report progress from submission through to completion in real-time",
      color: "from-blue-500 to-cyan-600"
    },
    {
      icon: BarChart3,
      title: "Admin Dashboard",
      description: "Comprehensive overview of all reports with filtering and management capabilities",
      color: "from-green-500 to-emerald-600"
    },
    {
      icon: Shield,
      title: "User Authentication",
      description: "Secure login system with separate access for students, faculty, and administrators",
      color: "from-orange-500 to-red-600"
    },
    {
      icon: Users,
      title: "Multi-User Support",
      description: "Built for educational institutions with different user roles and permissions",
      color: "from-yellow-500 to-orange-600"
    }
  ];

  const comingSoonFeatures = [
    {
      icon: Bell,
      title: "Push Notifications",
      description: "Instant alerts for status updates and important announcements"
    },
    {
      icon: Smartphone,
      title: "Mobile App",
      description: "Native iOS and Android apps for on-the-go reporting"
    },
    {
      icon: Globe,
      title: "Multi-Campus Support",
      description: "Manage multiple campus locations from single dashboard"
    }
  ];

  const stats = [
    { number: "2,500+", label: "Issues Resolved", icon: CheckCircle, trend: "+15%" },
    { number: "3,200+", label: "Active Users", icon: Users, trend: "+28%" },
    { number: "4.2hrs", label: "Avg Response Time", icon: Clock, trend: "-35%" },
    { number: "98.5%", label: "Resolution Rate", icon: Wrench, trend: "+12%" }
  ];



  const benefits = [
    {
      icon: TrendingUp,
      title: "Increase Efficiency by 75%",
      description: "Streamlined processes reduce resolution time significantly"
    },
    {
      icon: Eye,
      title: "100% Visibility",
      description: "Track every issue from report to resolution"
    },
    {
      icon: MessageCircle,
      title: "Better Communication",
      description: "Bridge the gap between students and administration"
    },
    {
      icon: Award,
      title: "Proven Results",
      description: "Trusted by 200+ educational institutions nationwide"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-300/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-purple-300/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-indigo-300/20 rounded-full blur-3xl animate-pulse delay-500"></div>
        <div className="absolute top-1/2 right-1/3 w-56 h-56 bg-pink-300/15 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Floating geometric shapes */}
        <div className="absolute top-20 left-20 w-4 h-4 bg-blue-400/30 rounded transform rotate-45 animate-bounce"></div>
        <div className="absolute top-40 right-32 w-3 h-3 bg-purple-400/40 rounded-full animate-bounce delay-300"></div>
        <div className="absolute bottom-32 left-1/4 w-5 h-5 bg-indigo-400/30 rounded transform rotate-12 animate-bounce delay-700"></div>
        <div className="absolute bottom-40 right-20 w-3 h-3 bg-pink-400/40 rounded-full animate-bounce delay-1000"></div>
      </div>
      <Navbar 
        isAuthenticated={false}
        onLogin={onLogin}
        onSignup={onSignup}
        onHome={() => {}} // Already on home
      />

      {/* Hero Section */}
      <section className="py-16 sm:py-20 lg:py-28 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Enhanced Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          {/* Large gradient orbs */}
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/30 to-purple-600/30 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-indigo-400/30 to-cyan-600/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
          
          {/* Medium floating elements */}
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-pink-300/25 to-rose-400/25 rounded-full blur-2xl animate-bounce delay-500"></div>
          <div className="absolute top-3/4 right-1/3 w-56 h-56 bg-gradient-to-l from-emerald-300/25 to-teal-400/25 rounded-full blur-2xl animate-bounce delay-2000"></div>
          
          {/* Small animated dots */}
          <div className="absolute top-1/6 right-1/4 w-24 h-24 bg-gradient-to-br from-yellow-300/40 to-orange-400/40 rounded-full blur-xl animate-ping delay-300"></div>
          <div className="absolute bottom-1/3 left-1/6 w-32 h-32 bg-gradient-to-tr from-violet-300/40 to-purple-500/40 rounded-full blur-xl animate-ping delay-1500"></div>
          
          {/* Floating geometric shapes */}
          <div className="absolute top-1/2 right-1/6 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-indigo-600/20 rotate-45 animate-spin" style={{animationDuration: '20s'}}></div>
          <div className="absolute bottom-1/6 left-1/2 w-20 h-20 bg-gradient-to-tl from-pink-500/20 to-red-500/20 rotate-12 animate-spin" style={{animationDuration: '15s'}}></div>
          
          {/* Gradient lines */}
          <div className="absolute top-0 left-1/3 w-1 h-full bg-gradient-to-b from-transparent via-blue-300/30 to-transparent animate-pulse delay-700"></div>
          <div className="absolute top-0 right-1/4 w-1 h-full bg-gradient-to-b from-transparent via-purple-300/30 to-transparent animate-pulse delay-1200"></div>
          
          {/* Floating particles */}
          <div className="absolute top-1/5 left-1/5 w-2 h-2 bg-blue-400 rounded-full animate-ping delay-100"></div>
          <div className="absolute top-2/5 right-1/5 w-3 h-3 bg-purple-400 rounded-full animate-ping delay-500"></div>
          <div className="absolute bottom-1/5 left-2/5 w-2 h-2 bg-pink-400 rounded-full animate-ping delay-800"></div>
          <div className="absolute top-3/5 right-2/5 w-2 h-2 bg-indigo-400 rounded-full animate-ping delay-1100"></div>
          <div className="absolute bottom-2/5 right-1/6 w-3 h-3 bg-cyan-400 rounded-full animate-ping delay-1400"></div>
          
          {/* Subtle sparkles */}
          <div className="absolute top-1/8 right-1/3 w-1 h-1 bg-yellow-300/60 rounded-full animate-pulse delay-200"></div>
          <div className="absolute bottom-1/8 left-1/4 w-1 h-1 bg-orange-300/60 rounded-full animate-pulse delay-600"></div>
          <div className="absolute top-1/3 left-1/8 w-1 h-1 bg-green-300/60 rounded-full animate-pulse delay-900"></div>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blue-100 to-indigo-100 px-4 py-2 rounded-full border border-blue-200/50 mb-8">
            <Wrench className="w-4 h-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Digital Campus Maintenance System</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-8 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 bg-clip-text text-transparent">
              MapiFix
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-red-600 bg-clip-text text-transparent">
              Campus Maintenance Made Easy
            </span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-700 mb-4 max-w-4xl mx-auto font-medium px-4">
            A simple, digital way to report, track, and resolve campus maintenance issues 
            with complete transparency.
          </p>
          
          <p className="text-base sm:text-lg text-gray-600 mb-10 sm:mb-12 max-w-3xl mx-auto px-4">
            No more lost complaints or ignored issues. Students, faculty, and staff can easily report problems 
            while administrators track and manage everything from a central dashboard.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-16 sm:mb-20 px-4">
            <button 
              onClick={onSignup}
              className="group bg-gradient-to-r from-blue-600 to-indigo-700 text-white px-8 sm:px-10 py-4 sm:py-5 rounded-2xl hover:shadow-2xl hover:shadow-blue-500/25 transition-all duration-300 flex items-center justify-center space-x-3 text-lg font-semibold"
            >
              <span>Report an Issue</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={onLogin}
              className="group border-2 border-gray-300 bg-white/80 backdrop-blur-sm text-gray-700 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl hover:border-indigo-500 hover:text-indigo-600 hover:shadow-xl transition-all duration-300 text-lg font-semibold"
            >
              <span>Sign In</span>
            </button>
          </div>

          {/* Enhanced Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20 px-4">
            {stats.map((stat, index) => (
              <div key={index} className="group bg-white/80 backdrop-blur-md rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-xl border border-white/50 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg">
                      <stat.icon className="w-8 h-8 text-white" />
                    </div>
                    <div className="absolute -top-2 -right-2 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                      {stat.trend}
                    </div>
                  </div>
                  <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-sm sm:text-base text-gray-600 text-center font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Key Benefits Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 px-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-6 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                <benefit.icon className="w-8 h-8 text-indigo-600 mb-4" />
                <h3 className="font-bold text-gray-800 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center space-x-2 bg-blue-100 px-4 py-2 rounded-full border border-blue-200 mb-6">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Current Features</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              What MapiFix 
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Offers Today</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-4xl mx-auto px-4 leading-relaxed">
              A complete digital solution for campus maintenance reporting and management, 
              designed to bridge the communication gap between students, faculty, and administration.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
            {features.map((feature, index) => (
              <div key={index} className="group relative bg-white rounded-3xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 rounded-3xl transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-800 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                    {feature.description}
                  </p>
                  
                  {/* Learn more arrow that appears on hover */}
                  <div className="flex items-center mt-6 text-blue-600 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    <span className="text-sm font-semibold mr-2">Learn more</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Coming Soon Section */}
          <div className="mt-20 text-center">
            <div className="inline-flex items-center space-x-2 bg-purple-100 px-4 py-2 rounded-full border border-purple-200 mb-8">
              <Zap className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-medium text-purple-800">Coming Soon</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">Future Enhancements</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {comingSoonFeatures.map((feature, index) => (
                <div key={index} className="bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-200 opacity-75 hover:opacity-90 transition-all duration-300 hover:scale-105">
                  <feature.icon className="w-10 h-10 text-purple-600 mx-auto mb-6" />
                  <h4 className="font-semibold text-gray-800 mb-3 text-center">{feature.title}</h4>
                  <p className="text-sm text-gray-600 text-center leading-relaxed">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16 sm:mb-20">
            <div className="inline-flex items-center space-x-2 bg-indigo-100 px-4 py-2 rounded-full border border-indigo-200 mb-6">
              <Zap className="w-4 h-4 text-indigo-600" />
              <span className="text-sm font-medium text-indigo-800">Simple Process</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              From Report to Resolution in 
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> 3 Simple Steps</span>
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto px-4 leading-relaxed">
              Our streamlined process ensures every maintenance issue gets the attention it deserves, 
              with full transparency at every step.
            </p>
          </div>

          <div className="relative">
            {/* Connection line for desktop */}
            <div className="hidden lg:block absolute top-24 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
              <div className="flex justify-between">
                <div className="w-6 h-6 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full"></div>
                <div className="w-6 h-6 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-full"></div>
                <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-purple-600 rounded-full"></div>
              </div>
              <div className="absolute top-3 left-3 right-3 h-0.5 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500"></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
              {/* Step 1 */}
              <div className="relative text-center group">
                <div className="relative inline-block mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    <FileText className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-sm font-bold text-blue-600">1</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Smart Report Submission</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Students, faculty, and staff easily submit detailed reports with photos, location data, 
                  and priority levels through our intuitive interface.
                </p>
                <div className="bg-blue-50 rounded-2xl p-4 border border-blue-100">
                  <div className="flex items-center justify-center space-x-4 text-sm text-blue-700">
                    <div className="flex items-center space-x-1">
                      <Camera className="w-4 h-4" />
                      <span>Photo Upload</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>GPS Location</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>Priority Level</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="relative text-center group">
                <div className="relative inline-block mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    <Bell className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-sm font-bold text-indigo-600">2</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Admin Review</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Administrators receive and review all submitted reports through the centralized dashboard, 
                  where they can categorize issues and assign appropriate status updates.
                </p>
                <div className="bg-indigo-50 rounded-2xl p-4 border border-indigo-100">
                  <div className="flex items-center justify-center space-x-4 text-sm text-indigo-700">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>Review Reports</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4" />
                      <span>Update Status</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <BarChart3 className="w-4 h-4" />
                      <span>Smart Priority</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="relative text-center group">
                <div className="relative inline-block mb-8">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform duration-300">
                    <CheckCircle className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <span className="text-sm font-bold text-purple-600">3</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Transparent Resolution</h3>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Maintenance teams resolve issues efficiently while everyone stays informed through 
                  real-time updates and complete resolution documentation.
                </p>
                <div className="bg-purple-50 rounded-2xl p-4 border border-purple-100">
                  <div className="flex items-center justify-center space-x-4 text-sm text-purple-700">
                    <div className="flex items-center space-x-1">
                      <Eye className="w-4 h-4" />
                      <span>Live Updates</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <CheckCircle className="w-4 h-4" />
                      <span>Completion</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4" />
                      <span>Feedback</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* Enhanced CTA Section */}
      <section className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6 leading-tight">
            Ready to Get Started?
          </h2>
          
          <p className="text-xl text-blue-100 mb-12 max-w-3xl mx-auto px-4 leading-relaxed">
            Join your campus community in making maintenance reporting simple and effective.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center px-4">
            <button 
              onClick={onSignup}
              className="group bg-white text-blue-600 px-8 py-4 rounded-2xl hover:shadow-2xl transition-all duration-300 font-semibold text-lg flex items-center justify-center space-x-3"
            >
              <AlertTriangle className="w-5 h-5" />
              <span>Report an Issue</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={onLogin}
              className="group border-2 border-white/50 bg-white/10 backdrop-blur-sm text-white px-8 py-4 rounded-2xl hover:bg-white hover:text-blue-600 transition-all duration-300 font-semibold text-lg"
            >
              <span>Sign In</span>
            </button>
          </div>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-gradient-to-br from-gray-900 to-slate-800 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Wrench className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">MapiFix</span>
            </div>
            <p className="text-gray-300 max-w-md mx-auto">
              Making campus maintenance reporting simple and effective for students, faculty, and administrators.
            </p>
          </div>

          <div className="border-t border-gray-700 pt-6">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
              <div className="text-gray-400 text-center sm:text-left">
                © 2025 MapiFix. Built for campus communities.
              </div>
              <div className="flex items-center space-x-4 text-sm">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Help</a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">Contact</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
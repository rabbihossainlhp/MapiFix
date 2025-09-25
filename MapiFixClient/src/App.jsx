import { useState } from "react";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserDashboard from "./pages/UserDashboard";
import AdminPanelUI from "./AdminPanelUi";

function App() {
  const [currentView, setCurrentView] = useState("home"); // "home", "login", "signup", "user-dashboard", "admin-dashboard"
  const [user, setUser] = useState(null); // Current logged in user

  const handleLogin = (userData) => {
    setUser(userData);
    if (userData.role === "admin") {
      setCurrentView("admin-dashboard");
    } else {
      setCurrentView("user-dashboard");
    }
  };

  const handleSignup = (userData) => {
    setUser(userData);
    setCurrentView("user-dashboard");
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView("home");
  };

  const handleBackToHome = () => {
    setCurrentView("home");
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "home":
        return (
          <Homepage 
            onLogin={() => setCurrentView("login")}
            onSignup={() => setCurrentView("signup")}
          />
        );
      
      case "login":
        return (
          <LoginPage 
            onBack={handleBackToHome}
            onLogin={handleLogin}
            onSwitchToSignup={() => setCurrentView("signup")}
          />
        );
      
      case "signup":
        return (
          <SignupPage 
            onBack={handleBackToHome}
            onSignup={handleSignup}
            onSwitchToLogin={() => setCurrentView("login")}
          />
        );
      
      case "user-dashboard":
        return (
          <UserDashboard 
            user={user}
            onLogout={handleLogout}
          />
        );
      
      case "admin-dashboard":
        return (
          <AdminPanelUI 
            user={user}
            onLogout={handleLogout}
          />
        );
      
      default:
        return <Homepage onLogin={() => setCurrentView("login")} onSignup={() => setCurrentView("signup")} />;
    }
  };

  return (
    <div>
      {renderCurrentView()}
    </div>
  )
}

export default App

import { useState, useEffect } from "react";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import UserDashboard from "./pages/UserDashboard";
import AdminPanelUI from "./AdminPanelUi";

function App() {
  const [currentView, setCurrentView] = useState("home"); // "home", "login", "signup", "user-dashboard", "admin-dashboard"
  const [user, setUser] = useState(null); // Current logged in user

  // Restore authentication state on app load
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');
    
    if (token && userData) {
      try {
        const parsedUserData = JSON.parse(userData);
        setUser({
          ...parsedUserData,
          token: token
        });
        
        // Set appropriate view based on user role
        if (parsedUserData.role === "admin") {
          setCurrentView("admin-dashboard");
        } else {
          setCurrentView("user-dashboard");
        }
        
        console.log('Restored authentication state:', parsedUserData);
      } catch (error) {
        console.error('Error restoring authentication state:', error);
        // Clear corrupted data
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      }
    }
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    
    // Store user data in localStorage for persistence
    localStorage.setItem('userData', JSON.stringify(userData));
    
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
    // Clear all authentication data when logging out
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    console.log('Logged out and cleared authentication data');
  };  const handleBackToHome = () => {
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

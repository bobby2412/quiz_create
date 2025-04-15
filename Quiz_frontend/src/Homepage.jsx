import React from 'react';
import './home.css';
import { useState, useEffect } from "react";

function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
 
 
  const handlesubmit1 = () => {
    window.location.href = "/login"; // Redirect to login page
  }
  
  const handlesubmit2 = () => {
    window.location.href = "/signin"; // Redirect to signup page
  }

  const handlesubmit3 = () => {
    const logout = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:5001/logout", {
          method: "POST",
          credentials: "include", // Ensures cookies/session data are sent
        });

        if (response.ok) {
          setIsAuthenticated(false);
          window.location.href = "/home"; // Redirect to home page after logout
        } else {
          console.error("Logout failed:", response.statusText);
        }
      } catch (error) {
        console.error("Error during logout:", error);
      } finally {
        setIsLoading(false);
      }
    };

    logout();
  }

  const handlesubmit4=()=>{
    window.location.href="/Profile"; 
  }
  const handleGetStarted = () => {
    if (isAuthenticated) {
      window.location.href = "/uploads";
    } else {
      window.location.href = "/signin";
    }
  }
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:5001/checkAuth", {
          credentials: "include", // Ensures cookies/session data are sent
        });

        if (!response.ok) {
          setIsAuthenticated(false);
        } else {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  return (
    <div className="app">
      {/* Improved bubble animations */}
      <div className="bubbles">
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
        <div className="bubble"></div>
      </div>
      
      <header className="navbar">
        <div className="logo">
          
          <h1>DOC2QUIZ</h1>
        </div>
        <nav className="nav-links">
          <a href="/home" className="nav-link">Home</a>
          <a href="/uploads" className="nav-link">Create Quiz</a>
          <a href="/about" className="nav-link">About</a>
          <a href="/contact" className="nav-link">Contact</a>
        </nav>
        <div className="auth-buttons">
          {isLoading ? (
            <span>Loading...</span>
          ) : !isAuthenticated ? (
            <>
              <button onClick={handlesubmit1} className="btn btn-secondary">Log In</button>
              <button onClick={handlesubmit2} className="btn btn-primary">Sign Up</button>
            </>
          ) : (
            <button onClick={handlesubmit4} className="btn btn-secondary">Profile</button>
          )}
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">Create Engaging Quizzes in Minutes</h1>
            <p className="hero-description">
              Transform your documents into professional quizzes for education, training, or 
              entertainment with our AI-powered quiz generator. No coding skills required.
            </p>
            <div className="hero-cta">
              <button onClick={handleGetStarted} className="btn btn-cta">Get Started</button>
            </div>
          </div>
          <div className="hero-image">
            {/* We've removed the floating icons as requested */}
          </div>
        </section>

        <section className="features">
          <h2 className="section-title">Why Choose DOC2QUIZ?</h2>
          <div className="feature-cards">
            <div className="feature-card">
              <div className="feature-icon">✨</div>
              <h3>Easy to Use</h3>
              <p>Our intuitive interface makes quiz creation simple and quick. Upload your document and let our AI do the heavy lifting.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📱</div>
              <h3>Mobile Friendly</h3>
              <p>Create and take quizzes on any device. Your quizzes work perfectly from desktop to smartphone.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Detailed Analytics</h3>
              <p>Get valuable insights into participant performance with comprehensive reports and statistics.</p>
            </div>
          </div>
        </section>
      </main>
      
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-logo">
            <h2>DOC2QUIZ</h2>
            <p>Create. Share. Learn.</p>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <h3>Product</h3>
              <a href="#">Features</a>
              <a href="#">Pricing</a>
              <a href="#">Templates</a>
            </div>
            <div className="footer-column">
              <h3>Resources</h3>
              <a href="#">Blog</a>
              <a href="#">Documentation</a>
              <a href="#">Support</a>
            </div>
            <div className="footer-column">
              <h3>Company</h3>
              <a href="#">About</a>
              <a href="#">Careers</a>
              <a href="#">Contact</a>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2025 DOC2QUIZ. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Home;
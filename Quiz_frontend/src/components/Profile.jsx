import React, { useState, useEffect } from 'react';
import './AnimatedProfilePage.css';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);  
  const [user, setUser] = useState({
    name: "Jane Doe",
    email: "jane.doe@example.com",
    profilePic: "/api/placeholder/150/150",
    joinDate: "January 2023",
    quizStats: {
      created: 12,
      taken: 45,
      averageScore: 82
    }
  });

  const [quizzes, setQuizzes] = useState([]);
  const [activeTab, setActiveTab] = useState('created');
  const [prof, setprof] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
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

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:5001/callDB", {
          credentials: "include",
        });
        if (response.ok) {
          const data = await response.json();
          setprof(data);
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!prof?.user?.email) return;

      try {
        const res = await fetch('http://localhost:5001/getQuizzes', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email: prof.user.email }),
          credentials: 'include',
        });

        if (!res.ok) throw new Error('Failed to fetch quizzes');

        const data = await res.json();
        console.log('Fetched quizzes:', data);
        setQuizzes(data);
      } catch (err) {
        console.error('Error fetching quizzes:', err);
      }
    };

    fetchUserData();
  }, [prof]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <img src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(prof?.user?.fullName)}&background=000000&color=ffffff&size=128&rounded=true&bold=true`} alt="avatar" />
          </div>
          <div className="profile-info">
            <h1>{prof?.user?.fullName || "Loading name..."}</h1>
            <p className="email">{prof?.user?.email || "Loading email..."}</p>
            <button className="logout-btn" onClick={handlesubmit3}>Logout</button>
          </div>
          <div className="quiz-stats">
            <div className="stat-box">
              <span className="stat-value">{user.quizStats.created}</span>
              <span className="stat-label">Quizzes Created</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">{user.quizStats.taken}</span>
              <span className="stat-label">Quizzes Taken</span>
            </div>
            <div className="stat-box">
              <span className="stat-value">{user.quizStats.averageScore}%</span>
              <span className="stat-label">Avg. Score</span>
            </div>
          </div>
        </div>

        <div className="profile-content">
          <div className="tab-content">
            {isLoading ? (
              <div className="loading-indicator">Loading...</div>
            ) : (
              <div className="created-quizzes">
                <div className="quiz-list">
                  <div className="quiz-list-header">
                    <span className="col-title">QUIZ ID</span>
                    <span className="col-category">Questions</span>
                    <span className="col-questions">Attempted</span>
                    <span className="col-date">Created</span>
                    <span className="col-plays">Time Taken</span>
                    <span className="col-actions">Actions</span>
                  </div>

                  {quizzes.length === 0 ? (
                    <p>No quizzes found.</p>
                  ) : (
                    quizzes.map((quiz) => (
                      <div className="quiz-item" key={quiz._id}>
                        <span className="col-title">{quiz.quizId}</span>
                        <span className="col-category">{quiz.score}</span>
                        <span className="col-questions">{quiz.totalQuestions}</span>
                        <span className="col-date">{formatDate(quiz.submittedAt)}</span>
                        <span className="col-plays">{quiz.timeSpent} sec</span>
                        <span className="col-actions">
                          <button className="action-btn edit">Edit</button>
                          <button className="action-btn share">Share</button>
                          <button className="action-btn delete">Delete</button>
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

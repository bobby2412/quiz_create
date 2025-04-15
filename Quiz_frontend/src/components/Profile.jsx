import React, { useState, useEffect, use } from 'react';
import './AnimatedProfilePage.css';

const ProfilePage = () => {
  // Sample user data - in a real app, you would fetch this from your backend
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
  const [prof,setprof]=useState(null);  
  const [isLoading, setIsLoading] = useState(true);
  
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:5001/callDB", {
          credentials: "include", 
        });
        if(response.ok){
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
  },[]);
  
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
        // console.log('Quizzes:', quizzes)
          setQuizzes(data);
        } catch (err) {
          console.error('Error fetching quizzes:', err);
        }
      };
    
      fetchUserData();
    }, [prof]); 
    
  

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({
      ...editFormData,
      [name]: value
    });
  };



  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
         <img src={user.avatar || `https://ui-avatars.com/api/?name=${encodeURIComponent(prof?.user?.fullName )}&background=000000&color=ffffff&size=128&rounded=true&bold=true`} ></img> </div>
          <div className="profile-info">
            <h1>{prof?.user?.fullName || "Loading name..."}</h1>
            <p className="email">{prof?.user?.email || "Loading email..."}</p>
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
              <>
                { (
                  <div className="created-quizzes">

                    <div className="quiz-list">
                      <div className="quiz-list-header">
                        <span className="col-title">Title</span>
                        <span className="col-category">Category</span>
                        <span className="col-questions">Questions</span>
                        <span className="col-date">Created</span>
                        <span className="col-plays">Plays</span>
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
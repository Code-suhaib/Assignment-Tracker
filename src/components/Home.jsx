import React, { useState, useEffect } from 'react';
import { auth, db } from '../firebase';  // Adjusted import path
import { doc, getDoc, setDoc } from 'firebase/firestore';  // Modular Firestore imports
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css'; // Custom CSS for the page

const Home = () => {
  const [user, setUser] = useState(null);
  const [completed, setCompleted] = useState({
    webTechnologies: { practicals: Array(10).fill(false), assignments: Array(2).fill(false) },
    ai: { practicals: Array(7).fill(false), assignments: Array(2).fill(false) },
    dsbda: { practicals: Array(11).fill(false), assignments: Array(2).fill(false), miniProject: false },
  });

  useEffect(() => {
    auth.onAuthStateChanged(setUser); // Set user if logged in
  }, []);

  // Load user data from Firestore
  useEffect(() => {
    if (user) {
      const userRef = doc(db, 'userProgress', user.uid);  // Use doc to reference the user document
      getDoc(userRef).then((docSnap) => {
        if (docSnap.exists()) {
          setCompleted(docSnap.data().progress);
        }
      });
    }
  }, [user]);

  // Handle change in assignment/practical checkbox
  const handleChange = (subject, type, index) => {
    const newCompleted = { ...completed };
    if (type === 'practical') {
      newCompleted[subject].practicals[index] = !newCompleted[subject].practicals[index];
    } else if (type === 'assignment') {
      newCompleted[subject].assignments[index] = !newCompleted[subject].assignments[index];
    } else if (type === 'miniProject') {
      newCompleted[subject].miniProject = !newCompleted[subject].miniProject;
    }
    setCompleted(newCompleted);
  };

  // Save user progress to Firestore
  const handleSave = () => {
    if (user) {
      const userRef = doc(db, 'userProgress', user.uid);  // Use doc to reference the user document
      setDoc(userRef, { progress: completed }, { merge: true })  // Use setDoc to save data
        .then(() => {
          alert('Your progress has been saved!');
        })
        .catch((error) => {
          console.error('Error saving progress:', error);
          alert('Error saving progress');
        });
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Your Assignments and Practicals</h2>

      {/* Web Technologies Section */}
      <div className="section mt-4">
        <h3>Web Technologies - Apeksha Mam</h3>
        <div className="list-group">
          <h5>Practicals</h5>
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <span>Practical {index + 1}</span>
              <input
                type="checkbox"
                checked={completed.webTechnologies.practicals[index]}
                onChange={() => handleChange('webTechnologies', 'practical', index)}
              />
            </div>
          ))}
          <h5 className="mt-3">Assignments</h5>
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <span>Assignment {index + 1}</span>
              <input
                type="checkbox"
                checked={completed.webTechnologies.assignments[index]}
                onChange={() => handleChange('webTechnologies', 'assignment', index)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* AI Section */}
      <div className="section mt-4">
        <h3>AI - Prachi Mam</h3>
        <div className="list-group">
          <h5>Practicals</h5>
          {Array.from({ length: 7 }).map((_, index) => (
            <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <span>Practical {index + 1}</span>
              <input
                type="checkbox"
                checked={completed.ai.practicals[index]}
                onChange={() => handleChange('ai', 'practical', index)}
              />
            </div>
          ))}
          <h5 className="mt-3">Assignments</h5>
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <span>Assignment {index + 1}</span>
              <input
                type="checkbox"
                checked={completed.ai.assignments[index]}
                onChange={() => handleChange('ai', 'assignment', index)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* DSBDA Section */}
      <div className="section mt-4">
        <h3>DSBDA - Trupti Rajput Mam</h3>
        <div className="list-group">
          <h5>Practicals</h5>
          {Array.from({ length: 11 }).map((_, index) => (
            <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <span>Practical {index + 1}</span>
              <input
                type="checkbox"
                checked={completed.dsbda.practicals[index]}
                onChange={() => handleChange('dsbda', 'practical', index)}
              />
            </div>
          ))}
          <h5 className="mt-3">Mini Project</h5>
          <div className="form-check">
            <input
              type="checkbox"
              checked={completed.dsbda.miniProject}
              onChange={() => handleChange('dsbda', 'miniProject')}
              className="form-check-input"
            />
            <label className="form-check-label">Mini Project</label>
          </div>

          <h5 className="mt-3">Assignments</h5>
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="list-group-item d-flex justify-content-between align-items-center">
              <span>Assignment {index + 1}</span>
              <input
                type="checkbox"
                checked={completed.dsbda.assignments[index]}
                onChange={() => handleChange('dsbda', 'assignment', index)}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Save Button */}
      <div className="text-center mt-4">
        <button className="btn btn-success" onClick={handleSave}>
          Save Progress
        </button>
      </div>

      <footer className="footer mt-5 py-3 bg-dark text-white text-center">
  <p>Made with ❤️ by <a href="https://www.linkedin.com/in/suhaib-jahagirdar3700" target="_blank" rel="noopener noreferrer" className="text-white">Suhaib Jahagirdar</a></p>
</footer>

    </div>
  );
};

export default Home;

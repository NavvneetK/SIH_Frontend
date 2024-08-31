import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../css/Leaderboard.css';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/')
      .then(response => {
        setLeaderboard(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Error fetching leaderboard data');
        setLoading(false);
      });
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container">
      <h1>Student Leaderboard</h1>
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Profile</th>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Total Points</th>
            </tr>
          </thead>
          <tbody>
            {leaderboard.map(student => (
              <tr key={student['Student ID']}>
                <td>{student['Rank']}</td>
                <td>
                  {student['Profile Picture URL'] ? (
                    <img
                      src={student['Profile Picture URL']}
                      alt={`${student['Student Name']} profile`}
                      className="profile-picture"
                    />
                  ) : (
                    <div className="profile-emoji">
                      {student['Student Name'].charAt(0).toUpperCase()}
                    </div>
                  )}
                </td>
                <td>{student['Student ID']}</td>
                <td>{student['Student Name']}</td>
                <td>{student['Total Points']}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;

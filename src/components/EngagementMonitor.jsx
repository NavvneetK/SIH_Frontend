import React from 'react';
import '../css/EngagementMonitor.css'; // Create and import a new CSS file for styling

const EngagementMonitor = () => {
  // Manually defined report data (based on the first image)
  const report = {
    average_students_per_session: 8.67,
    end_date: "2024-09-24",
    instructor_present_rate: 83.33,
    start_date: "2024-09-17",
    total_sessions: 6,
  };

  // Manually defined session data (based on the second image)
  const sessions = [
    {
      sessionId: 'session1',
      instructor_present: true,
      number_of_students: 10,
      timestamp: '25 September 2024 at 11:24:28 UTC+5:30',
      whiteboard_or_smartboard_present: true,
    },
    // Add more session data here if needed
    {
      sessionId: 'session2',
      instructor_present: true,
      number_of_students: 12,
      timestamp: '26 September 2024 at 10:30:00 UTC+5:30',
      whiteboard_or_smartboard_present: true,
    },
    {
      sessionId: 'session3',
      instructor_present: true,
      number_of_students: 15,
      timestamp: '27 September 2024 at 10:45:00 UTC+5:30',
      whiteboard_or_smartboard_present: true,
    },
    {
      sessionId: 'session4',
      instructor_present: false,
      number_of_students: 20,
      timestamp: '28 September 2024 at 11:24:28 UTC+5:30',
      whiteboard_or_smartboard_present: false,
    }
  ];

  return (
    <div className="engagement-monitor">
      <h2>Engagement Monitor</h2>

      <div className="report-section">
        <h3>Classroom Report</h3>
        <p><strong>Average Students per Session:</strong> {report.average_students_per_session}</p>
        <p><strong>Instructor Present Rate:</strong> {report.instructor_present_rate}%</p>
        <p><strong>Total Sessions:</strong> {report.total_sessions}</p>
        <p><strong>Start Date:</strong> {report.start_date}</p>
        <p><strong>End Date:</strong> {report.end_date}</p>
      </div>

      <div className="session-section">
        <h3>Session Alerts</h3>
        {sessions.map((session, index) => (
          <div key={index} className={`session-card ${session.instructor_present ? '' : 'alert'}`}>
            <p><strong>Session ID:</strong> {session.sessionId}</p>
            <p><strong>Instructor Present:</strong> {session.instructor_present ? 'Yes' : 'No'}</p>
            <p><strong>Number of Students:</strong> {session.number_of_students}</p>
            <p><strong>Timestamp:</strong> {session.timestamp}</p>
            <p><strong>Whiteboard/Smartboard Present:</strong> {session.whiteboard_or_smartboard_present ? 'Yes' : 'No'}</p>
            {!session.instructor_present && (
              <p className="alert-text">⚠️ No instructor present during this session.</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default EngagementMonitor;

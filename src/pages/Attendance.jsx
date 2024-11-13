// src/components/MainContent.js
import React, { useState, useRef, useEffect } from 'react';
import { Grid, Typography, Box, Card, CardContent, Button } from '@mui/material';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import UpcomingEvents from '../components/UpcomingEvents';
import Navbar from '../components/Navbar-Class';
import Webcam from 'react-webcam';
import '../css/attendance.css'; // Import custom styles for present and absent days

const MainContent = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [attendanceDates, setAttendanceDates] = useState({
    present: ['2024-08-01', '2024-08-03'],
    absent: ['2024-08-02'],
  });
  const [qrScanned, setQrScanned] = useState(false);
  const [photoTaken, setPhotoTaken] = useState(false);
  const [locationFetched, setLocationFetched] = useState(false);
  const [attendanceMarked, setAttendanceMarked] = useState(false);
  const [location, setLocation] = useState(null);
  const [showWebcam, setShowWebcam] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [presentCount, setPresentCount] = useState(0);
  const [absentCount, setAbsentCount] = useState(0);
  const [attendancePercentage, setAttendancePercentage] = useState(0);
  const webcamRef = useRef(null);

  useEffect(() => {
    // Calculate the counts of present and absent days, ignoring weekends
    const presentDays = attendanceDates.present.filter(date => !isWeekend(date)).length;
    const absentDays = attendanceDates.absent.filter(date => !isWeekend(date)).length;
    const totalDays = presentDays + absentDays;

    setPresentCount(presentDays);
    setAbsentCount(absentDays);

    // Calculate the attendance percentage
    setAttendancePercentage(totalDays > 0 ? ((presentDays / totalDays) * 100).toFixed(2) : 0);
  }, [attendanceDates]);

  // Check if a date falls on a weekend
  const isWeekend = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDay();
    return day === 0 || day === 6; // 0 = Sunday, 6 = Saturday
  };

  // Handle QR Code Scan Event (Mockup)
  const handleQRCodeScan = () => {
    setQrScanned(true);
  };

  // Show Webcam and Capture Photo
  const handleCapturePhoto = () => {
    setShowWebcam(true); // Display the webcam when button is clicked
  };

  // Capture the screenshot when webcam is rendered and available
  const capturePhoto = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        setCapturedImage(imageSrc);
        setPhotoTaken(true);
        setShowWebcam(false); // Hide webcam after capturing the photo
      }
    }
  };

  // Fetch User Location
  const handleFetchLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
          setLocationFetched(true);
        },
        (error) => {
          console.error("Error fetching location: ", error);
          alert("Failed to fetch location.");
        }
      );
    } else {
      alert("Geolocation is not supported by this browser.");
    }
  };

  // Check all conditions and mark attendance
  const markAttendance = () => {
    if (qrScanned && photoTaken && locationFetched) {
      const response = { status: 'success', date: selectedDate.toISOString().split('T')[0], attendance: 'present' };
      setAttendanceDates((prev) => ({
        ...prev,
        [response.attendance]: [...prev[response.attendance], response.date],
      }));
      setAttendanceMarked(true);
    } else {
      alert("Please complete all steps (QR, Photo, Location) to mark attendance.");
    }
  };

  // Add custom CSS classes to calendar tiles
  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      const dateString = date.toISOString().split('T')[0];
      if (!isWeekend(dateString)) {
        if (attendanceDates.present.includes(dateString)) {
          return 'present-day'; // CSS class for present days
        } else if (attendanceDates.absent.includes(dateString)) {
          return 'absent-day'; // CSS class for absent days
        }
      }
    }
    return null;
  };

  return (
    <>
      <Navbar />

      <Grid container spacing={3} sx={{ padding: 3 }}>
        {/* QR Code Section */}
        <Grid item xs={12} md={9} display="flex" justifyContent="center">
          <Card sx={{ width: '100%', maxWidth: 600 }}>
            <CardContent>
              <Box mt={2}>
                <Typography variant="h6" color="textPrimary" align="left">
                  INSTRUCTIONS:
                </Typography>
                
                {/* Step 1: Scan QR Code */}
                <Box display="flex" alignItems="center" mt={2}>
                  <Typography variant="body1" color="textPrimary">
                    1. Scan the QR code
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleQRCodeScan}
                    disabled={qrScanned}
                    sx={{ ml: 2 }}
                  >
                    {qrScanned ? "QR Code Scanned" : "Scan QR Code"}
                  </Button>
                </Box>

                {/* Step 2: Capture Photo */}
                <Box display="flex" alignItems="center" mt={2}>
                  <Typography variant="body1" color="textPrimary">
                    2. Capture your photo
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCapturePhoto}
                    disabled={photoTaken}
                    sx={{ ml: 2 }}
                  >
                    {photoTaken ? "Photo Captured" : "Capture Photo"}
                  </Button>
                </Box>

                {/* Display Webcam and Capture Button */}
                {showWebcam && (
                  <Box mt={2} display="flex" flexDirection="column" alignItems="center">
                    <Webcam
                      audio={false}
                      height={240}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      width={320}
                    />
                    <Button variant="contained" color="secondary" sx={{ mt: 2 }} onClick={capturePhoto}>
                      Take Photo
                    </Button>
                  </Box>
                )}

                {/* Show Captured Photo */}
                {capturedImage && (
                  <Box mt={2} display="flex" justifyContent="center">
                    <img src={capturedImage} alt="Captured" style={{ width: 320, height: 240 }} />
                  </Box>
                )}

                {/* Step 3: Enable Location */}
                <Box display="flex" alignItems="center" mt={2}>
                  <Typography variant="body1" color="textPrimary">
                    3. Enable location access
                  </Typography>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleFetchLocation}
                    disabled={locationFetched}
                    sx={{ ml: 2 }}
                  >
                    {locationFetched ? "Location Enabled" : "Enable Location"}
                  </Button>
                </Box>

                {/* Show Location */}
                {location && (
                  <Typography variant="body2" color="textSecondary" align="center" mt={2}>
                    Latitude: {location.latitude}, Longitude: {location.longitude}
                  </Typography>
                )}

                {/* Mark Attendance */}
                <Box display="flex" justifyContent="center" mt={4}>
                  <Button
                    variant="contained"
                    color="success"
                    onClick={markAttendance}
                    disabled={attendanceMarked}
                  >
                    {attendanceMarked ? "Attendance Marked" : "Mark Attendance"}
                  </Button>
                </Box>

                {/* Show Attendance Marked */}
                {attendanceMarked && (
                  <Typography variant="h6" color="success.main" align="center" mt={2}>
                    Attendance Marked Successfully!
                  </Typography>
                )}
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Sidebar - Calendar and Upcoming Events */}
        <Grid item xs={12} md={3}>
          {/* Calendar Section */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" align="center">
                August, 2024
              </Typography>
              <Calendar
                onChange={setSelectedDate}
                value={selectedDate}
                tileClassName={tileClassName}
              />
            </CardContent>
          </Card>

          {/* Attendance Summary */}
          <Card sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" align="center">
                Attendance Summary
              </Typography>
              <Typography variant="body1" align="center">
                Present Days: {presentCount}
              </Typography>
              <Typography variant="body1" align="center">
                Absent Days: {absentCount}
              </Typography>
              <Typography variant="body1" align="center">
                Attendance Percentage: {attendancePercentage}%
              </Typography>
            </CardContent>
          </Card>

          {/* Upcoming Events Section */}
          <Card>
            <CardContent>
              <Typography variant="h6" align="center">
                Upcoming Events
              </Typography>
              <UpcomingEvents />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default MainContent;

// src/components/PerformanceAnalysis.js
import React from 'react';
import { Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const PerformanceAnalysis = () => {
  // Sample data for the line chart (to be replaced by data fetched from the backend)
  const data = [
    { name: 'Week1', marks: 5 },
    { name: 'Week2', marks: 10 },
    { name: 'Week3', marks: 15 },
    { name: 'Week4', marks: 25 },
    { name: 'Week5', marks: 35 },
    { name: 'Week6', marks: 50 },
  ];

  return (
    <Box
      sx={{
        backgroundColor: '#cac5df', // Very light blue color for the background
        minHeight: '100vh', // Ensures it covers the full height
        padding: 4, // Adds padding around the content
      }}
    >
      {/* Header */}
      <Typography variant="h3" align="center" sx={{ mt: 3, mb: 6 }}>
  My Performance Analysis
</Typography>


      {/* Personal Dashboard Section */}
      <Grid container spacing={3} sx={{ mb: 4, backgroundColor: '#f8f7f9', padding: 3, borderRadius: 2 }}>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom align="center">
            Your Personal Dashboard
          </Typography>
        </Grid>

        {/* Information Cards */}
        <Grid item xs={12} md={4}>
          <Card sx={{ padding: 2, boxShadow: 3, minHeight: '120px' }}>
            <CardContent>
              <Typography variant="body1">
                <strong>Name:</strong> NAVNEET KAUR
              </Typography>
              <Typography variant="body1">
                <strong>Branch:</strong> CS-C
              </Typography>
              <Typography variant="body1">
                <strong>Roll no.:</strong> 123102167
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ padding: 2, boxShadow: 3, minHeight: '120px' }}>
            <CardContent>
              <Typography variant="body1">
                <strong>Teacher Remarks:</strong> Keep it up!
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={4}>
          <Card sx={{ padding: 2, boxShadow: 3, minHeight: '120px' }}>
            <CardContent>
              <Typography variant="body1">
                <strong>Points:</strong> 80
              </Typography>
              <Typography variant="body1">
                <strong>Rank:</strong> 1
              </Typography>
              <Typography variant="body1">
                <strong>Badges:</strong> 4
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Charts and Calendar Section */}
      <Grid container spacing={3}>
        {/* Week-wise Test Scores */}
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: 2, backgroundColor: '#ffffff', boxShadow: 3, minHeight: '400px' }}> {/* Added minHeight */}
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Week wise test scores
              </Typography>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <Line type="monotone" dataKey="marks" stroke="#8884d8" strokeWidth={2} />
                  <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>

        {/* Attendance Calendar */}
        <Grid item xs={12} md={6}>
          <Card sx={{ padding: 2, backgroundColor: '#ffffff', boxShadow: 3, minHeight: '400px' }}> {/* Added minHeight */}
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Your Class Attendance
              </Typography>
              <Calendar />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PerformanceAnalysis;
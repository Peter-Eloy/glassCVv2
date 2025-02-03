// src/components/jobsDashboard/index.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Card,
  CardContent,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import {
  Refresh as RefreshIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon,
  RemoteWork as RemoteWorkIcon,
} from "@mui/icons-material";
import axios from "axios";
import { useGlassEffect } from "../../styles/glassEffects";

const JobsDashboard = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const glassEffect = useGlassEffect();

  const fetchJobs = async () => {
    try {
      setLoading(true);
      const response = await axios.get("https://api.petereloy.dev/api/jobs");
      setJobs(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch jobs data");
      console.error("Error fetching jobs:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const JobsTable = () => (
    <TableContainer component={Paper} sx={{ ...glassEffect, maxHeight: 440 }}>
      <Table stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell>Title</TableCell>
            <TableCell>Company</TableCell>
            <TableCell>Location</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Posted Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job.id} hover>
              <TableCell>
                <Typography variant="body2" sx={{ fontWeight: "medium" }}>
                  {job.title}
                </Typography>
              </TableCell>
              <TableCell>{job.company}</TableCell>
              <TableCell>
                <Chip
                  icon={<LocationIcon />}
                  label={job.location}
                  size="small"
                  variant="outlined"
                />
              </TableCell>
              <TableCell>
                <Chip
                  icon={job.remote ? <RemoteWorkIcon /> : <WorkIcon />}
                  label={job.remote ? "Remote" : "On-site"}
                  size="small"
                  color={job.remote ? "success" : "default"}
                />
              </TableCell>
              <TableCell>
                {new Date(job.postedDate).toLocaleDateString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

  const MetricsCards = () => (
    <Grid container spacing={3} mb={3}>
      <Grid item xs={12} md={4}>
        <Card sx={glassEffect}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Total Jobs
            </Typography>
            <Typography variant="h4">{jobs.length}</Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={glassEffect}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Remote Jobs
            </Typography>
            <Typography variant="h4">
              {jobs.filter((job) => job.remote).length}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12} md={4}>
        <Card sx={glassEffect}>
          <CardContent>
            <Typography color="textSecondary" gutterBottom>
              Latest Update
            </Typography>
            <Typography variant="h4">
              {jobs.length > 0
                ? new Date(
                    Math.max(...jobs.map((job) => new Date(job.postedDate)))
                  ).toLocaleDateString()
                : "N/A"}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
        <Typography variant="h4" component="h1">
          Jobs Dashboard
        </Typography>
        <Tooltip title="Refresh data">
          <IconButton onClick={fetchJobs} disabled={loading}>
            <RefreshIcon />
          </IconButton>
        </Tooltip>
      </Box>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <MetricsCards />
      <JobsTable />
    </Box>
  );
};

export default JobsDashboard;

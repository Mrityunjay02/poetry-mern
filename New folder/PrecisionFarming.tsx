import React, { useState, useEffect } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Chip
} from '@mui/material';
import {
  WbSunny as SunIcon,
  Opacity as WaterIcon,
  Grass as SoilIcon,
  Loop as RotationIcon,
  Mic as MicIcon
} from '@mui/icons-material';

interface WeatherData {
  temperature: number;
  humidity: number;
  rainfall: number;
  forecast: string;
  diseaseRisk: 'low' | 'medium' | 'high';
}

interface SoilData {
  ph: number;
  moisture: number;
  quality: 'poor' | 'moderate' | 'good';
  recommendations: string[];
}

interface CropRotation {
  currentCrop: string;
  nextRecommendedCrops: string[];
  rotationPeriod: string;
  reasoning: string;
}

const PrecisionFarming: React.FC = () => {
  const [location, setLocation] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [soilData, setSoilData] = useState<SoilData | null>(null);
  const [cropRotation, setCropRotation] = useState<CropRotation | null>(null);
  const [isListening, setIsListening] = useState(false);

  const recognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const speechRecognition = recognition ? new recognition() : null;

  useEffect(() => {
    if (speechRecognition) {
      speechRecognition.continuous = false;
      speechRecognition.lang = 'en-US';

      speechRecognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setLocation(transcript);
        setIsListening(false);
      };

      speechRecognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      speechRecognition.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const startListening = () => {
    if (speechRecognition) {
      speechRecognition.start();
      setIsListening(true);
    }
  };

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/weather?location=${encodeURIComponent(location)}`);
      if (!response.ok) throw new Error('Failed to fetch weather data');
      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError('Error fetching weather data. Please try again.');
      console.error('Weather fetch error:', err);
    }
  };

  const fetchSoilData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/soil?location=${encodeURIComponent(location)}`);
      if (!response.ok) throw new Error('Failed to fetch soil data');
      const data = await response.json();
      setSoilData(data);
    } catch (err) {
      setError('Error fetching soil data. Please try again.');
      console.error('Soil fetch error:', err);
    }
  };

  const fetchCropRotation = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/crop-rotation?location=${encodeURIComponent(location)}`);
      if (!response.ok) throw new Error('Failed to fetch crop rotation data');
      const data = await response.json();
      setCropRotation(data);
    } catch (err) {
      setError('Error fetching crop rotation data. Please try again.');
      console.error('Crop rotation fetch error:', err);
    }
  };

  const handleSubmit = async () => {
    if (!location.trim()) {
      setError('Please enter a location');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await Promise.all([
        fetchWeatherData(),
        fetchSoilData(),
        fetchCropRotation()
      ]);
    } finally {
      setLoading(false);
    }
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case 'low':
        return 'success';
      case 'medium':
        return 'warning';
      case 'high':
        return 'error';
      default:
        return 'default';
    }
  };

  const getSoilQualityColor = (quality: string) => {
    switch (quality.toLowerCase()) {
      case 'good':
        return 'success';
      case 'moderate':
        return 'warning';
      case 'poor':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom color="primary" sx={{ mb: 4 }}>
        Precision Farming Assistant
      </Typography>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <Grid container spacing={3}>
        {/* Input Section */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Location Input
            </Typography>
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'flex-start' }}>
              <TextField
                fullWidth
                label="Enter Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                disabled={loading || isListening}
                sx={{ mb: 2, mr: 1 }}
              />
              <Tooltip title="Voice Input">
                <IconButton
                  color={isListening ? 'primary' : 'default'}
                  onClick={startListening}
                  disabled={loading}
                >
                  <MicIcon />
                </IconButton>
              </Tooltip>
            </Box>
            <Button
              fullWidth
              variant="contained"
              onClick={handleSubmit}
              disabled={loading || !location}
            >
              {loading ? <CircularProgress size={24} /> : 'Analyze'}
            </Button>
          </Paper>
        </Grid>

        {/* Results Section */}
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {/* Weather Card */}
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <SunIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Weather Conditions</Typography>
                  </Box>
                  {weatherData ? (
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body1">
                          Temperature: {weatherData.temperature}°C
                        </Typography>
                        <Typography variant="body1">
                          Humidity: {weatherData.humidity}%
                        </Typography>
                        <Typography variant="body1">
                          Rainfall: {weatherData.rainfall}mm
                        </Typography>
                      </Grid>
                      <Grid item xs={12} sm={6}>
                        <Typography variant="body1">
                          Forecast: {weatherData.forecast}
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2" color="textSecondary">
                            Disease Risk:
                          </Typography>
                          <Chip
                            label={weatherData.diseaseRisk}
                            color={getRiskColor(weatherData.diseaseRisk) as any}
                            size="small"
                            sx={{ mt: 0.5 }}
                          />
                        </Box>
                      </Grid>
                    </Grid>
                  ) : (
                    <Typography color="textSecondary">
                      Enter a location to view weather data
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Soil Data Card */}
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <SoilIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Soil Analysis</Typography>
                  </Box>
                  {soilData ? (
                    <>
                      <Typography variant="body1">
                        pH Level: {soilData.ph}
                      </Typography>
                      <Typography variant="body1">
                        Moisture: {soilData.moisture}%
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2" color="textSecondary">
                          Quality:
                        </Typography>
                        <Chip
                          label={soilData.quality}
                          color={getSoilQualityColor(soilData.quality) as any}
                          size="small"
                          sx={{ mt: 0.5 }}
                        />
                      </Box>
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" color="textSecondary">
                          Recommendations:
                        </Typography>
                        <ul style={{ paddingLeft: '1.5rem', margin: '0.5rem 0' }}>
                          {soilData.recommendations.map((rec, index) => (
                            <li key={index}>
                              <Typography variant="body2">{rec}</Typography>
                            </li>
                          ))}
                        </ul>
                      </Box>
                    </>
                  ) : (
                    <Typography color="textSecondary">
                      Enter a location to view soil data
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>

            {/* Crop Rotation Card */}
            <Grid item xs={12} sm={6}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <RotationIcon color="primary" sx={{ mr: 1 }} />
                    <Typography variant="h6">Crop Rotation</Typography>
                  </Box>
                  {cropRotation ? (
                    <>
                      <Typography variant="body1">
                        Current Crop: {cropRotation.currentCrop}
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" color="textSecondary">
                          Next Recommended Crops:
                        </Typography>
                        <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                          {cropRotation.nextRecommendedCrops.map((crop, index) => (
                            <Chip
                              key={index}
                              label={crop}
                              size="small"
                              color="primary"
                              variant="outlined"
                            />
                          ))}
                        </Box>
                      </Box>
                      <Typography variant="body2" sx={{ mt: 2 }}>
                        Rotation Period: {cropRotation.rotationPeriod}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                        {cropRotation.reasoning}
                      </Typography>
                    </>
                  ) : (
                    <Typography color="textSecondary">
                      Enter a location to view crop rotation data
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default PrecisionFarming;

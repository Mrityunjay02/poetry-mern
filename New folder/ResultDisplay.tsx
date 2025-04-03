import React from 'react';
import { Card, CardContent, Typography, Box, Chip, LinearProgress } from '@mui/material';
import CheckCircle from '@mui/icons-material/CheckCircle';
import ErrorOutline from '@mui/icons-material/ErrorOutline';

interface ResultDisplayProps {
  prediction: string;
  confidence: number;
  treatmentInfo?: string;
}

const ResultDisplay: React.FC<ResultDisplayProps> = ({
  prediction,
  confidence,
  treatmentInfo,
}) => {
  const isHealthy = prediction.toLowerCase().includes('healthy');
  const confidenceColor = confidence > 80 ? 'success' : confidence > 60 ? 'warning' : 'error';

  return (
    <Card sx={{ maxWidth: 600, margin: '20px auto' }}>
      <CardContent>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            Analysis Results
          </Typography>
          
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            {isHealthy ? (
              <CheckCircle color="success" sx={{ mr: 1 }} />
            ) : (
              <ErrorOutline color="warning" sx={{ mr: 1 }} />
            )}
            <Typography variant="h6" color={isHealthy ? 'success.main' : 'warning.main'}>
              {prediction}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              Confidence Level
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Box sx={{ flex: 1, mr: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={confidence}
                  color={confidenceColor}
                  sx={{ height: 10, borderRadius: 5 }}
                />
              </Box>
              <Chip
                label={`${confidence.toFixed(1)}%`}
                color={confidenceColor}
                size="small"
              />
            </Box>
          </Box>

          {treatmentInfo && (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" gutterBottom>
                Treatment Recommendations
              </Typography>
              <Typography variant="body1" color="text.secondary" sx={{ whiteSpace: 'pre-line' }}>
                {treatmentInfo}
              </Typography>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ResultDisplay;

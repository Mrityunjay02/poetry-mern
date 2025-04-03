import React from 'react';
import { Card, CardContent, List, ListItem, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { CheckCircleOutline } from '@mui/icons-material';

interface TreatmentGuideProps {
  disease: string;
}

const TreatmentGuide: React.FC<TreatmentGuideProps> = ({ disease }) => {
  const treatments: Record<string, string[]> = {
    'Pepper__bell___Bacterial_spot': [
      'Use copper-based bactericides',
      'Practice crop rotation (2-3 years)',
      'Remove infected plant debris',
      'Avoid overhead irrigation',
      'Use disease-free seeds'
    ],
    'Tomato_Bacterial_spot': [
      'Apply copper-based fungicides',
      'Rotate crops every 2-3 years',
      'Remove infected plants',
      'Improve air circulation',
      'Use drip irrigation instead of overhead watering'
    ],
    'Tomato_Early_blight': [
      'Apply fungicides preventively',
      'Remove infected leaves',
      'Maintain proper plant spacing',
      'Water at the base of plants',
      'Keep the garden free of debris'
    ],
    'Potato_Late_blight': [
      'Use fungicides preventively',
      'Plant resistant varieties',
      'Improve drainage',
      'Remove infected plants',
      'Monitor weather conditions'
    ]
  };

  const treatment = treatments[disease] || [];

  return (
    <Card sx={{ mt: 3 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>Treatment Recommendations</Typography>
        {treatment.length > 0 ? (
          <List>
            {treatment.map((step, index) => (
              <ListItem key={index}>
                <ListItemIcon>
                  <CheckCircleOutline color="success" />
                </ListItemIcon>
                <ListItemText primary={step} />
              </ListItem>
            ))}
          </List>
        ) : (
          <Typography color="text.secondary">No specific treatments found for this condition.</Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default TreatmentGuide;

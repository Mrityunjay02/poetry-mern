import React, { ReactNode } from 'react';
import { 
  Container, 
  Typography, 
  Paper, 
  Box, 
  List,
  ListItem,
  ListItemText,
  Card,
  CardContent
} from '@mui/material';
import ReactMarkdown, { Components } from 'react-markdown';

interface MarkdownComponentProps {
  node?: unknown;
  children?: ReactNode;
}

const Theory: React.FC = () => {
  const components: Partial<Components> = {
    h1: ({ children }: MarkdownComponentProps) => (
      <Typography variant="h3" color="primary" gutterBottom>
        {children}
      </Typography>
    ),
    h2: ({ children }: MarkdownComponentProps) => (
      <Typography variant="h4" color="primary" gutterBottom sx={{ mt: 4 }}>
        {children}
      </Typography>
    ),
    h3: ({ children }: MarkdownComponentProps) => (
      <Typography variant="h5" color="primary" gutterBottom sx={{ mt: 3 }}>
        {children}
      </Typography>
    ),
    h4: ({ children }: MarkdownComponentProps) => (
      <Typography variant="h6" color="primary" gutterBottom>
        {children}
      </Typography>
    ),
    p: ({ children }: MarkdownComponentProps) => (
      <Typography variant="body1" paragraph>
        {children}
      </Typography>
    ),
    ul: ({ children }: MarkdownComponentProps) => (
      <List>
        {children}
      </List>
    ),
    li: ({ children }: MarkdownComponentProps) => (
      <ListItem>
        <ListItemText>
          <Typography variant="body1">
            {children}
          </Typography>
        </ListItemText>
      </ListItem>
    ),
    code: ({ children }: MarkdownComponentProps) => (
      <Card variant="outlined" sx={{ my: 2 }}>
        <CardContent sx={{ backgroundColor: '#f5f5f5' }}>
          <Typography component="pre" sx={{ fontFamily: 'monospace' }}>
            {children}
          </Typography>
        </CardContent>
      </Card>
    ),
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper elevation={3} sx={{ p: 4, mb: 4 }}>
        <Box sx={{ maxWidth: '100%', overflowX: 'auto' }}>
          <ReactMarkdown components={components}>
            {`# PLANT DISEASE ANALYSIS (SMART AGRICULTURE)
### A Project Report

Submitted by  
**Mr. Mrityunjay Bhardwaj (Group Leader)**  
**Mr. Ayon Roy**  
**Mr. Sourav Khasnobish**  
**Md. Saifi Israr**  

Under the Guidance of  
**DR. J. UMA MAHESWARI**  
Professor

Department of Computational Sciences  
BRAINWARE UNIVERSITY  
Kolkata - 700 125

## Abstract

This project revolutionizes agricultural disease management through an innovative smart farming solution that leverages cutting-edge artificial intelligence and computer vision technologies. The system implements a sophisticated plant disease detection framework focusing on three economically crucial crops: tomato, potato, and bell pepper. 

At its core, the system employs a state-of-the-art custom Convolutional Neural Network (CNN) architecture, enhanced with:
- Advanced data augmentation pipeline utilizing geometric and photometric transformations
- Multi-scale feature extraction through progressive filter complexity (64→256→512 channels)
- Efficient batch normalization and dropout regularization techniques
- Memory-optimized data processing using custom DataGenerator implementation

The system's smart capabilities include:
1. **Real-time Analysis**:
   - Sub-second disease detection latency
   - Concurrent processing of multiple image streams
   - Dynamic resource allocation for optimal performance

2. **Intelligent Decision Support**:
   - Automated disease severity assessment
   - Contextual treatment recommendations
   - Historical trend analysis and prediction

3. **Progressive Web Architecture**:
   - Responsive cross-platform interface
   - Offline-first functionality for rural deployment
   - Real-time synchronization capabilities

## Technical Implementation

### System Architecture

#### Backend Architecture
The system implements a three-tier architecture:

1. **Data Processing Layer**
   - Image preprocessing and standardization to 224x224 pixels
   - Comprehensive data augmentation pipeline:
     - Random rotation (±30 degrees)
     - Horizontal and vertical flips
     - Brightness adjustment
     - Contrast variation
     - Gaussian blur
     - Random noise injection
   - Custom DataGenerator class for efficient memory management
   - Real-time augmentation and class balancing

2. **Model Layer**
   - Custom CNN architecture with increasing filter complexity
   - Input Layer: 224x224x3 (RGB)
   - Multiple Convolutional Blocks
   - Batch Normalization for training stability
   - Strategic Dropout layers for regularization
   - Global Average Pooling
   - Dense layers with GELU activation
   - Softmax output layer for multi-class classification

### Disease Classification

#### Disease Categories
The system identifies diseases across three major crops:

1. **Tomato Diseases**
   - Bacterial Spot
   - Early Blight
   - Late Blight
   - Leaf Mold
   - Spider Mites
   - Target Spot
   - Yellow Leaf Curl Virus
   - Mosaic Virus
   - Healthy

2. **Potato Diseases**
   - Early Blight
   - Late Blight
   - Healthy

3. **Bell Pepper Diseases**
   - Bacterial Spot
   - Healthy

#### Dataset Composition
- **Total Images**: 18,867
- **Distribution**:
  - Training Set: 15,093 images (80%)
  - Validation Set: 1,887 images (10%)
  - Test Set: 1,887 images (10%)
- **Image Specifications**:
  - Resolution: 224x224 pixels
  - Format: RGB (3 channels)

### Smart Agriculture Features

1. **IoT Integration**
   - Sensor data integration
   - Automated monitoring systems
   - Environmental parameter tracking
   - Real-time weather data correlation

2. **Decision Support System**
   - Predictive analytics
   - Yield forecasting
   - Treatment optimization
   - Resource allocation suggestions

3. **Data Analytics Platform**
   - Historical trend analysis
   - Disease outbreak prediction
   - Crop health monitoring
   - Performance metrics tracking

## Future Scope

### Technical Advancements
1. **AI/ML Enhancements**
   - Integration of transformer-based architectures
   - Self-supervised learning implementation
   - Federated learning for distributed model training
   - Automated hyperparameter optimization

2. **Mobile Platform Development**
   - Native mobile applications
   - Camera API optimizations
   - Push notification system
   - Offline-first architecture

### Smart Agriculture Integration
1. **Precision Farming**
   - Data-driven decision making
   - Optimized resource allocation
   - Reduced waste and environmental impact

2. **Sustainable Agriculture**
   - Climate-resilient farming practices
   - Reduced chemical usage
   - Conservation of natural resources

3. **Digital Agriculture**
   - Increased accessibility through mobile platforms
   - Real-time data synchronization
   - Cloud-based data management`}
          </ReactMarkdown>
        </Box>
      </Paper>
    </Container>
  );
};

export default Theory;

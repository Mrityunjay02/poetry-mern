import React, { useState } from 'react';
import { Box, Button, Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface ImageUploadProps {
  onImageSelect: (file: File) => void;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  isLoading?: boolean;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageSelect, onImageUpload, isLoading = false }) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    setError(null);
    
    if (!event.target.files || event.target.files.length === 0) {
      return;
    }

    const file = event.target.files[0];
    
    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please upload an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size should be less than 5MB');
      return;
    }

    // Clear previous preview
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setPreviewUrl(URL.createObjectURL(file));
    onImageSelect(file);
    onImageUpload(event);
  };

  return (
    <Card sx={{ maxWidth: 600, margin: '20px auto' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Upload Plant Image
        </Typography>
        <Box
          sx={{
            border: '2px dashed #ccc',
            borderRadius: 2,
            padding: 3,
            textAlign: 'center',
            marginBottom: 2,
            backgroundColor: '#f5f5f5',
            position: 'relative',
          }}
        >
          {isLoading && (
            <Box sx={{ 
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.8)',
              zIndex: 1,
            }}>
              <CircularProgress />
            </Box>
          )}
          
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="image-upload"
            type="file"
            onChange={handleFileSelect}
            disabled={isLoading}
          />
          <label htmlFor="image-upload">
            <Button
              variant="contained"
              component="span"
              startIcon={<CloudUploadIcon />}
              disabled={isLoading}
              sx={{ mb: 2 }}
            >
              Choose Image
            </Button>
          </label>
          
          {error && (
            <Alert severity="error" sx={{ mt: 2 }}>
              {error}
            </Alert>
          )}

          {previewUrl && (
            <Box sx={{ mt: 2 }}>
              <img
                src={previewUrl}
                alt="Preview"
                style={{
                  maxWidth: '100%',
                  maxHeight: '200px',
                  objectFit: 'contain',
                }}
              />
            </Box>
          )}
          
          <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
            Supported formats: JPG, PNG, GIF (max 5MB)
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ImageUpload;

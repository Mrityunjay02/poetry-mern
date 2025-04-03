import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar,
  IconButton,
  Box,
  Chip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AgricultureIcon from '@mui/icons-material/Agriculture';

export interface HistoryItem {
  id: string;
  timestamp: Date;
  plant: string;
  disease: string;
  confidence: number;
  imageUrl: string;
}

interface DetectionHistoryProps {
  history: HistoryItem[];
  onDeleteItem: (id: string) => void;
}

const DetectionHistory: React.FC<DetectionHistoryProps> = ({ history, onDeleteItem }) => {
  if (history.length === 0) {
    return null;
  }

  const formatDate = (date: Date) => {
    const d = new Date(date);
    return d.toLocaleString('en-US', { 
      dateStyle: 'medium', 
      timeStyle: 'short'
    });
  };

  return (
    <Card sx={{ maxWidth: 600, margin: '20px auto' }}>
      <CardContent>
        <Typography variant="h5" gutterBottom color="primary" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <AgricultureIcon /> Detection History
        </Typography>
        <List>
          {history.map((item) => (
            <ListItem
              key={item.id}
              secondaryAction={
                <IconButton edge="end" aria-label="delete" onClick={() => onDeleteItem(item.id)}>
                  <DeleteIcon />
                </IconButton>
              }
              sx={{ 
                border: '1px solid #eee',
                borderRadius: 1,
                mb: 1,
                '&:hover': {
                  backgroundColor: '#f5f5f5'
                }
              }}
            >
              <ListItemAvatar>
                <Avatar 
                  src={item.imageUrl}
                  variant="rounded"
                  sx={{ width: 56, height: 56 }}
                >
                  <AgricultureIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>{item.plant}</Typography>
                    <Chip 
                      label={item.disease}
                      color={item.disease === 'Healthy' ? 'success' : 'warning'}
                      size="small"
                      sx={{ fontWeight: 'medium' }}
                    />
                  </Box>
                }
                secondary={
                  <>
                    <Typography variant="body2" color="text.secondary">
                      {formatDate(item.timestamp)}
                    </Typography>
                    <Typography 
                      variant="body2" 
                      color={item.confidence > 0.8 ? 'success.main' : 'warning.main'}
                      sx={{ fontWeight: 'medium' }}
                    >
                      Confidence: {(item.confidence * 100).toFixed(1)}%
                    </Typography>
                  </>
                }
              />
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default DetectionHistory;

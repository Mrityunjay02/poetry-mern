import React from 'react';
import { Box, Button, styled } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import DescriptionIcon from '@mui/icons-material/Description';
import HistoryIcon from '@mui/icons-material/History';
import GroupsIcon from '@mui/icons-material/Groups';

const NavContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: theme.spacing(2),
  padding: theme.spacing(2),
  justifyContent: 'center',
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  borderRadius: '12px',
  boxShadow: '0 2px 4px rgba(46, 125, 50, .1)',
  marginBottom: theme.spacing(4),
}));

const NavButton = styled(Button)(({ theme }) => ({
  padding: '10px 20px',
  borderRadius: '8px',
  textTransform: 'none',
  fontWeight: 500,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  '&:hover': {
    backgroundColor: theme.palette.primary.light,
    color: '#fff',
  },
}));

interface NavigationProps {
  currentView: 'main' | 'theory' | 'history' | 'team';
  onViewChange: (view: 'main' | 'theory' | 'history' | 'team') => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, onViewChange }) => {
  return (
    <NavContainer>
      <NavButton
        variant={currentView === 'main' ? 'contained' : 'outlined'}
        color="primary"
        onClick={() => onViewChange('main')}
        startIcon={<HomeIcon />}
      >
        Disease Detection
      </NavButton>
      <NavButton
        variant={currentView === 'theory' ? 'contained' : 'outlined'}
        color="primary"
        onClick={() => onViewChange('theory')}
        startIcon={<DescriptionIcon />}
      >
        Theory Paper
      </NavButton>
      <NavButton
        variant={currentView === 'history' ? 'contained' : 'outlined'}
        color="primary"
        onClick={() => onViewChange('history')}
        startIcon={<HistoryIcon />}
      >
        Detection History
      </NavButton>
      <NavButton
        variant={currentView === 'team' ? 'contained' : 'outlined'}
        color="primary"
        onClick={() => onViewChange('team')}
        startIcon={<GroupsIcon />}
      >
        Our Team
      </NavButton>
    </NavContainer>
  );
};

export default Navigation;

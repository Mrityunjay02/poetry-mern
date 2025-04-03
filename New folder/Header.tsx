import React from 'react';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import BiotechIcon from '@mui/icons-material/Biotech';

const LogoContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  '& svg': {
    fontSize: '2rem',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'scale(1.1)',
    },
  },
}));

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(45deg, #2E7D32 30%, #1B5E20 90%)',
  boxShadow: '0 3px 5px 2px rgba(46, 125, 50, .3)',
}));

const ProjectTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  background: 'linear-gradient(45deg, #FFFFFF 30%, #E8F5E9 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
  letterSpacing: '1px',
}));

const TeamInfo = styled(Typography)(({ theme }) => ({
  marginLeft: 'auto',
  color: '#E8F5E9',
  fontSize: '0.9rem',
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const Header: React.FC = () => {
  return (
    <StyledAppBar position="static">
      <Toolbar>
        <LogoContainer>
          <AgricultureIcon sx={{ color: '#E8F5E9' }} />
          <BiotechIcon sx={{ color: '#E8F5E9' }} />
          <ProjectTitle variant="h5">
            Smart Agriculture Disease Detection
          </ProjectTitle>
        </LogoContainer>
        <TeamInfo>
          BRAINWARE UNIVERSITY
        </TeamInfo>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Header;

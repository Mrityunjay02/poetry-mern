import React from 'react';
import { Box, Container, Typography, Link, Divider, styled } from '@mui/material';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import SchoolIcon from '@mui/icons-material/School';

const FooterContainer = styled(Box)(({ theme }) => ({
  backgroundColor: '#1B5E20',
  color: '#ffffff',
  padding: theme.spacing(4, 0),
  marginTop: 'auto',
}));

const FooterContent = styled(Container)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: theme.spacing(2),
}));

const ProjectInfo = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(2),
  '& svg': {
    fontSize: '2rem',
  },
}));

const TeamSection = styled(Box)(({ theme }) => ({
  textAlign: 'center',
  marginTop: theme.spacing(2),
}));

const StyledDivider = styled(Divider)(({ theme }) => ({
  width: '60%',
  margin: theme.spacing(2, 'auto'),
  backgroundColor: 'rgba(255, 255, 255, 0.2)',
}));

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent maxWidth="lg">
        <ProjectInfo>
          <AgricultureIcon />
          <Typography variant="h6">
            Smart Agriculture Disease Detection
          </Typography>
        </ProjectInfo>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SchoolIcon />
          <Typography variant="subtitle1">
            BRAINWARE UNIVERSITY, Kolkata
          </Typography>
        </Box>

        <StyledDivider />

        <TeamSection>
          <Typography variant="subtitle1" gutterBottom>
            Project Team
          </Typography>
          <Typography variant="body2" sx={{ mb: 1 }}>
            Group Leader: Mr. Mrityunjay Bhardwaj
          </Typography>
          <Typography variant="body2">
            Team Members: Mr. Ayon Roy, Mr. Sourav Khasnobish, Md. Saifi Israr
          </Typography>
        </TeamSection>

        <StyledDivider />

        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="subtitle2" gutterBottom>
            Under the Supervision of
          </Typography>
          <Typography variant="body1">
            DR. J. UMA MAHESWARI
          </Typography>
          <Typography variant="subtitle2">
            Professor, Department of Computational Sciences
          </Typography>
        </Box>

        <StyledDivider />

        <Typography variant="body2" sx={{ mt: 2, opacity: 0.8 }}>
          © {new Date().getFullYear()} Smart Agriculture Disease Detection Project. All rights reserved.
        </Typography>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;

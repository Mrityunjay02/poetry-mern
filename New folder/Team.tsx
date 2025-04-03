import React from 'react';
import { Box, Paper, Typography, Avatar, Grid, styled } from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import GroupsIcon from '@mui/icons-material/Groups';

const TeamContainer = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  backgroundColor: '#ffffff',
  marginTop: theme.spacing(4),
}));

const MemberCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  height: '100%',
  borderRadius: '12px',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-4px)',
    boxShadow: '0 6px 12px rgba(46, 125, 50, .15)',
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  width: 80,
  height: 80,
  marginBottom: theme.spacing(2),
  backgroundColor: theme.palette.primary.main,
  boxShadow: '0 4px 8px rgba(46, 125, 50, .2)',
}));

const Role = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.main,
  fontWeight: 500,
  marginBottom: theme.spacing(1),
}));

const Institution = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  marginBottom: theme.spacing(4),
  '& svg': {
    color: theme.palette.primary.main,
  },
}));

const Department = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: theme.spacing(1),
  marginTop: theme.spacing(2),
  color: theme.palette.text.secondary,
}));

const Team: React.FC = () => {
  const teamMembers = [
    {
      name: 'Mr. Mrityunjay Bhardwaj',
      role: 'Group Leader',
      initial: 'MB'
    },
    {
      name: 'Mr. Ayon Roy',
      role: 'Team Member',
      initial: 'AR'
    },
    {
      name: 'Mr. Sourav Khasnobish',
      role: 'Team Member',
      initial: 'SK'
    },
    {
      name: 'Md. Saifi Israr',
      role: 'Team Member',
      initial: 'SI'
    }
  ];

  return (
    <TeamContainer>
      <Institution>
        <SchoolIcon fontSize="large" />
        <Typography variant="h5" component="div">
          BRAINWARE UNIVERSITY, Kolkata
        </Typography>
      </Institution>

      <Grid container spacing={3}>
        {teamMembers.map((member) => (
          <Grid item xs={12} sm={6} md={3} key={member.name}>
            <MemberCard>
              <StyledAvatar>{member.initial}</StyledAvatar>
              <Typography variant="h6" gutterBottom>
                {member.name}
              </Typography>
              <Role variant="subtitle1">
                {member.role}
              </Role>
            </MemberCard>
          </Grid>
        ))}
      </Grid>

      <Department>
        <GroupsIcon />
        <Typography variant="subtitle1">
          Department of Computational Sciences
        </Typography>
      </Department>

      <Box sx={{ mt: 3, textAlign: 'center' }}>
        <Typography variant="subtitle1" color="text.secondary">
          Supervisor
        </Typography>
        <Typography variant="h6" color="primary">
          DR. J. UMA MAHESWARI
        </Typography>
        <Typography variant="subtitle2" color="text.secondary">
          Professor
        </Typography>
      </Box>
    </TeamContainer>
  );
};

export default Team;

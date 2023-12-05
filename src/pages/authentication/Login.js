
// material
import { styled } from '@mui/material/styles';
import { Box,Stack, Tooltip, Container, Typography, Button } from '@mui/material';
// routes
// hooks
import useAuth from '../../hooks/useAuth';
// layouts

// components
import Page from '../../components/Page';

import { LoginForm } from '../../components/authentication/login';
import AuthFirebaseSocials from '../../components/authentication/AuthFirebaseSocial';
import React from 'react';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));



const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function Login() {
  const { method } = useAuth();
  return (
    <RootStyle title="Login | Animeta">
    


      <Container maxWidth="sm">
        <ContentStyle>
          <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
          <Tooltip title="Animeta">
              <Box component="img" src={`/static/brand/loginlogo.png`} sx={{ width: "100px", height: "auto" }} />
            </Tooltip>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                Sign in to Animeta
              </Typography>
              <Typography sx={{ color: 'text.secondary' }}>Get Start your farm</Typography>
            </Box>

         
          </Stack>

          {method === 'firebase' && <AuthFirebaseSocials />}

          

          {method !== 'auth0' ? (
            <LoginForm />
          ) : (
            <Button fullWidth size="large" type="submit" variant="contained" >
              Login
            </Button>
          )}
 
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}

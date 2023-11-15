import { useSelector } from 'react-redux';
import AccountProfile from './AccountProfile';
import { AccountProfileDetails } from './account-profile-details';
import { Box, Container, Stack, Typography, Unstable_Grid2 as Grid } from '@mui/material';
import MainCard from 'ui-component/cards/MainCard';

// Custom components

const Profile = () => {
  // Sélecteur pour récupérer les données de l'utilisateur depuis le magasin Redux
  const user = useSelector((state) => state.account.user);

  // Votre logique pour afficher les données de l'utilisateur
  return (
    <Box>
      <Container maxWidth="xxl">
        <Stack spacing={1}>
          <div>
            <Typography variant="h4">Account</Typography>
          </div>
          <div>
            <Grid container spacing={3}>
              <Grid xs={12} md={6} lg={4}>
                <AccountProfile />
              </Grid>
              <Grid xs={12} md={6} lg={8}>
                <AccountProfileDetails />
              </Grid>
            </Grid>
          </div>
        </Stack>
      </Container>
    </Box>
  );
};

export default Profile;

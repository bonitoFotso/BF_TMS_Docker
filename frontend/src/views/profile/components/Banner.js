import React from 'react';
import { Avatar, Box, Card, CardContent, Grid, Typography } from '@mui/material';

export default function Banner(props) {
  const { banner, avatar, name, job, posts, followers, following } = props;

  return (
    <Card variant="outlined" sx={{ marginBottom: { xs: '0px', lg: '20px' }, textAlign: 'center' }}>
      <Box
        sx={{
          background: `url(${banner})`,
          backgroundSize: 'cover',
          borderRadius: '16px',
          height: '101px',
          width: '100%',
        }}
      />
      <Avatar
        src={avatar}
        sx={{ marginX: 'auto', height: '87px', width: '87px', marginTop: '-43px', border: '4px solid', borderColor: 'white' }}
      />
      <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: 'xl', marginTop: '10px' }}>
        {name}
      </Typography>
      <Typography variant="body1" sx={{ color: 'gray.400', fontSize: 'sm' }}>
        {job}
      </Typography>
      <Grid container sx={{ width: 'max-content', marginX: 'auto', marginTop: '26px' }}>
        <Grid item sx={{ marginX: 'auto', marginRight: '60px', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h4" sx={{ fontWeight: '700' }}>
            {posts}
          </Typography>
          <Typography variant="body1" sx={{ color: 'gray.400', fontWeight: '400', fontSize: 'sm' }}>
            Posts
          </Typography>
        </Grid>
        <Grid item sx={{ marginX: 'auto', marginRight: '60px', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h4" sx={{ fontWeight: '700' }}>
            {followers}
          </Typography>
          <Typography variant="body1" sx={{ color: 'gray.400', fontWeight: '400', fontSize: 'sm' }}>
            Followers
          </Typography>
        </Grid>
        <Grid item sx={{ marginX: 'auto', display: 'flex', flexDirection: 'column' }}>
          <Typography variant="h4" sx={{ fontWeight: '700' }}>
            {following}
          </Typography>
          <Typography variant="body1" sx={{ color: 'gray.400', fontWeight: '400', fontSize: 'sm' }}>
            Following
          </Typography>
        </Grid>
      </Grid>
    </Card>
  );
}

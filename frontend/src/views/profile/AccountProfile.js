import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';
import API_URL from 'conf';

const AccountProfile = () => {
  const user = useSelector((state) => state.account.user);
  //const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const token = useSelector((state) => state.account.token);
  console.log(user);
  //useEffect(() => {
  //  const fetchUser = async () => {
  //    console.log(token);
  //    try {
  //      const response = await axios.get(`${API_URL}/api/profile/`, {
  //        headers: {
  //          'Authorization': `Bearer ${token}`
  //        }
  //      });
  //      setUser(response.data);
  //      console.log(user);
  //      setLoading(false);
  //    } catch (error) {
  //      console.error('Erreur lors de la récupération des détails du technicien :');
  //      setError(error);
  //      setLoading(false);
  //    }
  //  };
//
  //  fetchUser();
  //}, []);
//
  return (
    <Card>
      <CardContent>
        <Box
          sx={{
            alignItems: 'center',
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          <Avatar
            src= {`${API_URL}${user.profile} `|| '/assets/avatars/default_avatar.png'}
            sx={{
              height: 80,
              mb: 2,
              width: 80
            }}
          />
          <Typography
            gutterBottom
            variant="h5"
          >
            {user.email}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {user.name} {user.country}
          </Typography>
          <Typography
            color="text.secondary"
            variant="body2"
          >
            {user.timezone}
          </Typography>
        </Box>
      </CardContent>
      <Divider />
      <CardActions>
        <Button
          fullWidth
          variant="text"
        >
          Upload picture
        </Button>
      </CardActions>
    </Card>
  );
};

export default AccountProfile;

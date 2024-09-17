// pages/MainPage.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppBar, Toolbar, Typography, Box, Avatar, IconButton, CircularProgress } from '@mui/material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import { actionAboutMe } from '../redux/actions';
import SearchBar from '../components/SearchBar';
import PostCard from '../components/PostCard';

const BASE_URL = 'http://hipstagram.node.ed.asmer.org.ua/'; // Ваш базовый URL

const MainPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.user);
  const auth = useSelector((state) => state.auth);
  const userProfile = user?.UserFindOne;

  useEffect(() => {
    if (!user && auth.token) {
      dispatch(actionAboutMe());
    }
    // Можно добавить дополнительные зависимости, если нужно обновлять данные при изменении
  }, [user, auth.token, dispatch]);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  const handleProfileClick = () => {
    navigate('/myProfile');
    dispatch(actionAboutMe());
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="h6">Hipstagram</Typography>
          <SearchBar />
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {userProfile ? (
              <>
                <Avatar
                  alt={userProfile.nick || userProfile.login}
                  src={userProfile.avatar?.url ? `${BASE_URL}${userProfile.avatar.url}` : '/default-avatar.png'}
                  sx={{ cursor: 'pointer' }}
                  onClick={handleProfileClick}
                />
                <Typography
                  variant="h6"
                  sx={{ marginLeft: '11px', marginRight: '8px', cursor: 'pointer' }}
                  onClick={handleProfileClick}
                >
                  {userProfile.nick || userProfile.login}
                </Typography>
              </>
            ) : (
              auth.token ? (
                <CircularProgress size={24} />
              ) : (
                <Typography variant="h6" color="error">Ошибка загрузки</Typography>
              )
            )}
            <IconButton onClick={handleLogout} color="inherit">
              <ExitToAppIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Box sx={{ marginTop: '20px' }}>
        <PostCard />
      </Box>
    </Box>
  );
};

export default MainPage;
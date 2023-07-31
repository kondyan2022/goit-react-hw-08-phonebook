import {
  AppBar,
  Box,
  IconButton,
  LinearProgress,
  Toolbar,
  Typography,
} from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import PersonIcon from '@mui/icons-material/Person';
import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getIsLoggedIn, logoutUserThunk } from 'redux/authSlice';
import { resetState } from 'redux/contactSlice/contactsSlice';
import { getIsLoading } from 'redux/selectors';
export const Header = () => {
  const dispatch = useDispatch();

  const userName = useSelector(
    state => `${state.auth.user.name ?? ''} (${state.auth.user.email ?? ''})`
  );
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isLoading = useSelector(getIsLoading);
  const handleClick = () => {
    dispatch(logoutUserThunk())
      .unwrap()
      .then(() => {
        console.log('clear state');
        dispatch(resetState());
      })
      .catch();
  };

  return (
    <>
      <AppBar position="static">
        <Toolbar sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
          <ContactPhoneIcon fontSize="large" />
          <Typography
            variant={'h5'}
            component="div"
            sx={{ ml: 2, flexGrow: 1 }}
          >
            Phonebook
          </Typography>

          {isLoggedIn && (
            <>
              <PersonIcon fontSize={'large'} sx={{ mr: 1 }} />
              <Typography variant="h6" component="div" sx={{ mr: 3 }}>
                {userName}
              </Typography>
              <IconButton color="inherit" onClick={handleClick} title="Logout">
                <LoginOutlinedIcon fontSize="large" />
              </IconButton>
            </>
          )}
        </Toolbar>
      </AppBar>
      {isLoading && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}

      <Suspense fallback={null}>
        <Outlet />
      </Suspense>
    </>
  );
};

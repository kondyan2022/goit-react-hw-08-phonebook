import {
  AppBar,
  Box,
  Button,
  Divider,
  IconButton,
  LinearProgress,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@mui/material';
import LoginOutlinedIcon from '@mui/icons-material/LoginOutlined';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import PersonIcon from '@mui/icons-material/Person';
import { Suspense, useState } from 'react';
import { Outlet } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAuthUser, getIsLoggedIn, logoutUserThunk } from 'redux/authSlice';
import { resetState } from 'redux/contactSlice/contactsSlice';
import { getIsLoading } from 'redux/selectors';
import { toast } from 'react-hot-toast';

export const Header = () => {
  const dispatch = useDispatch();
  const { email } = useSelector(getAuthUser);
  const isLoggedIn = useSelector(getIsLoggedIn);
  const isLoading = useSelector(getIsLoading);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = () => {
    dispatch(logoutUserThunk())
      .unwrap()
      .then(() => {
        dispatch(resetState());
      })
      .catch(e => toast.error(e));
  };

  return (
    <>
      <AppBar position="static">
        {/* <Toolbar sx={{ flexDirection: { xs: 'column', sm: 'row' } }}> */}
        <Toolbar>
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
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={event => {
                    setAnchorEl(event.currentTarget);
                  }}
                  color="inherit"
                >
                  <PersonIcon fontSize={'large'} sx={{ mr: 1 }} />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorEl)}
                  onClose={() => {
                    setAnchorEl(null);
                  }}
                >
                  <MenuItem>{email}</MenuItem>
                  <Divider />
                  <MenuItem onClick={handleClick}>
                    <Button endIcon={<LoginOutlinedIcon />}>Logout</Button>
                  </MenuItem>
                </Menu>
              </div>
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

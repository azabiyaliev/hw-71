import { AppBar, Box, Button, Toolbar, Typography } from '@mui/material';
import { NavLink, useLocation } from 'react-router-dom';


const NavBar = () => {

  const location = useLocation();
  console.log(location.pathname);


  return (
    <>
      <Box sx={{mb: 5, boxShadow: 10 }}>
        <AppBar sx={{ bgcolor: "darkviolet"}} position="static">
          <Toolbar sx={{justifyContent: "space-between"}}>
            <Typography
              color="inherit"
              to="/"
              variant="h5"
              component={NavLink}
              sx={{ textDecoration: "none", fontSize: "18px" }}
            >
              {location.pathname === "/" ? "Turtle Pizza" : "Turtle Pizza Admin"}
            </Typography>
            <Box>
              {location.pathname === "/" ? null : (
                <>
                  <Button sx={{}} color="inherit" to="/admin/dishes" component={NavLink}>
                    Dishes
                  </Button>
                  <Button color="inherit" to="/admin/orders" component={NavLink}>
                    Orders
                  </Button>
                </>
              )}

            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
};

export default NavBar;

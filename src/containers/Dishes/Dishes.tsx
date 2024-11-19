import { NavLink } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';

const Dishes = () => {

  return (
    <Container maxWidth="xl">
      <div className="d-flex justify-content-between align-items-center flex-wrap">
        <Typography
          sx={{color: "darkviolet"}}
          variant="h4"
        >
          Dishes
        </Typography>
        <Button sx={{border: 1, borderColor: "darkviolet", color: "darkviolet" }} to="/admin/new-dish" component={NavLink}>
          Add new Dish
        </Button>
      </div>
      <div>
        
      </div>
    </Container>
  );
};

export default Dishes;
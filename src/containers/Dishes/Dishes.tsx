import { NavLink } from 'react-router-dom';
import {Box, Button, Container, Typography} from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { addObject, dishList } from './dishesSlice.ts';
import { useEffect } from 'react';
import { fetchDeleteDish, fetchDishes } from '../store/thunks/allThuks.ts';
import { IDish } from '../../types';

const Dishes = () => {

  const dispatch = useAppDispatch();
  const dishShow: IDish[] = Object.values(useAppSelector(dishList));



  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const deleteDish = async (id: string) => {
    if(dishShow) {
      await dispatch(fetchDeleteDish(id));
    }
    fetchDishes();
  };

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
        <div className="w-75 mx-auto mt-5">
          {dishShow.map((dish) => (
            <Box
              sx={{color: "darkviolet", border: 1, borderColor: "darkviolet", borderRadius: 2 }}
              key={dish.id}
              className="shadow-sm mb-2 d-flex align-items-center"
            >
              <img className="m-1" style={{maxWidth: 200, maxHeight: 200}} src={dish.image} alt={dish.title} />
              <Typography
                sx={{color: "darkviolet"}}
                variant="h6"
                className="mx-auto align-self-center"
              >
                {dish.title}
              </Typography>
              <Typography
                sx={{color: "darkviolet"}}
                variant="h6"
                className="mx-auto align-self-center"
              >
                {dish.price} KGS
              </Typography>
              <Button sx={{borderColor: "darkviolet", color: "darkviolet" }} to={`/admin/${dish.id}/edit`} component={NavLink} onClick={() => dispatch(addObject(dish))}>
                Edit
              </Button>
              <Button sx={{borderColor: "darkviolet", color: "darkviolet" }} to="/admin" component={NavLink} onClick={() => deleteDish(dish.id)}>
                Delete
            </Button>
            </Box>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Dishes;
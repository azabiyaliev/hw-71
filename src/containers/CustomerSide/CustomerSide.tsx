import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { IDish, IDishAmount, IOrderFromCustomer } from '../../types';
import { dishList, minus, sum, totalPrice } from '../Dishes/dishesSlice.ts';
import React, { useEffect } from 'react';
import { fetchDishes, fetchPostOrder } from '../store/thunks/allThuks.ts';
import { Box, Button, Container, Modal, Typography } from '@mui/material';
import { ordersList } from './customerSideSlice.ts';

const CustomerSide = () => {

  const dispatch = useAppDispatch();
  const dishShow: IDish[] = Object.values(useAppSelector(dishList));
  const totals: IDishAmount[] = Object.values(useAppSelector(totalPrice));
  const orders: IOrderFromCustomer = useAppSelector(ordersList);
  console.log(orders);
  console.log(totals);

  useEffect(() => {
    dispatch(fetchDishes());
  }, [dispatch]);

  const total = totals.reduce((acc, oneDish) => {
    acc = acc + Number(oneDish.dish.price) * oneDish.counts;
    return acc;
  }, 0);

  const [open, setOpen] = React.useState(false);
  const openModal = () => setOpen(true);
  const closeModal = () => setOpen(false);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid darkviolet',
    boxShadow: 24,
    borderRadius: 2,
    p: 4,
    color: 'darkviolet',
  };

  const disturb: number = 150;

  const sendOrder = async () => {

    try {
      await dispatch(fetchPostOrder({...orders}));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container maxWidth="xl">
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Your order:
            </Typography>
            {totals.map((totalDish) => (
              <Box
                sx={{p: 1, color: 'darkviolet', border: 1, borderColor: 'darkviolet', borderRadius: 1}}
                key={totalDish.dish.id}
                className="shadow-sm mb-2 d-flex align-items-center justify-content-between"
              >
                <Typography id="modal-modal-description" sx={{mt: 2}}>
                  {totalDish.dish.title}
                </Typography>
                <Typography id="modal-modal-description" sx={{mt: 2}}>
                  x {totalDish.counts}
                </Typography>
                <Typography id="modal-modal-description" sx={{mt: 2}}>
                  {totalDish.dish.price}
                </Typography>
                <Button className="align-self-center"
                        onClick={() => dispatch(minus(totalDish))}>
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="36px" height="36px">
                    <path fill="#b39ddb"
                          d="M30.6,44H17.4c-2,0-3.7-1.4-4-3.4L9,11h30l-4.5,29.6C34.2,42.6,32.5,44,30.6,44z"/>
                    <path fill="#9575cd" d="M28 6L20 6 14 12 34 12z"/>
                    <path fill="#7e57c2" d="M10,8h28c1.1,0,2,0.9,2,2v2H8v-2C8,8.9,8.9,8,10,8z"/>
                  </svg>
                </Button>
              </Box>
            ))}
            <Typography id="modal-modal-description" sx={{mt: 2}}>
              Delivery: {total ? (disturb) : null}
            </Typography>
            <Typography id="modal-modal-description" sx={{mt: 2}}>
              Total: {total ? (total + disturb) : null}
            </Typography>
            <div className="d-flex flex-column pt-2">
              <Button className="w-75 align-self-center"
                      sx={{borderColor: 'darkviolet', color: 'darkviolet', border: 1}} onClick={closeModal}>
                Cancel
              </Button>
                  <Button
                    type="button"
                    className="w-75 align-self-center"
                    sx={{borderColor: 'darkviolet', color: 'darkviolet', border: 1, marginTop: 1}}
                    onClick={() => sendOrder()}>
                    Order
                  </Button>
            </div>
        </Box>
      </Modal>
      <div className="w-75 mx-auto mt-5">
        {dishShow.map((dish) => (
          <Box
            sx={{color: "darkviolet", border: 1, borderColor: "darkviolet", borderRadius: 2}}
            key={dish.id}
            className="shadow-sm mb-2 d-flex align-items-center"
            onClick={() => dispatch(sum(dish))}
          >
            <img className="m-1" style={{maxWidth: 200, maxHeight: 200}} src={dish.image} alt={dish.title}/>
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
          </Box>
        ))}
      </div>
      <div className="w-75 mx-auto mt-5 d-flex justify-content-between">
        <Typography
          sx={{color: "darkviolet"}}
          variant="h6"
          className="align-self-center"
        >
          Order total: {total} KGS
        </Typography>
        <Button sx={{borderColor: "darkviolet", color: "darkviolet", border: 1 }} onClick={openModal}>
          Checkout
        </Button>
      </div>
    </Container>
  );
};

export default CustomerSide;
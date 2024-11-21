import { Button, Container, TextField, Typography } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import React, { useCallback, useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import { IDishForm } from '../../types';
import { useAppDispatch, useAppSelector } from '../../app/hooks.ts';
import { oneDishes } from '../../containers/Dishes/dishesSlice.ts';
import { fetchDish, fetchPostDish, fetchPutDish } from '../../containers/store/thunks/allThuks.ts';

const initialForm = {
  image: "",
  price: "",
  title: "",
};

const AddNewDish = () => {
  const [form, setForm] = useState<IDishForm>({ ...initialForm });
  const navigate = useNavigate();
  const params = useParams<{idDish: string}>();
  const dispatch = useAppDispatch();
  const dish = useAppSelector(oneDishes);
  console.log(dish);

  const fetchOneDish = useCallback(async (id: string) => {
      await dispatch(fetchDish(id));
  }, [dispatch]);

  useEffect(() => {
    if(dish && params.idDish) {
      setForm(dish);
    } else {
      setForm(initialForm);
    }
  }, [fetchOneDish,params.idDish,dish]);

  const onChangeField = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setForm((prevState) => ({
        ...prevState,
        [name]: value,
      }));
  };

  const submitForm = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if(params.idDish) {
        await dispatch(fetchPutDish({...form}));
      } else {
        await dispatch(fetchPostDish({...form}));
      }
      navigate("/admin/dishes");
    } catch (e) {
      console.log(e);
    }
  };


  return (
        <>
          <form onSubmit={submitForm} className="d-flex flex-column justify-content-between">
            <Container maxWidth="xl" sx={{color: "darkviolet"}}>
              <Typography
                sx={{color: "darkviolet"}}
                variant="h4"
              >
                {params.idDish ? "Edit dish" : "Add new dish"}
              </Typography>
              <Box
                sx={{
                  py: 3,
                  display: 'grid',
                  gap: 2,
                  flexWrap: 'wrap',
                  width: '100%',
                  color: 'darkviolet',
                }}
              >
                <TextField
                  sx={{me: 'auto', maxWidth: 400}}
                  type="text"
                  id="outlined-basic"
                  label="Title"
                  name="title"
                  value={form.title}
                  variant="outlined"
                  onChange={onChangeField}
                />
                <TextField
                  sx={{me: 'auto', maxWidth: 400}}
                  type="number"
                  id="outlined-basic"
                  label="Price"
                  name="price"
                  value={form.price}
                  variant="outlined"
                  onChange={onChangeField}
                />
                <TextField
                  sx={{me: 'auto', maxWidth: 400}}
                  type="url"
                  id="outlined-basic"
                  label="Image"
                  name="image"
                  value={form.image}
                  variant="outlined"
                  onChange={onChangeField}
                />
                <div>
                  <p>Dish preview:</p>
                  <img style={{maxWidth: 200, maxHeight: 200}} alt={form.title} src={form.image}/>
                </div>
                <div
                  style={{maxWidth: 400}}
                  className="d-flex flex-row align-items-center justify-content-between"
                >
                  <Button
                    type="submit"
                    sx={{me: 'auto', width: '8%'}}
                    color="inherit"
                    variant="outlined"
                  >
                    {params.idDish ? "Edit" : "Save"}
                  </Button>
                </div>
              </Box>
            </Container>
          </form>
        </>
  );
};

export default AddNewDish;

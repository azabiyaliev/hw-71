import { Button, Container, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import axiosAPI from '../../axiosAPI.ts';
import { IDishForm } from '../../types';

const initialForm = {
  title: "",
  price: "",
  image: "",
};

const AddNewDish = () => {
  const [form, setForm] = useState<IDishForm>({ ...initialForm });
  const navigate = useNavigate();

  useEffect(() => {
    setForm((prevState) => ({
      ...prevState,
    }));
  },[]);

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
      await axiosAPI.post("dishes.json", { ...form });
      navigate("/admin/dishes");
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <form onSubmit={submitForm} className="d-flex flex-column justify-content-between">
      <Container maxWidth="xl" sx={{color: "darkviolet"}}>
        <Typography
          sx={{color: "darkviolet"}}
          variant="h4"
        >
          Add new dish
        </Typography>        <Box
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
            sx={{me: 'auto', maxWidth: 400 }}
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
            <p>Photo preview:</p>
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
              Save
            </Button>
          </div>
        </Box>
      </Container>
    </form>
  );
};

export default AddNewDish;

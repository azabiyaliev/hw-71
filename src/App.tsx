import Layout from './components/Layout/Layout.tsx';
import { Route, Routes } from 'react-router-dom';
import Dishes from './containers/Dishes/Dishes.tsx';
import AddNewDish from './components/AddNewDish/AddNewDish.tsx';
import CustomerSide from './containers/CustomerSide/CustomerSide.tsx';

const App = () => {

  return (
    <>
      <Layout/>
      <Routes>
        <Route path="/" element={<CustomerSide/>} />
        <Route path="/admin" element={<Dishes/>} />
        <Route path="/admin/dishes" element={<Dishes/>}/>
        <Route path="/admin/new-dish" element={<AddNewDish/>}/>
        <Route path={'/admin/:idDish/edit'} element={<AddNewDish/>}/>
      </Routes>
    </>
  );
};

export default App;

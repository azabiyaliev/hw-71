import Layout from './components/Layout/Layout.tsx';
import { Route, Routes } from 'react-router-dom';
import Dishes from './containers/Dishes/Dishes.tsx';
import AddNewDish from './components/AddNewDish/AddNewDish.tsx';

const App = () => {

  return (
    <>
      <Layout/>
      <Routes>
        <Route path="/admin" element={<Dishes/>} />
        <Route path="/admin/dishes" element={<Dishes/>}/>
        <Route path="/admin/new-dish" element={<AddNewDish/>}/>
      </Routes>
    </>
  );
};

export default App;

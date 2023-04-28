import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../src/pages/Home';
import Cart from '../src/pages/Cart';
import NotFound from '../src/pages/NotFound';

import './scss/app.scss';
import Header from './components/Header';

// https://642c3132208dfe25472a75cf.mockapi.io/items Для корзины
// https://642c3132208dfe25472a75cf.mockapi.io/pizzas Пиццы

function App() {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <div className="wrapper">
      <Header searchValue={searchValue} setSearchValue={setSearchValue} />
      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home searchValue={searchValue} />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;

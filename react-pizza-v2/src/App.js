import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from '../src/pages/Home';
import Cart from '../src/pages/Cart';
import NotFound from '../src/pages/NotFound';

import './scss/app.scss';
import Header from './components/Header';

export const SearchContext = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState('');

  return (
    <div className="wrapper">
      <SearchContext.Provider value={{ searchValue, setSearchValue }}>
        <Header />
        <div className="content">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </SearchContext.Provider>
    </div>
  );
}

export default App;

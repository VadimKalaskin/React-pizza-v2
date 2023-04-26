import React from 'react';
import Axios from 'axios';

import './scss/app.scss';
import Header from './components/Header';
import Categories from './components/Categories';
import Sort from './components/Sort';
import PizzaBlock from './components/PizzaBlock';
import Skeleton from './components/PizzaBlock/Skeleton';

// https://642c3132208dfe25472a75cf.mockapi.io/items Для корзины
// https://642c3132208dfe25472a75cf.mockapi.io/pizzas Пиццы

function App() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    Axios.get('https://642c3132208dfe25472a75cf.mockapi.io/pizzas').then((res) => {
      setPizzas(res.data);
      setIsLoading(false);
    });
  }, []);

  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />
          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">
            {isLoading
              ? [...new Array(6)].map((_, index) => <Skeleton key={index} />)
              : pizzas.map((obj) => <PizzaBlock {...obj} key={obj.id} />)}
            ;
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;

import React from 'react';
import Axios from 'axios';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

export default function Home() {
  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [currentPage, setCurrentPage] = React.useState(1);

  const [categoryId, setCategoryId] = React.useState(0);
  const [sortType, setSortType] = React.useState({
    name: 'популярности(DESC)',
    sortProperty: 'rating',
  });
  const { searchValue } = React.useContext(SearchContext);

  const sortBy = sortType.sortProperty.replace('-', '');
  const orderBy = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
  const category = categoryId > 0 ? `category=${categoryId}` : '';
  const searchBy = searchValue ? `search=${searchValue}` : '';

  React.useEffect(() => {
    setIsLoading(true);
    Axios.get(
      `https://642c3132208dfe25472a75cf.mockapi.io/pizzas?limit=8&page=${currentPage}&${category}&sortBy=${sortBy}&order=${orderBy}&${searchBy}`,
    ).then((res) => {
      setPizzas(res.data);
      setIsLoading(false);
    });
    window.scrollTo(0, 0);
  }, [categoryId, sortType, searchValue, currentPage]);

  const itemsToShow = pizzas.map((obj) => <PizzaBlock {...obj} key={obj.id} />);
  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  return (
    <>
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(i) => {
            setCategoryId(i);
          }}
        />
        <Sort
          value={sortType}
          onChangeSort={(i) => {
            setSortType(i);
          }}
        />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : itemsToShow}</div>
      <Pagination onChangePage={(number) => setCurrentPage(number)} />
    </>
  );
}

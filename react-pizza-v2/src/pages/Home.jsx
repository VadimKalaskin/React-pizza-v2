import React from 'react';
import Axios from 'axios';
import qs from 'qs';
import { useNavigate } from 'react-router-dom';

// https://642c3132208dfe25472a75cf.mockapi.io/items Для корзины
// https://642c3132208dfe25472a75cf.mockapi.io/pizzas Пиццы

import { useDispatch, useSelector } from 'react-redux';
import { setCategoryId, setCurrentPage, setFilters } from '../redux/slices/filterSlice';

import Categories from '../components/Categories';
import Sort, { list } from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';

export default function Home() {
  const { categoryId, sortType, currentPage } = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  const isMounted = React.useRef(false);
  const isSearch = React.useRef(false);
  const fetchPizzas = () => {
    setIsLoading(true);

    const sortBy = sortType.sortProperty.replace('-', '');
    const orderBy = sortType.sortProperty.includes('-') ? 'asc' : 'desc';
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const searchBy = searchValue ? `search=${searchValue}` : '';

    Axios.get(
      `https://642c3132208dfe25472a75cf.mockapi.io/pizzas?limit=8&page=${currentPage}&${category}&sortBy=${sortBy}&order=${orderBy}&${searchBy}`,
    ).then((res) => {
      setPizzas(res.data);
      setIsLoading(false);
    });
  };

  const onChangeCategory = (id) => {
    dispatch(setCategoryId(id));
  };

  const [pizzas, setPizzas] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const { searchValue } = React.useContext(SearchContext);

  let sortList = list;

  const navigate = useNavigate();

  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));
      const sortProp = sortList.find((obj) => obj.sortProperty === params.sortProperty);

      dispatch(setFilters({ ...params, sortProp }));
      isSearch.current = true;
    }
  }, []);

  React.useEffect(() => {
    window.scrollTo(0, 0);
    if (!isSearch.current) {
      fetchPizzas();
    }
    isSearch.current = false;
  }, [categoryId, sortType, searchValue, currentPage]);

  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sortType.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sortType, currentPage]);

  const itemsToShow = pizzas.map((obj) => <PizzaBlock {...obj} key={obj.id} />);
  const skeletons = [...new Array(8)].map((_, index) => <Skeleton key={index} />);

  const onChangePage = (number) => {
    dispatch(setCurrentPage(number));
  };

  return (
    <>
      <div className="content__top">
        <Categories
          value={categoryId}
          onChangeCategory={(i) => {
            onChangeCategory(i);
          }}
        />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>
      <div className="content__items">{isLoading ? skeletons : itemsToShow}</div>
      <Pagination onChangePage={onChangePage} currentPage={currentPage} />
    </>
  );
}
